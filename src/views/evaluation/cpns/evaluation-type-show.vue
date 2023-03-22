<template>
  <!-- 测评介绍 -->
  <div class="typeDetailsShow">
    <NavBar :title="title" />
    <div class="desc">
      <p v-html="currentItem.desc"></p>
    </div>
    <TitleLine title="相关测评" />
    <!-- 当前分类下的测评列表 -->
    <EvaluationBox :list="currentList" />
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import evaluationTypeList from "@/assets/data/evaluationTypes";
import TitleLine from "@/components/title-line/title-line.vue";
import EvaluationBox from "@/components/evaluation-box/evaluation-box.vue";
import useEvaluationStore from "@/stores/modules/evaluation";
import { storeToRefs } from "pinia";

const evaluationStore = useEvaluationStore();
const route = useRoute();

const { type } = route.params;
evaluationStore.findEvaluation({ type });
const { currentList } = storeToRefs(evaluationStore);
const title = type + "测评"; //分类标题
const currentItem = evaluationTypeList.find((item) => (item.type = type)); //当前测评
</script>

<style lang="less" scoped>
.desc {
  padding: 0 20px;

  font-size: 14px;
  line-height: 1.8em;
  color: rgb(89, 89, 89);
}
</style>
