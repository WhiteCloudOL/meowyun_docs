---
title: MaiBot 配置概览
description: 按顺序完成 MaiBot WebUI 登录、AI 模型配置、人格设置、QQ 平台接入与群聊私聊规则配置。
---

# 配置概览

MaiBot 配置指南旨在帮助您快速完成 WebUI 访问、模型参数调优、人格塑造及多平台接入。

> **版本提示**：当前文档根据 MaiBot `v1.4.5` 及 WebUI `v1.10.5` 整理，新版可能会有变化。

---

## 🚀 基础配置五步走

首次部署后，建议按以下顺序完成配置，以确保机器人正常运行：

| 顺序 | 主题 | 主要内容 | 完成标准 |
| :--- | :--- | :--- | :--- |
| 1 | [访问与登录](/qqbot/maibot/config/webui) | 启动服务、WebUI 访问、登录设置 | 成功进入管理控制台 |
| 2 | [模型配置](/qqbot/maibot/config/models) | 添加厂商/模型、任务分配、测试连通性 | 回复、规划和工具任务已分配可用模型 |
| 3 | [人格与回复](/qqbot/maibot/config/personality) | 昵称、表达风格、群聊/私聊交互频率 | 测试回复符合预期人格设定 |
| 4 | [平台接入](/qqbot/maibot/adapters/adapters) | 选择并配置普通 QQ 账号或官方机器人 | 适配器状态显示为“已连接” |
| 5 | [聊天规则](/qqbot/maibot/adapters/adapter-policy) | 配置会话范围、名单与规则分组 | 指定群聊/私聊能够正常回复 |

> **提示**：图片识别与长期记忆功能需分别额外配置视觉模型（Vision）与嵌入模型（Embedding）。

---

## 🔗 平台接入专题

| 接入方案 | 参考文档 | 适用场景 |
| :--- | :--- | :--- |
| **普通 QQ 账号** | [OneBot 配置](/qqbot/maibot/adapters/onebot) | 使用 NapCat / LLBot 等协议登录 |
| **QQ 官方机器人** <Tag text="推荐" color="#ae2626" /> | [官方机器人配置](/qqbot/maibot/adapters/qq-official) | 通过 AppID / Secret 或扫码连接 |
| **身份协作** | [身份绑定与同步](/qqbot/maibot/adapters/qq-identity) | 绑定群/成员身份与账号关联 |

---

## ⚙️ 管理建议
- **多机器人管理**：MaiBot 支持在一个工作区下管理多个机器人。请注意，模型 API 等配置为**工作区共享**，而人格、任务与数据为**机器人独享**。
- **切换目标**：修改配置前，请先在侧边栏底部的“当前 Bot”选项中确认目标对象。
- **文件与目录**：详见 [配置文件与目录](/qqbot/maibot/config/configuration-files)。

## 🛠️ 进阶维护
- [WebUI 使用指南](/qqbot/maibot/usage/use)
- [插件管理](/qqbot/maibot/usage/plugins)
- [备份与更新](/qqbot/maibot/usage/maintenance)
- [故障排查](/qqbot/maibot/usage/troubleshooting)
