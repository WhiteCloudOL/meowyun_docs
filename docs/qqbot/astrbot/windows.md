# Windows 部署

<div class="astrbot-page-lead">
  <span>WINDOWS · LOCAL SETUP</span>
  <p>使用 uv 自动管理 Python 3.12 与 AstrBot CLI，减少手动配置 PATH、虚拟环境和依赖版本造成的问题。</p>
</div>

Windows 适合本地体验、调试与轻量运行。需要长期部署到服务器时，更建议使用 [Docker](./docker) 或 [Linux](./linux) 方案。

## 方案一：uv / CLI 部署 <Badge type="tip" text="推荐" />

### 1. 安装 uv

打开 PowerShell，执行 uv 官方安装命令：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

安装完成后重新打开终端，验证：

```powershell
uv --version
```

### 2. 安装 AstrBot CLI

```powershell
uv tool install astrbot --python 3.12
astrbot --version
```

uv 会为 AstrBot 单独准备 Python 3.12。无需再下载文档中写死的某个 Python 安装包，也不会覆盖系统中已有的 Python 环境。

### 3. 初始化实例

选择一个固定目录保存配置、插件与运行数据：

```powershell
mkdir "$HOME\AstrBot-Data"
cd "$HOME\AstrBot-Data"
astrbot init
```

同一工作目录只需初始化一次。以后启动时进入该目录执行：

```powershell
cd "$HOME\AstrBot-Data"
astrbot run
```

保持终端窗口开启；关闭窗口会同时终止 AstrBot。

## 进入管理面板

启动日志出现类似 `🌈 管理面板已启动，可访问` 的提示后，在本机打开：

```text
http://localhost:6185
```

::: warning 首次登录密码
用户名通常为 `astrbot`，初始密码不是固定值。请使用本次启动日志中打印的**随机初始密码**登录，并立即在 WebUI 中修改。
:::

如果 AstrBot 运行在其他 Windows 主机上，将 `localhost` 替换为该主机的局域网 IP 或域名，并仅对可信网络开放端口。

## 更新与密码恢复

通过 uv 安装的 AstrBot 不支持在 WebUI 中更新本体。关闭正在运行的 AstrBot 后，在 PowerShell 执行：

```powershell
uv tool upgrade astrbot --python 3.12
```

忘记 WebUI 密码时，在实例工作目录启动重置流程：

```powershell
cd "$HOME\AstrBot-Data"
astrbot run --reset-password
```

新生成的密码会打印在日志中。

## 方案二：源码部署 <Badge type="info" text="进阶" />

源码部署适合二次开发、调试或跟踪上游更新。推荐使用 Git 与 uv；如不使用 Git，也可以下载 ZIP。

### 获取源码

::: code-group

```powershell [Git]
git clone https://github.com/AstrBotDevs/AstrBot.git
cd AstrBot
```

```text [ZIP]
1. 打开 AstrBot GitHub 仓库，点击 Code → Download ZIP。
2. 将压缩包解压到固定目录。
3. 在资源管理器地址栏输入 powershell 并回车，在当前目录打开终端。
```

:::

如果尚未安装 Git，可从 [Git 官方网站](https://git-scm.com/downloads/win) 获取 Windows 安装程序。

### 安装依赖并运行

```powershell
uv sync
uv run main.py
```

安装插件后，后续启动可使用：

```powershell
uv run --no-sync main.py
```

::: details 使用 Python venv 的兼容流程
确实需要手动管理 Python 时，请从 [Python 官方下载页](https://www.python.org/downloads/windows/) 选择当前仍受支持的版本，并在安装时勾选 **Add python.exe to PATH**。不要在文档中绑定某个未来会过时的补丁版本。

```powershell
python --version
python -m venv .\venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python main.py
```

如果 PowerShell 阻止激活脚本，可在当前窗口临时放行后重试：

```powershell
Set-ExecutionPolicy -Scope Process Bypass
```

中国大陆网络下载较慢时，可仅为本次安装指定镜像：

```powershell
python -m pip install -r requirements.txt `
  -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple
```
:::

### 更新源码

更新前备份 `data/`，停止 AstrBot，再执行：

```powershell
git pull --ff-only
uv sync
uv run main.py
```

忘记源码部署实例的密码时，可执行 `uv run main.py --reset-password`。

## 配置模型与消息平台

1. 登录 WebUI，在服务提供商页面配置模型 API，并完成连通性测试。
2. 至少创建并启用一个消息平台实例，否则 AstrBot 无法接收外部平台消息。
3. 通过 NapCat 接入 QQ 时，在 AstrBot 中创建 `OneBot v11` 实例，再让 NapCat 连接 `ws://<AstrBot 地址>:6199/ws`。
4. 在 AstrBot 控制台确认协议端已连接后，发送一条真实消息验证回复链路。

::: tip 本机联调
AstrBot 与 NapCat 都运行在同一台 Windows 电脑时，NapCat 可连接 `ws://127.0.0.1:6199/ws`。如果其中一端运行在 Docker 容器内，`127.0.0.1` 只指向该容器自身，需要改用宿主机地址或 Docker 服务名。
:::
