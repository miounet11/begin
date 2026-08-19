# begin

> **Language: the playbook is written in Chinese.** Filenames, gate ids, and
> commands are English. Scroll to [In English](#in-english) for the one-page map.

**本仓只回答一个问题：新产品从一句短需求怎么开工，才能按家族标准长成顶级成品。**

发给 Agent / TUI / CLI 的第一份东西是 [AGENTS.md](./AGENTS.md)。填空合同用 [templates/](./templates/)。粘贴开工信用 [templates/agent-brief.md](./templates/agent-brief.md)。

这不是第三本手册。怎么创建、能不能上线、洞察有没有落成定律、模型能不能修交接本、这轮有没有漏审，权威都在家族仓。本仓只做**开工入口**。

| 文档 | 回答 |
|------|------|
| [AGENTS.md](./AGENTS.md) | 执行面（Agent / TUI / CLI）必读：准做什么、禁做什么、做成怎么认 |
| [PLAYBOOK.md](./PLAYBOOK.md) | 短需求 → L0 → L3 的顺序 |
| [FAMILY.md](./FAMILY.md) | 一问一仓。禁止把四本标准抄进产品仓 |
| [templates/](./templates/) | 可复制进产品仓的空合同与开工信 |
| [product/](./product/) | 本仓自己的空合同（示范，不是某个产品） |

---

## 30 秒开工

1. 读 [AGENTS.md](./AGENTS.md)。
2. 把 [templates/](./templates/) 抄进产品仓的 `product/`。
3. 填五件事：一句话做成、北极星 3–5 条、主柱 3–5 根、本季度不做、级别 `L0` + 升级到期日。
4. 把填好的 `product/README.md` 和 [templates/agent-brief.md](./templates/agent-brief.md) 发给执行面。
5. 下一笔非平凡改动走七步。第一笔提交必须是红的。

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
