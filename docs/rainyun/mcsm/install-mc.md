---
title: 安装 Minecraft 服务端
editLink: false

---

# 安装 Minecraft 服务端

本页介绍整合包服务端的下载、上传、解压和启动脚本配置流程。开始前请先完成[运行环境安装](install-env.md)。

## 下载整合包服务端

从 CurseForge、Modrinth、作者网盘或 BBSMC 等可信来源下载服务端文件。

服务端压缩包通常包含以下内容：

- `mods/` 或 `plugins/`
- `config/`
- `*.sh` 或 `*.bat`
- `user_jvm_args.txt`
- `server.properties`
- `eula.txt`

::: danger 重要提醒

- 上述文件和目录必须位于面板文件管理的**根目录**。如果解压后多出一层目录，请手动将内容移动到根目录。
- 必须下载**服务端包**。通常在个人电脑上直接运行的客户端包不能作为服务器运行。
:::


## 上传服务端压缩包
::: warning  
MCSM 面板仅支持直接压缩和解压 `.zip` 文件。若下载的是 `.rar`、`.7z` 或 `.tar.gz`，请先在本地解压，再重新压缩为 `.zip` 后上传。
:::

### 方式一：通过网页上传

进入游戏云面板并打开**文件管理**，点击右上角的上传按钮选择文件。

### 方式二：通过 SFTP 上传（推荐）

SFTP 通常比网页上传更稳定，适合体积较大的服务端压缩包。网页上传失败时也可改用此方式。

**可选软件：**

1. [WinSCP](https://winscp.net/eng/index.php)
2. [FileZilla](https://filezilla-project.org/)

**连接步骤：**

1. 打开雨云面板。
2. 找到**SFTP 文件管理**。
3. 将页面提供的**主机、用户名、密码和端口**填写到 SFTP 客户端。
4. 建立连接后上传压缩包。

::: warning 解压位置
务必将服务端文件解压到面板根目录。如果内容位于额外的子目录中，请将子目录内的文件移动到根目录。
:::  

## 解压服务端文件
在文件管理中右键已上传的 `.zip` 压缩包，选择解压。

**编码选择：** 如果解压失败或文件名乱码，可尝试其他编码。

- 中国大陆且文件名包含中文：`GBK`
- 中国香港、澳门或台湾：`BIG5`
- 海外地区或文件名不含中文：`UTF-8`

::: tip  
如果右键菜单中没有解压选项，请确认上传的文件为 `.zip` 格式。
:::  

## 编辑启动脚本
::: tip
如果此前安装的是**基础端**，通常可以直接跳过本节。
:::

### 第一步：查找服务端启动脚本

查找服务端自带的 `.sh` 启动脚本，文件名通常为 `run.sh` 或 `start.sh`。未找到时继续参考下文手动生成命令。

### 第二步：根据服务端核心填写脚本

#### Minecraft 1.17 以上的新版 Forge / NeoForge

将原脚本中的 `@libraries/xxxx` 参数复制到“启动脚本（可修改）.sh”。以下示例已经通过 `-XX:MaxRAMPercentage=95.0` 将最大内存设置为可用内存的 95%，通常无需额外调整。
```bash
# 示例路径需要根据实际 Forge 版本调整，请勿直接复制
java -Xms128M -XX:MaxRAMPercentage=95.0 @libraries/net/minecraftforge/forge/1.20.1-47.4.4/unix_args.txt
```

::: tip  
如果没有找到启动脚本，可进入 `libraries/net/minecraftforge/forge`；NeoForge 对应目录为 `libraries/net/neoforged/neoforge`。找到实际版本目录后，复制 `unix_args.txt` 的相对路径。
:::  

#### Fabric、旧版 Forge、混合端或插件端

此类服务端的根目录通常包含一个核心 JAR 文件，可通过 `-jar <核心文件名>.jar` 启动。
```bash
# 核心文件名需要按实际文件调整，请勿直接复制
java -Xms128M -XX:MaxRAMPercentage=95.0 -jar fabric-server-mc.1.21.3-loader.0.16.14.jar
```

::: tip 未找到核心或 `libraries/`
1. 进入`雨云面板` → `重装 / 更新游戏`，选择相应核心并安装。
2. 参考[视频教程](https://www.bilibili.com/video/BV1GTUhBfETs/)手动安装核心。
:::  

## 使用 AI 辅助整理启动脚本

如果仍无法确定启动命令，可以使用 [DeepSeek](https://chat.deepseek.com/)、[豆包](https://www.doubao.com/chat/)或[通义千问](https://www.qianwen.com/)辅助提取原脚本中的有效参数。

复制以下提示词，并在末尾粘贴原启动脚本：

```text
下面我将给出一个Minecraft服务器的启动脚本，可能是任意版本的，有@win_args.txt/unix_args.txt，如果是win_args.txt请改为unix_args.txt，也有是-jar xxx.jar，请忽略其他文本（不要忽略优化参数），添加`java -Xms128M -XX:MaxRAMPercentage=95.0`，使用95%内存，系统java路径为`java`，生成形如：`java -Xms128M -XX:MaxRAMPercentage=95.0 -jar fabric-server-mc.1.21.3-loader.0.16.14.jar`或`java -Xms128M -XX:MaxRAMPercentage=95.0 @libraries/net/minecraftforge/forge/1.20.1-47.4.4/unix_args.txt`的单行启动命令，不要添加其他无关内容

脚本：
<在这里直接粘贴你的原有start.sh/start.bat/run.sh/run.bat的所有内容>
```

::: warning 人工核对
AI 生成的命令必须人工核对核心文件名、`unix_args.txt` 路径和 JVM 参数。执行前建议保留原启动脚本作为备份。
:::
