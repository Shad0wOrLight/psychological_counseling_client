<template>
  <div class="app">
    <router-view />
    <!-- 底部导航栏 -->
    <TabBar v-if="route.meta.showTabBar" />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import TabBar from "./components/tab-bar/tab-bar.vue";
import useUserStore from "./stores/modules/user";
import { init } from "./utils/websocket";
const route = useRoute();
const { userInfo } = storeToRefs(useUserStore());

if (userInfo) {
  init(userInfo.value.uid);
}
</script>

<style lang="less" scoped></style>
