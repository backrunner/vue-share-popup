<template>
  <div class="demo">
    <div class="title">
      <span>vue-share-popup</span>
    </div>
    <div id="share-button" ref="share">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path
          d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7c0-.24-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 3-3a3 3 0 0 0-3-3a3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.15c-.05.21-.08.43-.08.66c0 1.61 1.31 2.91 2.92 2.91c1.61 0 2.92-1.3 2.92-2.91A2.92 2.92 0 0 0 18 16.08z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUpdated, ref } from 'vue';
import { useSharePopup } from '../lib/main';
import { PopTrigger, SocialPlatforms } from '../types/enums';

export default defineComponent({
  setup() {
    const share = ref(null);
    const { QZONE, DOUBAN, WEIBO, TWITTER, WECHAT } = SocialPlatforms;

    const createSharePopup = () => {
      share.value &&
        useSharePopup({
          key: 'share',
          platforms: [QZONE, DOUBAN, WEIBO, TWITTER, WECHAT],
          meta: {
            title: 'vue-share-button',
            url: 'https://pwp.app',
          },
          ref: share.value,
          trigger: PopTrigger.HOVER,
          placement: 'bottom',
          options: {
            wechatSharePage: 'https://wechat-share.pwp.space/?url={url}&title={title}',
          },
        });
    };

    onMounted(createSharePopup);
    onUpdated(createSharePopup);

    return {
      share,
    };
  },
});
</script>

<style lang="less">
html,
body,
#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  margin: 0;
}
.title {
  width: max-content;
  text-align: center;
  margin: 0 auto;
  font-size: 1.5rem;
  color: #aeaeae;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.05);
  margin-bottom: 3.5rem;
  user-select: none;
}
.demo {
  padding-top: 12rem;
  #share-button {
    width: max-content;
    margin: 0 auto;
    padding: 0.75rem;
    border: 1px solid #aeaeae;
    border-radius: 12px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.175);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 100ms ease;
    cursor: pointer;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      path {
        transition: 100ms ease;
        fill: #666;
      }
    }
  }
  #share-button:hover {
    background-color: #fafafa;
    svg {
      path {
        fill: #333;
      }
    }
  }
}
</style>
