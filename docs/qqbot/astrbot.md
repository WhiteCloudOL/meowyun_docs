# Astrbot
> AI聊天 与 插件娱乐 机器人  
> 功能较为完善！！  

::: info  
**官方文档:** https://docs.astrbot.app/  
**Github:** https://github.com/AstrBotDevs/AstrBot  
**雨云部署：** https://www.rainyun.com/qzyy_ （首月优惠码5折）  
:::

## Docker一键部署  

### 什么是Docker  
[Docker](https://www.docker.com/) 是一个真正实现**一次构建，到处运行**的工具  

::: tip  
**安装Docker：** 使用LinuxMirros脚本一键安装~  
```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```
:::

### 开始安装   

确定安装方式：  
(一) 与NapCat一起部署+隔离网络模式   
**优点**：一键配置，隔离的网络只暴露`6185`、`6099`端口  
**缺点**: 配置好的NapCat连接其他服务不方便，需要手动开启端口或将其他服务连接到同一网络  
(二) 独立安装+host网络模式：  
**优点**：直接与宿主机网络相连接，连接其他服务方便  
**缺点**：直接与宿主机网络相连接，容易造成端口冲突，`6199`端口建议设置密钥否则可能被入侵  
  
  下面介绍方式一的部署方式，如果是方式二只需要更换一下docker-compose.yml文件即可

#### 开始部署
1. SSH连接到服务器，新建一个文件夹，例如`AstrBot`
```bash  
# root@RainYun-c3Srwn3w:~# mkdir AstrBot
# 我当前在/root目录下新建AstrBot文件夹
mkdir AstrBot
```  

1. 创建`docker-compose.yml`文件  
```bash
nano docker-compose.yml
```
在打开的窗口内输入以下内容:  

::: tip  
如果使用`finalShell`粘贴乱码，可以在本地编辑好compose文件后上传到相应目录  
:::

::: details 方式一/隔离+NapCat：`docker-compose.yml`
```yml
# docker-compose.yml
# NAPCAT_UID=$(id -u) NAPCAT_GID=$(id -g) docker-compose -f ./compose/astrbot.yml up -d
services:
  napcat:
    environment:
      - NAPCAT_UID=${NAPCAT_UID:-1000}
      - NAPCAT_GID=${NAPCAT_GID:-1000}
      - MODE=astrbot
    ports:
      - 6099:6099
    container_name: napcat
    restart: always
    image: mlikiowa/napcat-docker:latest
    volumes:
      - ./data:/AstrBot/data
      - ./napcat/config:/app/napcat/config
      - ./ntqq:/app/.config/QQ
    networks:
      - astrbot_network
    #mac_address: "02:42:ac:11:00:02"
  astrbot:
    environment:
      - TZ=Asia/Shanghai
    image: soulter/astrbot:latest
    container_name: astrbot
    restart: always
    ports:
      - "6185:6185"
      #- "6195:6195"
      #- "6199:6199"
    volumes:
      - ./data:/AstrBot/data
      - /var/run/docker.sock:/var/run/docker.sock
    networks:
      - astrbot_network
networks:
  astrbot_network:
    driver: bridge
```
:::

::: details 方式二/HOST: `docker-compose.yml`  
```yml  
services:
  astrbot:
    environment:
      - TZ=Asia/Shanghai
    image: soulter/astrbot:latest
    container_name: astrbot
    restart: always
    volumes:
      - ./data:/AstrBot/data
      - /var/run/docker.sock:/var/run/docker.sock
    network_mode: "host"
```
:::

3. 运行**docker compose**  
```bash
# 请在你创建compose文件的文件夹内执行命令
docker compose up -d
```
此时，docker会自动拉取镜像，等待拉取完成后即部署完成~  

::: info  
**打开AstrBot控制台**：`http://\[你的服务器IP\]:\[端口\]`  
*你的服务器IP*：填服务器公网IP或域名  
*端口*：独立IP机型填`6185`，Nat机型需要映射6185到相应端口  
*默认用户名密码均为`astrbot`*  
**打开NapCat控制台**：`http://\[你的服务器IP\]:\[端口\]`  
*你的服务器IP*：填服务器公网IP或域名  
*端口*：独立IP机型填`6099`，Nat机型需要**映射**6099到相应端口   
*默认token见下方获取Napcat登录密钥*
:::

::: details 获取Napcat登录密钥 `./napcat/config/webui.json` 

1. 进入你创建的文件夹内  
```bash
cd /root/AstrBot
```
2. 查看webui配置文件
```bash  
cat ./napcat/config/webui.json 
```
此时我们会得到一长串的内容，拉到**顶部**，即可获取Napcat密钥
```json
{
    "host": "0.0.0.0",
    "port": 6099,
    "token": "xFSM7wZA3w7pE8TG",
    "loginRate": 10,
    "autoLoginAccount": "",
}
```
其中`"token": "xFSM7wZA3w7pE8TG"`就是我们登录NapCat控制台所需的密钥  
:::  

### 重启/关闭的方式  
此命令在任意目录下均可执行
```bash  
# 重启AstrBot
docker restart astrbot
# 重启napcat
docker restart napcat

# 关闭AstrBot
docker stop astrbot
# 关闭napcat
docker stop napcat
```  

### :tada: 大功告成！
::: info  
接下来请探索AstrBot吧~  
:::

## Linux  
::: tip  
系统建议: Ubuntu 22+/Debian 12+/CentOS 9+（非以上系统python需要手动配置，若使用docker可忽略）  
配置要求: 1H2G以上  
:::  


### 部署Astrbot  

一、手动部署  
::: danger  
此部署方式需要你有一些Linux和Python基础，否则不建议用此方式部署  
**零基础**建议选择[Docker一键部署](#docker一键部署)  
:::
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