---
title: 安装MC服务端
editLink: false

---

# 安装MC服务端

## 整合包服务端下载
    进入CurseForge / Modrinth / 作者网盘 / BBSMC 等下载服务端

    服务端一般包含以下内容：
    - mods/plugins
    - config
    - *.sh/*.bat
    - user_jvm_args.txt
    - server.properties
    - eula.txt

::: danger 重要提醒

* 以上文件/文件夹必须位于面板文件管理的**根目录**，如果不是在根目录，请手动**移动**相应文件/文件夹到根目录
* 必须下载 `服务端` ！！！  
你一般下载得到的（自己电脑运行的）客户端 无法 在服务器运行！！！
:::


## 上传服务端压缩包
::: warning  
MCSM 面板**仅支持**压缩和解压 `.zip` 格式的压缩包
请勿上传其他格式
如果你下载得到的服务端是 `.rar/.7z/.tar.gz` 等格式，请手动解压后重新压缩为 `.zip`格式  
:::

### 方式一： 通过网页直接上传  
进入游戏云面板，打开 **文件管理** ,右上角直接上传文件  

### 方式二： 通过SFTP上传（推荐）
相较于网页直接上传，通过SFTP来上传文件会更加稳定  
如果你通过网页上传失败，可尝试用SFTP进行上传  
**软件选择**:   
(1) [WinSCP:](https://winscp.net/eng/index.php) https://winscp.net/eng/index.php  
(2) [FileZilla:](https://filezilla-project.org/) https://filezilla-project.org/  

**连接服务器**:  
(1) 打开雨云面板  
(2) 找到 **SFTP文件管理**  
(3) 复制 **主机**、**用户名**、**密码**、**端口** 到SFTP软件  
(4) 连接成功后，上传压缩包！  

::: warning 请尤其注意：  
请务必确保解压文件到`根目录`，如果解压的文件不在根目录，请手动复制到根目录
:::  

## 解压服务端文件
右键你上传的压缩包，即可完成解压

**编码选择：**  
失败请尝试另一编码
中国大陆（文件内含中文）：`GBK`  
中国香港/澳门/台湾：`BIG5`  
海外地区（文件内无中文）：`UTF-8`   

::: tip  
如果你右键没有出现解压按键，请检查你上传的文件是否是 `.zip` 格式的压缩包！！！  
:::  

## 编辑启动脚本
::: tip
如果你上方安装的是 **基础端**  
此步骤一般可**直接跳过**  
:::

### 第一步：找到服务端自带启动脚本：`.sh`(一般为run.sh/start.sh)  
没有启动脚本找到见下文

### 第二步骤：根据不同核心填写脚本
#### (1.17版本以上)新版Forge/Neoforge
复制 `@libraries/xxxx` 这一块到 启动脚本(可修改).sh  
可得到如下的启动脚本，此默认脚本已经包含内存设置(使用95%的内存)，无需进行调整  
```bash
# 下方编写启动语句，此配置需要自行调整请勿直接复制
java -Xms128M -XX:MaxRAMPercentage=95.0 @libraries/net/minecraftforge/forge/1.20.1-47.4.4/unix_args.txt
```

::: tip  
如果没有找到启动脚本，可直接到 `libraries/net/minecraftforge/forge` (NeoForge 为 `libraries\net\neoforged\neoforge` ) 目录下查看，复制`unix_args.txt`对应的文件路径即可！  
:::  

#### Fabric/老版本Forge/混合端/插件端  
一般服务端根目录存在一个**核心JAR**文件，直接使用 `-jar 核心名.jar` 即可运行  
```bash
# 下方编写启动语句，此配置需要自行调整请勿直接复制
java -Xms128M -XX:MaxRAMPercentage=95.0 -jar fabric-server-mc.1.21.3-loader.0.16.14.jar
```

::: tip 没有找到核心也没有看到libraries？  
方式一：`雨云面板`->`重装/更新游戏`->选择相应的核心->`安装`  
方式二：参照[视频教程](https://www.bilibili.com/video/BV1GTUhBfETs/)，手动安装核心  
:::  