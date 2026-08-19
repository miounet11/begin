# 门禁

本页只**引用** [ship-standard gates.json](https://github.com/miounet11/ship-standard/blob/main/gates.json) 的 id。
不要在这里发明新 id，也不要重写判定。

当前级别见 `README.md`。本级 `block` 红且没有在期豁免 → 不能发。
有在期豁免 → 可以发，但通道强制 beta。

| id | 对本产品意味着什么（一句话） | 本级 |
|----|------------------------------|------|
| `PROBE-1` | 完成由门禁证据说了算 | 按级别 |
| `DOC-2` | 现行合同短，过期进归档 | 按级别 |
| `KERNEL-1` | 主柱已写下，评分用 min | 声明了 quality-kernel 才绑定 |
| `COMPOUND-6` | 本季度不做写在路线图 | 声明了 compound 才绑定 |
| `LAUNCH-5` | 安装包 / 仓库无密钥 | 不可豁免 |

过不了：写 [waivers.md](./waivers.md)，不要静默跳过。
