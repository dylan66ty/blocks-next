<script lang="ts" setup>
  import { onMounted, onUnmounted } from 'vue'
  import { useData } from 'vitepress'
  
  const { site } = useData()
  const navigation = (path) => {
    location.href = site.value.base + path
  }
 
  let originOverflow = ''
  onMounted(() => {
    originOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  })

  onUnmounted(() => {
    document.body.style.overflow = originOverflow
  })
</script>

<template>
  <div class="home-wrapper">
    <div class="banner-desc">
      <div class="banner__title">
        <div class="blocks animate__animated animate__bounceInLeft">Blocks</div>
        <div class="next animate__animated animate__bounceInRight">Next</div>
      </div>
      <div class="banner__sub animate__animated animate__slideInLeft"
        >一个更加『轻量』和『快速』的基于 Vue3 组件库</div
      >
      <div class="banner__ops animate__animated animate__fadeIn animate__slower">
        <bn-button type="primary" size="small" @click="navigation('guide/getting-started.html')">
          <span>开始使用</span>
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
          >
            <path
              fill="#fff"
              d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"
            ></path>
          </svg>
        </bn-button>
        <bn-button size="small" @click="navigation('guide/changelogs.html')">更新日志</bn-button>
      </div>
    </div>
    <div class="home-bg-left-bottom">
      <svg viewBox="0 0 975 493">
        <defs>
          <linearGradient
            x1="100%"
            y1="55.2864611%"
            x2="0.25781251%"
            y2="55.2864583%"
            id="shineout-html-left-bottom"
          >
            <stop stop-color="#31309F" offset="0%"></stop>
            <stop stop-color="#0B054F" offset="100%"></stop>
          </linearGradient>
        </defs>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(0.000000, -587.000000)" fill="url(#shineout-html-left-bottom)">
            <path
              d="M0.0743965568,587 C-0.0247988523,588.217347 -0.0247988523,752.550681 0.0743965568,1080 C650.004337,1082.07504 974.795719,1082.07504 974.448542,1080 C525.920113,768.033011 190.802369,987.428247 0.0743965568,587 Z"
            ></path>
          </g>
        </g>
      </svg>
    </div>
    <div class="home-component-img">
      <img src="/images/components.jpg" alt="" />
    </div>
  </div>
</template>

<style lang="scss">
  .home-wrapper {
    padding: 55px 40px 0;

    .banner-desc {
      position: absolute;
      top: 3vh;
      left: 18vw;

      .banner {
        &__title {
          font-size: 60px;
          display: flex;
          gap: 12px;
          font-weight: 900;
          color: #000;
          font-family: Arial, Helvetica, sans-serif;
        }

        &__sub {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 500;
          color: rgba(60, 60, 60, 0.7);
        }

        &__ops {
          margin-top: 30px;
          display: flex;
          gap: 20px;
        }
      }
    }

    .home-bg-left-bottom {
      position: fixed;
      width: 975px;
      height: 493px;
      bottom: 0;
      left: 0;
    }

    .home-component-img {
      position: absolute;
      top: 10vh;
      right: 0;
      width: 36vw;
    }

    .icon {
      margin-left: 6px;
      animation: move 1s ease-in-out infinite;
    }
  }

  @keyframes move {
    0% {
      transform: translate(0, 0);
    }

    50% {
      transform: translate(5px, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }
</style>
