# 常用插件索引

本页整理常用的 MaiBot 协议适配器与功能扩展，方便根据部署方式和实际需求快速选择。插件功能与兼容范围可能随版本更新，请以仓库 README 和最新 Release 为准。

::: tip 使用前准备
安装插件前，请先阅读[插件安装与配置](./plugins)，确认当前 MaiBot 版本、Python 环境、额外依赖和配置文件要求。更新已有插件前，建议先备份配置与数据目录。
:::

## 快速选择

| 使用需求 | 推荐插件 | 主要用途 |
| --- | --- | --- |
| 使用 NapCat 连接 QQ | NapCat Adapter | 在 MaiBot 与 NapCat 之间传递消息和协议事件 |
| 使用 SnowLuma 连接 QQ | SnowLuma Adapter | 接入 SnowLuma，并提供相关消息与主动私聊能力 |
| 增加更自然的戳一戳互动 | 智能戳一戳 | 按概率执行回戳、文字回复、表情回复或保持沉默 |
| 让 MaiBot 联网检索信息 | Search 插件 | 聚合多个搜索引擎，并提取网页内容供模型总结 |
| 让 MaiBot 生成或编辑图片 | 麦麦绘图 | 接入多家图片模型，提供文生图与图生图工具 |
| 让 MaiBot 生成 AI 视频 | 视频生成插件 | 接入多家视频模型，提供文生视频与图生视频能力 |
| 自动解析群聊分享链接 | 多平台链接解析 | 解析抖音、小红书和小黑盒的图文或视频内容 |
| 监控 QQ 协议端运行状态 | 麦麦掉线通知 | 协议端掉线或恢复时向管理员推送通知 |

> 本表仅用于快速定位插件，并不代表功能排名。协议适配器应与实际使用的 QQ 协议端保持一致。

## 协议适配器

### NapCat Adapter <Badge type="tip" text="NapCat" />

- **仓库地址：** [Mai-with-u/MaiBot-Napcat-Adapter](https://github.com/Mai-with-u/MaiBot-Napcat-Adapter)
- **作者：** [MaiBot Team](https://github.com/Mai-with-u)
- **插件简介：** 连接 MaiBot 与 NapCat 的协议适配器，覆盖消息、群管理、账号与文件等能力，并提供强类型封装和 NapCat Action 透传接口。

适合已经使用 NapCat 作为 QQ 协议端的部署环境。安装后需要确保适配器与 NapCat 的 WebSocket 地址、端口和 Token 配置一致。

### SnowLuma Adapter <Badge type="info" text="SnowLuma" />

- **仓库地址：** [Mai-with-u/MaiBot-SnowLuma-Adapter](https://github.com/Mai-with-u/MaiBot-SnowLuma-Adapter/)
- **作者：** [MaiBot Team](https://github.com/Mai-with-u)
- **插件简介：** 面向 SnowLuma 的 MaiBot 适配器插件，负责协议端消息接入，并可选启用主动私聊工具，支持按消息 ID 定位用户后发起会话。

该项目仅作为 Adapter 插件由 MaiBot 加载。启用主动私聊能力前，请阅读仓库中的配置说明，并合理设置聊天名单与全局屏蔽规则。

## 功能增强插件

### 智能戳一戳 <Badge type="tip" text="互动增强" />

- **仓库地址：** [TAIY2020/smart_poke_plugin](https://github.com/TAIY2020/smart_poke_plugin)
- **作者：** [TaiYang](https://github.com/TAIY2020)
- **插件简介：** 为 MaiBot 增加拟人化戳一戳交互，可按概率回戳、回复文字或表情，并支持跟随互动、主动戳、冷却限制和黑白名单。

插件可配置随机延迟、连续戳状态、每日次数上限等行为，并支持通过 WebUI 调整设置。建议根据群聊活跃度设置合理的触发概率与冷却时间，避免频繁互动打扰成员。

### Search 插件 <Badge type="info" text="联网搜索" />

- **仓库地址：** [YukiSakiko/google_search_plugin](https://github.com/YukiSakiko/google_search_plugin)
- **作者：** [晴空](https://github.com/XXXxx7258)
- **插件简介：** 为 MaiBot 提供联网搜索、图片搜索与缩写翻译，支持 Google、Bing、Tavily、You 等引擎，并可抓取网页后交由模型总结。

仓库已由原地址迁移至当前维护者名下。使用前请安装 README 列出的依赖，并为所选搜索引擎配置 API Key；若启用网页正文提取，还应留意目标网站的访问限制与内容可信度。

### 麦麦绘图 <Badge type="warning" text="图片生成与编辑" />

- **仓库地址：** [WhiteCloudOL/maimai-drawpic-plugin](https://github.com/WhiteCloudOL/maimai-drawpic-plugin)
- **作者：** [清蒸云鸭](https://github.com/WhiteCloudOL)
- **插件简介：** 为 MaiBot 提供文生图与图生图能力，适配 OpenAI、Gemini、阿里百炼、火山引擎、硅基流动和 NovelAI 等服务。

插件支持对话式绘图、图片编辑、模型切换、任务状态查询、会话偏好和额度管理。使用前需要配置对应服务商的 API Key 与可用模型；公开群聊环境建议同时启用权限、额度和内容审核功能。

### 视频生成插件 <Badge type="warning" text="AI 视频" />

- **仓库地址：** [yueshenqiu/video_generator_plugin](https://github.com/yueshenqiu/video_generator_plugin)
- **作者：** [三花](https://github.com/yueshenqiu)
- **插件简介：** 为 MaiBot 增加文生视频与图生视频能力，支持首帧、尾帧和首尾帧控制，并接入火山引擎、通义万相、智谱、可灵等服务。

插件还提供任务队列、轮询、断点续传、模型热切换和 WebUI 配置等能力。安装前应确认 Python 与 MaiBot 版本满足要求，并至少准备一家视频服务商的 API Key；视频生成通常耗时较长且可能产生费用。

### 多平台链接解析 <Badge type="tip" text="链接解析" />

- **仓库地址：** [Color2333/maibot-multi-platform-parser](https://github.com/Color2333/maibot-multi-platform-parser)
- **作者：** [Color2333](https://github.com/Color2333)
- **插件简介：** 自动解析群聊中的抖音、小红书和小黑盒链接，并回传图文或视频；支持群白名单、重复解析冷却和媒体大小限制。

插件无需额外命令，检测到支持的链接后会自动处理。使用前请按 README 配置 OneBot HTTP 地址、机器人账号与群白名单；如需解析哔哩哔哩内容，建议使用仓库说明中推荐的独立插件，避免重复响应。

## 运维与通知

### 麦麦掉线通知 <Badge type="danger" text="运行监控" />

- **仓库地址：** [octmicy/offline_notify](https://github.com/octmicy/offline_notify)
- **作者：** [octmicy](https://github.com/octmicy)
- **插件简介：** 监控 NapCat 与 SnowLuma 适配器在线状态，掉线时通过 Server酱 Webhook 推送手机通知，并可在连接恢复后发送提醒。

插件通过主动探测适配器状态完成监控，不会向聊天窗口发送检测消息。启用前需要配置 Server酱 SendKey，以及实际使用的主机、端口和 Token；请勿在日志、截图或公开仓库中泄露这些凭据。

## 安装与维护建议

1. 优先按照插件 README 标注的方式安装，并核对支持的 MaiBot 与 SDK 版本。
2. 首次安装后启动一次 MaiBot，让插件生成默认配置，再填写协议地址、Token、Webhook 或模型密钥。
3. 涉及搜索、绘图与视频生成的插件通常依赖第三方 API，启用前应确认调用额度、计费方式和内容合规要求。
4. 更新插件前备份配置和数据；更新后检查启动日志，并在测试会话中验证核心功能。

::: warning 第三方插件说明
插件由各自维护者独立开发和更新。安装前请阅读许可证、更新记录与已知问题，并自行评估账号安全、接口费用和外部服务可用性。
:::
