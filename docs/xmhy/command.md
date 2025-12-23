# 星眠海屿服务器命令-v1.1


## 命令指引

::: info  
Q群：780676145  
完整文档如下：  
传送指令: https://william278.net/docs/huskhomes/commands  
领地: https://www.zrips.net/residence/commands/  
地皮： https://intellectualsites.gitbook.io/plotsquared/features/commands#basics  
:::  

## 传送指令

2. `/sethome [name]`  设置名称为`name`的家  
3. `/home [name]`    回到名称为`name`的家:  
4. `/homelist [page]` 列出家的列表(第n页)  
5. 删除家：
```bash
    /delhome [name]  # 删除指定家
    /delhome all [confirm] # 删除所有家
```
6. 编辑家: 
```bash
    /edithome <name> # 编辑某个家
    /edithome <name> rename <new_name> # 重命名某个家 
    /edithome <name> description <text> # 设置某个家的描述
    /edithome <name> relocate # 重设某个家的坐标
    /edithome <name> privacy [public|private] # 设置家为公开/私人
```
6. 传送到公共家(需要先设置其为公开家):
```
    /phomelist # 列出所有公开家
    /phome [玩家名].[家名] # 传送到某个玩家的某个家
```
7. `/spawn`  传送到出生点  
8. `/warp [name]`  传送到地标  
9. `/tpa [player]`   请求传送到其他玩家  
10. `/tpahere [player]`   请求传送其他玩家到你  
11. `/tpaccept`  接受请求  
12. `/tpdecline`  拒绝请求  
13. `/tpignore`  忽略请求  
14. `/rtp`  随机传送  
15. `/back`  返回上一坐标点  

## 地皮指令  

::: tip  
此处只介绍重要操作~  
:::  
|指令 | 用途 |
| :--- | :----|
|`/plot claim ` | 领取脚下地皮  |
|`/plot auto` | 自动领取地皮  |
|`/plot home` | 回到地皮  |
|`/plot merge` | 合并地皮（站在一个地皮上，视角朝向另一个需要合并的地皮）  |
| `/plot deny <*\|player>` | 拒绝玩家的访问，*表示所有玩家 |
| `/plot trust <*\|player>` | 允许玩家的访问，*表示所有玩家 |

## 领地命令  

::: danger  
如果 `个人设施/资产` 如因为**没有圈地**造成损失不一定保证能够协助恢复，不过如果查到有人熊一次警告，多次 ban 1~∞天不等
:::  

圈地工具: `木锄`  
手持圈地工具左键、右键分别点击两个角落即可完成`选区`~  
1. `/res ?` 查看帮助信息
2. `/res create <领地名>` 创建领地，需要金币
3. 

## 玩家商店  
这是一个箱子商店~，手持任意物品左键单击箱子，并在聊天栏输入价格，即可创建，创建完成后右键单击可切换模式
1. `/qs` 查看帮助  
2. `/qs create` 创建商店  

::: info  
完整文档：  
https://quickshop-community.github.io/QuickShop-Hikari-Documents/docs/category/shop-features  
:::  

## 趣味玩法
|指令 |（指令别名）| 用途 |
| :--- | :--------- | :----|
|`/sit`| `/gsit` | 坐在方块 |
|`/lay`| `/glay` | 躺在方块 |
|`/bellyflop`| `/gbellyflop` | BellyFlop 在方块|
|`/spin`| `/gspin` | 在方块上旋转 |
|`/crawl`| `/gcrawl` | 在地上爬行 |


## 如何使用 
手持物品左键箱子，即可创建商店  
创建完成后，右键牌子即可对商店进行设置  
默认拥有5%税，得到的金币将上缴部分~  

## Q群命令  
`/my` 公共坐标点服务，提供*公共领地/商店/家* 的 自助添加/删除 功能  

`my help` 查看所有帮助  
1. `mcs look meowyun` 查询服务器  
2. MeowYun服务器专用插件用法：  
    /my help - 查看帮助  
    /添加地点 <名称> <类型> <(x,y,z)/公共家标识名/地标名/领地名> <备注> - 保存玩家数据  
    /地点列表 - 显示所有已保存坐标(分页显示)  
    /删除地点 <名称> - 删除指定名称坐标  
    /查询地点 <名称> - 查询指定名称坐标  
