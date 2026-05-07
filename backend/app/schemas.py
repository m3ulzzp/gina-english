from pydantic import BaseModel
from datetime import datetime
from typing import Optional


# ============ Word ============

class WordBase(BaseModel):
    word: str
    phonetic: Optional[str] = None
    part_of_speech: Optional[str] = None
    chinese_meaning: Optional[str] = None
    example_sentence: Optional[str] = None
    grade: int = 2
    book: int = 2
    unit: int = 1
    image_url: Optional[str] = None


class WordCreate(WordBase):
    pass


class WordDetail(WordBase):
    id: int
    audio_url: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


# ============ Progress ============

class ProgressUpdate(BaseModel):
    user_id: str
    word_id: int
    quality: int  # 0-5, 用户回忆质量评分


class ProgressQueue(BaseModel):
    new_words: list[WordDetail] = []
    review_words: list[WordDetail] = []
    total_new: int = 0
    total_review: int = 0

    model_config = {"from_attributes": True}


# ============ WrongWord ============

class WrongWordEntry(BaseModel):
    id: int
    word: WordDetail
    added_at: datetime

    model_config = {"from_attributes": True}


class WrongWordAdd(BaseModel):
    user_id: str
    word_id: int
