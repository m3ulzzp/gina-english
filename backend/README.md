# Gina 学英语后端

FastAPI + SQLAlchemy + SQLite

## 快速开始

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
python3 seed.py  # 导入词库数据
```

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/words` | 查询单词 |
| POST | `/api/progress` | 更新复习进度 |
| GET | `/api/progress/queue` | 获取学习队列 |
| GET | `/api/wrong-words` | 获取错词本 |
| POST | `/api/wrong-words` | 加入错词本 |
| DELETE | `/api/wrong-words/:id` | 移除错词 |
| GET | `/api/health` | 健康检查 |
