---
title: MaiBot 配置文件与目录说明
description: 查找 MaiBot 工作区、机器人目录、网络配置、WebUI 登录信息和插件配置，了解新版配置位置与迁移关系。
---

# 配置文件与目录

日常配置通过 WebUI 完成。备份或迁移时，可参考以下文件位置。**工作区**是启动 `bot.py` 的目录；**Bot 目录**是单个机器人保存配置和数据的文件夹。

新安装的机器人通常位于工作区的 `bots/<Bot ID>/` 中；从旧版升级的机器人可能继续使用安装目录本身，原来的 `config/`、`data/`、`plugins/` 会保留。

| 位置 | 内容 |
| --- | --- |
| 工作区 `host/config.toml` | 管理页面监听地址、端口、HTTPS 与访问防护 |
| 工作区 `host/webui.json` | 管理页面登录密码 |
| 工作区 `host/model_catalog.toml` | 工作区共用的模型厂商、密钥、模型列表和联网服务 |
| 工作区 `host/registry.sqlite3` | 工作区中的机器人登记信息 |
| Bot 目录 `config/bot_config.toml` | 昵称、人格、聊天、记忆等设置 |
| Bot 目录 `config/model_config.toml` | 当前机器人的模型分工和任务参数 |
| Bot 目录 `config/adapter_policy.toml` | 群聊、私聊接收与拒收名单 |
| Bot 目录 `config/builtin_plugins/` | 内置适配器和内置插件的配置 |
| Bot 目录 `plugins/<插件目录>/config.toml` | 第三方插件的配置 |
| Bot 目录 `data/` | 聊天记录、记忆和插件数据 |

备份前先停止 MaiBot。保留 `host/` 和对应 Bot 目录的 `config/`、`data/`、`plugins/`，可同时保存登录设置、模型、人格和聊天数据。备份和恢复操作见 [备份与更新](/qqbot/maibot/usage/maintenance)。


## 确认目录归属

**工作区**是启动 `bot.py` 的目录，保存所有机器人共用的设置。**Bot 目录**保存某一只机器人的人格、任务分工、插件和聊天数据。

同一工作区中的多个机器人共用 `host/`，但分别使用自己的 `config/`、`data/` 和 `plugins/`。修改或恢复文件前，先在 WebUI 中确认当前机器人。

## 配置生效方式

| 修改内容 | 生效方式 |
| --- | --- |
| 昵称、人格、回复频率 | 看到已保存后，继续聊天观察效果 |
| 模型厂商、模型列表、任务分工 | 后续请求应用新设置，可通过模型库测试 |
| 群聊、私聊接收名单 | 等待自动保存，新规则随即生效 |
| 插件设置 | 点击插件页的保存按钮，查看运行状态 |
| 工作区 `host/config.toml` 中的地址、端口、HTTPS、访问防护 | 重启 MaiBot 后使用新地址访问 |

保存后检查页面状态或日志中的配置重载结果。监听地址和端口等启动设置需要重启 MaiBot。
