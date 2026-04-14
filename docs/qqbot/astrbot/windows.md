# Windows 部署

::: tip
**本页部分文案参考官方文档使用AI生成**  
本教程将指导您从零开始在 Windows 环境下部署 AstrBot，包含 Python 安装、源码获取以及启动的完整全过程。
:::

## 1. 环境准备：安装 Python

AstrBot 需要 Python 3.12 及以上版本才能运行。如果您尚未安装 Python，请按照以下步骤操作：

1. 访问 [Python 官方下载页面](https://www.python.org/downloads/windows/)。
2. 下载最新的 Python 3 版本的 Windows installer（比如`3.14.4`）。
::: tip Python3.14.4 For Windows x64
下载地址：https://www.python.org/ftp/python/3.14.4/python-3.14.4-amd64.exe  
:::
1. **重要提示**：运行安装程序时，请务必勾选底部的 **"Add python.exe to PATH"** 选项。
2. 点击 "Install Now" 完成安装。

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
*(注意：有时可能是 `python3` 而不是 `python`)*

2. **激活虚拟环境**
```cmd
venv\Scripts\activate
```
*(激活成功后，您会在终端的命令行开头看到类似 `(venv)` 的标识)*

3. **安装依赖文件**
安装过程可能需要花费一些时间，这里使用清华镜像源加速下载：
```cmd
python -m pip install -r requirements.txt -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```

4. **运行 AstrBot**
```cmd
python main.py
```

## 🎉 大功告成！

如果一切顺利，您会在终端看到 AstrBot 打印出的日志。
如果没有报错，您会看到一条日志显示类似 `🌈 管理面板已启动，可访问` 并附带了几条链接。

### 进入控制台

打开浏览器，访问以下链接进入 AstrBot 管理面板：
👉 **`http://localhost:6185`**

::: info
* 默认的用户名和密码均为 **`astrbot`**。
* 登录后建议按要求修改密码以保证安全。
* 如果您是在云服务器上部署，需要将 `localhost` 替换为服务器的公网 IP 地址。
:::

接下来，您需要前往控制台配置大模型 API 并部署消息平台（例如使用 Napcat 接入 QQ），具体可参考控制台内的提示或前往 [AstrBot 官方文档](https://docs.astrbot.app/) 查看。
