# NapCatQQ

NapCatQQ 是用于连接 QQ 与机器人框架的 OneBot 协议端。本文由清蒸云鸭整理，包含 Docker 和 Linux Shell 两种部署方式。

::: info 官方文档
<https://napneko.github.io/>
:::  

## Docker 部署

::: tip
海外服务器或网络连接较稳定的区域通常更适合直接拉取容器镜像。如果系统中尚未安装 Docker，可使用 LinuxMirrors 脚本安装：
```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```
如果无法连接 LinuxMirrors，可手动打开 <https://linuxmirrors.cn/docker.sh> 下载脚本；浏览器显示脚本文本时可另存为文件，然后上传至服务器执行 `bash docker.sh`。
:::

在机器人框架目录（例如 AstrBot）中创建 Compose 文件。以下编排使用 `host` 网络，可直接访问宿主机上的项目和端口。

如果与 AstrBot 配合使用，建议将 Compose 文件放在 AstrBot `data` 目录的同级位置，并取消 `# - ./data:/AstrBot/data` 的注释，注意保持 YAML 缩进一致。

::: details NapCat Docker Compose：`napcat.yml`
```yml
services:
  napcat:
    environment:
      - NAPCAT_UID=${NAPCAT_UID:-1000}
      - NAPCAT_GID=${NAPCAT_GID:-1000}
      # AstrBot请取消下面的注释以配置默认连接
      # - MODE=astrbot
    container_name: napcat
    restart: always
    image: mlikiowa/napcat-docker:latest
    volumes:
      # AstrBot请取消下面的注释以映射数据文件夹
      # - ./data:/AstrBot/data
      - ./napcat/config:/app/napcat/config
      - ./ntqq:/app/.config/QQ
    network_mode: "host"
```
:::

保存后执行 `docker compose -f napcat.yml up -d`，Docker 会自动拉取 NapCat 镜像并启动容器。完成后访问 `http://<服务器 IP>:6099` 打开 WebUI。

使用 NAT 云服务器时，需要为 `6099` 创建端口映射，并通过映射后的外部端口访问。

::: danger WebUI 安全  
不要将 NapCat WebUI 直接暴露到公网。请设置强密码，并通过防火墙、安全组或带鉴权的反向代理限制访问来源。  
:::  

### 容器管理与更新

机器人掉线时，可重启容器后重新通过 WebUI 登录。
```bash
# 重启 NapCat
docker restart napcat

# 停止或启动 NapCat
docker stop napcat
docker start napcat

# 移除napcat容器
docker compose -f napcat.yml down

# 重新创建 NapCat 容器
docker compose -f napcat.yml up -d

# 拉取最新镜像；更新前应先停止并移除旧容器
docker pull mlikiowa/napcat-docker:latest
```


## Linux Shell 部署

::: warning  
Shell 方式会直接部署到云服务器宿主机，可直接访问本机服务，但更容易受到系统依赖和桌面环境影响，不建议缺少 Linux 运维经验的用户使用。
:::  

### NapCat.Shell 一键安装脚本

该脚本支持 Ubuntu 20+、Debian 10+ 和 CentOS 9，可安装 NapCat.Shell 与 TUI CLI：
```bash
curl -o \
napcat.sh \
https://nclatest.znin.net/NapNeko/NapCat-Installer/main/script/install.sh \
&& bash napcat.sh \
--docker n \
--cli y
```

安装完成后，可使用以下命令管理 NapCat：
```bash
napcat # 打开 TUI CLI 配置界面

napcat help # 查看帮助
napcat start <QQ号> # 启动指定 QQ
napcat stop [QQ号] # 停止指定 QQ；QQ 号可省略
```
