<template>
  <div class="homeEvaluation">
    <title-line title="心理测评" />
    <EvaluationBox :list="evaluationList" />
    <RouterLink class="more" to="/evaluation">更多测评</RouterLink>
  </div>
</template>

<script setup>
import TitleLine from "@/components/title-line/title-line.vue";
import EvaluationBox from "@/components/evaluation-box/evaluation-box.vue";
import useHomeStore from "@/stores/modules/home";
import { storeToRefs } from "pinia";
const homeStore = useHomeStore();
const { evaluationList } = storeToRefs(homeStore);
</script>

<style lang="less" scoped>
.homeEvaluation {
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
