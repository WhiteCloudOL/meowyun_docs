# 配置修改

### 找到配置文件
`MCSM面板` -> `文件管理` -> `server.properties`   

### 必须修改项
1. `server-port`：服务器端口  
   改为：**雨云面板**->**NAT端口映射管理**->**对外地址:端口** 对应的 **端口**（数字）  
2. `online-mode`：在线模式  
   如果有离线玩家请改为`false`，否则离线玩家无法进入服务器  

::: details 服务器配置`server.properties`  
```properties{3,4,10,11,12,13,21,22,24,25,34,35,39,40,44,45,47,48,53,54,65-70,77-80}
#Minecraft server properties
accepts-transfers=false
# 允许飞行，为了避免bug建议开启
allow-flight=false  
# 开启地狱
allow-nether=true
broadcast-console-to-ops=true
broadcast-rcon-to-ops=true
bug-report-link=
# 游戏难度 peaceful/easy/normal/hard
difficulty=easy
# 启用命令方块，如果开游戏地图必须开启  
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
# 地图名称（不建议修改）
level-name=world
# 地图种子
level-seed=
level-type=minecraft\:normal
log-ips=true
max-chained-neighbor-updates=1000000
# 最大人数
max-players=20
# 最长tick时间，如果你频繁因watchdog崩服，延迟该项可减缓崩溃概率，但你还是需要考虑升级服务器了！
max-tick-time=60000
max-world-size=29999984
# 显示在多人游戏列表内的介绍信息可使用颜色代码 §
motd=A Minecraft Server
network-compression-threshold=256
# *正版验证(如果有离线玩家必须关闭)
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
# 服务器IP留空绑定到所有IP
server-ip=
# 服务器端口，必须修改为 雨云面板->NAT端口映射管理->对外地址:端口 对应的端口（数字） 
server-port=25565
# 模拟距离（CPU不好建议降低！）
simulation-distance=10 
spawn-monsters=true
spawn-protection=16
sync-chunk-writes=true
text-filtering-config=
text-filtering-version=0
use-native-transport=true
# 可视距离（CPU不好建议降低！建议>6，过低影响游戏观感体验）
view-distance=10
# 白名单 (必须同时开启正版验证)
white-list=false
```
:::