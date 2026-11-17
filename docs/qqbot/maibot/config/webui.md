---
title: MaiBot WebUI 登录
description: 启动 MaiBot 并访问 WebUI，了解默认端口、登录密码、本机访问、服务器远程访问和监听地址设置。
---

# WebUI 访问与登录

WebUI 是 MaiBot 的浏览器管理界面。本页说明首次启动、本机访问、服务器远程访问和登录设置。

## 启动 MaiBot

通过 [MaiBot Manager TUI](/qqbot/maibot/install#maibot-manager-tui) 安装的用户，在终端输入 `maibot`，打开 `核心服务管理`，选择启动 MaiBot。

手动安装的用户，在 MaiBot 安装目录执行：

```bash
uv run python bot.py
```

第一次启动时，根据终端提示阅读并确认用户协议。等待日志出现 WebUI 访问地址，再打开浏览器。

## 登录管理页面

### 本机访问

MaiBot 安装在本机时，在浏览器中访问：

```text
http://127.0.0.1:8001
```

端口以启动日志为准。例如日志显示 `14002`，访问 `http://127.0.0.1:14002/`。`127.0.0.1` 表示当前电脑。

登录密码显示在启动日志中，同时保存在 MaiBot 工作区的 `host/webui.json` 中，字段名为 `access_token`。复制该字段引号内的内容，粘贴至登录页面。

首次登录时，按设置向导创建并保存固定密码，后续使用该密码登录。

### 服务器远程访问

如果 MaiBot 装在云服务器上，可以先到 MaiBot Manager TUI 的 `设置` 中查看 `访问汇总`。已经显示可访问地址时，直接用浏览器打开。

需要手动设置时，打开 **MaiBot 工作区下的 `host/config.toml`**，找到 `[webui]`，修改监听地址：

```toml
[webui]
enabled = true
hosts = ["0.0.0.0"]
port = 8001
```

保存后重启 MaiBot，再到服务器防火墙和云平台安全组放行 `8001/TCP`。建议将访问来源限制为管理设备的公网 IP。浏览器中填写：

```text
http://<服务器 IP>:8001
```

::: warning 防火墙提示
如果你的服务器安装了 `ufw` 或 `iptable`，请使用对应的命令开放所需端口的防火墙

**ufw:**
```bash
sudo ufw allow <端口>/tcp

# 例如，放行MaiBot默认WebUI端口
sudo ufw allow 8001/tcp
```

**iptable:**
```bash
sudo iptables -A INPUT -p tcp --dport <端口> -j ACCEPT

# 例如，放行MaiBot默认WebUI端口
sudo iptables -A INPUT -p tcp --dport 8001 -j ACCEPT
```

如果你的服务器使用了**宝塔面板**，那么默认就存在ufw防火墙

不推荐关闭防火墙，建议优先使用上述命令开放端口
:::

NAT 服务器需要先在服务商面板中添加端口映射，将内网端口 `8001` 映射到分配的外网端口，再访问：

```text
http://<服务器 IP>:<外网端口>
```

::: tip 从旧版升级
新版的网络设置在 `host/config.toml`，监听地址字段是 `hosts`。登录密码在 `host/webui.json`。旧版 `config/bot_config.toml` 中的网络设置与 `data/webui.json` 中的登录凭据已迁移至上述位置。
:::

::: details 使用 HTTPS 或反向代理时的设置
这些项目同样放在 `host/config.toml` 的 `[webui]` 中：

| 项目 | 填写说明 |
| --- | --- |
| `public_base_url` | 外部能打开的完整地址，例如 `https://mai.example.com`，用于文件和预览链接 |
| `secure_cookie` | 全程通过 HTTPS 访问时可设为 `true`；直接使用 HTTP 时保持 `false` |
| `trusted_proxies` | 反向代理的 IP，多个地址用英文逗号分隔 |
| `trust_xff` | 使用上面可信代理转发的访问者 IP 时设为 `true` |
| `anti_crawler_mode` | 默认 `basic` 只记录；`loose`、`strict` 会执行相应拦截 |
| `allowed_ips` | 不受防爬虫限制的地址，支持 IP 或网段；这不是服务器防火墙的访问名单 |
| `ssl_certfile` / `ssl_keyfile` | 由 MaiBot 直接提供 HTTPS 时，分别填写证书和私钥路径 |

修改监听地址、端口、TLS 和访问防护后，重启 MaiBot。
:::

### 选择当前机器人

新版 MaiBot 可以通过同一个管理页面管理多个机器人。侧栏底部的 `当前 Bot` 按钮用来切换机器人。仅有一个机器人时，保留默认选择。

昵称、人设、模型分工和适配器设置跟随当前机器人；模型厂商和模型库由同一工作区中的机器人共用。


## 后续配置

登录后，继续完成 [模型配置](/qqbot/maibot/config/models) 和 [人格与回复设置](/qqbot/maibot/config/personality)。工作区文件位置见 [配置文件与目录](/qqbot/maibot/config/configuration-files)。
