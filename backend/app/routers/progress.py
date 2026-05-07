from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from app.database import get_db
from app.models import Word, UserProgress
from app.schemas import ProgressUpdate, ProgressQueue, WordDetail

router = APIRouter()


@router.post("/progress", response_model=dict)
def update_progress(update: ProgressUpdate, db: Session = Depends(get_db)):
    """更新复习进度，使用 SM-2 算法计算下次复习时间。

    quality 评分规则：
        0 = 完全忘记, 1 = 严重困难, 2 = 困难
        3 = 勉强正确, 4 = 正确, 5 = 轻松正确
    """
    progress = db.query(UserProgress).filter(
        UserProgress.user_id == update.user_id,
        UserProgress.word_id == update.word_id
    ).first()

    if not progress:
        progress = UserProgress(
            user_id=update.user_id,
            word_id=update.word_id,
            ease_factor=2.5,
            interval=0,
            repetitions=0,
            status="learning",
        )
        db.add(progress)

    # SM-2 算法
    quality = update.quality
    if quality < 3:
        # 回忆失败：重置
        progress.repetitions = 0
        progress.interval = 1
        progress.status = "learning"
    else:
        # 回忆成功
        if progress.repetitions == 0:
            progress.interval = 1
        elif progress.repetitions == 1:
            progress.interval = 6
        else:
            progress.interval = round(progress.interval * progress.ease_factor)

        progress.repetitions += 1
        progress.ease_factor = progress.ease_factor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
        if progress.ease_factor < 1.3:
            progress.ease_factor = 1.3

        if progress.repetitions >= 3:
            progress.status = "graduated"

    progress.last_review = datetime.utcnow()
    progress.next_review = datetime.utcnow() + timedelta(days=progress.interval)

    db.commit()
    db.refresh(progress)

    return {
        "word_id": update.word_id,
        "next_review": progress.next_review.isoformat(),
        "interval": progress.interval,
        "ease_factor": round(progress.ease_factor, 2),
        "repetitions": progress.repetitions,
        "status": progress.status,
    }


@router.get("/progress/queue", response_model=ProgressQueue)
def get_learning_queue(user_id: str, db: Session = Depends(get_db)):
    """获取今日待学单词：新词 + 到期的复习词。"""
    now = datetime.utcnow()

    # 新词（无进度记录）
    new_word_ids = set()
    all_words = db.query(Word.id).all()
    all_word_ids = {w.id for w in all_words}
    progress_records = db.query(UserProgress.word_id).filter(
        UserProgress.user_id == user_id,
        UserProgress.status == "new"
    ).all()
    learned_ids = {r.word_id for r in progress_records}
    new_word_ids = all_word_ids - learned_ids

    # 到期复习词
    review_records = db.query(UserProgress).filter(
        UserProgress.user_id == user_id,
        UserProgress.next_review <= now,
        UserProgress.status != "new"
    ).all()
    review_word_ids = {r.word_id for r in review_records}

    # 组装详情
    new_words = db.query(Word).filter(Word.id.in_(new_word_ids)).order_by(Word.unit).all()
    review_words = db.query(Word).filter(Word.id.in_(review_word_ids)).all()

    return ProgressQueue(
        new_words=new_words,
        review_words=review_words,
        total_new=len(new_words),
        total_review=len(review_words),
    )
