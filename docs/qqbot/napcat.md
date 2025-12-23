# NapcatQQ  

> 用于连接QQ与各Bot端 
> By 清蒸云鸭   
> 2025/12/17  

::: info  
**官方文档**: https://napneko.github.io/  
:::  

## Docker一键安装

::: tip
如果你系统中不存在docker，请使用以下命令安装  
**安装Docker：** 使用LinuxMirros脚本一键安装~  
```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```
:::

在Bot文件夹（例如AstrBot）内新建Compose文件  
此编排使用`host`网络，可直接访问本机项目/端口  
如果是AstrBot建议放在AstrBot data文件夹下，并取消``# - ./data:/AstrBot/data`的注释（删除#，并对齐）  
::: details Napcat Docker `napcat.yml`  
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

完成后使用 `docker compose -f napcat.yml up -d`  
即可自动拉取Napcat镜像，完成后访问 `[IP]:6099` 即可访问WebUI  
如果是NAT云服务器，请创建6099的端口映射，访问**映射后**端口  

### 如何重启/关闭/重构/更新？
如果bot掉线，需要通过以下命令重启，再通过WebUI登录
```bash
# 重启/关闭/打开 napcat
docker restart/stop/start napcat  

# 移除napcat容器
docker compose -f napcat.yml down

# 构建napcat容器
docker compose -f napcat.yml up -d

# 更新（拉取最新版，需要先移除容器）
docker pull mlikiowa/napcat-docker:latest
```


## Linux安装  

::: warning  
Shell是直接部署于云服务器本机的，可直接访问本机服务  
但容易出现各种bug，不推荐小白使用  
:::  

### NapCat.Shell一键安装脚本(支持Ubuntu 20+/Debian 10+/Centos9)
使用以下官方脚本一键安装Napcat.Shell+TUI-CLI  
```bash
curl -o \
napcat.sh \
https://nclatest.znin.net/NapNeko/NapCat-Installer/main/script/install.sh \
&& bash napcat.sh \
--docker n \
--cli y
```

完成安装后，你可以使用以下命令管理napcat  
```bash
napcat # 打开TUI-CLI图形界面配置(不过有些许bug)

napcat help #查看帮助
napcat start <QQ号>  # 启动某个QQ
napcat stop [OPTIONAL: QQ号]  # 停止某个QQ的服务，<QQ>可选

```