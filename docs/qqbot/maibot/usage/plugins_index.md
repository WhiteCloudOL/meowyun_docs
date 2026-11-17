---
title: MaiBot 常用插件推荐与配置索引
description: 按分类查找 MaiBot 语音、绘图、视频理解、群聊日报、生活陪伴和实用插件，查看作者、仓库、配置要点与兼容要求。
---

# 常用插件索引

根据用途挑选所需功能，点击卡片即可展开查看配置说明。插件安装与配置请参考 [安装与配置指南](/qqbot/maibot/usage/plugins)，更多优质插件可浏览 [MaiBot 插件市场](https://plugin.maibot.chat/)。

::: info 版本说明
以下内容基于 MaiBot v1.4.5 版本整理，插件配置项请以各仓库最新说明为准。
:::

## 🌐 平台接入
这些插件是连接 QQ 的基础组件，请根据你的账号类型选择安装。

<div class="plugin-grid">

<PluginCard name="OneBot 适配器" author="MaiBot Team" repo="Mai-with-u/MaiBot-SnowLuma-Adapter" label="普通 QQ" description="适配 NapCat、LLBot、SnowLuma，支持普通 QQ 账号收发消息。">

在 `适配器设置` 中配置协议端连接信息，并圈定允许机器人响应的群聊与用户。

完整配置：[OneBot 适配器](/qqbot/maibot/adapters/onebot)

</PluginCard>

<PluginCard name="QQ 官方机器人适配器" author="MaiBot Team" href="/qqbot/maibot/adapters/qq-official" label="内置" description="原生支持 QQ 开放平台机器人，支持扫码或填入 AppID/Secret 授权。">

进入 `适配器设置`，添加官方机器人并完成授权即可。该插件随 MaiBot 版本自动同步更新。

完整配置：[QQ 官方机器人](/qqbot/maibot/adapters/qq-official)

</PluginCard>

</div>

## 🎨 语音与图像
扩展麦麦的感官与表达能力，轻松实现语音回复、AI 绘图及视频分析。

<div class="plugin-grid">

<PluginCard name="麦麦多平台 TTS 语音" author="清蒸云鸭" repo="WhiteCloudOL/maimai-tts-plugin" label="语音回复" description="支持多平台语音服务、音色管理与声音复刻。">

1. 在插件工作台配好 API 服务商。
2. 设置模型与音色，在 `语音路由` 中试听并保存。
3. 发送 `/mmtts <文本>` 即可测试。在 `通用设置` 里可调整日常回复的语音转换概率。

</PluginCard>

<PluginCard name="麦麦绘图" author="清蒸云鸭" repo="WhiteCloudOL/maimai-drawpic-plugin" label="绘图与编辑" description="调用多源 AI 服务，实现绘图与图片二次创作。">

配置好对应平台的 API Key 后即可使用。插件支持文生图以及基于图片的修改指令，在插件内可设置管理员权限和调用额度。

</PluginCard>

<PluginCard name="视频识眼" author="Saltin" repo="SaltinAnon/maibot-video-vision" label="视频消息" description="自动抽取视频帧分析，为麦麦提供视频内容摘要。">

1. 在 [模型配置](/qqbot/maibot/config/models) 为“识图任务”分配视觉模型。
2. 确保环境已配置 FFmpeg，并检查 `vision.task_name` 设置（默认为 `vlm`）。
3. 默认仅在私聊或被 @时处理视频。

</PluginCard>

<PluginCard name="视频内容理解" repo="YukiSakiko/content_understanding_plugin" label="B 站 · 抖音" description="解析短视频链接，自动提取核心信息与 AI 总结。">

配置管理员权限，通过 `/cu_login` 扫码或配置 Cookie 登录。分享链接后，内容将自动同步至对话上下文供麦麦参考。

</PluginCard>

</div>

## 💡 内容与知识
让麦麦更懂网络热梗和分享的链接，成为更聪明的聊天搭档。

<div class="plugin-grid">

<PluginCard name="多平台链接解析" repo="Color2333/maibot-multi-platform-parser" label="链接解析" description="自动解析抖音、小红书、小黑盒链接，在群内直接展示图文预览。">

配置好 OneBot 连接与允许解析的群组。该插件专注于媒体内容的直观预览。

</PluginCard>

<PluginCard name="麦麦梗百科" repo="YukiSakiko/cnmeme_plugin" label="梗与黑话" description="自动查询网络梗、缩写与陌生词，提升语境理解力。">

启用即用。在 `查词设置` 开启自动收录后，结果可在麦麦的“黑话与表达”管理界面看到。

</PluginCard>

<PluginCard name="群聊每日分析" author="NetaJuutilainen" repo="NetaJuutilainen/Maibot_plugin_qq_group_daily_analysis" label="群聊日报" description="整理群聊金句与活跃数据，生成精美图文日报。">

1. 在 `日报设置` 中选定群聊并设置规则。
2. 调整分析模型与生成时间。
3. 通过 `/日报` 指令手动生成，生成漫画效果需联动绘图插件。

</PluginCard>

</div>

## 🤖 互动与生活
让机器人拥有更细腻的性格与生活轨迹，打造沉浸式陪伴体验。

<div class="plugin-grid">

<PluginCard name="消息防抖合并" author="Blackwindy2333" repo="Blackwindy2333/Message_Debouncing_Refactored" label="连续消息" description="将短时间内连续发送的消息合并处理，让互动更自然。">

设置好等待时长（默认 2 秒），机器人会等待消息发完后再统一回应，避免机器人“半句话回复”。

</PluginCard>

<PluginCard name="智能戳一戳" author="TaiYang" repo="TAIY2020/smart_poke_plugin" label="戳一戳" description="互动式戳一戳回复，支持回戳或文字表情回复。">

在配置中调整触发概率和冷却时间，轻松打造可爱的互动效果。

</PluginCard>

<PluginCard name="麦生活" repo="octmicy/Mai_life" label="生活陪伴" description="提供日程、精力、心情、日记及主动对话功能，赋予麦麦更完整的生活轨迹。">

绑定 QQ 号并设置好城市天气，通过 `/麦麦状态` 即可查看当前生活进程。

</PluginCard>

<PluginCard name="Maizone 麦麦空间" repo="internetsb/Maizone" label="QQ 空间" description="替你打理 QQ 空间，支持阅读、点赞、评论及定时发说说。">

配置权限策略，通过 `/readfeed` 测试阅读，通过 `/sendfeed` 发布动态。

</PluginCard>

<PluginCard name="日记插件" author="约瑟夫.k &amp; 晴空" repo="bockegai/diary_plugin" label="聊天日记" description="整理记录并生成日记，记录与麦麦的美好时光。">

配置模型分工并设定白名单。使用 `/diary generate` 即可手动尝试生成日记。

</PluginCard>

</div>

## 📅 日程与模型调度

<div class="plugin-grid">

<PluginCard name="日程提醒助手" repo="OMSociety/maibot_plugin_schedule_assistant" label="私聊提醒" description="通过对话管理日程，贴心提醒重要事务。">

配置用户 ID 与时区，直接对麦麦说“明天下午三点开会”即可添加提醒。

</PluginCard>

<PluginCard name="峰谷时段模型调度" author="昭沧QWQ" repo="ZhaoCang-QWQ/model-scheduler" label="定时切换" description="按时间段自动切换回复模型，平衡性能与调用成本。">

设定好时段规则并绑定模型，系统会在指定时间自动切换模型，未命中时段时将使用兜底模型。

</PluginCard>

</div>

## 🧩 身份与趣味扩展

<div class="plugin-grid">

<PluginCard name="自我信息插件" author="ValleyWinds" repo="ValleyWinds/Self-Identity" label="人设资料" description="保存麦麦的背景、外貌与兴趣等设定，支持人设图库浏览和图片展示。">

填写好自我描述并存入人设图，让麦麦在被问及自身信息时对答如流。

</PluginCard>

<PluginCard name="身份认知" repo="Alcpare/maibot_identity_plugin" label="身份设定" description="为不同用户配置专属身份及交互态度。">

在插件页关联用户 ID，定义好他们的身份档位，自定义麦麦的回复风格。

</PluginCard>

<PluginCard name="麦麦小工具合集" repo="NetaJuutilainen/Maibot_fun_pack_plugin" label="群聊趣味" description="集合喜报、悲报、答案之书、语录等娱乐功能。">

启用插件后发送 `/工具列表`，解锁更多隐藏的小乐趣。

</PluginCard>

</div>

---

## 🛠️ 安装后检查
1. **确认加载**：在 `插件扩展` 页面确认插件已启用。
2. **验证功能**：尝试触发一次插件命令，确认功能正常且 API 服务可用。
3. **数据备份**：更新插件前，请务必执行全量数据备份，参考 [安装与配置指南](/qqbot/maibot/usage/plugins)。
