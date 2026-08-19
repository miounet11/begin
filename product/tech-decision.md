# 技术选型

服从 FAMILY.md · 角色：begin 自身的技术选型。

本文件从 `templates/tech-options.md` 填写而来。begin 是纯文档仓，「技术」指文件格式和运行时依赖。

---

## 选型范围

**只为 P0 主路径选型。**

主路径：执行面读 AGENTS.md → 跑 formulate → 产出开工包。

---

## 方案表

| 方案 | 能做成什么 | 代价 | 锁定 | 失败样子 |
|------|-----------|------|------|----------|
| A: 纯 Markdown + JSON | AGENTS/FAMILY/USAGE/templates 可被任何文本编辑器打开；catalog.json 可被程序解析 | 无运行时；无高亮 diff 以外的交互 | Markdown 语法；JSON schema 需维护 | 执行面不认 Markdown 语法则无法解析 |
| B: MDX + JS 构建 | 可嵌入交互组件；可做站点发布 | 需要 Node + 构建步骤；新贡献者需安装依赖 | 选定框架后迁移成本高 | 构建失败时用户看不到文档 |
| C: AsciiDoc + Antora | 多仓聚合文档；版本化站点 | 需要 Ruby / Node；学习成本高 | AsciiDoc 普及度低 | 执行面不认 AsciiDoc 语法 |

---

## 选择

### L0 选定方案

**选：方案 A（纯 Markdown + JSON）**

理由：begin 是开工入口，零依赖让任何执行面（Agent / TUI / CLI / 人）都能直接阅读。

### 延后事项

| 事项 | 为什么延后 | 什么条件下再谈 |
|------|------------|----------------|
| 站点发布 | 还在 L0；GitHub 原生渲染已足够 | 有多仓聚合需求时再谈 |
| schema 校验 CI | 只有 catalog.json 一个 JSON | 0.4+ 有 checks/verify.mjs 覆盖 |

---

## 技术不变量

| 不变量 | 判定方式 |
|--------|----------|
| 零运行时依赖 | `npm install` 不需要；MCP 是可选的，且为 Node 零依赖 |
| 可被纯文本工具读取 | 所有 .md / .json 文件用 cat 即可阅读 |
