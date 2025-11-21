# MaiBot麦麦 
> 一款非常拟人的机器人  
> By 清蒸云鸭  
> 2025/11/21 基于bot版本<Badge type="tip" text="0.11.0" />  

::: info  
**官方文档:** https://docs.mai-mai.org/  
**Github:** https://github.com/MaiM-with-u/MaiBot  
**雨云部署：** https://www.rainyun.com/qzyy_ （首月优惠码5折）  
:::  

## Windows  
配置要求：最低2H2G，最佳2H4G  
服务器地域要求：无  

### （一）部署MaiBot
python >= **3.10**  
> 详见官方文档 https://docs.mai-mai.org/  


### （二）启动MaiBot  
### 手动启动  
1. `MaiM-with-u`文件夹下或MaiBot文件夹下存在`Python虚拟环境`"venv"或".venv"文件，记住路径（记为`<venvPath>` ），例如 ` D:\MaiM-with-u\venv`，找到其中的activate，例如`<venvPath>\Scripts\activate`  
2. 在`MaiM-with-u`目录下的`MaiBot`与`MaiBot-Napcat-Adapter`目录下分别打开`cmd`，输入`<venvPath>\Scripts\activate`激活虚拟环境  
3. `MaiBot`与`MaiBot-Napcat-Adapter`分别打开的cmd窗口中，分别输入`python bot.py`，`python main.py`打开Bot本体与BotQQ适配器  

#### 脚本启动  
假设我的`Maim-with-u`文件夹为：
::: details 文件分布
```
Maim-with-u/
├── MaiBot/
│   ├── bot.py
│   └── ...
├── MaiBot-Napcat-Adapter/
│   ├── main.py
│   └── ...
└── venv/
    ├── Scripts/
    │   ├── activate
    │   ├── activate.bat
    │   ├── python.exe
    │   └── ...
    ├── Include/
    ├── Lib/
    ├── share/
    └── pyvenv.cfg
```
:::
那么在`Maim-with-u\MaiBot\`与`Maim-with-u\MaiBot-Napcat-Adapter\`下分别新建`start.bat`
分别填入以下内容
```batch
    :: "Maim-with-u\MaiBot\start.bat"下
    ..\venv\Scripts\python bot.py


    :: "Maim-with-u\MaiBot-Napcat-Adapter\start.bat"下
    ..\venv\Scripts\python main.py
```

随后分别在两个文件夹内打开 `start.bat` 即可启动bot。

### （三）配置MaimBot  

::: details 1. 本体环境配置`MaiM-with-u/MaiBot/.env`
```toml
    # 绑定主机
    HOST=127.0.0.1
    # 对接Maimbot的端口
    PORT=8000
```  
:::

::: details 2. 机器人配置`MaiM-with-u/MaiBot/config/bot_config.toml`  
**主要选项：**  
```toml
    [bot]
    platform = "qq" 
    qq_account = 123456789 # 麦麦的QQ账号
    nickname = "麦麦" # 麦麦的昵称
    alias_names = ["麦叠", "牢麦"] # 麦麦的别名

    [personality]
    # 建议50字以内，描述人格的核心特质
    personality_core = "是一个女孩子" 
    # 人格的细节，描述人格的一些侧面
    personality_side = "有时候说话不过脑子,喜欢开玩笑, 有时候会表现得无语,有时候会喜欢说一些奇怪的话"

    #アイデンティティがない 生まれないらららら
    # 可以描述外貌，性别，身高，职业，属性等等描述
    identity = "年龄为19岁,是女孩子,身高为160cm,有黑色的短发"

    # 描述麦麦说话的表达风格，表达习惯，如要修改，可以酌情新增内容
    reply_style = "回复可以简短一些。可以参考贴吧，知乎和微博的回复风格，回复不要浮夸，不要用夸张修辞，平淡一些。不要浮夸，不要夸张修辞。"

    # 描述麦麦的行为风格，会影响麦麦什么时候回复，什么时候使用动作，麦麦考虑的可就多了
    plan_style = "当你刚刚发送了消息，没有人回复时，不要选择action，如果有别的动作（非回复）满足条件，可以选择，当你一次发送了太多消息，为了避免打扰聊天节奏，不要选择动作"

    # 麦麦的兴趣，会影响麦麦对什么话题进行回复
    interest = "对技术相关话题，游戏和动漫相关话题感兴趣，也对日常话题感兴趣，不喜欢太过沉重严肃的话题"
    ...
```  
:::

::: details 2. 机器人模型配置`MaiM-with-u/MaiBot/model_config.toml`  
```toml
    [inner]
    version = "1.5.0"

    # 配置文件版本号迭代规则同bot_config.toml

    [[api_providers]] # API服务提供商（可以配置多个）
    name = "DeepSeek"                       # API服务商名称（可随意命名，在models的api-provider中需使用这个命名）
    base_url = "https://api.deepseek.com/v1" # API服务商的BaseURL
    api_key = "your-api-key-here"           # API密钥（请替换为实际的API密钥）
    client_type = "openai"                  # 请求客户端（可选，默认值为"openai"，使用gimini等Google系模型时请配置为"gemini"）
    max_retry = 2                           # 最大重试次数（单个模型API调用失败，最多重试的次数）
    timeout = 30                            # API请求超时时间（单位：秒）
    retry_interval = 10                     # 重试间隔时间（单位：秒）

    [[api_providers]] # SiliconFlow的API服务商配置
    name = "SiliconFlow"
    base_url = "https://api.siliconflow.cn/v1"
    api_key = "your-siliconflow-api-key"
    client_type = "openai"
    max_retry = 2
    timeout = 30
    retry_interval = 10

    [[api_providers]] # 特殊：Google的Gimini使用特殊API，与OpenAI格式不兼容，需要配置client为"gemini"
    name = "Google"
    base_url = "https://api.google.com/v1"
    api_key = "your-google-api-key-1"
    client_type = "gemini"
    max_retry = 2
    timeout = 30
    retry_interval = 10

    [[api_providers]] # 阿里 百炼 API服务商配置
    name = "BaiLian"
    base_url = "https://dashscope.aliyuncs.com/compatible-mode/v1"
    api_key = "your-bailian-key"
    client_type = "openai"
    max_retry = 2
    timeout = 15
    retry_interval = 5


    [[models]] # 模型（可以配置多个）
    model_identifier = "deepseek-chat" # 模型标识符（API服务商提供的模型标识符）
    name = "deepseek-v3"               # 模型名称（可随意命名，在后面中需使用这个命名）
    api_provider = "DeepSeek"          # API服务商名称（对应在api_providers中配置的服务商名称）
    price_in = 2.0                     # 输入价格（用于API调用统计，单位：元/ M token）（可选，若无该字段，默认值为0）
    price_out = 8.0                    # 输出价格（用于API调用统计，单位：元/ M token）（可选，若无该字段，默认值为0）
    #force_stream_mode = true          # 强制流式输出模式（若模型不支持非流式输出，请取消该注释，启用强制流式输出，若无该字段，默认值为false）
```   
:::

主要应于`SiliconFlow: api_key`填入API密钥，一般为sk开头，例如`api_key=sk-123456789xxxxx`
该api由硅基流动提供。  
使用我的 **邀请码注册** 可直接获得14免费余额 https://cloud.siliconflow.cn/i/ys2vPqSO

::: details 1. Adapter适配器配置`MaiM-with-u/MaiBot-Napcat-Adapter/config.toml`
```toml
    [inner]
    version = "0.1.1" # 版本号
    # 请勿修改版本号，除非你知道自己在做什么

    [nickname] # 现在没用
    nickname = ""

    [napcat_server] # Napcat连接的ws服务设置
    host = "localhost"      # Napcat设定的主机地址
    port = 8095             # Napcat设定的端口 
    heartbeat_interval = 30 # 与Napcat设置的心跳相同（按秒计）

    [maibot_server] # 连接麦麦的ws服务设置
    host = "localhost" # 麦麦在.env文件中设置的主机地址，即HOST字段
    port = 8000        # 麦麦在.env文件中设置的端口，即PORT字段

    [chat] # 黑白名单功能
    group_list_type = "whitelist" # 群组名单类型，可选为：whitelist, blacklist
    group_list = [123455678,23445678]       # 群组名单
    # 当group_list_type为whitelist时，只有群组名单中的群组可以聊天
    # 当group_list_type为blacklist时，群组名单中的任何群组无法聊天
    private_list_type = "whitelist" # 私聊名单类型，可选为：whitelist, blacklist
    private_list = []       # 私聊名单
    # 当private_list_type为whitelist时，只有私聊名单中的用户可以聊天
    # 当private_list_type为blacklist时，私聊名单中的任何用户无法聊天
    ban_user_id = []   # 全局禁止名单（全局禁止名单中的用户无法进行任何聊天）
    ban_qq_bot = false # 是否屏蔽QQ官方机器人
    enable_poke = true # 是否启用戳一戳功能

    [voice] # 发送语音设置
    use_tts = false # 是否使用tts语音（请确保你配置了tts并有对应的adapter）

    [debug]
    level = "INFO" # 日志等级（DEBUG, INFO, WARNING, ERROR, CRITICAL）
```  
:::
**主要选项：** 修改`[Chat] # 黑白名单功能`中的
```toml
    group_list = [12345678,345678901] # 群组名单
    private_list = [12345678] # 私聊名单
```

## Linux
### （一）部署MaimBot
在此推荐使用`screen`保持终端后台常开
> 详见官方文档  

### （二）启动MaimBot
1. 自动化脚本启动  
方便起见我可能会在Maim-with-u目录下放置一个 `start_all.sh` 脚本
如何使用：
```bash
    bash start_all.sh  # 运行脚本
```
**源码**：https://github.com/WhiteCloudOL/Maibot-StartScripts/blob/main/Script.sh  


2. 手动启动  
首先，使用 `screen -ls` 命令查看是否存在正在运行MaimBot的screen窗口
```shell
    root@lavm-v6ydjl266r:~# screen -ls
    There are screens on:
            108312.astrbot  (05/25/2025 10:35:38 PM)        (Detached)
            107951.mai-adapter      (05/25/2025 10:34:55 PM)        (Detached)
            107689.mai-main (05/25/2025 10:34:27 PM)        (Detached)
    3 Sockets in /run/screen/S-root.
```
可以看到正在有两个正在运行的mai-bot，如需重新启动可直接使用`screen -S pid -X quit`来删除screen窗口，例如`screen -S 107951.mai-adapter -X quit`和`screen -S 107689.mai-main -X quit`来退出`Mai-Adapter`和`Mai-Main`窗口  
完成后，进入存放bot的目录  
假如我的文件如此分布：  
::: details 文件分布
```
/path/to/your/maibot
├── .Maim-with-u/
│   ├── .venv/
│   │   └── bin/
│   │       ├── activate
│   │       ├── python
│   │       ├── python3
│   │       └── ...
│   ├── MaiBot/
│   │   ├── bot.py
│   │   ├── start.sh  # 或 run.sh
│   │   └── ...
│   ├── MaiBot-Napcat-Adapter/
│   │   ├── main.py
│   │   ├── start.sh  # 或 run.sh
│   │   └── ...
│   └── ...
├── .home/
└── ...
```  
:::
如果你不知道文件夹如何分布，可逐级进入：`ls`-->`cd Maim-with-u/`-->`ls`-->`cd MaiBot`-->`...`  
1. 进入"/root/Maim-with-u/MaiBot/"文件夹`cd /root/Maim-with-u/MaiBot/`  
2. 创建screen窗口`screen -S mai-main`（-S 后面接screen名称便于后续识别不同screen窗口）  
3. 运行创建好的启动脚本"start.sh或run.sh"，`bash start.sh`  
   **手动启动：** `../venv/bin/python3 bot.py`  
   若启动Adapter可使用`../venv/bin/python3 main.py`  
4. 如果没有报错，启动成功，则按`Ctrl+A+D`来detatch窗口  
5. 进入"/root/Maim-with-u/MaiBot-Napcat-Adapter/"文件夹重复以上操作，注意screen用新的名称比如`mai-adapter`  

### （三）配置MaimBot  
可用`vim [文件名]`或`nano [文件名]`来编辑文件(nano更加直观一些)  
vim简易操作：  
1. 进入文件后，按下`I`键来进入“插入模式”，此时通过键盘方向键进行光标移动  
2. 编辑完成后按下`ESC`键，输入`:wq`来保存文件。  
   其他命令：`:w`保存不退出，`:q`不保存退出，`:q!`强制退出，其他可自行查阅  
  
熟悉以上后可依照本文 `Windows`栏的`配置MaimBot`来进行【[跳转](http://docs.catyun.cyou/qqbot/maibot.html#windows)】
