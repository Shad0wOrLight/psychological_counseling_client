<template>
  <!-- 顶部导航栏 -->
  <div class="navBar">
    <van-sticky>
      <van-nav-bar
        :title="title"
        left-arrow
        @click-left="router.back()"
        @click-right="router.push('/message')"
      >
        <template #right>
          <van-image
            v-show="!show"
            :src="userInfo.avatar"
            alt=""
            width="2.5em"
            height="2.5em"
            round
            fit="cover"
          />
        </template>
      </van-nav-bar>
    </van-sticky>
  </div>
</template>

<script setup>
import useUserStore from "@/stores/modules/user";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const props = defineProps({
  title: String,
  show: Boolean,
});
const router = useRouter();
const { userInfo } = storeToRefs(useUserStore());
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar__arrow {
  color: #2e2e2e;
  font-size: 20px;
}
</style>
