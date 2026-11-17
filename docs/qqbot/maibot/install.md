---
title: MaiBot 安装与部署教程
description: 通过 MaiBot Manager TUI 或手动方式部署 MaiBot，完成环境准备、程序安装和首次启动。
---

# MaiBot 部署指南

::: tip 部署建议
Linux 服务器环境是长期运行 MaiBot 的最佳选择。MaiBot 兼容多种接入方式，您可以根据需求选择 [普通 QQ 账号](/qqbot/maibot/adapters/onebot) 或 [QQ 官方机器人](/qqbot/maibot/adapters/qq-official)（后者无需额外配置协议端）。
:::

## MaiBot Manager TUI 自动管理 <Tag /> {#maibot-manager-tui}

[MaiBot Manager TUI](https://github.com/WhiteCloudOL/MaiBot-Manager-TUI) 是一款跨平台（Linux/Windows/macOS）的一站式工具，能够自动化完成安装、更新、服务管理、协议配置及插件维护，推荐新手优先使用。

### 1. 安装工具
根据您的系统运行对应安装命令：

**Linux / macOS**
```bash
# 国内环境
curl -fsSL https://dl.meowyun.cn/bot/mmtui/install.sh | bash

# 海外环境
curl -fsSL https://raw.githubusercontent.com/WhiteCloudOL/MaiBot-Manager-TUI/main/scripts/install.sh | bash
```

**Windows 10/11**
```powershell
# 国内环境
irm https://dl.meowyun.cn/bot/mmtui/install.ps1 | iex

# 海外环境
irm https://raw.githubusercontent.com/WhiteCloudOL/MaiBot-Manager-TUI/main/scripts/install.ps1 | iex
```

安装完成后，重启终端即可在任意目录下运行 `maibot` 进入管理界面。

### 2. 使用流程
1. **安装环境**：进入 `部署与更新` 页面，保持默认推荐配置（安装目录 `~/maimai`），按 `F5` 执行安装。
2. **启动服务**：安装完成后，在 `核心服务管理` 中启动 MaiBot。首次启动如提示确认用户协议，请进入交互式终端完成确认。
3. **配置访问**：若是云服务器部署，请在 `设置` 中打开 `初始化访问配置`，以绑定 `0.0.0.0` 实现远程访问。
4. **生效配置**：回到 `核心服务管理` 重启 MaiBot。

完成后，可在 `设置 → 访问汇总` 查看 WebUI 地址和登录信息。详细操作见 [WebUI 访问与登录](/qqbot/maibot/config/webui)。

::: warning 安全提示
将 WebUI 绑定到 `0.0.0.0` 会暴露端口，请确保设置了强力的访问令牌，并配置服务器防火墙或安全组以限制访问源 IP。
:::

### 3. TUI 功能概览
| 功能模块 | 说明 |
| :--- | :--- |
| **概览** | 查看 MaiBot 及协议端运行状态 |
| **部署与更新** | 管理安装路径、分支及协议端安装 |
| **核心服务管理** | 启停核心、查看日志及交互式终端 |
| **插件中心** | 插件管理与依赖修复 |
| **设置** | WebUI 访问绑定及策略配置 |

---

## 备选方案

### Linux 脚本自动部署
::: danger 注意
自动部署脚本目前处于**消极维护**状态，建议优先使用上述 TUI 管理器。
:::

```bash
# 国内下载并执行
curl -o maibot.sh https://dl.meowyun.cn/bot/bash/maibot.sh && bash maibot.sh

# 海外下载并执行
curl -o maibot.sh https://raw.githubusercontent.com/WhiteCloudOL/Qbot-StartScripts/refs/heads/main/maibot.sh && bash maibot.sh
```

### Linux 原生手动部署
适用于对环境有特定控制需求的用户，需 Python 3.12+。

1. **准备依赖**：`apt update && apt install -y build-essential git nano vim`
2. **安装 uv**：`curl -LsSf https://astral.sh/uv/install.sh | sh`
3. **克隆源码**：`git clone https://github.com/Mai-with-u/MaiBot.git`
4. **环境搭建**：执行 `cd MaiBot` 进入源码目录，再运行 `uv venv --python 3.12` 创建虚拟环境。
5. **项目同步**：运行 `uv sync` 安装依赖（若网络缓慢，建议配置 `UV_INDEX_URL` 镜像源）。

部署完成后，请继续阅读 [配置与启动](/qqbot/maibot/config/conf)。
