# 方案制定

owner 给出一句短做成，执行面跑本页，产出填好的合同。没跑完本页，不写业务代码。

权威不在这里：七步怎么跑见 [practices/loop](https://github.com/miounet11/build-standard/blob/main/practices/loop.md)；能不能发见 [ship-standard](https://github.com/miounet11/ship-standard)；洞察落成定律见 [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering)。

---

## 输入

- owner 给的一句话做成（现在时、可测试、说用户完成的事）
- 可选：散乱笔记、竞品链接、技术偏好

## 输出（开工包）

填好的下列文件，可直接交给执行面写代码：

1. `product/README.md`（五件事 + 权威表）
2. `product/roadmap.md`（北极星 + 本季度里程碑 + 不做清单）
3. `product/competitors.md`（竞品扫描结论）
4. `product/tech-decision.md`（技术方案结论）
5. `templates/agent-brief.md`（填好的开工信）

---

## 步骤

顺序对应成熟度复利顺序：看见 → 改得动 → 合同 → 能力 → 商业化。倒着走是假进度。

### F1 确认做成句

| 检查 | 不过就改 |
|------|----------|
| 现在时 | 「用户 **能** 播放」不是「将来能播放」 |
| 能写成一条测试或主路径 | 「做个 App」→ 改成「用户从 X 到 Y」 |
| 说用户完成的事 | 「复刻竞品」→ 改成用户视角的做成 |
| 不含通道清单 | 「Win + Mac + iOS + Android + 会员」移到「本季度不做」 |

做成句定不下来，停。

### F2 列北极星（3–5 条）

北极星是产品存在的理由，不是功能清单。

- 每一条写成「用户能 / 产品保证」。
- 后续每一项工作都必须服务其中一条（[COMPOUND-1](https://github.com/miounet11/ship-standard)）。
- 超过 5 条就合并；写不出 3 条就问 owner。

### F3 定主柱（3–5 根）

主柱是用户能感知的核心品质，产品力 = min(主柱分数)。

- 每根主柱写：名称、现在几分、判定方式。
- 不要写成功能点；写成「能 / 快 / 准 / 稳」这类用户视角的品质。
- 没有用户可见主柱的产品（库、CLI、编译器）写「主柱不适用」并写替代指标（见 [SCHEME §11](https://github.com/miounet11/build-standard/blob/main/SCHEME.md)）。

### F4 竞品扫描

用 [templates/competitors.md](../templates/competitors.md) 填 2–3 个竞品。

目标：提取用户 job、主路径、质量底线。
禁止：1:1 复刻受版权保护内容、「竞品有所以我们做」。

产出：

- 每个竞品的 job / 主路径 / 学到什么门禁 / 不抄什么
- 结论：北极星是否需要调整、是否发现新的「不做」

### F5 技术方案选型

用 [templates/tech-options.md](../templates/tech-options.md) 列 2–4 条真实选项。

只为 P0 主路径选型，不为全盘铺设架构。

产出：

- 每条方案：能做成什么 / 代价 / 锁定 / 失败样子
- 选一条写理由（一句话）
- 延后事项清单

### F6 填合同

把 F1–F5 结论填进：

- `product/README.md`：一句话做成、级别 L0 + 升级到期日、主柱、适用纬度、权威表
- `product/roadmap.md`：北极星、本季度里程碑、本季度不做
- `product/competitors.md`：竞品扫描结论
- `product/tech-decision.md`：技术方案结论

### F7 填开工信

把结论填进 [templates/agent-brief.md](../templates/agent-brief.md)，形成可发给执行面的一页纸。

额外填：

- 第一轮七步计划：诊断 3 缺口 → 规格不变量 → P0 → 先红灯 → 最小绿
- 需要 owner 拍板的事项（空则写「无」）

### F8 交给 owner 确认

开工包齐后，交给 owner 确认：

- [ ] 做成句准确
- [ ] 北极星 3–5 条，没有多余
- [ ] 主柱取 min，判定方式可执行
- [ ] 竞品扫描没有变成复刻清单
- [ ] 技术方案有理由、有延后清单
- [ ] 需要拍板的事项已列出

owner 确认后，执行面才写业务代码。

---

## 常见错误

| 错误 | 修法 |
|------|------|
| 做成句是通道清单 | 通道移到「本季度不做」 |
| 北极星超过 5 条 | 合并或砍掉最弱的 |
| 主柱写成功能点 | 改成用户感知的品质词 |
| 竞品扫描变成复刻清单 | 删「因为竞品有」，保留 job 和门禁 |
| 技术方案没有选择理由 | 写一句话解释为什么选这条 |
| 技术方案列了 10 条 | 只为 P0 主路径选，其余延后 |
| 跳过 F1–F5 直接写代码 | 停下来，先跑完本页 |

---

## 检查清单

跑完本页后，下一会话的执行面能从仓库文件回答：

- [ ] 做成什么（`product/README.md` 一句话做成）
- [ ] 为什么做（`product/roadmap.md` 北极星）
- [ ] 主路径品质怎么评（`product/README.md` 主柱表）
- [ ] 竞品教会我们什么门禁、不抄什么（`product/competitors.md`）
- [ ] 技术路径是什么、为什么选、延后什么（`product/tech-decision.md`）
- [ ] 第一轮做什么（`agent-brief.md` 七步计划）
- [ ] 需要 owner 拍板什么（`agent-brief.md`）

全部能答，才交给执行面写代码。
