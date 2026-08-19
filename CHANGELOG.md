# Changelog

本页列出 begin 版本历史。catalog.json `version` 是源，本页是人类可读摘要。

---

## [0.4.0] – 2026-08-19

### Added

- `CHANGELOG.md` 本文件
- `product/competitors.md` begin 自身的竞品扫描（on-ramp / meta-framework 领域）
- `product/tech-decision.md` begin 自身的技术选型（纯文档仓，无运行时）
- `checks/verify.mjs` 仓库自检脚本（`npm run verify`），检查 entry 文件存在、FAMILY.md 链接完整、无 `BEGIN-*` 门禁 id
- `package.json` 最小化，仅 scripts.verify

### Changed

- `mcp/family-router.mjs` 的 `FAMILY_MAP.repos` 从 catalog.json 动态加载，不再硬编码
- `USAGE.md` 补充 templates 复制说明（`templates/tech-options.md` → `product/tech-decision.md`）

---

## [0.3.0] – 2026-08-15

### Added

- `USAGE.md` 三种模式（A/B/C），owner 不再需要每步贴 6 个链接
- `templates/product-AGENTS.md` 产品仓 AGENTS 模板
- `mcp/family-router.mjs` 可选 MCP 查询路由器

---

## [0.2.0] – 2026-08-10

### Added

- `practices/formulate.md` 方案制定流程（F1–F8）
- `templates/competitors.md` 竞品扫描模板
- `templates/tech-options.md` 技术选型模板
- `templates/agent-brief.md` 开工信模板
- `docs/example-formulation.md` 方案制定示例

---

## [0.1.0] – 2026-08-05

### Added

- `AGENTS.md` 执行面合同
- `FAMILY.md` 一问一仓表
- `PLAYBOOK.md` L0–L3 序列
- `README.md` 入口
- `product/` begin 自身的合同（README、roadmap、quality-gates、risks、waivers、spec）
- `templates/` 产品仓空模板
