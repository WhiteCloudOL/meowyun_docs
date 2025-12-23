# 进阶  

## 切换正版/离线模式  
 修改`server.properties`服务器配置文件中的`online-mode`项  
 - `true`: 在线模式，需要正版  
 - `false`: 离线模式，无需正版  
> 详见 [配置](/rainyun/mcsm/configure-mc)


## 更换地图/重置存档   

  进入`MCSM面板`->`文件管理`  
  启动一次服务器后，可以看到此目录形式:  

::: details 文件分布
```bash{8-20}  
Minecraft-Server/
├── server.properties      # 服务器配置文件
├── eula.txt               # 用户许可协议
├── whitelist.json         # 白名单
├── ops.json               # 管理员列表
├── banned-ips.json        # 封禁IP列表
├── banned-players.json    # 封禁玩家列表
├── worlds/                # 世界文件夹
    ├── data/
    ├── datapacks/         # 地图数据包文件
    ├── DIM1/              # 末地
    ├── DIM-1/             # 地狱
    ├── entities/          # 实体数据
    ├── playerdata/        # 玩家数据
    ├── poi/
    ├── region/            # 区块数据 
    ├── serverconfig/      # MOD服务器配置
    ├── level.dat/         # 存档信息+单人数据
    ├── level.dat.old/     # 存档信息备份
    └── uid.dat/
├── plugins/               # Bukkit/Spigot插件
├── mods/                  # Forge/Fabric模组
├── config/                # 模组和插件配置
│   ├── bukkit.yml
│   ├── spigot.yml
│   ├── paper.yml
│   └── ...
├── logs/                  # 日志文件
│   ├── latest.log
│   └── ...
└── 启动脚本(可修改).sh     # 启动脚本
```
:::

### 重置存档  
其中`world/`文件夹就是存档，我们只需`关闭服务器`后，删除`world/`文件夹，然后重新启动服务器等待其生成完成即可  

### 更换为已有的存档  
其中`world/`文件夹就是我们需要进行替换的文件夹  
我们自己的存档一般也是这种格式，因此我们只需压缩一下存档，并上传到服务器替换即可   


::: warning 注意  

我们需要将`world`文件夹内的所有东西进行替换  
可以先执行`删除`，后将我们**存档文件夹内**的所有文件`复制`过来  
**1.不是将文件夹放在这里！！！**  
**2.不要修改world文件夹名称，除非你在`server.properties`里修改了`level-name`**  

:::

## 控制台命令  

请进入`MCSM面板`->`终端` (第一次进入MCSM面板的界面)  
可以在**黑色框框**或**下方白条**内输入命令，**命令无需添加`/`**   

![MCSM终端](../../resources/images/rainyun/rainyun_mcsm_mcsmconsole.webp)  

## 常用命令  
前往对应页面[查看](../../mcs/command.md)  
大部分命令都可以由`控制台`或`玩家执行`，控制台输入无需添加`/`  
玩家输入命令则需要在聊天栏内输入`/`  

## 给予权限  

请进入`MCSM面板`->`终端` (第一次进入MCSM面板的界面)  
在控制台内输入`op <玩家名称>`，将玩家添加为OP  

::: warning 小白注意  

1. 控制台命令前面不需要加`/`  
2. `op`小写，不要打成大写  
3. `op`和`玩家名称`之间应存在空格` `  
4. `<>`不要添加，这个只是用于标记变量  

:::  

## 开启白名单

请进入`MCSM面板`->`终端` (第一次进入MCSM面板的界面)    
在控制台内输入`whitelist on`即可打开白名单   


::: details 白名单命令
```bash
whitelist on / off          # 打开/关闭白名单
whitelist add <玩家名称>     # 将玩家添加到白名单，请将<玩家名称>替换为实际名称
whitelist remove <玩家名称>  # 将玩家移出白名单，请将<玩家名称>替换为实际名称
whitelist list              # 查看白名单列表
whitelist reload            # 重载白名单
```
:::

::: warning  
白名单要求必须打开`正版验证`（[配置文件](configure-mc.md)->`online-mode=true`），否则白名单将会给所有人拦在外面！  
:::  