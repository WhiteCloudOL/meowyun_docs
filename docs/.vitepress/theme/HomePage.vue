<script setup>
const topics = [
  {
    eyebrow: 'SERVER & MODS',
    title: 'Minecraft 服务器',
    description: '从远程连接、环境准备到服务端配置，按清晰步骤搭建并维护自己的世界。',
    link: '/mcs/remote',
    linkText: '进入服务器专题',
    tone: 'taro',
  },
  {
    eyebrow: 'BOT & PROTOCOL',
    title: 'QQ 机器人',
    description: '覆盖 AstrBot、MaiBot、NapCat、LLBot 与 SnowLuma 的部署、连接和日常使用。',
    link: '/qqbot/astrbot/intro',
    linkText: '进入机器人专题',
    tone: 'sakura',
  },
  {
    eyebrow: 'CLOUD SERVICE',
    title: '雨云服务',
    description: '从账号注册、产品选购到游戏云面板，让服务器上线过程更容易理解。',
    link: '/rainyun/reg',
    linkText: '进入雨云专题',
    tone: 'sky',
  },
]
</script>

<template>
  <main class="cute-home">
    <div class="cute-home__ambient cute-home__ambient--blue" aria-hidden="true"></div>
    <div class="cute-home__ambient cute-home__ambient--pink" aria-hidden="true"></div>

    <section class="hero-bento" aria-labelledby="home-title">
      <div class="hero-bento__copy">
        <p class="hero-bento__eyebrow">
          <span aria-hidden="true"></span>
          MEOWYUN KNOWLEDGE BASE
        </p>

        <h1 id="home-title" class="hero-bento__title">清蒸云鸭の文档</h1>

        <p class="hero-bento__manifesto">
          <span>以云为翼，栖无界之地</span>
          <span class="hero-bento__manifesto-second">以码为砖，筑万相世界</span>
        </p>

        <p class="hero-bento__tagline">
          为 QQ 机器人、Minecraft 服务器与云服务整理的实用知识库。
        </p>

        <div class="hero-bento__actions" aria-label="首页快捷入口">
          <a class="toy-button toy-button--primary" href="/info/welcome">
            开始阅读
            <span aria-hidden="true">→</span>
          </a>
          <a class="toy-button toy-button--secondary" href="https://index.meowyun.cn/">
            打开导航
          </a>
        </div>
      </div>

      <div class="hero-bento__visual" aria-label="清蒸云鸭文档图标">
        <span class="visual-note visual-note--top" aria-hidden="true">DOCS</span>
        <span class="visual-note visual-note--side" aria-hidden="true">持续更新</span>
        <div class="visual-orbit" aria-hidden="true"></div>
        <img class="hero-bento__logo" src="/logo.webp" alt="清蒸云鸭文档" />
        <span class="visual-spark visual-spark--one" aria-hidden="true"></span>
        <span class="visual-spark visual-spark--two" aria-hidden="true"></span>
      </div>
    </section>

    <section class="topic-bento" aria-label="文档专题">
      <a
        v-for="topic in topics"
        :key="topic.title"
        class="topic-card"
        :class="`topic-card--${topic.tone}`"
        :href="topic.link"
      >
        <div class="topic-card__topline">
          <span class="topic-card__icon" aria-hidden="true">
            <svg v-if="topic.tone === 'taro'" viewBox="0 0 32 32">
              <path class="icon-cube__top" d="m16 3 11 6-11 6L5 9l11-6Z" />
              <path class="icon-cube__left" d="m5 9 11 6v13L5 22V9Z" />
              <path class="icon-cube__right" d="m27 9-11 6v13l11-6V9Z" />
              <path d="m10 12 3 1.65v4.8L10 16.8V12Z" fill="currentColor" opacity=".7" />
            </svg>
            <svg v-else-if="topic.tone === 'sakura'" viewBox="0 0 32 32">
              <path d="M16 3v4" />
              <circle cx="16" cy="3" r="1.7" class="icon-fill" />
              <rect x="5" y="7" width="22" height="19" rx="7" class="icon-soft" />
              <path d="M9 18v-4a7 7 0 0 1 7-7h0a7 7 0 0 1 7 7v4" />
              <circle cx="12" cy="16" r="1.8" class="icon-fill" />
              <circle cx="20" cy="16" r="1.8" class="icon-fill" />
              <path d="M12 21c1.1 1 2.4 1.5 4 1.5s2.9-.5 4-1.5" />
            </svg>
            <svg v-else viewBox="0 0 32 32">
              <path
                class="icon-soft"
                d="M9.5 25a6.5 6.5 0 0 1-.7-13A8.5 8.5 0 0 1 25 14.5 5.25 5.25 0 0 1 24.75 25H9.5Z"
              />
              <path d="M10 25h14.5a5.5 5.5 0 0 0 .3-11A8.5 8.5 0 0 0 8.6 12" />
              <path d="m12 28 1.5-2M19 29l1.5-2" />
            </svg>
          </span>
          <span class="topic-card__eyebrow">{{ topic.eyebrow }}</span>
        </div>
        <h2>{{ topic.title }}</h2>
        <p>{{ topic.description }}</p>
        <span class="topic-card__link">
          {{ topic.linkText }}
          <span aria-hidden="true">↗</span>
        </span>
      </a>
    </section>
  </main>
</template>

<style scoped>
.cute-home {
  position: relative;
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
  color: var(--vp-c-text-1);
  isolation: isolate;
}

.cute-home::before {
  position: absolute;
  z-index: -3;
  inset: -80px -120px;
  background-image: radial-gradient(
    circle,
    color-mix(in srgb, var(--vp-c-text-3) 20%, transparent) 1px,
    transparent 1.2px
  );
  background-size: 22px 22px;
  mask-image: linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent);
  content: '';
  opacity: 0.35;
  pointer-events: none;
}

.cute-home__ambient {
  position: absolute;
  z-index: -2;
  width: 360px;
  height: 360px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.34;
  pointer-events: none;
}

.cute-home__ambient--blue {
  top: -100px;
  left: -150px;
  background: #bde0fe;
}

.cute-home__ambient--pink {
  right: -150px;
  bottom: -60px;
  background: #ffb7c5;
}

.hero-bento {
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(300px, 0.65fr);
  gap: 38px;
  align-items: center;
  min-height: 330px;
}

.hero-bento__copy {
  position: relative;
  z-index: 2;
  padding: 18px 0 12px 14px;
  animation: home-rise 0.65s both;
}

.hero-bento__eyebrow {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 12px;
  color: var(--vp-c-text-3);
  font-family: var(--duck-font-rounded);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.13em;
}

.hero-bento__eyebrow span {
  width: 24px;
  height: 7px;
  border-radius: 999px;
  background: linear-gradient(90deg, #bde0fe, #ffb7c5);
  box-shadow: 0 4px 12px rgba(255, 143, 163, 0.24);
}

.hero-bento__title {
  width: fit-content;
  margin: 0;
  background: linear-gradient(105deg, #79bce8 4%, #a98cdd 44%, #ef7896 88%);
  background-clip: text;
  color: transparent;
  font-family: 'ZCOOL KuaiLe', var(--duck-font-rounded);
  font-size: clamp(46px, 5.4vw, 74px);
  font-weight: 400;
  line-height: 1.04;
  letter-spacing: -0.055em;
  filter: drop-shadow(0 9px 24px rgba(217, 110, 134, 0.13));
  -webkit-background-clip: text;
}

.hero-bento__manifesto {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin: 20px 0 0;
  color: color-mix(in srgb, var(--vp-c-text-1) 88%, #9e8f94);
  font-family: 'ZCOOL KuaiLe', var(--duck-font-rounded);
  font-size: clamp(24px, 2.6vw, 35px);
  font-weight: 400;
  line-height: 1.35;
  letter-spacing: -0.025em;
}

.hero-bento__manifesto-second {
  padding-left: 1.3em;
}

.hero-bento__tagline {
  max-width: 580px;
  margin: 16px 0 0;
  color: var(--vp-c-text-2);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.8;
}

.hero-bento__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 26px;
}

.toy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-width: 142px;
  min-height: 46px;
  padding: 11px 24px 10px;
  border: 0;
  border-radius: 999px;
  font-family: var(--duck-font-rounded);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none !important;
  transition: transform 0.2s var(--duck-ease), box-shadow 0.2s ease;
}

.toy-button--primary {
  background: linear-gradient(135deg, #ffb7c5, #ff9db0);
  color: #5c3e47;
  box-shadow: 0 5px 0 #e98096, 0 13px 24px rgba(217, 110, 134, 0.2);
}

.toy-button--secondary {
  background: color-mix(in srgb, var(--vp-c-bg-elv) 92%, #bde0fe);
  color: var(--vp-c-text-1);
  box-shadow: 0 5px 0 color-mix(in srgb, #b8a3d8 42%, var(--vp-c-bg-elv)),
    0 13px 24px rgba(126, 108, 151, 0.12);
}

.toy-button:hover {
  transform: translateY(-2px) scale(1.025);
}

.toy-button:active {
  transform: translateY(4px) scale(0.99);
  box-shadow: 0 1px 0 #e98096, 0 5px 10px rgba(217, 110, 134, 0.14);
}

.toy-button:focus-visible,
.topic-card:focus-visible {
  outline: 3px solid color-mix(in srgb, var(--vp-c-brand-1) 55%, transparent);
  outline-offset: 5px;
}

.hero-bento__visual {
  position: relative;
  min-height: 310px;
  border-radius: 46% 54% 45% 55% / 55% 42% 58% 45%;
  background:
    radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.86), transparent 17%),
    linear-gradient(145deg, rgba(189, 224, 254, 0.48), rgba(255, 183, 197, 0.52));
  box-shadow: 0 28px 70px rgba(190, 136, 163, 0.16);
  animation: home-rise 0.72s 0.08s both;
}

.hero-bento__visual::after {
  position: absolute;
  inset: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.62);
  border-radius: inherit;
  content: '';
}

.hero-bento__logo {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  width: min(76%, 270px);
  height: auto;
  filter: drop-shadow(0 22px 28px rgba(81, 110, 143, 0.22));
  transform: translate(-52%, -49%);
  animation: logo-float 6s ease-in-out infinite;
}

.visual-orbit {
  position: absolute;
  z-index: 1;
  inset: 49% auto auto 50%;
  width: 82%;
  height: 42%;
  border: 1px solid rgba(255, 255, 255, 0.72);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-16deg);
}

.visual-note {
  position: absolute;
  z-index: 4;
  padding: 8px 13px;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 78%, transparent);
  color: var(--vp-c-text-2);
  font-family: var(--duck-font-rounded);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  box-shadow: 0 10px 24px rgba(100, 80, 110, 0.1);
  backdrop-filter: blur(12px);
}

.visual-note--top {
  top: 30px;
  right: 34px;
  transform: rotate(4deg);
}

.visual-note--side {
  bottom: 32px;
  left: 20px;
  letter-spacing: 0.04em;
  transform: rotate(-5deg);
}

.visual-spark {
  position: absolute;
  z-index: 3;
  width: 12px;
  height: 12px;
  border-radius: 4px;
  background: #fff3ad;
  box-shadow: 0 0 18px rgba(255, 233, 133, 0.8);
  transform: rotate(45deg);
}

.visual-spark--one {
  top: 78px;
  left: 31px;
}

.visual-spark--two {
  right: 32px;
  bottom: 84px;
  width: 8px;
  height: 8px;
  background: #ffffff;
}

.topic-bento {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  align-items: start;
  margin-top: 18px;
  padding: 0 8px 18px;
}

.topic-card {
  --card-accent: #a98cdd;
  position: relative;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  min-height: 218px;
  padding: 25px 26px 23px;
  border: 0;
  border-radius: 30px;
  color: var(--vp-c-text-1) !important;
  text-decoration: none !important;
  box-shadow: 0 20px 44px color-mix(in srgb, var(--card-accent) 16%, transparent);
  transition: transform 0.28s var(--duck-ease), box-shadow 0.28s ease;
  animation: home-rise 0.62s both;
}

.topic-card::after {
  position: absolute;
  right: -32px;
  bottom: -42px;
  width: 130px;
  height: 130px;
  border: 22px solid color-mix(in srgb, var(--card-accent) 12%, transparent);
  border-radius: 50%;
  content: '';
}

.topic-card:nth-child(1) {
  transform: translateY(3px) rotate(-0.45deg);
  animation-delay: 0.12s;
}

.topic-card:nth-child(2) {
  transform: translateY(19px);
  animation-delay: 0.19s;
}

.topic-card:nth-child(3) {
  transform: translateY(-7px) rotate(0.45deg);
  animation-delay: 0.26s;
}

.topic-card--taro {
  --card-accent: #9b82ce;
  background: linear-gradient(145deg, #f8f4ff, #f1ebff);
}

.topic-card--sakura {
  --card-accent: #ec8ea4;
  background: linear-gradient(145deg, #fff6f8, #ffecef);
}

.topic-card--sky {
  --card-accent: #75b9e6;
  background: linear-gradient(145deg, #f3faff, #eaf6ff);
}

.topic-card:hover {
  z-index: 2;
  transform: translateY(-8px) rotate(0deg) scale(1.018);
  box-shadow: 0 28px 58px color-mix(in srgb, var(--card-accent) 24%, transparent);
}

.topic-card__topline {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.topic-card__icon {
  display: grid;
  width: 52px;
  height: 52px;
  border-radius: 17px;
  background: rgba(255, 255, 255, 0.68);
  color: var(--card-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 9px 20px rgba(98, 75, 108, 0.08);
  place-items: center;
}

.topic-card__icon svg {
  width: 31px;
  height: 31px;
  overflow: visible;
  fill: none;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

.topic-card__icon .icon-fill {
  fill: currentColor;
  stroke: none;
}

.topic-card__icon .icon-soft {
  fill: color-mix(in srgb, var(--card-accent) 18%, transparent);
}

.topic-card__icon .icon-cube__top {
  fill: color-mix(in srgb, var(--card-accent) 22%, white);
}

.topic-card__icon .icon-cube__left {
  fill: color-mix(in srgb, var(--card-accent) 32%, white);
}

.topic-card__icon .icon-cube__right {
  fill: color-mix(in srgb, var(--card-accent) 48%, white);
}

.topic-card__eyebrow {
  color: color-mix(in srgb, var(--card-accent) 66%, var(--vp-c-text-2));
  font-family: var(--duck-font-rounded);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.topic-card h2 {
  margin: 18px 0 0;
  font-family: 'ZCOOL KuaiLe', var(--duck-font-rounded);
  font-size: 20px;
  font-weight: 400;
  line-height: 1.35;
}

.topic-card p {
  margin: 8px 0 18px;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 400;
  line-height: 1.7;
}

.topic-card__link {
  display: flex;
  position: relative;
  z-index: 1;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  color: color-mix(in srgb, var(--card-accent) 80%, var(--vp-c-text-1));
  font-family: var(--duck-font-rounded);
  font-size: 12px;
  font-weight: 700;
}

@keyframes home-rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
  }
}

@keyframes logo-float {
  0%,
  100% {
    transform: translate(-52%, -49%) translateY(0) rotate(-1deg);
  }
  50% {
    transform: translate(-52%, -49%) translateY(-9px) rotate(1deg);
  }
}

@media (max-width: 959px) {
  .cute-home {
    width: min(100% - 40px, 760px);
    padding-top: 48px;
  }

  .hero-bento {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .hero-bento__copy {
    padding-left: 0;
    text-align: center;
  }

  .hero-bento__eyebrow,
  .hero-bento__actions {
    justify-content: center;
  }

  .hero-bento__title {
    margin-inline: auto;
  }

  .hero-bento__manifesto-second {
    padding-left: 0;
  }

  .hero-bento__tagline {
    margin-inline: auto;
  }

  .hero-bento__visual {
    width: min(100%, 440px);
    min-height: 300px;
    margin: 0 auto;
  }

  .topic-bento {
    grid-template-columns: 1fr;
    width: min(100%, 600px);
    margin: 34px auto 0;
  }

  .topic-card:nth-child(n) {
    transform: none;
  }
}

@media (max-width: 639px) {
  .cute-home {
    width: calc(100% - 28px);
    padding-top: 28px;
  }

  .hero-bento__title {
    font-size: clamp(38px, 12vw, 52px);
  }

  .hero-bento__manifesto {
    font-size: 22px;
  }

  .hero-bento__actions {
    flex-direction: column;
    align-items: stretch;
    padding-inline: 20px;
  }

  .toy-button {
    width: 100%;
  }

  .hero-bento__visual {
    min-height: 260px;
    border-radius: 38% 62% 48% 52% / 56% 42% 58% 44%;
  }

  .hero-bento__logo {
    width: min(72%, 220px);
  }

  .topic-card {
    min-height: 206px;
    padding: 23px 22px 21px;
    border-radius: 26px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-bento__copy,
  .hero-bento__visual,
  .hero-bento__logo,
  .topic-card {
    animation: none;
  }
}
</style>

<style>
html.dark .cute-home .hero-bento__visual {
  background:
    radial-gradient(circle at 32% 28%, rgba(255, 255, 255, 0.12), transparent 18%),
    linear-gradient(145deg, rgba(80, 123, 156, 0.48), rgba(146, 75, 99, 0.5));
  box-shadow: 0 30px 76px rgba(0, 0, 0, 0.3);
}

html.dark .cute-home .topic-card--taro {
  background: linear-gradient(145deg, #302a3b, #292431);
}

html.dark .cute-home .topic-card--sakura {
  background: linear-gradient(145deg, #382932, #30252c);
}

html.dark .cute-home .topic-card--sky {
  background: linear-gradient(145deg, #26323c, #232b33);
}

html.dark .cute-home .topic-card__icon,
html.dark .cute-home .visual-note {
  background: rgba(42, 38, 49, 0.72);
}
</style>
