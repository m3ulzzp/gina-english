# Gina 学英语 — 项目日报

**日期：** 2026-05-06（周三）
**负责人：** Mr王
**项目：** Gina 学英语（沪教版二年级下册同步背词工具）

---

## 今日完成

### 1. 产品方案确定
- 产品名：**Gina 学英语**
- 定位：学习工具（非教育机构），走工具路线避开教育资质
- 目标用户：沪教版二年级下册学生
- 产品形态：H5 网页版（零安装，浏览器打开即用）
- MVP 范围：卡片背词 + SM-2 复习算法 + 错词本

### 2. 词表整理
- 整理沪教版二年级下册词表，共 **48 个核心词汇**
- 覆盖 6 个单元（Unit 1-6）
- 每个词包含：单词、音标、词性、中文释义、例句
- 数据来源：AI 生成初稿，建议后续对照橙篇 AI 核对

### 3. 项目搭建
- 技术栈：React + Vite（最快搭建方案）
- 零后端架构：所有数据存储在浏览器 localStorage
- 发音方案：Web Speech API（免费）
- 部署：Vercel（免费域名 .vercel.app）

### 4. 核心代码开发
- ✅ 词表数据模块（6 个单元 48 词）
- ✅ 卡片背词组件（翻转、发音、导航）
- ✅ SM-2 复习算法
- ✅ 错词本功能
- ✅ 学习统计模块
- ✅ 响应式样式（移动端适配）
- ✅ npm install 完成
- ✅ build 通过

### 5. 项目文件清单
```
gina-english/
├── src/
│   ├── components/
│   │   ├── Card.jsx          # 卡片组件
│   │   ├── Stats.jsx         # 统计组件
│   │   └── WrongWordList.jsx # 错词本组件
│   ├── data/
│   │   └── words.js          # 词表数据
│   ├── utils/
│   │   ├── sm2.js            # SM-2 复习算法
│   │   └── storage.js        # localStorage 封装
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## 项目状态

| 模块 | 状态 |
|---|---|
| 词表数据 | ✅ 完成（待核对） |
| 前端代码 | ✅ 完成 |
| 复习算法 | ✅ 完成 |
| 部署 | ⏳ 待 Thomas 提供 Vercel 账号 |

---

## 待办事项

| 事项 | 负责人 | 优先级 |
|---|---|---|
| Vercel 部署上线 | Thomas | P0 |
| 词表数据核对（对照橙篇 AI） | Miss苗 | P1 |
| 功能测试验证 | Mr王 | P0 |
| 后续迭代（配图/打卡/小程序） | 全员 | P2 |

---

## 技术要点

- **零后端**：纯静态前端，数据存在浏览器 localStorage
- **成本**：几乎零成本（Vercel 免费 + Web Speech API 免费）
- **部署**：`vercel deploy --prod` 一条命令上线
- **数据格式**：每个词包含 word / phonetic / pos / meaning / example / unit

---

## 风险

1. **词表准确性**：AI 生成初稿，需对照教材核对
2. **部署依赖**：需要 Thomas 提供 Vercel 账号
3. **数据持久化**：localStorage 数据随浏览器清除，后续需考虑云端同步

---

_最后更新：2026-05-06_
