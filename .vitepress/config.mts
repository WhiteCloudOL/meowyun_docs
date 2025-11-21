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
      { text: '文档', link: '/welcome' },
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
          { text: '欢迎', link: '/welcome'}
        ]
      },
      {
        text: 'QQ机器人',
        collapsed: false,
        items: [
          { text: 'Astrbot', link: '/qqbot/astrbot' },
          { text: 'MaiBot', link: '/qqbot/maibot' },
          { text: 'Napcat协议端', link: '/qqbot/napcat' }
        ]
      },
      {
        text: 'MC服务器',
        collapsed: false,
        items: [
          { text: '远程管理服务器/VPS', link: '/mcs/remote' },
          { text: 'Fabric', link: '/mcs/fabric_server'},
          { text: 'Forge', link: '/mcs/forge_server'}
        ]
      },
      {
        text: '雨云系列',
        collapsed: false,
        items: [
          { text: '雨云游戏云面板', link: '/rainyun/rainyun_mcsm' },
        ]
      }
    ],
    footer: {
      message: '以云为翼，栖无界之地，以码为砖，筑万相世界',
      copyright: 'Copyright © 2025-清蒸云鸭',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WhiteCloudOL/meowyun_docs' }
    ]
  }
})
