#!/usr/bin/env python3
"""词库导入脚本 — 苗整理好词表后运行此脚本导入数据。

使用方法：
1. 将沪教版二年级下册词表数据填入 WORDS 列表
2. 运行: python3 seed.py

词表格式参考：
    WORDS = [
        {"word": "apple", "phonetic": "/ˈæp.l/", "part_of_speech": "n.",
         "chinese_meaning": "苹果", "example_sentence": "I like apples.",
         "grade": 2, "book": 2, "unit": 1},
        ...
    ]
"""

import sys
import os

# 添加项目根目录到 path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import engine, SessionLocal, Base
from app.models import Word

# ============================================================
# 词表数据 — 沪教版二年级下册（47 个核心词汇）
# ============================================================
WORDS = [
    # Unit 1 At the Zoo
    {"word": "zoo", "phonetic": "/zuː/", "part_of_speech": "n.", "chinese_meaning": "动物园", "example_sentence": "We go to the zoo.", "grade": 2, "book": 2, "unit": 1},
    {"word": "elephant", "phonetic": "/ˈelɪfənt/", "part_of_speech": "n.", "chinese_meaning": "大象", "example_sentence": "The elephant is big.", "grade": 2, "book": 2, "unit": 1},
    {"word": "monkey", "phonetic": "/ˈmʌŋki/", "part_of_speech": "n.", "chinese_meaning": "猴子", "example_sentence": "The monkey is small.", "grade": 2, "book": 2, "unit": 1},
    {"word": "tiger", "phonetic": "/ˈtaɪɡə(r)/", "part_of_speech": "n.", "chinese_meaning": "老虎", "example_sentence": "The tiger is strong.", "grade": 2, "book": 2, "unit": 1},
    {"word": "lion", "phonetic": "/ˈlaɪən/", "part_of_speech": "n.", "chinese_meaning": "狮子", "example_sentence": "The lion is tall.", "grade": 2, "book": 2, "unit": 1},
    {"word": "bird", "phonetic": "/bɜːd/", "part_of_speech": "n.", "chinese_meaning": "鸟", "example_sentence": "The bird can fly.", "grade": 2, "book": 2, "unit": 1},
    {"word": "cat", "phonetic": "/kæt/", "part_of_speech": "n.", "chinese_meaning": "猫", "example_sentence": "The cat is cute.", "grade": 2, "book": 2, "unit": 1},
    {"word": "dog", "phonetic": "/dɒɡ/", "part_of_speech": "n.", "chinese_meaning": "狗", "example_sentence": "The dog is friendly.", "grade": 2, "book": 2, "unit": 1},
    # Unit 2 My Favourite Food
    {"word": "food", "phonetic": "/fuːd/", "part_of_speech": "n.", "chinese_meaning": "食物", "example_sentence": "I like food.", "grade": 2, "book": 2, "unit": 2},
    {"word": "rice", "phonetic": "/raɪs/", "part_of_speech": "n.", "chinese_meaning": "米饭", "example_sentence": "I eat rice.", "grade": 2, "book": 2, "unit": 2},
    {"word": "noodles", "phonetic": "/ˈnuːdlz/", "part_of_speech": "n.", "chinese_meaning": "面条", "example_sentence": "I like noodles.", "grade": 2, "book": 2, "unit": 2},
    {"word": "fish", "phonetic": "/fɪʃ/", "part_of_speech": "n.", "chinese_meaning": "鱼", "example_sentence": "The fish is yummy.", "grade": 2, "book": 2, "unit": 2},
    {"word": "meat", "phonetic": "/miːt/", "part_of_speech": "n.", "chinese_meaning": "肉", "example_sentence": "I eat meat.", "grade": 2, "book": 2, "unit": 2},
    {"word": "egg", "phonetic": "/eɡ/", "part_of_speech": "n.", "chinese_meaning": "鸡蛋", "example_sentence": "I have an egg.", "grade": 2, "book": 2, "unit": 2},
    {"word": "milk", "phonetic": "/mɪlk/", "part_of_speech": "n.", "chinese_meaning": "牛奶", "example_sentence": "I drink milk.", "grade": 2, "book": 2, "unit": 2},
    {"word": "bread", "phonetic": "/bred/", "part_of_speech": "n.", "chinese_meaning": "面包", "example_sentence": "I eat bread.", "grade": 2, "book": 2, "unit": 2},
    # Unit 3 My School
    {"word": "school", "phonetic": "/skuːl/", "part_of_speech": "n.", "chinese_meaning": "学校", "example_sentence": "I go to school.", "grade": 2, "book": 2, "unit": 3},
    {"word": "classroom", "phonetic": "/ˈklɑːsruːm/", "part_of_speech": "n.", "chinese_meaning": "教室", "example_sentence": "This is my classroom.", "grade": 2, "book": 2, "unit": 3},
    {"word": "teacher", "phonetic": "/ˈtiːtʃə(r)/", "part_of_speech": "n.", "chinese_meaning": "老师", "example_sentence": "The teacher is kind.", "grade": 2, "book": 2, "unit": 3},
    {"word": "friend", "phonetic": "/frend/", "part_of_speech": "n.", "chinese_meaning": "朋友", "example_sentence": "My friend is nice.", "grade": 2, "book": 2, "unit": 3},
    {"word": "book", "phonetic": "/bʊk/", "part_of_speech": "n.", "chinese_meaning": "书", "example_sentence": "I read a book.", "grade": 2, "book": 2, "unit": 3},
    {"word": "pen", "phonetic": "/pen/", "part_of_speech": "n.", "chinese_meaning": "钢笔", "example_sentence": "I have a pen.", "grade": 2, "book": 2, "unit": 3},
    {"word": "bag", "phonetic": "/bæɡ/", "part_of_speech": "n.", "chinese_meaning": "书包", "example_sentence": "My bag is new.", "grade": 2, "book": 2, "unit": 3},
    {"word": "desk", "phonetic": "/desk/", "part_of_speech": "n.", "chinese_meaning": "课桌", "example_sentence": "I sit at the desk.", "grade": 2, "book": 2, "unit": 3},
    # Unit 4 Let's Play
    {"word": "play", "phonetic": "/pleɪ/", "part_of_speech": "v.", "chinese_meaning": "玩", "example_sentence": "Let's play together.", "grade": 2, "book": 2, "unit": 4},
    {"word": "ball", "phonetic": "/bɔːl/", "part_of_speech": "n.", "chinese_meaning": "球", "example_sentence": "I have a ball.", "grade": 2, "book": 2, "unit": 4},
    {"word": "kite", "phonetic": "/kaɪt/", "part_of_speech": "n.", "chinese_meaning": "风筝", "example_sentence": "I fly a kite.", "grade": 2, "book": 2, "unit": 4},
    {"word": "run", "phonetic": "/rʌn/", "part_of_speech": "v.", "chinese_meaning": "跑", "example_sentence": "I can run fast.", "grade": 2, "book": 2, "unit": 4},
    {"word": "jump", "phonetic": "/dʒʌmp/", "part_of_speech": "v.", "chinese_meaning": "跳", "example_sentence": "I can jump high.", "grade": 2, "book": 2, "unit": 4},
    {"word": "sing", "phonetic": "/sɪŋ/", "part_of_speech": "v.", "chinese_meaning": "唱", "example_sentence": "I like to sing.", "grade": 2, "book": 2, "unit": 4},
    {"word": "dance", "phonetic": "/dɑːns/", "part_of_speech": "v.", "chinese_meaning": "跳舞", "example_sentence": "I can dance.", "grade": 2, "book": 2, "unit": 4},
    {"word": "happy", "phonetic": "/ˈhæpi/", "part_of_speech": "adj.", "chinese_meaning": "开心的", "example_sentence": "I am happy.", "grade": 2, "book": 2, "unit": 4},
    # Unit 5 My Family
    {"word": "family", "phonetic": "/ˈfæməli/", "part_of_speech": "n.", "chinese_meaning": "家庭", "example_sentence": "I love my family.", "grade": 2, "book": 2, "unit": 5},
    {"word": "father", "phonetic": "/ˈfɑːðə(r)/", "part_of_speech": "n.", "chinese_meaning": "爸爸", "example_sentence": "My father is tall.", "grade": 2, "book": 2, "unit": 5},
    {"word": "mother", "phonetic": "/ˈmʌðə(r)/", "part_of_speech": "n.", "chinese_meaning": "妈妈", "example_sentence": "My mother is kind.", "grade": 2, "book": 2, "unit": 5},
    {"word": "brother", "phonetic": "/ˈbrʌðə(r)/", "part_of_speech": "n.", "chinese_meaning": "哥哥/弟弟", "example_sentence": "My brother is fun.", "grade": 2, "book": 2, "unit": 5},
    {"word": "sister", "phonetic": "/ˈsɪstə(r)/", "part_of_speech": "n.", "chinese_meaning": "姐姐/妹妹", "example_sentence": "My sister is nice.", "grade": 2, "book": 2, "unit": 5},
    {"word": "baby", "phonetic": "/ˈbeɪbi/", "part_of_speech": "n.", "chinese_meaning": "宝宝", "example_sentence": "The baby is cute.", "grade": 2, "book": 2, "unit": 5},
    {"word": "grandpa", "phonetic": "/ˈɡrænpɑː/", "part_of_speech": "n.", "chinese_meaning": "爷爷/外公", "example_sentence": "My grandpa is old.", "grade": 2, "book": 2, "unit": 5},
    {"word": "grandma", "phonetic": "/ˈɡrænmɑː/", "part_of_speech": "n.", "chinese_meaning": "奶奶/外婆", "example_sentence": "My grandma is kind.", "grade": 2, "book": 2, "unit": 5},
    # Unit 6 My Day
    {"word": "day", "phonetic": "/deɪ/", "part_of_speech": "n.", "chinese_meaning": "天", "example_sentence": "It is a good day.", "grade": 2, "book": 2, "unit": 6},
    {"word": "morning", "phonetic": "/ˈmɔːnɪŋ/", "part_of_speech": "n.", "chinese_meaning": "早上", "example_sentence": "Good morning!", "grade": 2, "book": 2, "unit": 6},
    {"word": "afternoon", "phonetic": "/ˌɑːftəˈnuːn/", "part_of_speech": "n.", "chinese_meaning": "下午", "example_sentence": "Good afternoon!", "grade": 2, "book": 2, "unit": 6},
    {"word": "play", "phonetic": "/pleɪ/", "part_of_speech": "v.", "chinese_meaning": "玩", "example_sentence": "Let's play after school.", "grade": 2, "book": 2, "unit": 6},
    {"word": "eat", "phonetic": "/iːt/", "part_of_speech": "v.", "chinese_meaning": "吃", "example_sentence": "I eat breakfast.", "grade": 2, "book": 2, "unit": 6},
    {"word": "sleep", "phonetic": "/sliːp/", "part_of_speech": "v.", "chinese_meaning": "睡觉", "example_sentence": "I sleep at night.", "grade": 2, "book": 2, "unit": 6},
    {"word": "read", "phonetic": "/riːd/", "part_of_speech": "v.", "chinese_meaning": "读", "example_sentence": "I read books.", "grade": 2, "book": 2, "unit": 6},
    {"word": "go", "phonetic": "/ɡəʊ/", "part_of_speech": "v.", "chinese_meaning": "去", "example_sentence": "I go to school.", "grade": 2, "book": 2, "unit": 6},
]


def init_db():
    """创建数据库表"""
    Base.metadata.create_all(bind=engine)
    print("✅ 数据库表已创建")


def seed_words():
    """导入词表数据"""
    if not WORDS:
        print("⚠️  WORDS 列表为空，请填入词表数据后再运行")
        return

    db: Session = SessionLocal()
    count = 0
    skipped = 0

    for word_data in WORDS:
        existing = db.query(Word).filter(Word.word == word_data["word"]).first()
        if existing:
            skipped += 1
            continue

        word = Word(**word_data)
        db.add(word)
        count += 1

    db.commit()
    db.close()

    print(f"✅ 导入 {count} 个单词")
    if skipped:
        print(f"⏭️  跳过 {skipped} 个重复单词")


if __name__ == "__main__":
    init_db()
    seed_words()
