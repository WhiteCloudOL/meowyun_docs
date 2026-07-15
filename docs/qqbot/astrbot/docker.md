# Docker 部署

<div class="astrbot-page-lead">
  <span>DOCKER COMPOSE</span>
  <p>将运行环境与宿主机隔离，把配置和插件统一保存在 <code>data/</code>，适合服务器长期运行与后续迁移。</p>
</div>

本页提供两套 Compose 配置：只运行 AstrBot，或同时运行 AstrBot 与 NapCat。初次部署 QQ 个人号时，建议使用后者。

## 部署前准备

- 已安装 Docker Engine 与 Docker Compose 插件；执行 `docker compose version` 能正常返回版本号。
- 服务器至少预留 `1 核 CPU / 2 GB 内存`，并确保磁盘空间足够保存日志、插件和会话数据。
- 规划需要开放的端口：`6185` 为 AstrBot WebUI，`6099` 为 NapCat WebUI，`6199` 为 OneBot v11 反向 WebSocket 默认端口。

::: tip 安装 Docker
优先参考 [Docker 官方安装文档](https://docs.docker.com/engine/install/)。熟悉第三方脚本并能自行审查时，也可使用 LinuxMirrors：

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```
:::

## 1. 创建部署目录

```bash
mkdir -p ~/AstrBot
cd ~/AstrBot
nano docker-compose.yml
```

根据实际需求，从下面两套配置中选择一套保存到 `docker-compose.yml`。

### 方案 A：AstrBot + NapCat

该方案让两个容器加入同一个隔离网络。NapCat 可通过 `ws://astrbot:6199/ws` 访问 AstrBot，无需把 `6199` 暴露到公网。

```yaml
services:
  napcat:
    image: mlikiowa/napcat-docker:latest
    container_name: napcat
    restart: unless-stopped
    environment:
      - NAPCAT_UID=${NAPCAT_UID:-1000}
      - NAPCAT_GID=${NAPCAT_GID:-1000}
      - MODE=astrbot
    ports:
      - "6099:6099"
    volumes:
      - ./data:/AstrBot/data
      - ./napcat/config:/app/napcat/config
      - ./ntqq:/app/.config/QQ
    networks:
      - astrbot_network

  astrbot:
    image: soulter/astrbot:latest
    container_name: astrbot
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6185:6185"
      # 协议端不在同一 Docker 网络时再启用：
      # - "6199:6199"
    volumes:
      - ./data:/AstrBot/data
    networks:
      - astrbot_network

networks:
  astrbot_network:
    driver: bridge
```

启动时将当前用户 UID/GID 传给 NapCat，避免挂载目录出现权限问题：

```bash
NAPCAT_UID=$(id -u) NAPCAT_GID=$(id -g) docker compose up -d
```

### 方案 B：仅运行 AstrBot

```yaml
services:
  astrbot:
    image: soulter/astrbot:latest
    container_name: astrbot
    restart: unless-stopped
    environment:
      - TZ=Asia/Shanghai
    ports:
      - "6185:6185"
      # 使用宿主机上的 OneBot v11 协议端时取消下一行注释：
      # - "6199:6199"
    volumes:
      - ./data:/AstrBot/data
```

```bash
docker compose up -d
```

::: warning 不要默认挂载 Docker Socket
普通部署不需要把 `/var/run/docker.sock` 挂载进 AstrBot 容器。该接口拥有很高的宿主机权限；只有明确使用 Agent 沙箱并理解风险时，才应按照 AstrBot 官方的专用沙箱方案配置。
:::

## 2. 检查启动状态

```bash
docker compose ps
docker compose logs -f astrbot
```

日志出现类似 `🌈 管理面板已启动，可访问` 的内容后，记录其中打印的随机初始密码。按 `Ctrl+C` 只会退出日志跟随，不会停止容器。

::: info 管理入口
- **AstrBot WebUI：** `http://<服务器 IP 或域名>:6185`
- **首次登录：** 用户名通常为 `astrbot`，密码以启动日志为准；登录后立即修改
- **NapCat WebUI：** `http://<服务器 IP 或域名>:6099`
:::

NAT 主机需要先将容器端口映射到可访问的外网端口。独立 IP 主机也应在防火墙或云安全组中只放行必要端口，并尽量限制来源地址。

## 3. 获取 NapCat 登录 Token

NapCat 启动后会把 WebUI 配置写入挂载目录：

```bash
cd ~/AstrBot
cat ./napcat/config/webui.json
```

输出中的 `token` 即为当前 NapCat WebUI 登录密钥：

```json
{
  "host": "0.0.0.0",
  "port": 6099,
  "token": "请以实际文件内容为准",
  "loginRate": 10,
  "autoLoginAccount": ""
}
```

::: danger 保护访问凭据
示例文字不是可用 Token。不要把真实 Token 放入截图、聊天记录或公开仓库。
:::

## 4. 接入 QQ（OneBot v11）

1. 在 AstrBot WebUI 中进入 `机器人`，新建并启用 `OneBot v11` 实例。
2. 反向 WebSocket 主机通常填写 `0.0.0.0`，端口填写 `6199`；如设置 Token，NapCat 端必须保持一致。
3. 在 NapCat WebUI 新建 `WebSockets 客户端`：
   - 同一 Compose：填写 `ws://astrbot:6199/ws`。
   - NapCat 位于宿主机或其他设备：填写 `ws://<AstrBot 地址>:6199/ws`，并确保端口仅对可信来源开放。
4. 保存并启用连接，在 AstrBot 控制台确认出现 `aiocqhttp(OneBot v11) 适配器已连接` 日志。

## 5. 日常维护

### 查看、重启与停止

```bash
# 查看状态与日志
docker compose ps
docker compose logs --tail=200 astrbot

# 重启服务
docker compose restart astrbot
docker compose restart napcat

# 停止或重新启动整套服务
docker compose stop
docker compose up -d
```

如果使用“仅 AstrBot”方案，不存在 `napcat` 服务，忽略对应命令即可。

### 更新镜像

```bash
cd ~/AstrBot
docker compose pull
docker compose up -d
docker compose logs --tail=100 astrbot
```

### 备份数据

升级或迁移前，建议先停止服务并备份持久化目录：

```bash
cd ~/AstrBot
docker compose stop
tar -czf "astrbot-backup-$(date +%F).tar.gz" data napcat
docker compose start
```

备份文件包含配置、插件与 NapCat 数据，请按敏感资料妥善保存。

## 部署验收

- [ ] `docker compose ps` 中所需服务均为运行状态
- [ ] 能使用启动日志中的随机密码登录 AstrBot WebUI
- [ ] 已修改 WebUI 密码，并妥善保存 API Key 与 Token
- [ ] 模型服务测试通过
- [ ] OneBot v11 日志显示已连接，QQ 消息可以正常收发
