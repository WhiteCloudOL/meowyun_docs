# 修改服务器配置

`server.properties` 控制 Minecraft 服务端的端口、验证模式、游戏规则和性能相关选项。修改前建议停止服务端并备份原文件。

## 找到配置文件
依次进入 `MCSM 面板` → `文件管理` → `server.properties`。

## 需要确认的配置项

1. **`server-port`：服务器端口**
   修改为**雨云面板** → **NAT 端口映射管理** → **对外地址:端口**对应的端口数字。
2. **`online-mode`：在线模式**
   如果需要允许离线账号进入，请设置为 `false`；否则离线玩家无法加入。仅有正版玩家时建议保持 `true`。

::: warning 保存与重启
修改完成后必须保存文件并重启服务端。直接修改运行中的配置可能在服务端退出时被覆盖。
:::

::: details `server.properties` 配置参考
```properties{3,4,10,11,12,13,21,22,24,25,34,35,39,40,44,45,47,48,53,54,65-70,77-80}
#Minecraft server properties
accepts-transfers=false
# 是否允许飞行；部分 Mod 或插件需要开启
allow-flight=false  
# 是否启用下界
allow-nether=true
broadcast-console-to-ops=true
broadcast-rcon-to-ops=true
bug-report-link=
# 游戏难度：peaceful / easy / normal / hard
difficulty=easy
# 是否启用命令方块；部分地图玩法必须开启
enable-command-block=false
enable-jmx-monitoring=false
enable-query=false
enable-rcon=false
enable-status=true
enforce-secure-profile=true
enforce-whitelist=false
entity-broadcast-range-percentage=100
# 强制游戏模式
force-gamemode=false
function-permission-level=2
# 默认游戏模式
gamemode=survival
generate-structures=true
generator-settings={}
hardcore=false
hide-online-players=false
initial-disabled-packs=
initial-enabled-packs=vanilla
# 世界目录名称；不熟悉目录结构时不建议修改
level-name=world
# 地图种子
level-seed=
level-type=minecraft\:normal
log-ips=true
max-chained-neighbor-updates=1000000
# 最大人数
max-players=20
# 单个 Tick 的最长允许时间；频繁触发 Watchdog 时应先排查负载、实体和 Mod，并考虑升级服务器
max-tick-time=60000
max-world-size=29999984
# 多人游戏列表中的服务器描述，可使用颜色代码 §
motd=A Minecraft Server
network-compression-threshold=256
# 正版验证；如需允许离线玩家进入则必须关闭
online-mode=true
op-permission-level=4
pause-when-empty-seconds=60
player-idle-timeout=0
prevent-proxy-connections=false
# 允许PVP
pvp=true
query.port=25565
rate-limit=0
rcon.password=
rcon.port=25575
region-file-compression=deflate
require-resource-pack=false
resource-pack=
resource-pack-id=
resource-pack-prompt=
resource-pack-sha1=
# 服务器 IP；留空时绑定所有可用地址
server-ip=
# 服务器端口；应与雨云面板 NAT 端口映射中的目标端口一致
server-port=25565
# 模拟距离；CPU 性能不足时可适当降低
simulation-distance=10 
spawn-monsters=true
spawn-protection=16
sync-chunk-writes=true
text-filtering-config=
text-filtering-version=0
use-native-transport=true
# 可视距离；CPU 性能不足时可降低，建议大于 6，过低会影响游玩体验
view-distance=10
# 白名单；建议同时开启正版验证
white-list=false
```
:::
