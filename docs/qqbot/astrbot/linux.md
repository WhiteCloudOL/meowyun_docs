# Linux 部署

<div class="astrbot-page-lead">
  <span>UV + ASTRBOT CLI</span>
  <p>让 uv 自动准备 Python 3.12 与隔离环境，再通过 AstrBot CLI 初始化、启动和升级实例。</p>
</div>

本页优先介绍官方推荐的包管理器部署方式，同时保留源码部署方案，方便二次开发与问题排查。

::: tip 环境建议
推荐 Ubuntu 22+、Debian 12+ 或同等级 Linux 发行版，资源不低于 `1 核 CPU / 2 GB 内存`。如果希望减少宿主机依赖与迁移成本，请改用 [Docker 部署](./docker)。
:::

## 方案一：uv / CLI 部署 <Badge type="tip" text="推荐" />

### 1. 安装基础工具与 uv

Debian / Ubuntu：

```bash
sudo apt update
sudo apt install -y curl screen
curl -LsSf https://astral.sh/uv/install.sh | sh
```

安装脚本结束后，按照终端提示刷新环境变量，或重新登录 SSH。确认 uv 可用：

```bash
uv --version
```

### 2. 安装 AstrBot CLI

```bash
uv tool install astrbot --python 3.12
astrbot --version
```

`--python 3.12` 会让 uv 为 AstrBot 准备独立的 Python 3.12 环境；系统仓库自带的 Python 版本较旧时，也不必替换系统 Python。

### 3. 初始化工作目录

配置、插件和运行数据会保存在当前工作目录中。建议为实例单独创建目录：

```bash
mkdir -p ~/astrbot-data
cd ~/astrbot-data
astrbot init
```

`astrbot init` 只需要执行一次。以后启动前进入同一个目录即可。

### 4. 前台启动

```bash
cd ~/astrbot-data
astrbot run
```

启动日志出现类似 `🌈 管理面板已启动，可访问` 的提示后，记录本次生成的随机初始密码。

浏览器访问：

```text
http://<服务器 IP 或域名>:6185
```

首次登录用户名通常为 `astrbot`，密码以启动日志为准；登录后应立即修改。

::: warning 远程访问
NAT 主机需要映射实际使用的端口。云服务器还需配置系统防火墙与云安全组，建议只允许可信来源访问 WebUI，不要把管理面板无保护地暴露到公网。
:::

### 5. 使用 screen 后台运行

```bash
screen -S astrbot
cd ~/astrbot-data
astrbot run
```

启动完成后按 `Ctrl+A`，再按 `D`，即可退出 screen 而不终止 AstrBot。

```bash
# 恢复会话
screen -r astrbot

# 查看现有会话
screen -ls
```

生产环境还可以改用 systemd 等进程管理器；无论选择哪种方式，都应保证启动时的工作目录始终是 `~/astrbot-data`。

### 6. 更新与密码恢复

通过 uv 安装的 AstrBot **不能通过 WebUI 更新本体**，请在命令行执行：

```bash
uv tool upgrade astrbot --python 3.12
```

忘记 WebUI 密码时，先停止正在运行的实例，再在工作目录中重置：

```bash
cd ~/astrbot-data
astrbot run --reset-password
```

新密码会打印在启动日志中。登录后请重新设置长期使用的强密码。

## 方案二：源码部署 <Badge type="info" text="进阶" />

源码方式适合需要调试、修改或跟踪上游代码的用户。不要直接在系统 Python 中安装依赖，推荐继续使用 uv 管理项目环境。

```bash
sudo apt update
sudo apt install -y git curl screen
curl -LsSf https://astral.sh/uv/install.sh | sh

git clone https://github.com/AstrBotDevs/AstrBot.git
cd AstrBot
uv sync
uv run main.py
```

安装插件后，后续启动可使用 `--no-sync`，避免每次运行都重新同步项目依赖：

```bash
cd ~/AstrBot
uv run --no-sync main.py
```

::: details 使用 Python venv 的兼容流程
如果当前环境不便安装 uv，也可以使用受支持的 Python 创建虚拟环境：

```bash
cd ~/AstrBot
python3 -m venv venv
source venv/bin/activate
python -m pip install -r requirements.txt
python main.py
```

中国大陆网络下载较慢时，可为单次安装显式指定可信镜像，避免永久修改全局 pip 配置：

```bash
python -m pip install -r requirements.txt \
  -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```
:::

### 源码更新

更新前先备份 `data/`，停止 AstrBot，再执行：

```bash
cd ~/AstrBot
git pull --ff-only
uv sync
uv run main.py
```

如忘记密码，可使用 `uv run main.py --reset-password` 重新生成初始密码。

## 配置模型与消息平台

1. 登录 AstrBot WebUI，先在服务提供商页面配置模型 API，并完成连接测试。
2. 进入 `机器人`，创建并启用所需消息平台实例。
3. 使用 QQ 个人号时，选择 `OneBot v11`；默认反向 WebSocket 端口为 `6199`。
4. 在 NapCat 等协议端填写 `ws://<AstrBot 地址>:6199/ws`，Token 必须与 AstrBot 设置保持一致。
5. 返回 AstrBot 控制台，确认出现 `aiocqhttp(OneBot v11) 适配器已连接`，再发送测试消息。

::: info 完成标准
WebUI 可登录只代表 AstrBot 本体已经启动。模型测试通过、消息平台显示已连接，并且真实消息能够正常收发，才算完成部署。
:::
