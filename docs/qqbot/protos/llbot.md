# LuckyLilliaBot

LuckyLilliaBot（LLBot）是用于连接 QQ 与机器人框架的协议端。本页由清蒸云鸭整理，覆盖 Linux CLI、Docker Compose 与 Windows Desktop 三种部署方式。

::: info 官方资料
- [项目介绍](https://www.llonebot.com/guide/introduction)
- [快速安装](https://www.llonebot.com/guide/choice_install)
- [配置说明](https://www.llonebot.com/guide/config)
- [框架对接](https://www.llonebot.com/guide/config_framework)
- [常见问题](https://www.llonebot.com/guide/faq)
:::

## 简介

LuckyLilliaBot（LLBot）是一个基于 NTQQ 的 QQ Bot 协议端，可用于对接 AstrBot、MaiBot、NoneBot、Koishi 等机器人框架。

LLBot 提供多种安装方式，常见选择为：

- Linux CLI 版本：适合云服务器，原生运行，无需 Docker
- Docker Compose 版本：适合容器化部署，便于迁移和管理
- Windows Desktop 版本：适合本地 Windows 环境，带图形界面

## Linux CLI 安装

::: tip
推荐使用香港、日本或其他海外服务器。  
CLI 版本支持 `x64` 和 `ARM64`，无需 Docker，直接在服务器本机运行。
:::

### 1. 下载安装包

前往 [GitHub Release 页面](https://github.com/LLOneBot/LuckyLilliaBot/releases) 下载对应架构的安装包：

- x64: `LLBot-CLI-linux-x64.zip`
- ARM64: `LLBot-CLI-linux-arm64.zip`

也可以在服务器上直接下载，例如：

```bash
mkdir -p ~/LLBot
cd ~/LLBot
wget https://github.com/LLOneBot/LuckyLilliaBot/releases/latest/download/LLBot-CLI-linux-x64.zip
```

如果服务器访问 GitHub 较慢，可以自行替换为可用的 GitHub 镜像加速地址。

### 2. 解压文件

```bash
unzip LLBot-CLI-linux-x64.zip
cd ~/LLBot
```

解压后的目录通常包含：

```text
bin/
start.sh
llbot
使用说明.txt
更新日志.txt
```

### 3. 运行启动脚本

```bash
chmod +x start.sh llbot
./start.sh
```

启动脚本会检查运行环境，并在缺少 QQ 时引导安装 LinuxQQ。

### 4. 扫码登录

按照终端提示扫码登录 QQ，或访问 WebUI：

```text
http://localhost:3080
```

如果部署在云服务器上，需要先配置 WebUI 监听地址，见下方“WebUI 配置”。

::: tip 持久化运行
如需在 SSH 断开后继续运行 LLBot CLI，可以使用 screen 创建后台会话。退出当前会话时按 `Ctrl+A`，再按 `D`。
:::

## Docker Compose 安装

::: tip
Docker Compose 版本适合希望容器化管理的用户。  
Linux 和 macOS 均可使用，macOS 建议使用 OrbStack，不建议使用 Docker Desktop。
:::

### 1. 准备 Docker 环境

Linux 用户请先安装 Docker 和 Docker Compose。  
macOS 用户建议安装 OrbStack：

```bash
brew install orbstack
```

### 2. 运行安装脚本

```bash
curl -fsSL https://gh-proxy.com/https://raw.githubusercontent.com/LLOneBot/LuckyLilliaBot/refs/heads/main/script/install-llbot-docker.sh -o llbot-docker.sh
chmod u+x ./llbot-docker.sh
./llbot-docker.sh
```

脚本会自动生成 `docker-compose.yaml`。

### 3. 启动容器

```bash
docker-compose up -d
```

查看日志：

```bash
docker-compose logs -f
```

随后按日志提示扫码登录 QQ，或访问 WebUI：

```text
http://localhost:3080
```

## Windows Desktop 安装

::: tip
Desktop 版本带图形界面，适合 Windows 本地运行。
:::

前往 [GitHub Release 页面](https://github.com/LLOneBot/LuckyLilliaBot/releases) 下载：

```text
LLBot-Desktop-win-x64.zip
```

解压到固定目录后，双击运行：

```text
llbot.exe
```

启动后登录 QQ，LLBot 会自动连接。

::: warning
必须使用 LLBot 拉起的 QQ。  
自己手动打开的 QQ 不会被 LLBot 接管。
:::

## WebUI 配置

LLBot 的 WebUI 默认端口为：`3080`  
默认配置文件通常位于：
```text
LLBot安装目录/bin/llbot/default_config.json
```

如果要让 WebUI 可通过服务器公网 IP 访问，修改：

```json
{
  "webui": {
    "enable": true,
    "host": "0.0.0.0",
    "port": 3080
  }
}
```

修改后需要重启 LLBot。

### WebUI 密码

WebUI 密码明文保存在：

```text
LLBot安装目录/bin/llbot/data/webui_token.txt
```

如果文件不存在，可手动创建并写入一行密码：

```bash
mkdir -p ~/LLBot/bin/llbot/data
echo "你的密码" > ~/LLBot/bin/llbot/data/webui_token.txt
```

写入后重启 LLBot 即可。

## 对接框架

LLBot 支持 OneBot 11、Satori、Milky 等协议方式。  
实际对接方式请以你使用的机器人框架为准。

### AstrBot / MaiBot

1. AstrBot 创建 `反向 WebSocket 客户端`：`ws://127.0.0.1:6199/ws`。
2. MaiBot 创建 `正向 WebSocket 服务器`：
   - Host：同机部署填写 `127.0.0.1`；跨设备连接填写 `0.0.0.0`，并设置强 Token。
   - Port：`3001`，与 MaiBot NapCat 适配器端口保持一致。
   - Token：本机隔离环境可以留空；其他环境应与 MaiBot NapCat 适配器的 Token 保持一致。

如果框架与 LLBot 位于同一台服务器，优先使用 `127.0.0.1`。跨设备连接时，请根据实际网络填写监听地址，并务必设置 Token、限制端口来源。

### NoneBot / Koishi

可以按官方文档使用正向或反向 WebSocket 对接。

具体请参考：

- [框架对接](https://www.llonebot.com/guide/config_framework)

## 更新

### Linux CLI

下载新版 `LLBot-CLI-linux-*.zip` 后覆盖程序文件即可。  
建议更新前备份：

```text
bin/llbot/data
```

该目录中通常包含 WebUI 密码、日志、缓存和运行数据。

### Docker Compose

```bash
docker-compose pull
docker-compose up -d
```

### Windows Desktop

下载新版 `LLBot-Desktop-win-x64.zip`，解压覆盖旧程序目录即可。  
覆盖前建议备份原数据目录。

## 常见问题

> 部分内容整理自官方文档。

### WebUI 已经改为 `0.0.0.0`，为什么还是只能本机访问？

常见原因：

- 修改配置后没有重启 LLBot
- 服务器防火墙未放行 `3080`
- 云服务器安全组未放行 `3080`
- 当前运行的不是你刚刚修改配置的那一份 LLBot

可以检查监听地址：

```bash
ss -tunlp | grep 3080
```

如果仍然看到 `127.0.0.1:3080`，请重启 LLBot 后再检查。

### 启动时报 `Missing X server or $DISPLAY`

说明当前服务器没有可用的图形环境。  
Linux CLI 部署时建议使用启动脚本，或使用无头参数运行：

```bash
./llbot --headless --host=127.0.0.1 --port=13000
```

其中 `--host` 和 `--port` 是 LLBot 与 PMHQ 的内部通信参数，不是 WebUI 的公网监听地址。

### 忘记 WebUI 密码怎么办？

直接修改：

```text
LLBot安装目录/bin/llbot/data/webui_token.txt
```

写入新密码后重启 LLBot。

### 如何退出 screen？

如果你使用 `screen` 后台运行 LLBot，进入窗口后请使用：

```text
Ctrl+A 然后按 D
```

这样可以退出窗口并让 LLBot 保持后台运行。
