# Gina 学英语

沪教版小学英语同步背词工具。

## 技术栈

- **前端**: React 19 + TypeScript + Vite + Zustand + TailwindCSS v4
- **后端**: FastAPI + SQLAlchemy + SQLite
- **算法**: SM-2 间隔重复算法

## 目录结构

```
gina-english/
├── src/                    # 前端源码
│   ├── components/         # 组件（WordCard, Header）
│   ├── pages/              # 页面（Home, WordCard, Spelling, WrongBook）
│   ├── store/              # Zustand store
│   ├── utils/              # 工具函数（speech, sm2）
│   ├── data/               # 词库数据（words.ts）
│   └── assets/             # 静态资源
├── public/                 # 静态资源（favicon, icons）
├── docs/                   # 项目文档
├── legacy/                 # 旧 JSX 版本（参考用）
└── package.json

gina-english-backend/
├── app/
│   ├── routers/            # API 路由（words, progress, wrong_words）
│   ├── models.py           # SQLAlchemy 模型
│   ├── schemas.py          # Pydantic schemas
│   ├── database.py         # 数据库配置
│   └── main.py             # FastAPI 入口
├── seed.py                 # 词库导入脚本
├── requirements.txt        # Python 依赖
└── README.md
```

## 快速开始

### 前端

```bash
cd gina-english
npm install
npm run dev    # 开发服务器 (localhost:5173)
npm run build  # 生产构建
npm run preview # 预览构建结果
```

### 后端

```bash
cd gina-english-backend
pip install -r requirements.txt
uvicorn app.main:app --reload    # 开发服务器 (localhost:8000)
python3 seed.py                  # 导入词库数据
```

## 功能模块

| 模块 | 路由 | 说明 |
|------|------|------|
| 首页 | `/` | 年级选择、学习统计 |
| 卡片背词 | `/wordcard` | 翻转卡片学习 |
| 拼写练习 | `/spelling` | 听音拼词 |
| 错词本 | `/wrongbook` | SM-2 复习 |

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

## 团队分工

- **Mr.王**: 项目管理、代码审核、最终审核
- **Miss白**: 后端开发、API 设计、数据库
- **Miss苗**: 词表数据整理、教材核对
- **Thomas**: 部署上线、产品决策

## 许可证

Private Project
