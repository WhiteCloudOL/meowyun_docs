# AstrBot 简介

<div class="astrbot-hero">
  <div class="astrbot-hero__copy">
    <span class="astrbot-hero__eyebrow">ASTRBOT · DEPLOYMENT GUIDE</span>
    <p>一个面向多消息平台的开源 AI 机器人框架，用统一的 WebUI 管理模型、平台适配器、插件与运行日志。</p>
  </div>
  <div class="astrbot-hero__facts" aria-label="AstrBot 快速信息">
    <span><b>6185</b>WebUI 端口</span>
    <span><b>随机生成</b>初始密码</span>
    <span><b>data/</b>核心数据目录</span>
  </div>
</div>

AstrBot 支持 AI 对话、插件扩展、工具调用和多消息平台接入。本系列文档聚焦可维护的部署流程：先完成 AstrBot 本体安装，再配置模型服务与消息平台，最后通过日志验证完整链路。

## 选择部署方式

<div class="astrbot-route-grid">
  <a class="astrbot-route-card astrbot-route-card--pink" href="/qqbot/astrbot/docker">
    <span>01 · RECOMMENDED</span>
    <strong>Docker 部署</strong>
    <p>适合服务器长期运行。环境隔离清晰，数据迁移、备份和版本更新更方便。</p>
    <small>前往 Docker 指南 →</small>
  </a>
  <a class="astrbot-route-card astrbot-route-card--blue" href="/qqbot/astrbot/linux">
    <span>02 · LINUX</span>
    <strong>Linux 部署</strong>
    <p>使用官方推荐的 uv 与 AstrBot CLI，适合希望直接管理进程和工作目录的用户。</p>
    <small>前往 Linux 指南 →</small>
  </a>
  <a class="astrbot-route-card astrbot-route-card--mint" href="/qqbot/astrbot/windows">
    <span>03 · DESKTOP</span>
    <strong>Windows 部署</strong>
    <p>适合本地体验、调试与轻量运行，并保留源码部署流程供进阶使用。</p>
    <small>前往 Windows 指南 →</small>
  </a>
</div>

| 使用场景 | 推荐方式 | 选择理由 |
| --- | --- | --- |
| 云服务器、长期运行 | [Docker](./docker) | 依赖隔离、迁移和更新成本较低 |
| Linux 宿主机直接运行 | [uv / CLI](./linux) | 自动准备 Python 3.12，命令统一 |
| Windows 本地体验 | [uv / CLI](./windows) | 安装步骤短，不必手动维护虚拟环境 |
| 二次开发、源码调试 | Linux / Windows 源码方式 | 可直接检查源码、依赖与运行日志 |

## 部署链路

1. **启动 AstrBot**：确认日志中没有持续报错，并记录随机生成的初始密码。
2. **进入 WebUI**：本机访问 `http://localhost:6185`；远程部署时将 `localhost` 替换为服务器地址。
3. **配置模型服务**：填写 API 地址、密钥与模型名称，并完成一次连通性测试。
4. **接入消息平台**：例如通过 OneBot v11 与 NapCat 接入 QQ。
5. **完成验收**：发送测试消息，同时检查 AstrBot 与协议端日志，确认收发均正常。

::: warning 上线前检查
- 首次登录用户名通常为 `astrbot`，密码以**本次启动日志**为准；登录后请立即修改，并建议启用 WebUI TOTP。
- 不要将 API Key、WebUI 密码或 OneBot Token 写入公开文档、截图和 Git 仓库。
- 公网部署只放行必要端口。OneBot v11 默认监听 `6199`，优先通过内网或 Docker 网络连接，不要直接暴露到公网。
:::

## 项目资源

- [AstrBot 官方文档](https://docs.astrbot.app/)
- [AstrBot GitHub 仓库](https://github.com/AstrBotDevs/AstrBot)
- [雨云一键部署](https://www.rainyun.com/qzyy_)（首月优惠码 5 折）
