---
title: 安装幻兽帕鲁 Mod
editLink: false
---

# 安装幻兽帕鲁 Mod

本页介绍如何在雨云 Windows 游戏云 VPS 上，为《幻兽帕鲁》专用服务器安装、启用、更新和移除 Mod。当前版本优先使用游戏官方提供的 Mod 管理方式。

::: danger 安装前必须备份
Mod 可能造成服务端崩溃、玩家无法加入，甚至损坏存档。开始前请停止服务器，并完整备份：

```text
D:\steamcmd\steamapps\common\PalServer\Pal\Saved
```

不要在 `PalServer.exe` 运行时替换或删除 Mod 文件。
:::

## 开始前确认

官方服务端目前只支持在 **Windows 版专用服务器**上使用服务端 Mod。安装前还要确认服务器已经按照[安装与启动服务端](install-server.md)完成过至少一次启动。

每个 Mod 的安装要求可能不同。下载页面至少需要确认以下内容：

| 检查项目 | 应确认的内容 |
| :--- | :--- |
| 游戏版本 | Mod 支持当前《幻兽帕鲁》版本 |
| 专服支持 | 作者明确写有 Dedicated Server、Server 或服务端支持 |
| 安装范围 | 仅服务端、仅客户端，还是服务端与所有客户端都要安装 |
| 前置依赖 | 是否需要 UE4SS、PalSchema 或其他 Mod |
| 配置方式 | 是否需要修改额外配置文件 |

::: warning 不要仅凭文件后缀判断
两个 Mod 即使都是 `.pak`，安装目录和加载方式也可能完全不同。应优先阅读作者提供的 `README`、Requirements、Dependencies 和 Installation 说明。
:::

## 判断需要安装在哪里

| Mod 类型 | 服务器 | 玩家客户端 |
| :--- | :---: | :---: |
| 作者标注 Server-side only | 必须安装 | 通常不需要 |
| 作者标注 Client-side only | 不要安装 | 需要安装 |
| 作者标注 Both / Server and Client | 必须安装 | 所有玩家必须安装相同版本 |
| 作者没有说明 | 暂时不要安装 | 先向作者确认 |

需要客户端配套的 Mod 如果缺失或版本不同，玩家可能无法加入、看不到新增内容，或者在加载世界时崩溃。

## 第一步：首次生成 Mod 配置

如果服务器刚安装完成，请先不带任何 Mod 启动一次 `PalServer.exe`，等待服务端正常运行后再关闭。首次启动后，服务端会自动生成：

```text
D:\steamcmd\steamapps\common\PalServer\Mods\PalModSettings.ini
```

如果没有看到 `Mods` 文件夹或 `PalModSettings.ini`：

1. 确认 SteamCMD 已经把服务端更新到当前版本。
2. 确认查看的是包含 `PalServer.exe` 的目录。
3. 再启动一次服务端，等待片刻后正常关闭。

## 第二步：准备 Mod 文件

### 从 Steam 创意工坊获取

在自己的电脑上通过 Steam 订阅 Mod 后，创意工坊文件通常位于：

```text
C:\Program Files (x86)\Steam\steamapps\workshop\content\1623730
```

其中的数字子文件夹通常对应创意工坊项目 ID。找到目标 Mod 后，确认它的目录内直接包含 `Info.json`。

将整个 Mod 文件夹复制到服务器的：

```text
D:\steamcmd\steamapps\common\PalServer\Mods\Workshop\<任意文件夹名>
```

例如：

```text
D:\steamcmd\steamapps\common\PalServer\Mods\Workshop\1234567890\Info.json
```

::: tip 传输到远程服务器
可以先在自己的电脑上把 Mod 文件夹压缩为 `.zip`，通过远程桌面复制到服务器，再右键解压到 `Mods\Workshop`。解压后不要多套一层目录。
:::

### 使用作者提供的压缩包

如果从 Mod 作者页面下载的是官方格式安装包：

1. 解压压缩包。
2. 找到直接包含 `Info.json` 的文件夹。
3. 将这个文件夹复制到服务器的 `Mods\Workshop` 中。

正确结构：

```text
PalServer
├─ PalServer.exe
└─ Mods
   ├─ PalModSettings.ini
   └─ Workshop
      └─ MyMod
         ├─ Info.json
         └─ ...其他 Mod 文件
```

错误结构通常是多解压了一层：

```text
Mods\Workshop\MyMod\MyMod\Info.json
```

此时应把内部的 `MyMod` 文件夹向上移动一层。

## 第三步：确认服务端兼容性

使用记事本打开 Mod 的 `Info.json`，完成两项检查：

1. 找到 `PackageName`，记下它对应的值。后面启用 Mod 时填写的是这个值，**不是文件夹名称或创意工坊 ID**。
2. 检查 `InstallRule` 是否包含服务端规则，即能看到类似于以下内容的字段：

```json
"IsServer": true
```

如果没有服务端安装规则，说明这个包不能直接在专用服务器上运行。

::: warning 不要修改 Info.json
本步骤只用于查看 `PackageName` 和服务端支持情况。随意修改版本、依赖或安装规则可能导致 Mod 部署失败。
:::

## 第四步：在 PalModSettings.ini 中启用

使用记事本打开：

```text
D:\steamcmd\steamapps\common\PalServer\Mods\PalModSettings.ini
```

确认全局开关为 `true`，并为每个需要启用的 Mod 添加一行 `ActiveModList`：

```ini
[PalModSettings]
bGlobalEnableMod=true
ActiveModList=MyFirstMod
ActiveModList=MySecondMod
```

将示例中的 `MyFirstMod` 和 `MySecondMod` 替换为各自 `Info.json` 中的真实 `PackageName`。

::: danger 常见填写错误
- 不要填写 Mod 显示名称。
- 不要填写创意工坊数字 ID。
- 不要给 `PackageName` 随意添加空格或中文引号。
- 多个 Mod 需要写成多行 `ActiveModList=`，不要使用逗号拼在同一行。
:::

保存文件并关闭记事本。

## 第五步：启动并检查部署结果

重新双击 `PalServer.exe`。服务端启动时会读取 `Info.json`，并按照其中的规则把 Mod 部署到实际运行目录。

成功部署后通常可以看到：

```text
Mods\ManagedMods\<PackageName>\InstallManifest.json
```

不同类型的 Mod 会由官方加载器自动部署到不同位置：

| 类型 | 自动部署位置 |
| :--- | :--- |
| UE4SS | `Mods\NativeMods\UE4SS` |
| Lua | `Mods\NativeMods\UE4SS\Mods\<PackageName>` |
| PalSchema | `Mods\NativeMods\UE4SS\Mods\PalSchema\mods\<PackageName>` |
| LogicMods | `Pal\Content\Paks\LogicMods` |
| 普通 Paks | `Pal\Content\Paks\~WorkshopMods\<PackageName>` |

::: tip 不要手动重复复制
如果 Mod 已通过 `Mods\Workshop` 和 `PalModSettings.ini` 管理，就不要再把同一份 Mod 手动复制到 `Paks` 或 UE4SS 目录。重复安装可能产生冲突或加载两个不同版本。
:::

进入游戏测试时，应优先检查：

1. 服务端能否正常启动并保持运行。
2. 没有安装 Mod 的客户端是否符合作者要求。
3. 所有必须安装客户端 Mod 的玩家是否使用相同版本。
4. Mod 新增功能是否正常，原存档是否能够加载。

## 更新 Mod

1. 通知玩家下线并关闭 `PalServer.exe`。
2. 再次备份 `Pal\Saved`。
3. 下载与当前游戏版本兼容的新版本 Mod。
4. 用新文件替换 `Mods\Workshop` 中的旧版本，保持 `Info.json` 位于正确层级。
5. 确认 `PackageName` 是否变化；发生变化时同步修改 `PalModSettings.ini`。
6. 启动服务端并测试。

官方加载器会根据 `Info.json` 中的 `Version` 判断是否需要移除旧部署并重新安装。若作者更新文件却没有更新版本号，自动更新可能无法正确触发，此时应查看作者的处理说明。

## 停用或删除 Mod

::: warning 移除内容型 Mod 的风险
增加帕鲁、物品、建筑或地图内容的 Mod 可能已经把数据写入存档。直接移除后可能丢失内容或导致存档无法载入，操作前必须阅读作者的卸载说明并保留备份。
:::

安全停用流程：

1. 关闭服务器并备份 `Pal\Saved`。
2. 打开 `Mods\PalModSettings.ini`。
3. 删除对应的 `ActiveModList=<PackageName>` 行。
4. 启动服务器并检查存档。
5. 确认一切正常后，再删除 `Mods\Workshop` 中对应的 Mod 文件夹。

如果只是临时排查，可以先停用而不删除文件，之后重新添加 `ActiveModList` 即可恢复。

## 服务器装 Mod 后无法启动

### 临时禁用所有 Mod

进入包含 `PalServer.exe` 的文件夹，在地址栏输入 `cmd` 并按回车，然后执行：

```bat
PalServer.exe -NoMods
```

`-NoMods` 会在本次启动中强制禁用全部 Mod，适合确认问题是否由 Mod 引起，不会自动删除 Mod 文件。

### 逐个排查

1. 关闭服务器。
2. 保留前置依赖，从最近新增或更新的 Mod 开始，在 `PalModSettings.ini` 中移除对应启用行。
3. 每次只停用一个 Mod，然后重新启动测试。
4. 找到问题 Mod 后，核对游戏版本、Mod 版本、依赖和服务端支持说明。
5. 无法修复时恢复安装前的 `Pal\Saved` 备份。

### 常见原因

- Mod 不支持当前游戏版本。
- `Info.json` 不含 `"IsServer": true`。
- `PackageName` 填写错误。
- 解压后多出一层目录，服务端找不到 `Info.json`。
- 缺少 UE4SS、PalSchema 或其他前置 Mod。
- 服务端与玩家客户端的 Mod 版本不同。
- 两个 Mod 修改了相同资源而发生冲突。
- 同一 Mod 同时使用官方加载方式和旧式手动方式安装。

## 关于旧式手动 Mod

部分早期或未适配官方格式的 Mod 压缩包不包含 `Info.json`，可能要求手动放入 `Paks\~mods`、`Paks\LogicMods` 或 UE4SS 目录。此类 Mod 不能直接写入 `ActiveModList`。

::: danger 严格遵循作者说明
旧式 Mod 的目录、加载器版本和启动方式差异很大，本页不建议根据文件后缀猜测安装位置。尤其不要把手动安装的 UE4SS 与官方加载器部署的另一版本 UE4SS 混用。作者没有提供当前版本专服安装说明时，建议放弃安装该 Mod。
:::

## 参考资料

- [Palworld Server Guide：在服务器上安装 Mod](https://docs.palworldgame.com/settings-and-operation/mod/)
- [RE-UE4SS 发布页面](https://github.com/UE4SS-RE/RE-UE4SS/releases)
