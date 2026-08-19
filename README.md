# begin

> **Language: the playbook is written in Chinese.** Filenames, gate ids, and
> commands are English. Scroll to [In English](#in-english) for the one-page map.

**本仓只回答一个问题：新产品从一句短需求怎么开工，才能按家族标准长成顶级成品。**

发给 Agent / TUI / CLI 的第一份东西是 [AGENTS.md](./AGENTS.md)。填空合同用 [templates/](./templates/)。粘贴开工信用 [templates/agent-brief.md](./templates/agent-brief.md)。

这不是第三本手册。怎么创建、能不能上线、洞察有没有落成定律、模型能不能修交接本、这轮有没有漏审，权威都在家族仓。本仓只做**开工入口**。

| 文档 | 回答 |
|------|------|
| [USAGE.md](./USAGE.md) | **日常怎么用家族（三种模式 A/B/C）** |
| [AGENTS.md](./AGENTS.md) | 执行面（Agent / TUI / CLI）必读：准做什么、禁做什么、做成怎么认 |
| [PLAYBOOK.md](./PLAYBOOK.md) | 短需求 → L0 → L3 的顺序 |
| [FAMILY.md](./FAMILY.md) | 一问一仓。禁止把四本标准抄进产品仓 |
| [practices/formulate.md](./practices/formulate.md) | 方案制定：owner 给短做成 → 产出填好的合同 |
| [templates/](./templates/) | 可复制进产品仓的空合同与开工信（含 `product-AGENTS.md`） |
| [mcp/](./mcp/) | 可选 family-router MCP（仅查询，不替代正文） |
| [product/](./product/) | 本仓自己的空合同（示范，不是某个产品） |

---

## 30 秒开工

先看 **[USAGE.md](./USAGE.md)** 了解三种使用模式（新产品 / 已有产品仓 / MCP）。

| 模式 | 做什么 |
|------|--------|
| A 新产品 | 只发本仓链接，执行面跑 formulate → 产出开工包 |
| B 已有产品仓 | 抄 `templates/product-AGENTS.md` 到产品仓根目录，不再贴家族链接 |
| C MCP | 可选 `mcp/family-router.mjs`，仅查询，不替代正文 |

详细步骤：

1. 读 [AGENTS.md](./AGENTS.md)。
2. owner 给出一句话做成 → 跑 [practices/formulate.md](./practices/formulate.md)，产出开工包。
3. 把 [templates/](./templates/) 抄进产品仓的 `product/`，用开工包填：
   - `product/README.md`：一句话做成、北极星、主柱、级别
   - `product/roadmap.md`：里程碑、本季度不做
   - `product/competitors.md`：竞品扫描结论
   - `product/tech-decision.md`：技术方案结论
4. 填好 [templates/agent-brief.md](./templates/agent-brief.md)，发给执行面。
5. 下一笔非平凡改动走七步。第一笔提交必须是红的。

**没有开工包，不写业务代码。**

完整顺序在 [PLAYBOOK.md](./PLAYBOOK.md)。家族权威在 [FAMILY.md](./FAMILY.md)。

---

## 一句话

**需求短，是做成短，不是省略合同。成品顶，是主柱取最小值并且门禁绿，不是功能矩阵打满。**

---

## In English

`begin` is the on-ramp. It answers only: how a new product starts from a short
requirement and grows into a finished build under the family standards.

- Agents / TUI / CLI read `AGENTS.md` first.
- How to write code: [build-standard](https://github.com/miounet11/build-standard)
- Whether this version may ship: [ship-standard](https://github.com/miounet11/ship-standard)
- Whether an insight became a citable law: [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering)
- Whether a model can repair a broken handoff on six surfaces: [ability-harness](https://github.com/miounet11/ability-harness)
- Whether this iteration missed review: [review-harness](https://github.com/miounet11/review-harness)

Do not copy those manuals into a product repo. Point at them.

---

## 许可

[MIT](./LICENSE)。
