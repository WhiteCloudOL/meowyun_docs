# NapcatQQ  

> 用于连接QQ与各Bot端 
> By 清蒸云鸭   
> 2025/11/21  

**官方文档**: https://napneko.github.io/

## Docker一键安装
**安装Docker：** 使用LinuxMirros脚本一键安装~
```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```
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
完成后使用 docker compose -f napcat.yml up -d   
即可自动拉取Napcat镜像，完成后访问 `[IP]:6099` 即可访问  
如果是NAT云服务器，请创建6099的端口映射  


## Linux安装  

