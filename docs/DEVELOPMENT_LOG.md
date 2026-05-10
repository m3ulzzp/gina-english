# Gina 学英语 - 开发日志

## 2026-05-09 (周六) - 最新进展

### ✅ 已解决：词库数据通过静态 JSON 提供

**问题**: wrangler v4 Pages Functions 无法自动发现 `functions/` 目录中的函数文件，部署后 `/api/words` 返回 HTML 而非 JSON。

**解决方案**: 改用静态 JSON 文件方案
1. 构建脚本在 `dist/` 中生成 `words.json`（147 个单词 + 配图）
2. 生成 `_headers` 文件防止 SPA fallback 拦截 JSON 请求
3. 前端从 `/words.json` 读取词库数据
4. build.py 整合：先 Vite build → 再注入 JSON → 再部署

**验证结果**:
- ✅ `https://9abe187c.gina-english.pages.dev/words.json` 返回正确 JSON
- ✅ Content-Type: application/json
- ✅ Cache-Control: public, max-age=3600
- ✅ 147 个单词，全部有配图

### 当前部署地址
- **最新**: https://9abe187c.gina-english.pages.dev

### 构建流程
```bash
python3 scripts/build.py    # Vite build + 生成 words.json + _headers
wrangler pages deploy dist --project-name gina-english --commit-dirty=true
```

---

## 2026-05-09 (周六) - 部署修复记录（早期）

### 问题
Cloudflare Pages Functions 在 wrangler v4 中目录结构从 `api/` 改为 `functions/`，原 `api/words.js` 不再生效。同时 `WORD_DATA` 有嵌套数组 `[[...]]` 格式错误。

### 已完成
1. ✅ 将 `api/words.js` 移到 `functions/api/words.ts`
2. ✅ 修复 `WORD_DATA` 格式（去掉外层嵌套括号）
3. ✅ 更新 `scripts/build.py` 路径指向 `functions/api/words.ts`
4. ✅ 恢复 `functions/api/words.ts` 为模板格式（含 `{{WORDS_JSON}}` 占位符）
5. ✅ 运行 `build.py` 成功生成 147 个单词 + 116 个配图
6. ⚠️  部署成功但 **Functions 未被打包上传**

### 已知问题

#### 1. Functions 未部署
- **现象**: `wrangler pages deploy dist` 后 `/api/words` 返回 HTML（SPA fallback）
- **根因**: 只部署 `dist` 目录时，wrangler v4 不自动包含 `functions/` 目录
- **警告信息**: `No routes found when building Functions directory`
- **解决方向**: 
  - 方案 A: 部署时指定包含 functions（如 `wrangler pages deploy .` 从项目根目录部署）
  - 方案 B: 在 `wrangler.jsonc` 中正确配置 `pages_build_output_dir` + functions 路径
  - 方案 C: 加 `--commit-dirty=true` 参数

#### 2. 模板与输出文件重合
- **现象**: `build.py` 的 template 和 output 都指向 `functions/api/words.ts`
- **问题**: 首次 build 后模板被覆盖为内联数据，后续 build 无法再注入
- **解决方向**: 
  - 创建独立模板文件 `functions/api/words.ts.template`
  - 或改为 build.py 直接生成输出，不依赖模板替换

#### 3. wrangler.jsonc 缺少 `pages_build_output_dir`
- **警告**: `Pages now has wrangler.jsonc support. We detected a configuration file but it is missing the "pages_build_output_dir" field`
- **当前配置**: 使用 `assets.directory: "dist"` 代替
- **解决方向**: 添加 `pages_build_output_dir: "dist"` 消除警告

### 当前部署地址
- **最新预览**: https://1cbb122a.gina-english.pages.dev
- **上一版**: https://8ae3d81f.gina-english.pages.dev
- **状态**: 静态站点正常，API 路由未生效

### 环境信息
- **Wrangler**: 4.90.0
- **部署目标**: Cloudflare Pages
- **Token**: 已移除（见 GitHub secret scanning 提示）
- **Account ID**: `7feb523aaddd9ca3c3b5f3f4deb62a43`
- **环境变量**: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

### 文件结构
```
gina-english/
├── dist/                    # 构建产物（静态文件 + words.json + _headers）
├── functions/
│   └── api/
│       ├── words.ts.template  # API 模板（含 {{WORDS_JSON}}）
│       ├── words.ts           # 构建后生成（内联数据）
│       └── words.js           # 备用 JS 版本
├── scripts/
│   └── build.py             # 构建脚本（Vite + JSON + headers）
├── data/
│   ├── seed_down.sql        # 词库数据（下册 48 词）
│   ├── seed_up.sql          # 词库数据（上册 99 词）
│   └── word_images.json     # 配图数据（116 个）
├── public/
│   ├── index.html           # 前端（已改为 fetch /words.json）
│   └── service-worker.js    # PWA（已更新缓存列表）
├── wrangler.jsonc           # 部署配置
└── docs/
    └── DEVELOPMENT_LOG.md   # 本文件
```

---

## 明天待办（2026-05-10）

### 高优先级
1. **验证前端功能** - 访问 https://9abe187c.gina-english.pages.dev 检查：
   - 单词列表是否正常显示
   - 配图是否正常加载
   - 背单词/复习功能是否正常
   - PWA 安装是否正常

2. **修复 wrangler.jsonc 配置警告** - 消除 `No routes found` 警告

### 中优先级
3. **词库数据质量** - 检查 116/147 配图覆盖率，补充缺失配图
4. **Phonetic 数据** - seed_up.sql 中大量单词的 phonetic/pos/example 为 `None`，需要补充

### 低优先级
5. **后端 API** - 如果后续需要用户进度保存，再恢复 `/api/words` 函数
6. **替换 Token** - 评估是否需要标准 `cf_` API Token 替代 `cfut_[REDACTED]` User Services Token

---

## 2026-05-09 - 初始部署

### 完成事项
1. 解决 wrangler 全局安装冲突（ENOTEMPTY 错误）
2. 安装 wrangler 4.90.0
3. 处理 cfut_[REDACTED] 前缀 User Services Token 无法自动获取 Account ID 的问题
4. 通过 Accounts API 手动查询并注入 Account ID
5. 首次部署成功：https://8ae3d81f.gina-english.pages.dev

### 经验
- `cfut_[REDACTED]` 开头的 Token 是 User Services Token，不能用于 wrangler 自动鉴权
- 非交互式环境必须显式注入 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID`
- 部署前需要检查 API 路由是否正常返回 JSON
