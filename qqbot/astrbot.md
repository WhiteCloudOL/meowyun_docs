# Astrbot
> AI聊天 与 插件娱乐 机器人  
> 功能较为完善！！  
> 2025/10/13  

**官方文档:** https://docs.astrbot.app/  
**Github:** https://github.com/AstrBotDevs/AstrBot  
**雨云部署：** https://www.rainyun.com/qzyy_ （首月优惠码5折）  

## Linux  
::: tip  
系统建议: Ubuntu 22+/Debian 12+/CentOS 9+（非以上系统python需要手动配置，若使用docker可忽略）  
配置要求: 1H2G以上  
:::  

### 部署Astrbot  

一、手动部署  
1. 检查环境，确保为`Python3.10`以上. 
```bash
    python3 --version
```

2. 安装环境(Debian12为例)
```bash
sudo apt update # 更新软件源
# sudo apt upgrade -y # 可选执行：更新软件包，防止部分软件包版本太低导致问题
sudo apt install -y python3-full python3-dev python3-venv python3-pip  # 安装python3完整包
sudo apt install git # 安装git工具

# 若是国内网络环境，请继续执行以下命令，以更换pypi源为阿里源，加速pypi软件包下载:
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple
pip config set install.trusted-host mirrors.aliyun.com
```

3. 下载Astrbot官方仓库
```bash
git clone https://github.com/AstrBotDevs/AstrBot.git # 从官方仓库下载

# 若是国内网络环境，请通过githubproxy下载，以加速网络访问:https://github.akams.cn/，例如：
# 全球/海外/港澳台
git clone https://github.com/WhiteCloudOL/astrbot_plugin_mcqlink.git  
# 大陆地区#1
git clone https://gh-proxy.com/https://github.com/WhiteCloudOL/astrbot_plugin_mcqlink.git
# 大陆地区#2
git clone https://cdn.gh-proxy.com/https://github.com/WhiteCloudOL/astrbot_plugin_mcqlink.git
```

4. 创建并激活Python虚拟环境  
这样可以避免影响系统环境！
```bash
cd Astrbot # 进入Astrbot文件夹
python3 -m venv venv # 在Astrbot/venv下创建虚拟环境
source venv/bin/activate # 激活虚拟环境   
```

5. 安装python依赖包
```bash
# !!! 请确保你现在位于Astrbot文件夹内
# !!! 请确保已经激活虚拟环境
pip install -r requirements.txt # 安装依赖

#如下载过慢可更换国内源
pip install -r requirements.txt -i https://mirrors.aliyun.com/pypi/simple # 使用阿里源安装依赖
```

6. 创建简单启动脚本
```bash
touch start.sh # 新建启动文件
vim start.sh # 编辑启动文件
```
按下`I`进入编辑模式  
输入以下内容后:
```vim
source venv/bin/activate
python3 main.py
```
完成后按下`ESC`后输入`:wq`保存并退出

7. 启动Astrbot  
::: info  
使用`screen`来保持后台开启，具体使用请自行查询  
:::  
```bash
screen -S astrbot # 创建astrbot screen窗口
bash start.sh # 执行启动脚本
```
等待启动完成后，按下`Ctrl`+`A`+`D`退出screen窗口  

1. 进入Astrbot控制台   

浏览器打开：`http://[你的服务器ip]:6185/` 进入Astrbot控制台，输入默认的用户名密码（均为`astrbot`），进入后按要求修改密码即可。  
> 若你的服务器并非独立ip，请 **转发** 6185端口到其他端口，并打开相应端口的网页，服务商防火墙/安全组 需 **放行** ！  

### 配置Astrbot  

1. 进入Astrbot控制台`http://[你的服务器ip]:6185/`  
<img src="https://img.cdn1.vip/i/68ad664d94b17_1756194381.webp" alt="控制台" title="控制台" />  

2. 接入QQ：消息平台->新增适配器->接入QQ个人号（aiocqhttp）  
选项保持默认，勾选启用  

3. 前往[Astrbot官方文档](https://docs.astrbot.app/deploy/platform/aiocqhttp/napcat.html) 查看如何接入平台适配器  

4. 配置大模型API：服务提供商  

## Windows  
> Waiting for adding.  