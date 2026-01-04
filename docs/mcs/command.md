# 常用命令  
> Minecraft 服务器常用命令参考  
> By 清蒸云鸭  

::: warning  
命令中所示的`<>`表示变量，不要多余输入  
例如：`op <玩家名>` 应输入 `op Steve`，而不是 `op <Steve>`  
:::

## 权限管理 (Permission)

(服务器专用)
| 命令 | 适用版本 | 用途 | 备注 |
| :---: | :---: | :---: | :---: |
| `op <玩家名>` | 所有 | 设置玩家为管理员 | 服务器专用，需要 OP 权限 |
| `deop <玩家名>` | 所有 | 取消玩家管理员权限 | 需要 OP 权限 |
| `whitelist on` | 所有 | 开启白名单 | 控制台执行 |
| `whitelist add <玩家名>` | 所有 | 添加玩家到白名单 | 需要开启白名单功能 |
| `whitelist remove <玩家名>` | 所有 | 从白名单移除玩家 | 需要开启白名单功能 |
| `ban <玩家名> [原因]` | 所有 | 封禁玩家 | 永久封禁 |
| `pardon <玩家名>` | 所有 | 解除玩家封禁 | 需要 OP 权限 |
| `kick <玩家名> [原因]` | 所有 | 踢出玩家 | 临时踢出，可重新加入 |

## 游戏规则 (Game Rules)

### 基础规则

| 命令 | 适用版本 | 用途 | 备注 |
| :---: | :---: | :---: | :---: |
| `gamerule keepInventory true` | ~1.21.10 | 开启死亡不掉落 | 死亡后物品保留在背包 |
| `gamerule keep_inventory true` | 1.21.11~最新 | 开启死亡不掉落 | 新版本命令格式 |
| `gamerule mobGriefing false` | ~1.21.10 | 关闭生物破坏 | 关闭同时部分生电功能也会失效，请谨慎选择 |
| `gamerule mob_griefing false` | 1.21.11~最新 | 关闭生物破坏 | 新版本命令格式 |
| `gamerule doDaylightCycle false` | ~1.21.10 | 关闭昼夜循环 | 时间将停止变化 |
| `gamerule doMobSpawning false` | ~1.21.10 | 关闭生物生成 | 不会生成新生物 |
| `gamerule doFireTick false` | ~1.21.10 | 关闭火焰蔓延 | 火不会扩散和熄灭 |
| `gamerule doWeatherCycle false` | ~1.21.10 | 关闭天气循环 | 天气将保持不变 |
| `gamerule randomTickSpeed <Vaulue>` | ~1.21.10 | 设置随机刻速度 | 默认 3，影响作物生长等 |
| `gamerule commandBlockOutput false` | ~1.21.10 | 关闭命令方块输出 | 减少控制台刷屏 |

### 难度与 PVP

| 命令 | 适用版本 | 用途 | 备注 |
| :---: | :---: | :---: | :---: |
| `difficulty peaceful` | 所有 | 设置为和平模式 | 不会生成敌对生物 |
| `difficulty easy` | 所有 | 设置为简单难度 | 默认难度 |
| `difficulty normal` | 所有 | 设置为普通难度 | 推荐难度 |
| `difficulty hard` | 所有 | 设置为困难难度 | 最高难度 |
| `gamerule pvp false` | 所有 | 关闭玩家间伤害 | 玩家无法互相攻击 |

## 时间与天气

| 命令 | 适用版本 | 用途 | 备注 |
| :---: | :---: | :---: | :---: |
| `time set day` | 所有 | 设置为白天 | 时间设为 1000 |
| `time set night` | 所有 | 设置为夜晚 | 时间设为 13000 |
| `time set <数值>` | 所有 | 设置具体时间 | 0-24000，0 为日出 |
| `weather clear` | 所有 | 设置为晴天 | 清除所有天气效果 |
| `weather rain` | 所有 | 设置为雨天 | 开始下雨 |
| `weather thunder` | 所有 | 设置为雷暴 | 雷雨天气 |

## 玩家管理

| 命令 | 适用版本 | 用途 | 备注 |
| :---: | :---: | :---: | :---: |
| `tp <玩家名> <x> <y> <z>` | 所有 | 传送玩家到坐标 | 需要 OP 权限 |
| `tp <玩家1> <玩家2>` | 所有 | 传送玩家1到玩家2 | 需要 OP 权限 |
| `spawnpoint <玩家名> <x> <y> <z>` | 所有 | 设置玩家出生点 | 需要 OP 权限 |
| `give <玩家名> <物品> [数量]` | 所有 | 给予玩家物品 | 需要 OP 权限 |
| `clear <玩家名>` | 所有 | 清空玩家背包 | 需要 OP 权限 |
| `gamemode creative <玩家名>` | 所有 | 设置玩家为创造模式 | 需要 OP 权限 |
| `gamemode survival <玩家名>` | 所有 | 设置玩家为生存模式 | 需要 OP 权限 |
| `gamemode spectator <玩家名>` | 所有 | 设置玩家为旁观模式 | 需要 OP 权限 |

## 世界管理

| 命令 | 适用版本 | 用途 | 备注 |
| :---: | :---: | :---: | :---: |
| `save-all` | 所有 | 保存世界 | 立即保存所有区块 |
| `save-on` | 所有 | 开启自动保存 | 默认开启 |
| `save-off` | 所有 | 关闭自动保存 | 关闭后需手动保存 |
| `seed` | 所有 | 查看世界种子 | 显示当前世界种子 |
| `worldborder set <大小>` | 所有 | 设置世界边界大小 | 默认无限大 |
| `worldborder center <x> <z>` | 所有 | 设置世界边界中心 | 需要 OP 权限 |

## 服务器管理

| 命令 | 适用版本 | 用途 | 备注 |
| :---: | :---: | :---: | :---: |
| `stop` | 所有 | 停止服务器 | 安全关闭服务器 |
| `reload` | 所有 | 重新加载服务器 | 重新加载配置和插件 |
| `restart` | 部分 | 重启服务器 | 需要插件支持 |
| `list` | 所有 | 查看在线玩家 | 显示所有在线玩家列表 |
| `say <消息>` | 所有 | 服务器公告 | 以服务器名义发送消息 |
| `tellraw <玩家名> <JSON>` | 所有 | 发送 JSON 消息 | 支持格式化和点击事件 |

## 常用组合命令

::: tip  
以下是一些常用的命令组合，可以配合命令方块或定时任务使用  
:::

```bash
# 每日重置时间（配合定时任务）
time set day
weather clear

# 开启死亡不掉落 + 关闭生物破坏（适合建筑服务器）
gamerule keepInventory true
gamerule mobGriefing false

# 设置世界边界（适合生存服务器）
worldborder set 10000
worldborder center 0 0
```

## 注意事项

::: warning  
1. 部分命令在不同版本中格式可能不同（如 `keepInventory` vs `keep_inventory`）  
2. 修改游戏规则前请先了解其影响，避免影响玩家体验  
3. 使用 `save-off` 后务必记得使用 `save-on` 重新开启自动保存  
4. 封禁和踢出玩家前建议先警告，避免误操作  
:::

::: info  
**更多命令参考：**  
- [Minecraft Wiki - 命令](https://minecraft.wiki/w/Commands)  
- [Minecraft Wiki - 游戏规则](https://minecraft.wiki/w/Game_rule)  
:::
