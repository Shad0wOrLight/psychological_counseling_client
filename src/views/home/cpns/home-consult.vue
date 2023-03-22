<template>
  <div class="homeConsult">
    <title-line title="心理专家" />
    <ConsultList :list="consultantList" />
    <RouterLink class="more" to="/consult">更多专家</RouterLink>
  </div>
</template>

<script setup>
import ConsultList from "@/views/consult/cpns/consult-list.vue";
import TitleLine from "@/components/title-line/title-line.vue";
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const { consultantList } = storeToRefs(useHomeStore());
</script>

<style lang="less" scoped>
.homeConsult {
  border-top: 10px solid #eeeeee;
  padding-top: 15px;
  .more {
    display: block;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
}
</style>
