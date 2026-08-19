# 一问一仓

同一件事只有一个权威。本仓不判定任何一条门禁的含义，也不列举哪条 id 在哪一级阻断。

| 问题 | 权威 |
|------|------|
| 新产品从短需求怎么开工、给执行面的第一份合同 | **本仓** |
| 为什么会不高质量、十二条铁律、成熟度规则、豁免规则 | [build-standard SCHEME](https://github.com/miounet11/build-standard/blob/main/SCHEME.md) |
| 七步怎么执行、人与 Agent 分工、仓库记忆、最小变绿 | [build-standard practices](https://github.com/miounet11/build-standard/tree/main/practices) |
| 能不能上线：门禁 id / stage / severity / 是否可豁免 | [ship-standard](https://github.com/miounet11/ship-standard) [`gates.json`](https://github.com/miounet11/ship-standard/blob/main/gates.json) |
| 洞察有没有落成可引用的定律 | [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering) |
| 这个模型在六面上能不能修交接本 | [ability-harness](https://github.com/miounet11/ability-harness) |
| 这轮迭代 / 升级 / 修 bug 有没有漏审查 | [review-harness](https://github.com/miounet11/review-harness) |
| 产品仓空合同与落地脚本 | [build-standard templates](https://github.com/miounet11/build-standard/tree/main/templates)（结构门禁脚本以那边为准；本仓 templates 是开工信 + 空合同副本） |

```
人（Owner）
  定北极星 · 定本轮做成 · 决定能不能发给下一台机器
        │
        ▼
begin（开工） → 产品仓合同
        │
        ▼
build-standard 七步环（缺一步就停）
        │
        ▼
ship-standard 按级别推导本级门禁
        │
        ▼
过了才算成品；下一轮先走 review-harness
```

选谁来跑环：ability-harness。创造判断要跨会话：creativity-is-engineering。

禁止为本仓发明 `BEGIN-*` 门禁 id。上线判定不在这里写第二份映射。
