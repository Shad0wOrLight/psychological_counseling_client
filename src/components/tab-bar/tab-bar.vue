<template>
  <!-- 底部导航栏 -->
  <div class="tab-bar">
    <van-tabbar v-model="currentName" active-color="#1296db" route placeholder>
      <template v-for="item in tabbarData">
        <van-tabbar-item :to="item.path" :name="item.text">
          <template #default>
            <span>{{ item.text }}</span>
          </template>
          <template #icon>
            <img v-if="currentName !== item.text" :src="item.image" alt="" />
            <img v-else :src="item.imageActive" alt="" />
          </template>
        </van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import tabbarData from "@/assets/data/tabbar.js";

import { useRoute } from "vue-router";
const route = useRoute();

const currentName = ref("home"); //当前选中的标签页

watch(route, (newRoute) => {
  //监听当前路径，防止刷新后选中标签页失效
  const index = tabbarData.findIndex((item) => item.path === newRoute.path);
  if (index === -1) return;
  currentName.value = tabbarData[index].text;
});
</script>

<style lang="less" scoped></style>
