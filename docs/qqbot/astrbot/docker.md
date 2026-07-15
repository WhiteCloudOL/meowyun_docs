# Docker 一键部署

本页介绍如何使用 Docker Compose 部署 AstrBot，并根据需要同时运行 NapCat。该方式便于隔离依赖、持久化数据和执行后续更新。

## 什么是 Docker？
[Docker](https://www.docker.com/) 是容器化运行平台，可为 AstrBot 提供一致、隔离且便于迁移的运行环境。

::: tip  
如果系统中尚未安装 Docker，可使用 LinuxMirrors 脚本安装：
```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```
:::

## 开始安装

部署前请选择一种网络模式：

1. **与 NapCat 一同部署并使用隔离网络**
   - 优点：可一次完成配置，默认只暴露 `6185` 和 `6099` 端口。
   - 缺点：已配置的 NapCat 不便直接连接其他服务，需要额外开放端口，或将其他服务加入同一 Docker 网络。
2. **独立安装并使用 host 网络**
   - 优点：容器直接使用宿主机网络，连接其他本机服务更方便。
   - 缺点：更容易发生端口冲突；`6199` 端口应设置访问密钥，避免未授权访问。

下文以方式一为主。选择方式二时，只需替换对应的 `docker-compose.yml` 内容。

### 创建部署目录

1. 通过 SSH 连接服务器，新建一个目录，例如 `AstrBot`。
```bash  
# 在当前用户目录中新建 AstrBot 文件夹
mkdir AstrBot
```  

2. 创建 `docker-compose.yml` 文件。
```bash
nano docker-compose.yml
```
在编辑器中填写以下内容：

::: tip  
如果使用 FinalShell 粘贴时出现乱码，可在本地编辑 Compose 文件后上传到对应目录。
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

3. 启动 Docker Compose 服务。
```bash
# 在 docker-compose.yml 所在目录执行
docker compose up -d
```
Docker 会自动拉取所需镜像并创建容器。命令执行完成后，可以通过 `docker compose ps` 检查服务状态。

随后查看 AstrBot 启动日志：

```bash
docker compose logs -f astrbot
```

启动完成后，日志中会出现类似 `🌈 管理面板已启动，可访问` 的提示，并打印管理面板地址和首次登录所需的随机初始密码。按 `Ctrl+C` 可以退出日志查看，不会停止后台容器。

::: info 访问管理控制台
- **AstrBot**：访问 `http://<服务器 IP 或域名>:6185`。用户名通常为 `astrbot`，首次登录密码请从启动日志中获取；登录后应立即修改。
- **NapCat**：访问 `http://<服务器 IP 或域名>:6099`，登录 Token 的获取方式见下文。

NAT 机型需要先把容器端口映射到可用的外网端口；独立 IP 机型也应在防火墙或安全组中仅放行必要端口，并尽量限制来源 IP。
:::

::: details 获取 NapCat 登录密钥：`./napcat/config/webui.json`

1. 进入部署目录。
```bash
cd /root/AstrBot
```
2. 查看 WebUI 配置文件。
```bash  
cat ./napcat/config/webui.json 
```
在输出内容顶部找到 `token` 字段：
```json
{
    "host": "0.0.0.0",
    "port": 6099,
    "token": "xFSM7wZA3w7pE8TG",
    "loginRate": 10,
    "autoLoginAccount": "",
}
```
其中 `xFSM7wZA3w7pE8TG` 仅为示例；实际 `token` 值即为当前 NapCat 控制台的登录密钥。
:::  

## 服务管理

以下命令可在任意目录执行：
```bash  
# 重启 AstrBot
docker restart astrbot
# 重启 NapCat
docker restart napcat

# 停止 AstrBot
docker stop astrbot
# 停止 NapCat
docker stop napcat
```  

## 部署完成

::: info 后续步骤
登录 AstrBot 管理面板后，请先修改随机初始密码，再配置模型服务商，并至少部署一个消息平台。完成后发送一条测试消息，同时检查 AstrBot 与 NapCat 日志，确认消息链路正常。
:::
