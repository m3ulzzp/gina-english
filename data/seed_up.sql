-- Gina 学英语词库种子数据
-- 生成时间：2026-05-09 15:41:12
-- 词数：99

CREATE TABLE IF NOT EXISTS word_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    word TEXT NOT NULL,
    phonetic TEXT,
    pos TEXT,
    meaning TEXT NOT NULL,
    example TEXT,
    unit TEXT,
    grade TEXT,
    level TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('hello', 'None', 'None', '你好', 'None', 'Unit 1 Hello', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('hi', 'None', 'None', '嗨', 'None', 'Unit 1 Hello', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('good', 'None', 'None', '好的', 'None', 'Unit 1 Hello', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('morning', 'None', 'None', '早上', 'None', 'Unit 1 Hello', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('afternoon', 'None', 'None', '下午', 'None', 'Unit 1 Hello', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('evening', 'None', 'None', '晚上', 'None', 'Unit 1 Hello', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('goodbye', 'None', 'None', '再见', 'None', 'Unit 1 Hello', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('eye', 'None', 'None', '眼睛', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('ear', 'None', 'None', '耳朵', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('nose', 'None', 'None', '鼻子', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('mouth', 'None', 'None', '嘴巴', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('face', 'None', 'None', '脸', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('head', 'None', 'None', '头', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('hair', 'None', 'None', '头发', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('hand', 'None', 'None', '手', 'None', 'Unit 2 My body', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('room', 'None', 'None', '房间', 'None', 'Unit 3 My room', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('desk', 'None', 'None', '书桌', 'None', 'Unit 3 My room', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('chair', 'None', 'None', '椅子', 'None', 'Unit 3 My room', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bed', 'None', 'None', '床', 'None', 'Unit 3 My room', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('book', 'None', 'None', '书', 'None', 'Unit 3 My room', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bag', 'None', 'None', '书包', 'None', 'Unit 3 My room', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('box', 'None', 'None', '盒子', 'None', 'Unit 3 My room', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('boy', 'None', 'None', '男孩', 'None', 'Unit 4 My classmates', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('girl', 'None', 'None', '女孩', 'None', 'Unit 4 My classmates', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('I', 'None', 'None', '我', 'None', 'Unit 4 My classmates', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('you', 'None', 'None', '你', 'None', 'Unit 4 My classmates', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('he', 'None', 'None', '他', 'None', 'Unit 4 My classmates', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('she', 'None', 'None', '她', 'None', 'Unit 4 My classmates', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('father', 'None', 'None', '爸爸', 'None', 'Unit 5 My family', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('mother', 'None', 'None', '妈妈', 'None', 'Unit 5 My family', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('brother', 'None', 'None', '哥哥/弟弟', 'None', 'Unit 5 My family', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('sister', 'None', 'None', '姐姐/妹妹', 'None', 'Unit 5 My family', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('grandpa', 'None', 'None', '爷爷/外公', 'None', 'Unit 5 My family', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('grandma', 'None', 'None', '奶奶/外婆', 'None', 'Unit 5 My family', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('tall', 'None', 'None', '高的', 'None', 'Unit 6 Me', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('short', 'None', 'None', '矮的', 'None', 'Unit 6 Me', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('fat', 'None', 'None', '胖的', 'None', 'Unit 6 Me', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('thin', 'None', 'None', '瘦的', 'None', 'Unit 6 Me', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('big', 'None', 'None', '大的', 'None', 'Unit 6 Me', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('small', 'None', 'None', '小的', 'None', 'Unit 6 Me', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('rice', 'None', 'None', '米饭', 'None', 'Unit 7 My favourite food', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('egg', 'None', 'None', '鸡蛋', 'None', 'Unit 7 My favourite food', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bread', 'None', 'None', '面包', 'None', 'Unit 7 My favourite food', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('milk', 'None', 'None', '牛奶', 'None', 'Unit 7 My favourite food', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('fish', 'None', 'None', '鱼', 'None', 'Unit 7 My favourite food', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('chicken', 'None', 'None', '鸡肉', 'None', 'Unit 7 My favourite food', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('juice', 'None', 'None', '果汁', 'None', 'Unit 7 My favourite food', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('run', 'None', 'None', '跑', 'None', 'Unit 8 Playtime', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('jump', 'None', 'None', '跳', 'None', 'Unit 8 Playtime', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('skip', 'None', 'None', '跳绳', 'None', 'Unit 8 Playtime', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('swim', 'None', 'None', '游泳', 'None', 'Unit 8 Playtime', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('ride', 'None', 'None', '骑', 'None', 'Unit 8 Playtime', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('fly', 'None', 'None', '飞', 'None', 'Unit 8 Playtime', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('red', 'None', 'None', '红色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('yellow', 'None', 'None', '黄色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('blue', 'None', 'None', '蓝色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('green', 'None', 'None', '绿色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('black', 'None', 'None', '黑色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('white', 'None', 'None', '白色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('orange', 'None', 'None', '橙色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('brown', 'None', 'None', '棕色', 'None', 'Unit 1 Colours', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('ball', 'None', 'None', '球', 'None', 'Unit 2 Toys', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('doll', 'None', 'None', '娃娃', 'None', 'Unit 2 Toys', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('kite', 'None', 'None', '风筝', 'None', 'Unit 2 Toys', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bike', 'None', 'None', '自行车', 'None', 'Unit 2 Toys', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('robot', 'None', 'None', '机器人', 'None', 'Unit 2 Toys', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('car', 'None', 'None', '小汽车', 'None', 'Unit 2 Toys', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('sunny', 'None', 'None', '晴朗的', 'None', 'Unit 3 Weather', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('rainy', 'None', 'None', '下雨的', 'None', 'Unit 3 Weather', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('windy', 'None', 'None', '有风的', 'None', 'Unit 3 Weather', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('cloudy', 'None', 'None', '多云的', 'None', 'Unit 3 Weather', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('hot', 'None', 'None', '热的', 'None', 'Unit 3 Weather', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('cold', 'None', 'None', '冷的', 'None', 'Unit 3 Weather', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('warm', 'None', 'None', '温暖的', 'None', 'Unit 3 Weather', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('spring', 'None', 'None', '春天', 'None', 'Unit 4 Seasons', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('summer', 'None', 'None', '夏天', 'None', 'Unit 4 Seasons', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('autumn', 'None', 'None', '秋天', 'None', 'Unit 4 Seasons', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('winter', 'None', 'None', '冬天', 'None', 'Unit 4 Seasons', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('coat', 'None', 'None', '外套', 'None', 'Unit 5 Clothes', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('dress', 'None', 'None', '连衣裙', 'None', 'Unit 5 Clothes', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('skirt', 'None', 'None', '短裙', 'None', 'Unit 5 Clothes', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('shirt', 'None', 'None', '衬衫', 'None', 'Unit 5 Clothes', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('shoe', 'None', 'None', '鞋子', 'None', 'Unit 5 Clothes', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('water', 'None', 'None', '水', 'None', 'Unit 6 Drinks', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('tea', 'None', 'None', '茶', 'None', 'Unit 6 Drinks', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('milk', 'None', 'None', '牛奶', 'None', 'Unit 6 Drinks', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('juice', 'None', 'None', '果汁', 'None', 'Unit 6 Drinks', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('cola', 'None', 'None', '可乐', 'None', 'Unit 6 Drinks', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('cat', 'None', 'None', '猫', 'None', 'Unit 7 Animals', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('dog', 'None', 'None', '狗', 'None', 'Unit 7 Animals', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bird', 'None', 'None', '小鸟', 'None', 'Unit 7 Animals', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('panda', 'None', 'None', '熊猫', 'None', 'Unit 7 Animals', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('tiger', 'None', 'None', '老虎', 'None', 'Unit 7 Animals', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('monkey', 'None', 'None', '猴子', 'None', 'Unit 7 Animals', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('morning', 'None', 'None', '早上', 'None', 'Unit 8 Time', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('afternoon', 'None', 'None', '下午', 'None', 'Unit 8 Time', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('evening', 'None', 'None', '傍晚', 'None', 'Unit 8 Time', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('night', 'None', 'None', '夜晚', 'None', 'Unit 8 Time', '二年级', '上册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('time', 'None', 'None', '时间', 'None', 'Unit 8 Time', '二年级', '上册');
