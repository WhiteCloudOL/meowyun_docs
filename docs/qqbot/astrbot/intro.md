# AstrBot 简介

AstrBot 是支持 AI 对话、插件扩展和多消息平台接入的开源机器人框架。本系列文档涵盖 Docker、Linux 与 Windows 三种部署方式，并已按照当前站点结构完成重构。

::: info 项目资源
- **官方文档：** <https://docs.astrbot.app/>
- **GitHub：** <https://github.com/AstrBotDevs/AstrBot>
- **雨云部署：** <https://www.rainyun.com/qzyy_>（首月优惠码 5 折）
:::  

## 部署建议

在 Linux 服务器上运行 AstrBot 时，优先建议使用 [Docker 部署](./docker#docker-一键部署)，便于隔离依赖、持久化数据和后续更新。需要直接控制 Python 环境时，可选择 Linux 手动部署；本地测试则可使用 Windows 部署。
