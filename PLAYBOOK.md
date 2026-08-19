# 短需求 → 顶级成品

权威在家族仓。本页只排顺序。创建细节见 [build-standard SCHEME](https://github.com/miounet11/build-standard/blob/main/SCHEME.md)，上线判定见 [ship-standard](https://github.com/miounet11/ship-standard)。

---

## 需求怎么才算短

短的是**做成**，不是省略合同。

一句话做成必须同时满足：

1. 现在时。
2. 能写成一条测试或一条主路径。
3. 说的是用户完成的事，不是「做个 App」。
4. 不包含通道清单（Win / Mac / iOS / Android / 会员）当本轮做成。

合格：「用户交一份原创乐谱规格，得到一首能播的歌，同一份谱可换模型重演。」
不合格：「100% 复刻竞品，全端会员一步到位。」

洞察如果要跨会话还算数，先到 [creativity-is-engineering](https://github.com/miounet11/creativity-is-engineering) 落成带稳定 id 的定律。聊天里的判断，下一会话当没说过。

---

## 开工五件事（写进 product/README.md）

1. **一句话做成**
2. **北极星 3–5 条**（产品存在的理由，不是功能清单）
3. **主柱 3–5 根**（产品力 = min）
4. **本季度明确不做**（和要做的同等重要）
5. **级别 + 升级到期日**（新产品诚实写 `L0`，没有到期日的级别门禁会拒）

五件有空，先停，不要写业务代码。

---

## 复利顺序（不要倒着走）

和成熟度是同一件事的两种说法。

| 级 | 目标 | 本级做成 |
|----|------|----------|
| **L0 看见** | 隐形缺口变成红灯。默认不改业务 | 新人打开 `STATUS.md` 能回答「现在坏在哪」 |
| **L1 改得动** | 架构能吸收改动 | 新功能不必改入口大文件；用户可见流变了会红 |
| **L2 有合同** | 核心能力有基线与阈值 | 分数掉线则发布被拦 |
| **L3 可上线** | 这版可以给用户 | 门禁按 [ship-standard](https://github.com/miounet11/ship-standard) 的 stage 推导；灰度、回滚、停机都在 |

只准往上升。降级写豁免。高于本级的门禁跑 `warn`。opt-in 纬度（`resilience`、`quality-kernel`、`acceptance-path`、`pre-ship`、`compound`）只有写进 `product/README.md` 才绑定。

倒着走的典型失败：先会员商店，内核还靠手感；先铺十个端，入口文件没有探针。

---

## 七步（每一笔非平凡改动）

| 步 | 留下什么 |
|----|----------|
| 1 诊断 | 3 条用户能感知的缺口 |
| 2 规格 | 现在时不变量，写不出测试的句子删掉 |
| 3 计划 | P0 / P1 / P2，本轮只做 P0 |
| 4 红灯 | **第一笔提交是红的** |
| 5 最小绿 | 一层，一个提交 |
| 6 门禁 | CI 或约定的共享跑法；本机绿不算 |
| 7 反思 | 新缺口进风险册，同一笔提交 |

权威：[practices/loop.md](https://github.com/miounet11/build-standard/blob/main/practices/loop.md)。本页不另写第二张表。

---

## 什么叫顶级成品

不是功能矩阵打满，也不是「无盲测已超越竞品」。

1. 主柱取最小值，主路径完整。
2. 合同在仓库里，灯是红绿，下一会话不用问人。
3. 功能绿了还不算上线：分类、证据、包装、灰度、观察、回滚、停机信号就位，并且连续跑过一个业务周期（[ship-standard launch](https://github.com/miounet11/ship-standard/blob/main/dimensions/launch.md)）。
4. 不可逆的事有不可豁免的闸：`LAUNCH-5`、`LAUNCH-11`、`PRESHIP-4`。
5. 过不了就写豁免，不要静默绕过。同一 id 第三次豁免直接拒。

---

## 发给执行面的最小包裹

只发这三样，不要把四本标准全文贴进对话：

1. 本仓 [AGENTS.md](./AGENTS.md)
2. 填好的产品仓 `product/README.md` + `product/roadmap.md`
3. 填好的 [templates/agent-brief.md](./templates/agent-brief.md)

执行面用 TUI / CLI / IDE / Agent 都可以。换模型先看 [ability-harness](https://github.com/miounet11/ability-harness)。改版本先看 [review-harness](https://github.com/miounet11/review-harness)。
