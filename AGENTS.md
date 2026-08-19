# Agent / TUI / CLI 必读

你是执行面，不是 owner。owner 定做成和能不能发给下一台机器。你在规则里跑环。

本页是开工合同。细节不在这里发明。权威表见 [FAMILY.md](./FAMILY.md)。

---

## 先读什么

| 顺序 | 文件 | 读完要能回答 |
|------|------|----------------|
| 1 | 本页 | 准做什么、禁做什么 |
| 2 | 产品仓 `product/README.md` | 一句话做成、级别、主柱、权威表 |
| 3 | 产品仓 `product/roadmap.md` | 下一步只在哪、本季度不做啥 |
| 4 | 需要时再打开家族仓，用 id 引用 | 不要把四本标准抄进产品仓 |

**打开产品仓却没有合同**：

1. owner 只给了一句短做成（或散乱笔记）→ 先跑 [practices/formulate.md](./practices/formulate.md)，产出开工包。
2. 有 `product/README.md` 但五件事有空 → 停下来让 owner 填，或跑 formulate 帮 owner 填。
3. 开工包齐全 → 继续。

**不写业务代码的情况**：

- `product/README.md` 五件事有空
- `product/roadmap.md` 北极星、本季度不做有空
- `product/competitors.md` 不存在或未填
- `product/tech-decision.md` 不存在或未选方案
- `agent-brief.md` 第一轮七步计划有空

合同不齐就写代码 = 「计划只活在聊天里」，禁止。

---

## 做成怎么认

- 任务清单打勾、聊天说「做完了」、本机绿，都不算。
- 做成由门禁说了算。引用门禁用稳定 id（`PATH-3`、`LAUNCH-5`），不要引段落标题。
- 有主柱的产品，产品力取 **min**，不用平均，也不用旁边的功能补主路径失败。
- 用户没装到 = 没修。

---

## 每一笔非平凡改动

诊断 → 规格 → 计划 → 红灯 → 最小绿 → 门禁证据 → 反思。

缺一步就停。第一笔提交必须是红的（失败的测试 / 探针 / 清单项）。一层一个提交。禁止同一笔改协议、UI、编码、发布。

平凡改动（错字、注释）可以缩短，但不得借此改行为。权威：[build-standard practices/loop](https://github.com/miounet11/build-standard/blob/main/practices/loop.md)。

---

## 禁止

- 一次提示生成整盘（全端、会员、商店、全球一齐铺）
- 密钥、token、账号写进仓库、安装包、或本页
- 宣布已上线、关掉生产守卫、跑破坏性迁移（人拥有上线权）
- 先堆功能 / 先商业化，再补灯
- 计划只活在聊天里（开工包必须在仓库，不在聊天）
- 合同不齐就写业务代码（见上「不写业务代码的情况」）
- 手改 `STATUS.md` 的百分比
- 无盲测写「已超越竞品」
- 静默绕过门禁。过不了就写 `product/waivers.md`（到期日 + owner）
- 把 build / ship / creativity / ability / review 的正文复制进产品仓
- 为「对标」去复刻受版权保护的词曲、旋律、或他人代码
- 竞品扫描变成复刻清单（「竞品有所以我们做」）

---

## 必须留下的仓库记忆

下一会话必须能从仓库接着干，不靠你的聊天记录。

| 问题 | 只认 |
|------|------|
| 下一步做什么 | `product/roadmap.md` |
| 现在坏在哪 | 生成的根目录 `STATUS.md` |
| 做成什么样 | `product/quality-gates.md` + `product/spec/` |
| 打开的缺口 | `product/risks.md`（关闭不删行） |
| 哪条门禁暂时过不了 | `product/waivers.md` |

---

## 选谁来跑

换模型或通道之前，用 [ability-harness](https://github.com/miounet11/ability-harness) 看它能不能把带伤交接本修到可提测。本仓不另做一套评测。

升版本、改公共 API、修回归之前，走 [review-harness](https://github.com/miounet11/review-harness)。不要把审查循环抄进产品仓。

---

## 你怎么回复 owner

短。先报：本轮做成、红了哪条 id、下一步在 roadmap 的哪一行。不要重写标准。
