from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from app.database import get_db
from app.models import Word, WrongWord
from app.schemas import WrongWordEntry, WrongWordAdd, WordDetail

router = APIRouter()


@router.get("/wrong-words", response_model=list[WrongWordEntry])
def get_wrong_words(user_id: str, db: Session = Depends(get_db)):
    """获取错词本（未移除的）。"""
    entries = db.query(WrongWord).filter(
        WrongWord.user_id == user_id,
        WrongWord.removed_at.is_(None)
    ).order_by(WrongWord.added_at.desc()).all()

    result = []
    for entry in entries:
        word = db.query(Word).filter(Word.id == entry.word_id).first()
        if word:
            result.append(WrongWordEntry(
                id=entry.id,
                word=word,
                added_at=entry.added_at,
            ))
    return result


@router.post("/wrong-words", response_model=dict, status_code=201)
def add_to_wrong_words(add: WrongWordAdd, db: Session = Depends(get_db)):
    """加入错词本。"""
    # 检查单词是否存在
    word = db.query(Word).filter(Word.id == add.word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="单词不存在")

    # 如果已在错词本且未移除，直接返回
    existing = db.query(WrongWord).filter(
        WrongWord.user_id == add.user_id,
        WrongWord.word_id == add.word_id,
        WrongWord.removed_at.is_(None)
    ).first()
    if existing:
        return {"status": "already_in_wrong_words", "word_id": add.word_id}

    entry = WrongWord(
        user_id=add.user_id,
        word_id=add.word_id,
    )
    db.add(entry)
    db.commit()
    return {"status": "added", "word_id": add.word_id}


@router.delete("/wrong-words/{word_id}", response_model=dict)
def remove_from_wrong_words(word_id: int, user_id: str, db: Session = Depends(get_db)):
    """从错词本移除。"""
    entry = db.query(WrongWord).filter(
        WrongWord.user_id == user_id,
        WrongWord.word_id == word_id,
        WrongWord.removed_at.is_(None)
    ).first()
    if not entry:
        raise HTTPException(status_code=404, detail="错词本中不存在该单词")

    entry.removed_at = datetime.utcnow()
    db.commit()
    return {"status": "removed", "word_id": word_id}
