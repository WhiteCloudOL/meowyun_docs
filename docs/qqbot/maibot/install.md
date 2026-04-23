# MaiBot部署  

::: tip  
由于linux天生占用资源更少，napcat也更不容易风控  
在此推荐使用linux来部署，有利于云服务器部署bot  
:::  

## Linux原生自动部署  

使用自动脚本一键部署与管理MaiBot，支持`Debian12/13`,`Ubuntu22.04/24.04+`  
脚本功能**完善**，可一站式管理～

```bash  
# 国内下载
curl -o maibot.sh https://dl.meowyun.cn/bot/bash/maibot.sh && bash maibot.sh

# 海外下载
curl -o maibot.sh https://raw.githubusercontent.com/WhiteCloudOL/Qbot-StartScripts/refs/heads/main/maibot.sh && bash maibot.sh
```  

## Linux原生手动部署  


::: tip  
以下命令都使用root权限执行，如提示权限不足请在命令前添加`sudo`  
此外需确认系统python版本为`3.10+`  
本文档支持部署的系统：`Ubuntu22.04/24.04`、`Debian12/13` 等  
:::


1. 下载系统依赖(支持Debian12/13+，Ubuntu22/24+)
```bash
# 更新软件源
apt update
# 下载所需软件包
apt install -y build-essential git nano vim
```

2. 安装UV  
```bash
# 使用官方独立安装程序一键安装  
curl -LsSf https://astral.sh/uv/install.sh | sh  
```

3. 从麦麦仓库下载文件

```bash
# 创建文件夹
mkdir maimai
# 进入文件夹
cd maimai

# 使用git clone MaiBot-Napcat-Adapter插件到麦麦
git clone -b plugin https://github.com/MaiM-with-u/MaiBot-Napcat-Adapter.git

# (与上方二选一)如果你使用上方git clone失败，请尝试以下加速地址：
git clone https://gh-proxy.org/https://github.com/MaiM-with-u/MaiBot.git

```

4. 安装MaiBot-Napcat-Adapter，用于连接QQ与MaiBot  
```bash
# 进入麦麦插件目录
cd MaiBot/plugins
# 使用git clone获取麦麦
git clone https://github.com/MaiM-with-u/MaiBot.git


# (与上方二选一)如果你使用上方git clone失败，请尝试以下加速地址：
# 进入麦麦插件目录
cd MaiBot/plugins
# 使用git clone MaiBot-Napcat-Adapter插件到麦麦
git clone -b plugin https://gh-proxy.org/https://github.com/MaiM-with-u/MaiBot-Napcat-Adapter.git
```
完成后，返回MaiBot主目录  
```bash
cd ..
```

5. 创建python虚拟环境  
```bash  
# 此时在maimai/MaiBot目录下

# 创建uv环境，指定为python3.14
uv venv --python 3.14
```  

6. 安装python环境包依赖  
  
::: tip

如果你的云服务器位于国内，请用以下命令换源  
```bash
# 切换阿里源
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple  
pip config set install.trusted-host mirrors.aliyun.com
```
:::

```bash
# 此时在maimai/MaiBot/目录下
uv sync
```

7. 部署完成，请转到[配置与启动](conf.md)
