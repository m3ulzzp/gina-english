from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.database import Base


class Word(Base):
    """词库表 — 沪教版二年级下册单词"""
    __tablename__ = "words"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    word = Column(String, unique=True, index=True, nullable=False)
    phonetic = Column(String, nullable=True)
    part_of_speech = Column(String, nullable=True)
    chinese_meaning = Column(Text, nullable=True)
    example_sentence = Column(Text, nullable=True)
    grade = Column(Integer, nullable=False, default=2)
    book = Column(Integer, nullable=False, default=2)  # 1=上, 2=下
    unit = Column(Integer, nullable=False, default=1)
    image_url = Column(String, nullable=True)
    audio_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    progress = relationship("UserProgress", back_populates="word", cascade="all, delete-orphan")
    wrong_entries = relationship("WrongWord", back_populates="word", cascade="all, delete-orphan")


class UserProgress(Base):
    """用户复习进度表 — SM-2 算法"""
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    word_id = Column(Integer, ForeignKey("words.id"), nullable=False)
    ease_factor = Column(Float, default=2.5)  # SM-2 难易系数
    interval = Column(Integer, default=0)  # 复习间隔（天）
    repetitions = Column(Integer, default=0)  # 连续正确次数
    next_review = Column(DateTime, nullable=True)  # 下次复习时间
    last_review = Column(DateTime, nullable=True)  # 上次复习时间
    status = Column(String, default="new")  # new / learning / graduated

    word = relationship("Word", back_populates="progress")


class WrongWord(Base):
    """错词本表"""
    __tablename__ = "wrong_words"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=False)
    word_id = Column(Integer, ForeignKey("words.id"), nullable=False)
    added_at = Column(DateTime, default=datetime.utcnow)
    removed_at = Column(DateTime, nullable=True)  # NULL = 仍在错词本

    word = relationship("Word", back_populates="wrong_entries")
