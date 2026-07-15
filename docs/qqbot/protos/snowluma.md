# SnowLuma

SnowLuma 是面向 QQ 的 OneBot 协议实现，可用于连接 AstrBot、MaiBot 等机器人框架。本页提供部署方式概览；具体命令、镜像标签和版本要求应以 SnowLuma 官方文档为准。

::: info 官方资源
- **项目仓库：** <https://github.com/SnowLuma/SnowLuma>
- **Linux Docker 部署：** <https://snowluma.github.io/guide/deploy/docker.html>
- **Windows 部署：** <https://snowluma.github.io/guide/deploy/windows.html>
:::

## 部署方式

| 运行环境 | 官方部署方式 | 适用场景 |
| --- | --- | --- |
| Linux | Docker | 云服务器、长期运行和容器化管理 |
| Windows | Windows 发行包 | 桌面环境、本地调试和可视化登录 |

## Linux Docker 部署

SnowLuma 在 Linux 上通过 Docker 运行。官方镜像包含 Linux QQ、Xvfb、VNC、noVNC 和 supervisord，宿主机只需要准备可用的 Docker 环境。

官方当前提供的镜像和架构信息如下：

| 项目 | 内容 |
| --- | --- |
| 镜像 | `motricseven7/snowluma:latest`，也可以指定具体版本标签 |
| 架构 | `linux/amd64`、`linux/arm64` |
| 模板仓库 | `SnowLuma/SnowLuma.Docker.Framework` |

开始部署前，请在[官方 Docker 部署文档](https://snowluma.github.io/guide/deploy/docker.html)中确认以下内容：

1. Docker 镜像标签与当前 SnowLuma 版本是否匹配。
2. WebUI、OneBot、VNC 与 noVNC 的端口映射是否与现有服务冲突。
3. 容器是否已配置官方要求的 `ptrace` 权限。
4. 配置目录、数据目录和 QQ 数据是否已经通过数据卷持久化。
5. 首次启动后是否已从容器日志中取得 WebUI 临时密码并完成扫码登录。

::: warning 持久化要求
重建或更新容器前必须确认数据卷挂载正确。未持久化的数据会随容器删除而丢失，包括配置、登录状态和账号数据。
:::

## Windows 部署

Windows 部署使用桌面版 QQ（NTQQ）和 SnowLuma Windows 发行包。官方同时说明了完整版与精简版的启动方式；使用精简版时还需要准备 Node.js。

基本流程如下：

1. 安装桌面版 QQ（NTQQ）。
2. 从 SnowLuma 官方发布页下载与系统匹配的发行包。
3. 将发行包解压到独立目录；如使用精简版，请按官方要求安装 Node.js。
4. 双击 `launcher.bat`，或在终端中进入解压目录后执行 `node ./index.mjs`。
5. 启动 QQ 与 SnowLuma，并使用手机 QQ 扫码登录。
6. 在浏览器中打开 WebUI，使用首次启动日志中显示的临时管理员密码登录。

::: warning 运行用户与权限
QQ 与 SnowLuma 必须由同一个 Windows 用户运行，并保持权限级别一致。如果一个程序使用管理员权限而另一个没有，自动注入可能失败。
:::

SnowLuma 默认启用 Hook 自动加载：无论先启动 QQ 还是先启动 SnowLuma，程序都会等待并检测 `QQ.exe`。如需保留 WebUI 手动加载流程，可按照[官方 Windows 部署文档](https://snowluma.github.io/guide/deploy/windows.html)关闭 `hookAutoLoad`。

## 默认服务端口

| 端口 | 用途 |
| --- | --- |
| `5099` | SnowLuma WebUI |
| `3000` | OneBot HTTP |
| `3001` | OneBot WebSocket |

本机访问 WebUI 时，默认地址为：

```text
http://127.0.0.1:5099/
```

::: danger 网络安全
不要将 WebUI 或 OneBot 端口直接暴露到公网。这些接口能够控制 QQ 账号。需要远程访问时，应使用带鉴权的反向代理、受控内网或安全的隧道方案，并修改默认凭据。
:::

## 对接机器人框架

完成 QQ 登录后，在 SnowLuma WebUI 中配置 OneBot HTTP 或 WebSocket，再将对应地址、端口和访问令牌填写到 AstrBot、MaiBot 等框架的协议端配置中。

::: tip 配置核对
连接失败时，依次检查 SnowLuma 实例状态、QQ 登录状态、OneBot 服务是否启用、监听地址、端口、防火墙和访问令牌。容器部署还需要确认框架与 SnowLuma 之间的 Docker 网络是否互通。
:::
