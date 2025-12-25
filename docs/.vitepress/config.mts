import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/",
  title: "清蒸云鸭-文档",
  description: "以云为翼，栖无界之地，以码为砖，筑万相世界",
  head: [['link', { rel: 'icon', href: './favicon.ico' }]],
  themeConfig: {
    logo: '/favicon.ico',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '文档', link: '/info/welcome' },
      {
        text: '联系',
        items: [
          { text: 'B站', link: 'https://space.bilibili.com/109054961'},
          { text: 'Q群', link: 'https://qm.qq.com/q/9yNGpaku4g' }
        ]
      },
    ],
    
    sidebar: [
      {
        text: '简介',
        items: [
          { text: '欢迎', link: '/info/welcome'},
          { text: '联系', link: '/info/contact'}
        ]
      },
      {
        text: 'QQ机器人',
        collapsed: false,
        items: [
          { text: 'Astrbot', link: '/qqbot/astrbot' },
          { text: 'MaiBot',
            collapsed: true,
            items: [
              { text: '介绍', link: '/qqbot/maibot/intro'},
              { text: '部署', link: '/qqbot/maibot/install'},
              { text: '配置与启动', link: '/qqbot/maibot/conf'},
              { text: '使用', link: '/qqbot/maibot/use'},
              { text: '插件', link: '/qqbot/maibot/plugins'}
            ]
          },
          { text: 'Napcat协议端', link: '/qqbot/napcat' }
        ]
      },
      {
        text: 'MC服务器',
        collapsed: false,
        items: [
          { text: '远程管理服务器/VPS', link: '/mcs/remote' },
          //{ text: 'Fabric', link: '/mcs/fabric_server'},
          //{ text: 'Forge', link: '/mcs/forge_server'},
          { text: '常用命令', link: '/mcs/command'},
          //{ text: '资源合集', link: '/mcs/rslink'}
        ]
      },
      {
        text: '雨云系列',
        collapsed: false,
        items: [
          { text: '注册', link: '/rainyun/reg'},
          { text: '配置选择', link: '/rainyun/buy'},
          { 
            text: '雨云游戏云面板', 
            collapsed: true, 
            items: [
              { text: '介绍', link: '/rainyun/mcsm/intro' },
              { text: '安装环境', link: '/rainyun/mcsm/install-env'},
              { text: '安装服务端', link: '/rainyun/mcsm/install-mc'},
              { text: '启动', link: '/rainyun/mcsm/launch-mc'},
              { text: '配置', link: '/rainyun/mcsm/configure-mc'},
              { text: '进阶', link: '/rainyun/mcsm/advance'},
              { text: 'Q&A', link: '/rainyun/mcsm/question'}
            ]
          },
          
        ]
      },
      {
        text: '星眠海屿',
        collapsed: false,
        items: [
          { text: '服务器指令', link: '/xmhy/command' },
        ]
      }
    ],
    footer: {
      message: '以云为翼，栖无界之地，以码为砖，筑万相世界',
      copyright: 'Copyright © 2025-清蒸云鸭',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WhiteCloudOL/meowyun_docs' }
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }

    }

  }
})
