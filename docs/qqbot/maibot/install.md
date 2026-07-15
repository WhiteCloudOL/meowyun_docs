# MaiBot 部署

::: tip 部署平台建议
Linux 通常占用更少的系统资源，也更适合云服务器长期运行 MaiBot 与 QQ 协议端。无论选择哪种平台，都应使用专用 QQ 账号并遵守平台规则；部署方式本身不能完全消除账号风控风险。
:::

## MaiBot Manager TUI 自动管理（推荐）
> 开源地址：https://github.com/WhiteCloudOL/MaiBot-Manager-TUI  
> 许可证：AGPL-3.0  

MaiBot Manager TUI 是面向 Linux、Windows 10/11 与 macOS 的一站式部署和运维工具。它可以完成 MaiBot 安装 / 更新、核心服务启停、协议端管理、访问配置和插件管理；安装后既可以进入图形化终端界面，也可以用 `maibot ...` 命令直接执行 CLI 操作。

::: info 推荐使用 TUI
如果你是第一次部署 MaiBot，建议优先使用这一方式。新版界面采用顶部标题、左侧导航、主内容区和底部状态栏的布局，所有快捷键都会统一显示在底部，不需要在旧式菜单里来回猜选项含义。
:::

### 1. 安装 MaiBot Manager TUI

如您为 Linux 云服务器安装，请使用 `Linux / macOS` 安装方式：

**Linux / macOS：**

```bash  
# 国内安装  
curl -fsSL https://dl.meowyun.cn/bot/mmtui/install.sh | bash

# 海外安装  
curl -fsSL https://raw.githubusercontent.com/WhiteCloudOL/MaiBot-Manager-TUI/main/scripts/install.sh | bash
```  

**Windows 10/11：**

```powershell
# 国内安装
irm https://dl.meowyun.cn/bot/mmtui/install.ps1 | iex

# 海外安装
irm https://raw.githubusercontent.com/WhiteCloudOL/MaiBot-Manager-TUI/main/scripts/install.ps1 | iex
```

::: tip 想要手动下载管理程序？
可以前往 [MaiBot Manager TUI 仓库](https://github.com/WhiteCloudOL/MaiBot-Manager-TUI) 下载与系统架构匹配的 release 文件。
:::  

安装完成后重启终端，或重新加载当前 shell 的环境变量，即可在任意目录执行 `maibot`。

### 2. 打开 TUI 面板

```bash
# 执行这个命令即可，无论你所在哪个目录
maibot

# 或显式进入 TUI
maibot tui
```

进入后左侧侧边栏会显示这些入口：

| 入口 | 用途 |
| --- | --- |
| `概览` | 查看 MaiBot、协议端和插件状态 |
| `部署与更新` | 配置安装目录、分支、Python 环境、协议端并执行安装 / 更新 |
| `核心服务管理` | 启动、停止、重启 MaiBot 核心，查看日志或进入交互终端 |
| `协议端服务` | 管理 NapCatQQ / LuckyLilliaBot，macOS 会显示当前平台能力说明 |
| `插件中心` | 安装、卸载插件并修复依赖 |
| `设置` | 查看访问汇总、初始化 WebUI 访问配置和 Adapter 策略 |
| `关于` | 查看版本、文档与运行环境信息 |

底部状态栏会根据当前页面显示可用快捷键。常用按键如下：

| 按键 | 功能 |
| --- | --- |
| `↑` / `↓` | 在当前列表、表格或配置选项中移动 |
| `←` / `→` | 在部署页切换配置项；在弹窗中切换操作按钮 |
| `Tab` / `Shift+Tab` | 在侧边栏与内容区之间切换 |
| `Enter` | 打开当前项、确认弹窗操作，或编辑部署路径 |
| `F5` | 在部署页开始安装 / 更新 |
| `Ctrl+R` | 在部署页恢复推荐默认配置 |
| `Ctrl+1` | 快速回到侧边栏 |
| `Esc` | 返回上一级或关闭弹窗 |
| `Ctrl+Q` / `Ctrl+C` | 退出 TUI 并恢复终端 |

### 3. 推荐安装流程

1. 进入 `部署与更新`。
   使用 `←` / `→` 在安装目录、分支、安装模式、Python 环境、虚拟环境、GitHub 线路、PyPI 源和协议端之间切换；使用 `↑` / `↓` 调整当前配置项。
   一般保持推荐默认值即可：安装目录为 `~/maimai`，Python 环境为 `uv`，Linux / Windows 默认安装 NapCatQQ；macOS 当前默认不安装协议端。

2. 确认配置后按 `F5` 开始安装 / 更新。
   如果网络较慢，程序会对 GitHub 官方线路和镜像源做测速，并自动选择更合适的线路。

3. 安装完成后进入 `核心服务管理`，先启动一次 MaiBot。
   首次启动如果需要确认 EULA，请选择交互终端方式完成确认；如果没有选择，程序会在倒计时后默认后台启动。

4. 云服务器部署建议进入 `设置`，打开 `初始化访问配置`。
   该操作会把 MaiBot WebUI 绑定到 `0.0.0.0`，方便从其他设备访问；访问地址和密钥可以通过 `访问汇总` 查看。新版 TUI 会直接在当前界面用居中弹窗展示访问汇总，不会跳到空白页或旧式回车返回页面。

5. 回到 `核心服务管理`，重启一次 MaiBot，让访问配置完整生效。

::: warning 警告  
将 WebUI 绑定到 `0.0.0.0` 后，端口可能暴露到公网。请务必设置足够强的访问令牌，并配合服务器防火墙或安全组限制来源 IP。
:::

### 4. 平台差异说明

- **Linux**：MaiBot / LLBot 使用 `screen` 后台会话，NapCatQQ 使用 Docker 容器；适合云服务器长期运行。
- **Windows**：MaiBot 会在独立窗口运行；NapCat Shell 和 LLBot Desktop 启动时可能请求管理员权限。缺少 Git / uv / Python 时，管理器会优先把便携工具放到 MaiBot 安装目录下，不污染系统环境。
- **macOS**：当前支持 MaiBot 核心、访问配置和插件管理；NapCatQQ / LuckyLilliaBot 会保留清晰的说明入口，安装计划默认不安装协议端。

::: tip 响应速度说明
新版 TUI 在列表移动和普通弹窗打开时会使用缓存重绘，不会每次按键都重新探测服务状态。访问汇总只会在你明确打开时读取相关信息，公网 IP 也只在确实需要外部地址时查询。
:::


## Linux 脚本自动部署

::: danger 注意
自动脚本目前**消极维护**，请优先使用上述 `MaiBot Manager TUI` 自动部署。
:::

自动脚本支持 Debian 12/13、Ubuntu 22.04/24.04 及更高兼容版本，可集中完成 MaiBot 的部署与常用管理操作。

```bash  
# 国内下载
curl -o maibot.sh https://dl.meowyun.cn/bot/bash/maibot.sh && bash maibot.sh

# 海外下载
curl -o maibot.sh https://raw.githubusercontent.com/WhiteCloudOL/Qbot-StartScripts/refs/heads/main/maibot.sh && bash maibot.sh
```  

::: tip 后续运行与更新
如果首次下载时位于 `~`（例如 `/root/`），后续执行 `bash ~/maibot.sh` 即可再次打开脚本，无需重复下载。需要更新脚本时，请在原下载目录重新执行上方对应的下载命令。
:::

## Linux 原生手动部署


::: tip 环境要求
以下命令按具有 root 权限的环境编写；普通用户遇到权限不足时，请在相应命令前添加 `sudo`。开始前请确认系统 Python 版本不低于 3.10。本节适用于 Ubuntu 22.04/24.04、Debian 12/13 及其兼容版本。
:::


1. 安装系统依赖（支持 Debian 12/13+、Ubuntu 22.04/24.04+）。
```bash
# 更新软件源
apt update
# 下载所需软件包
apt install -y build-essential git nano vim
```

2. 安装 uv。
```bash
# 使用官方独立安装程序一键安装  
curl -LsSf https://astral.sh/uv/install.sh | sh  
```

3. 从 MaiBot 仓库获取源码。

```bash
# 创建文件夹
mkdir maimai
# 进入文件夹
cd maimai

# 从官方仓库克隆 MaiBot
git clone https://github.com/MaiM-with-u/MaiBot.git

# 与上方命令二选一；官方线路不可用时可尝试镜像线路
git clone https://gh-proxy.org/https://github.com/MaiM-with-u/MaiBot.git

```

完成后返回 MaiBot 主目录。

```bash
cd ..
```

4. 创建 Python 虚拟环境。
```bash  
# 确保当前位于 maimai/MaiBot 目录

# 创建 uv 虚拟环境
uv venv
```  

5. 安装 Python 项目依赖。
  
::: tip

如果服务器访问默认 PyPI 源较慢，可按需切换至阿里云镜像。
```bash
# 仅对当前 shell 临时生效
export UV_INDEX_URL="https://mirrors.aliyun.com/pypi/simple"

# 写入 Bash 配置并长期生效
echo 'export UV_INDEX_URL="https://mirrors.aliyun.com/pypi/simple"' >> ~/.bashrc
source ~/.bashrc
```
:::

```bash
# 确保当前位于 maimai/MaiBot 目录
uv sync
```

6. 依赖安装完成后，继续阅读[配置与启动](conf.md)。
