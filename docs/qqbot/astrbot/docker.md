# Docker一键部署  

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

::: info 进入控制台  
**打开AstrBot控制台**：`http://[你的服务器IP]:[端口]`  
*你的服务器IP*：填服务器公网IP或域名  
*端口*：独立IP机型填`6185`，Nat机型需要映射6185到相应端口  
*默认用户名密码均为`astrbot`*  
**打开NapCat控制台**：`http://[你的服务器IP]:[端口]`  
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
