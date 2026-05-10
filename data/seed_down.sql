-- Gina 学英语词库种子数据
-- 生成时间：2026-05-09 15:41:12
-- 词数：48

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
    ('zoo', '/zuː/', 'n.', '动物园', 'We go to the zoo.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('elephant', '/ˈelɪfənt/', 'n.', '大象', 'The elephant is big.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('monkey', '/ˈmʌŋki/', 'n.', '猴子', 'The monkey is small.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('tiger', '/ˈtaɪɡə(r)/', 'n.', '老虎', 'The tiger is strong.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('lion', '/ˈlaɪən/', 'n.', '狮子', 'The lion is tall.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bird', '/bɜːd/', 'n.', '鸟', 'The bird can fly.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('cat', '/kæt/', 'n.', '猫', 'The cat is cute.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('dog', '/dɒɡ/', 'n.', '狗', 'The dog is friendly.', 'Unit 1 At the Zoo', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('food', '/fuːd/', 'n.', '食物', 'I like food.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('rice', '/raɪs/', 'n.', '米饭', 'I eat rice.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('noodles', '/ˈnuːdlz/', 'n.', '面条', 'I like noodles.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('fish', '/fɪʃ/', 'n.', '鱼', 'The fish is yummy.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('meat', '/miːt/', 'n.', '肉', 'I eat meat.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('egg', '/eɡ/', 'n.', '鸡蛋', 'I have an egg.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('milk', '/mɪlk/', 'n.', '牛奶', 'I drink milk.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bread', '/bred/', 'n.', '面包', 'I eat bread.', 'Unit 2 My Favourite Food', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('school', '/skuːl/', 'n.', '学校', 'I go to school.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('classroom', '/ˈklɑːsruːm/', 'n.', '教室', 'This is my classroom.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('teacher', '/ˈtiːtʃə(r)/', 'n.', '老师', 'The teacher is kind.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('friend', '/frend/', 'n.', '朋友', 'My friend is nice.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('book', '/bʊk/', 'n.', '书', 'I read a book.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('pen', '/pen/', 'n.', '钢笔', 'I have a pen.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('bag', '/bæɡ/', 'n.', '书包', 'My bag is new.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('desk', '/desk/', 'n.', '课桌', 'I sit at the desk.', 'Unit 3 My School', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('play', '/pleɪ/', 'v.', '玩', 'Let''s play together.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('ball', '/bɔːl/', 'n.', '球', 'I have a ball.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('kite', '/kaɪt/', 'n.', '风筝', 'I fly a kite.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('run', '/rʌn/', 'v.', '跑', 'I can run fast.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('jump', '/dʒʌmp/', 'v.', '跳', 'I can jump high.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('sing', '/sɪŋ/', 'v.', '唱', 'I like to sing.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('dance', '/dɑːns/', 'v.', '跳舞', 'I can dance.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('happy', '/ˈhæpi/', 'adj.', '开心的', 'I am happy.', 'Unit 4 Let''s Play', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('family', '/ˈfæməli/', 'n.', '家庭', 'I love my family.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('father', '/ˈfɑːðə(r)/', 'n.', '爸爸', 'My father is tall.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('mother', '/ˈmʌðə(r)/', 'n.', '妈妈', 'My mother is kind.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('brother', '/ˈbrʌðə(r)/', 'n.', '哥哥/弟弟', 'My brother is fun.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('sister', '/ˈsɪstə(r)/', 'n.', '姐姐/妹妹', 'My sister is nice.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('baby', '/ˈbeɪbi/', 'n.', '宝宝', 'The baby is cute.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('grandpa', '/ˈɡrænpɑː/', 'n.', '爷爷/外公', 'My grandpa is old.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('grandma', '/ˈɡrænmɑː/', 'n.', '奶奶/外婆', 'My grandma is kind.', 'Unit 5 My Family', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('day', '/deɪ/', 'n.', '天', 'It is a good day.', 'Unit 6 My Day', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('morning', '/ˈmɔːnɪŋ/', 'n.', '早上', 'Good morning!', 'Unit 6 My Day', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('afternoon', '/ˌɑːftəˈnuːn/', 'n.', '下午', 'Good afternoon!', 'Unit 6 My Day', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('eat', '/iːt/', 'v.', '吃', 'I eat breakfast.', 'Unit 6 My Day', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('sleep', '/sliːp/', 'v.', '睡觉', 'I sleep at night.', 'Unit 6 My Day', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('play', '/pleɪ/', 'v.', '玩', 'I play games.', 'Unit 6 My Day', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('read', '/riːd/', 'v.', '读', 'I read books.', 'Unit 6 My Day', '二年级', '下册');
INSERT INTO word_list (word, phonetic, pos, meaning, example, unit, grade, level) VALUES
    ('go', '/ɡəʊ/', 'v.', '去', 'I go to school.', 'Unit 6 My Day', '二年级', '下册');
