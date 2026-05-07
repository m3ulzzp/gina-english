from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.models import Word
from app.schemas import WordDetail, WordCreate

router = APIRouter()


@router.get("/words", response_model=List[WordDetail])
def get_words(unit: Optional[int] = None, grade: Optional[int] = None, book: Optional[int] = None, db: Session = Depends(get_db)):
    """按条件查询单词。unit/book/grade 均为可选过滤。"""
    query = db.query(Word)
    if unit is not None:
        query = query.filter(Word.unit == unit)
    if grade is not None:
        query = query.filter(Word.grade == grade)
    if book is not None:
        query = query.filter(Word.book == book)
    return query.order_by(Word.unit, Word.word).all()


@router.get("/words/{word_id}", response_model=WordDetail)
def get_word(word_id: int, db: Session = Depends(get_db)):
    word = db.query(Word).filter(Word.id == word_id).first()
    if not word:
        raise HTTPException(status_code=404, detail="单词不存在")
    return word


@router.post("/words", response_model=WordDetail, status_code=201)
def create_word(word: WordCreate, db: Session = Depends(get_db)):
    """导入词库数据用。word 字段不能重复。"""
    existing = db.query(Word).filter(Word.word == word.word).first()
    if existing:
        raise HTTPException(status_code=409, detail=f"单词 '{word.word}' 已存在")
    db_word = Word(**word.model_dump())
    db.add(db_word)
    db.commit()
    db.refresh(db_word)
    return db_word
