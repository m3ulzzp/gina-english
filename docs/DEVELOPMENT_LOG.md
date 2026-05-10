# Gina 学英语 - 开发日志

## 2026-05-10 (周日) - 最新进展

### ✅ 已解决：配图显示问题

**问题**: WordCard 正面只显示 emoji，没有显示配图。

**解决方案**: 在 WordCard.tsx 中添加了 `<img>` 标签渲染 `word.image` 字段，Pexels 图片 URL 存储在 `words.json` 中。

**验证结果**:
- ✅ 147 个单词全部有配图
- ✅ 配图加载正常

### 当前部署地址
- **最新**: https://9abe187c.gina-english.pages.dev

---

## 2026-05-09 (周六) - 部署修复记录

### 问题
Cloudflare Pages Functions 在 wrangler v4 中目录结构从 `api/` 改为 `functions/`。

### 已完成
1. ✅ 将 `api/words.js` 移到 `functions/api/words.ts`
2. ✅ 修复 `WORD_DATA` 格式
3. ✅ 更新 `scripts/build.py` 路径
4. ✅ 恢复 `functions/api/words.ts` 为模板格式
5. ✅ 运行 `build.py` 成功生成 147 个单词 + 116 个配图
6. ⚠️  部署成功但 **Functions 未被打包上传**

### 已知问题

#### 1. Functions 未部署
- **现象**: `wrangler pages deploy dist` 后 `/api/words` 返回 HTML
- **根因**: 只部署 `dist` 目录时，wrangler v4 不自动包含 `functions/` 目录
- **解决方向**: 改用静态 JSON 方案

#### 2. 模板与输出文件重合
- **现象**: `build.py` 的 template 和 output 都指向 `functions/api/words.ts`
- **解决方向**: 创建独立模板文件

#### 3. wrangler.jsonc 缺少 `pages_build_output_dir`
- **警告**: `Pages now has wrangler.jsonc support`
- **解决方向**: 添加 `pages_build_output_dir: "dist"` 消除警告

### 当前部署地址
- **最新预览**: https://9abe187c.gina-english.pages.dev

### 环境信息
- **Wrangler**: 4.90.0
- **部署目标**: Cloudflare Pages
- **Account ID**: [已隐藏]

### 文件结构
```
gina-english/
├── dist/                    # 构建产物（静态文件 + words.json + _headers）
├── functions/
│   └── api/
│       ├── words.ts.template  # API 模板
│       └── words.ts           # 构建后生成
├── scripts/
│   └── build.py             # 构建脚本
├── data/
│   ├── seed_down.sql        # 词库数据
│   ├── seed_up.sql          # 词库数据
│   └── word_images.json     # 配图数据
├── public/
│   ├── index.html
│   └── service-worker.js
├── wrangler.jsonc
└── docs/
    └── DEVELOPMENT_LOG.md
```

---

## 明天待办（2026-05-11）

### 高优先级
1. **验证前端功能** - 检查配图加载、背单词流程、PWA
2. **修复 wrangler.jsonc 配置警告**

### 中优先级
3. **词库数据质量** - 补充缺失配图
4. **Phonetic 数据** - 补充 phonetic/pos/example

---

## 2026-05-09 - 初始部署

### 完成事项
1. 解决 wrangler 全局安装冲突
2. 安装 wrangler 4.90.0
3. 首次部署成功

### 经验
- `cfut_` 开头的 Token 是 User Services Token，不能用于 wrangler 自动鉴权
- 非交互式环境必须显式注入 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`
- 部署前需要检查 API 路由是否正常返回 JSON
