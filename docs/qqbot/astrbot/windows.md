# Windows 部署

本页介绍在 Windows 上通过 Python 虚拟环境部署 AstrBot 的完整流程，适合本地测试或桌面环境运行。

::: tip
本页部分内容基于官方文档整理并使用 AI 辅助润色，涵盖 Python 安装、源码获取和程序启动。
:::

## 1. 环境准备：安装 Python

AstrBot 需要 Python 3.12 及以上版本才能运行。如果您尚未安装 Python，请按照以下步骤操作：

1. 访问 [Python 官方下载页面](https://www.python.org/downloads/windows/)。
2. 下载适用于当前系统架构的 Python 3 Windows installer，例如 `3.14.4`。
::: tip Python3.14.4 For Windows x64
下载地址：https://www.python.org/ftp/python/3.14.4/python-3.14.4-amd64.exe  
:::
3. 运行安装程序时，务必勾选底部的 **Add python.exe to PATH**。
4. 点击 **Install Now** 完成安装。

验证安装是否成功：
打开终端（按 `Win + R`，输入 `cmd` 后回车），输入以下命令：
```cmd
python --version
```
如果能看到类似 `Python 3.1x.x` 的输出，说明安装成功。

## 2. 获取 AstrBot 源码

您可以通过 Git 克隆或者直接下载压缩包来获取源码。

### 选项 A：使用 Git（推荐）
如果您安装了 [Git](https://git-scm.com/downloads)，可以直接在您想要存放代码的目录下右键选择 "Open in Terminal" 或打开 cmd 执行：

```cmd
git clone https://github.com/AstrBotDevs/AstrBot.git
cd AstrBot
```

### 选项 B：下载压缩包
1. 访问 [AstrBot GitHub 仓库](https://github.com/AstrBotDevs/AstrBot)。
2. 点击绿色的 `<> Code` 按钮，选择 **Download ZIP**。
3. 将下载的压缩包解压到一个您容易找到的文件夹中。
4. 打开解压后的文件夹，**点击顶部的文件路径地址栏，输入 `cmd` 并按下回车**，这将在当前目录打开一个终端窗口。

## 3. 安装依赖并运行

推荐使用 Python 的虚拟环境（venv）来安装 AstrBot，这样可以避免与您设备上的其他 Python 项目环境发生冲突。

在 AstrBot 源码目录的终端中，依次执行以下命令：

1. **创建虚拟环境**
```cmd
python -m venv ./venv
```
> 如果系统无法识别 `python`，请尝试使用 `python3`。

2. **激活虚拟环境**
```cmd
venv\Scripts\activate
```
> 激活成功后，命令行开头会出现类似 `(venv)` 的标识。

3. **安装依赖文件**
安装过程可能需要花费一些时间，这里使用清华镜像源加速下载：
```cmd
python -m pip install -r requirements.txt -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

4. **运行 AstrBot**
```cmd
python main.py
```

## 4. 完成部署

如果一切顺利，终端会持续显示 AstrBot 运行日志。请保持该终端窗口开启；关闭窗口会同时终止 AstrBot 进程。

启动完成后，日志中会出现类似 `🌈 管理面板已启动，可访问` 的提示，并附带一个或多个管理面板地址。打开其中适合当前网络环境的地址即可。

### 进入控制台

在本机部署时，可以直接访问：

```text
http://localhost:6185
```

::: tip 服务器部署
如果 AstrBot 运行在服务器上，请将 `localhost` 替换为服务器公网 IP 或已解析的域名，并确认防火墙和安全组已放行实际使用的端口。
:::

::: warning 首次登录密码
首次登录时，用户名通常为 `astrbot`，密码不是固定值。请在本次启动日志中查找 AstrBot 打印的**随机初始密码**，使用该密码登录，并在进入管理面板后立即修改。
:::

登录后，请配置大模型 API，并至少部署一个消息平台，才能在对应平台上使用 AstrBot。例如，可通过 NapCat 接入 QQ。具体步骤可参考控制台提示或 [AstrBot 官方文档](https://docs.astrbot.app/)。
