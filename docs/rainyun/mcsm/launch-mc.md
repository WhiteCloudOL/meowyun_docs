# 启动 Minecraft 服务器

完成服务端文件上传、环境安装和启动脚本配置后，可按照本页流程完成首次启动。

## 初次启动

::: tip 前置条件
请先完成[启动脚本配置](install-mc.md#编辑启动脚本)。
:::  

进入`MCSM 面板`，在主界面终端右上角点击启动。如果终端出现以下提示，说明尚未接受 Minecraft 最终用户许可协议（EULA）：

```text
You need to agree to the EULA in order to run the server. Go to eula.txt for more info.
```

前往 `MCSM 面板` → `文件管理` → `eula.txt`，将配置修改为：

```properties
eula=true
```

请确认 `true` 拼写正确。保存文件即表示你已阅读并同意 Minecraft EULA。

## 正式启动

再次启动服务端，并观察终端是否出现正常启动完成的信息。服务端成功运行后，还需要继续完成端口、在线模式等[服务器配置](configure-mc.md)，才能从客户端正确连接。
