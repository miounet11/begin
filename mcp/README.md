# family-router MCP

一个路由器，不是六套标准 MCP。工具只做查询，正文仍以 GitHub 为准。

---

## 运行

```bash
node mcp/family-router.mjs
```

无依赖，直接用 Node.js 运行。

---

## 在 Cursor 中添加

在 Cursor 设置中添加自定义 stdio MCP：

```json
{
  "command": "node",
  "args": ["/absolute/path/to/begin/mcp/family-router.mjs"]
}
```

或克隆仓库后：

```json
{
  "command": "node",
  "args": ["<你的路径>/begin/mcp/family-router.mjs"]
}
```

---

## 工具

| 工具 | 用途 |
|------|------|
| `family_map` | 返回一问一仓表 + USAGE 三种模式 (A/B/C) |
| `authority_for` | 输入问题，返回应该打开哪个仓、哪个路径 |
| `get_gate` | 查询 ship-standard gates.json 中的门禁（如 LAUNCH-5） |
| `packet_checklist` | 返回 begin 开工包清单 |

---

## 设计约束

1. **实时获取**：每次调用从 GitHub raw 拉取 catalog/gates，不会过期
2. **短 TTL 缓存**：5 分钟内存缓存，减少重复请求
3. **无密钥**：不需要 token、不存储账号
4. **只查询**：不替代 gates.json，不发明门禁 id
5. **零依赖**：无需 npm install，Node.js 原生运行

---

## 不做什么

- 不输出完整标准正文
- 不发明 BEGIN-* 门禁 id
- 不替代门禁判定逻辑
- 不扫描文件系统（除非明确传入 productRoot 且在 workspace 下）

正文权威在 GitHub，本 MCP 只是路由。
