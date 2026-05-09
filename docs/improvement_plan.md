# Gina 学英语：从 MVP 到专业化产品的重构路线图

## 📋 项目概况 (Project Overview)
本项目旨在将当前的“Gina 学英语”原型（MVP）升级为一个具备完整功能、高可用性、且支持多端同步的专业级移动 Web 应用。

### 核心目标
- **提升用户体验**：从简单的网页展示转向丝滑的 App 交互感。
- **实现数据闭环**：利用 Cloudflare D1 实现学习进度在手机与电脑端的无缝同步。
    
---

## 🛠️ 技术架构重构 (Technical Architecture)

### 1. 前端层 (Frontend) - 基于 Cloudflare Pages
- **框架**: React 19 + Vite
- **样式方案**: Tailwind CSS v4 + `shadcn/ui` 设计规范（追求极致的干净、专业感）
- **交互增强**: 集成 `Framer Motion` 实现卡片滑入、点击反馈及页面转场动画
- **离线能力**: 配置 **PWA (Progressive Web App)**，支持桌面快捷方式安装及弱网/离线模式学习

### 2. 后端与数据层 (Backend & Data) - 基于 Cloudflare 全家桶
- **API 引擎**: Cloudflare Pages Functions (基于 Runtime: Workerd)
- **数据库**: **Cloudflare D1 (SQL)** —— 用于存储用户身份、词库索引、学习进度及错题记录
- **静态资源/图片**: 使用 Cloudflare R2 或 CDN 优化，配合免费图片 API 实现卡片配图

---

## 🚀 实施阶段路线图 (Roadmap)

### 🏁 Phase 0: 基础设施与数据初始化 (Infrastructure & Data)
**目标：建立稳定的数据底座。**
- [ ] **词库自动化迁移**：编写解析脚本，将 `沪教牛津版` Markdown 文档转换为结构化 JSON 并注入 D1 数据库。
- [ ] **环境标准化**：统一使用 `wrangler.jsonc` 配置部署环境，清理冗余的 `vercel.json`。
- [ ] **API 基础搭建**：实现简单的 `GET /words` 和 `POST /progress` 接口。

### 🎨 Phase 1: UI/UX 重构与核心功能落地 (Core & UI)
**目标：实现“专业化”视觉感与 SM-表现。**
- [ ] **设计系统建立**：定义统一的品牌色、字阶、间距规范（基于 Tailwind）。
- [ ] **卡片组件重构**：使用 `Framer Motion` 实现单词卡片的翻转、滑动及进入动画。
   - 引入 `Lucide React` 图标库，提升视觉精致度。
- [ ] **SM-2 算法落地**：在前端/后端实现基于间隔重复的逻辑，确保错题本（WrongBook）能按计划调度复习。

### 📈 Phase 2: 功能增强与体验优化 (Optimization)
**目标：完善功能闭环，提升用户留存。**
- [ ] **PWA 集成**：配置 `manifest.json` 和 Service Worker，实现离线学习能力。
- [ ] **数据同步逻辑**：实现多设备登录后的进度自动拉取与合并。
- [ ] **家长端/统计面板**：在首页增加直观的学习周报、完成度图表。

---

## ⚠️ 待决策清单 (Decision Log)
*请用户针对以下问题进行最终确认，以便进入 Phase 0 开发：*

1.  **数据规模**：是否仅处理二年级词表？后续是否预留其他年级的扩展接口？
2.  **身份认证强度**：是采用轻量化的 Token 方案（方便快速登录），还是需要完整的 OAuth/Email 登录？
3.  **图片策略**：坚持使用 Emoji + 免费 API，还是考虑引入更重的 AI 生成图方案？

---
**文档版本**: v1.0 (Final Draft)
**最后更新日期**: 2026-05-08
**维护人**: Mr. Wang (via OpenClaw)