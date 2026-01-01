# MaiBot部署  

::: tip  
由于linux天生占用资源更少，napcat也更不容易风控  
在此推荐使用linux来部署，有利于云服务器部署bot  
:::  

## Linux原生部署  

::: tip  
以下命令都使用root权限执行，如提示权限不足请在命令前添加`sudo`  
此外需确认系统python版本为`3.10+`  
本文档支持部署的系统：`Ubuntu22.04/24.04`、`Debian12/13`  
:::

1. 从麦麦仓库下载文件

```bash
# 创建文件夹
mkdir maimai
# 进入文件夹
cd maimai

# 使用git clone获取麦麦
git clone https://github.com/MaiM-with-u/MaiBot.git
git clone https://github.com/MaiM-with-u/MaiBot-Napcat-Adapter.git

# (与上方二选一)如果你使用上方git clone失败，请尝试以下加速地址：
git clone https://gh-proxy.org/https://github.com/MaiM-with-u/MaiBot.git
git clone https://gh-proxy.org/https://github.com/MaiM-with-u/MaiBot-Napcat-Adapter.git
```

2. 下载系统依赖(支持Debian12/13+，Ubuntu22/24+)
```bash
# 更新软件源
apt update
# 下载所需软件包
apt install -y python3-dev python3-venv python3-pip build-essential git nano vim
```

3. 创建python虚拟环境  
```bash  
# 此时在maimai/目录下

# 创建名为venv的python虚拟环境
python3 -m venv venv
```  

4. 激活虚拟环境
```bash
# 此时在maimai/目录下

source venv/bin/activate
```
5. 安装python环境包依赖  

::: tip

如果你的云服务器位于国内，请用以下命令换源  
```bash
# 切换阿里源
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple  
pip config set install.trusted-host mirrors.aliyun.com
```
:::

```bash
# 此时在maimai/目录下

# 安装本体依赖
pip install -r MaiBot/requirements.txt
#安装Adapter依赖
pip install -r MaiBot-Napcat-Adapter/requirements.txt
```

6. 部署完成，请转到[配置与启动](conf.md)