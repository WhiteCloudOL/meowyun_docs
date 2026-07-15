# Linux 手动部署

本页介绍在 Linux 宿主机上直接部署 AstrBot 的流程，适合需要自行管理 Python 环境、依赖和后台进程的用户。
::: tip  
建议系统：Ubuntu 22+、Debian 12+ 或 CentOS 9+。其他系统需要自行配置 Python；使用 Docker 时可忽略该要求。建议配置不低于 1 核 CPU、2 GB 内存。
:::  


## 部署 AstrBot

以下为手动部署流程。
::: danger  
该方式需要具备基本的 Linux 与 Python 环境管理能力。初次部署建议选择 [Docker 部署](./docker)。
:::
1. 检查环境，确认 Python 版本不低于 `3.12`。
```bash
python3 --version
```

2. 安装系统依赖（以 Debian 12 为例）。
```bash
sudo apt update # 更新软件源
# 可选：更新已安装的软件包，避免版本过低
sudo apt install -y python3-full python3-dev python3-venv python3-pip  # 安装完整 Python 环境
sudo apt install -y git screen # 安装 Git 与 screen

# 中国大陆网络环境可将 PyPI 源切换为阿里云镜像
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
pip config set install.trusted-host mirrors.aliyun.com
```

3. 获取 AstrBot 官方源码。
```bash
# 全球、海外或港澳台线路
git clone https://github.com/AstrBotDevs/AstrBot.git

# 中国大陆镜像线路一；与上方命令二选一
git clone https://gh-proxy.com/https://github.com/AstrBotDevs/AstrBot.git

# 中国大陆镜像线路二；与上方命令二选一
git clone https://cdn.gh-proxy.com/https://github.com/AstrBotDevs/AstrBot.git
```

更多可用线路可参考 <https://github.akams.cn/>。镜像服务由第三方提供，使用前请自行评估其可用性与安全性。

4. 创建并激活 Python 虚拟环境，避免污染系统级 Python 依赖。
```bash
cd AstrBot # 进入 AstrBot 目录
python3 -m venv venv # 在 AstrBot/venv 中创建虚拟环境
source venv/bin/activate # 激活虚拟环境
```

5. 安装 Python 依赖。
```bash
# 确保当前位于 AstrBot 目录并已激活虚拟环境
pip install -r requirements.txt # 安装依赖

# 下载较慢时可显式使用阿里云镜像
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple # 使用阿里源安装依赖
```

6. 创建启动脚本。
```bash
touch start.sh # 新建启动文件
vim start.sh # 编辑启动文件
```
在 vim 中按 `I` 进入编辑模式，输入以下内容：
```vim
source venv/bin/activate
python3 main.py
```
完成后按 `Esc`，输入 `:wq` 并回车保存退出。

7. 启动 AstrBot。

::: info 后台运行
下例使用 screen 保持后台会话。断开会话时按 `Ctrl+A`，再按 `D`；恢复会话可执行 `screen -r astrbot`。
:::
```bash
screen -S astrbot # 创建名为 astrbot 的 screen 会话
bash start.sh # 执行启动脚本
```
等待启动完成后，按 `Ctrl+A`，再按 `D` 退出 screen 会话。

8. 进入 AstrBot 控制台。

启动完成后，终端日志中会出现类似 `🌈 管理面板已启动，可访问` 的提示，并打印管理面板地址和随机初始密码。如果已经退出 screen 会话，可执行以下命令返回并查看日志：

```bash
screen -r astrbot
```

在浏览器中访问 `http://<服务器 IP>:6185/`。首次登录用户名通常为 `astrbot`，密码请以启动日志中打印的随机初始密码为准；登录后应立即修改。

> NAT 机型需要先将内网 `6185` 端口映射到可用的外网端口。请在服务器防火墙和云平台安全组中放行实际使用的端口，并尽量限制来源 IP。

## 配置 AstrBot

1. 访问 AstrBot 控制台：`http://<服务器 IP>:6185/`。
<img src="https://img.cdn1.vip/i/68ad664d94b17_1756194381.webp" alt="控制台" title="控制台" />  

2. 接入 QQ：依次进入 `消息平台` → `新增适配器` → `接入 QQ 个人号（aiocqhttp）`，保留默认选项并勾选启用。

::: warning 公网连接安全
如果适配器绑定到 `0.0.0.0`，请设置强 Token，并在 NapCat 端填写相同的 Token；同时限制防火墙与安全组的来源地址。
:::  

3. 参考 [AstrBot 官方文档](https://docs.astrbot.app/deploy/platform/aiocqhttp/napcat.html) 完成平台适配器配置。

4. 在 `服务提供商` 页面配置大模型 API，并至少部署一个消息平台。完成后发送测试消息，验证完整消息链路。
