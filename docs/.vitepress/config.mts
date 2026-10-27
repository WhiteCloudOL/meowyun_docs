import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '清蒸云鸭の文档',
  description: '以云为翼，栖无界之地；以码为砖，筑万相世界。',
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'theme-color', content: '#fafafc', media: '(prefers-color-scheme: light)' }],
    ['meta', { name: 'theme-color', content: '#1c1a20', media: '(prefers-color-scheme: dark)' }],
  ],

  themeConfig: {
    logo: {
      light: '/logo.webp',
      dark: '/logo.webp',
      alt: '清蒸云鸭の文档',
    },

    nav: [
      { text: '首页', link: '/' },
      {
        text: '文档站点',
        items: [
          { text: '文档主站', link: 'https://docs.meowyun.cn/' },
          { text: 'Cloudflare 镜像', link: 'https://docs.thecatyun.top/' },
        ],
      },
      {
        text: '联系',
        items: [
          { text: '哔哩哔哩', link: 'https://space.bilibili.com/109054961' },
          { text: 'QQ 群', link: 'https://qm.qq.com/q/9yNGpaku4g' },
        ],
      },
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '欢迎', link: '/info/welcome' },
          { text: '联系方式', link: '/info/contact' },
        ],
      },
      {
        text: 'QQ 机器人',
        collapsed: false,
        items: [
          {
            text: 'AstrBot',
            collapsed: true,
            items: [
              { text: '简介', link: '/qqbot/astrbot/intro' },
              { text: 'Docker 部署', link: '/qqbot/astrbot/docker' },
              { text: 'Linux 部署', link: '/qqbot/astrbot/linux' },
              { text: 'Windows 部署', link: '/qqbot/astrbot/windows' },
            ],
          },
          {
            text: 'MaiBot',
            collapsed: true,
            items: [
              { text: '简介', link: '/qqbot/maibot/intro' },
              { text: '安装与部署', link: '/qqbot/maibot/install' },
              { text: '配置与启动', link: '/qqbot/maibot/conf' },
              { text: '插件管理', link: '/qqbot/maibot/plugins' },
              { text: '使用指南', link: '/qqbot/maibot/use' },
              { text: '常用插件索引', link: '/qqbot/maibot/plugins_index' },
            ],
          },
          {
            text: 'QQ 协议端',
            collapsed: true,
            items: [
              { text: 'NapCat', link: '/qqbot/protos/napcat' },
              { text: 'LLBot', link: '/qqbot/protos/llbot' },
              { text: 'SnowLuma', link: '/qqbot/protos/snowluma' },
            ],
          },
        ],
      },
      {
        text: 'Minecraft 服务器',
        collapsed: false,
        items: [
          { text: '远程管理服务器 / VPS', link: '/mcs/remote' },
          { text: '常用指令', link: '/mcs/command' },
        ],
      },
      {
        text: '雨云服务',
        collapsed: false,
        items: [
          { text: '注册与登录', link: '/rainyun/reg' },
          { text: '产品选购', link: '/rainyun/buy' },
          {
            text: '游戏云面板',
            collapsed: true,
            items: [
              { text: '面板介绍', link: '/rainyun/mcsm/intro' },
              { text: '安装环境', link: '/rainyun/mcsm/install-env' },
              { text: '安装服务端', link: '/rainyun/mcsm/install-mc' },
              { text: '启动服务端', link: '/rainyun/mcsm/launch-mc' },
              { text: '修改配置', link: '/rainyun/mcsm/configure-mc' },
              { text: '进阶使用', link: '/rainyun/mcsm/advance' },
              { text: '常见问题', link: '/rainyun/mcsm/question' },
            ],
          },
          {
            text: '幻兽帕鲁',
            collapsed: true,
            items: [
              { text: '选购与准备', link: '/rainyun/palworld/intro' },
              { text: '安装运行环境', link: '/rainyun/palworld/install-env' },
              { text: '安装与启动服务端', link: '/rainyun/palworld/install-server' },
              { text: '端口映射与联机', link: '/rainyun/palworld/network' },
              { text: '安装 Mod', link: '/rainyun/palworld/mods' },
            ],
          },
        ],
      },
    ],

    outline: {
      level: [2, 3],
      label: '本页导航',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    },
    darkModeSwitchLabel: '切换深浅色',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    sidebarMenuLabel: '文档目录',
    returnToTopLabel: '返回顶部',
    externalLinkIcon: true,

    footer: {
      message: '以云为翼，栖无界之地；以码为砖，筑万相世界。<br>本站部署于 <a href="https://www.rainyun.com/qzyy_" target="_blank" rel="noopener noreferrer">雨云</a>',
      copyright: 'Copyright © 2026 清蒸云鸭',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/WhiteCloudOL/meowyun_docs' },
    ],

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '没有找到相关内容',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },
  },
})
