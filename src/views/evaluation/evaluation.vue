<template>
  <!-- 测评主界面 -->
  <div class="evaluation">
    <NavBar title="测评" />
    <!-- 菜单选项 -->
    <div class="menu">
      <van-grid :column-num="3">
        <van-grid-item
          v-for="item in evaluationTypeList"
          :key="item.id"
          :icon="item.icon"
          :text="item.text"
          :to="item.path"
        />
      </van-grid>
    </div>

    <!-- 热门测评 -->
    <div class="hot">
      <HotRecomend title="热门测评" :list="currentHotList" />
    </div>
    <!-- 测评列表 -->
    <div class="list">
      <title-line title="大家都在测" />

      <EvaluationBox :list="currentList" />
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/nav-bar/nav-bar.vue";
import evaluationTypeList from "@/assets/data/evaluationTypes";
import HotRecomend from "@/components/hot-recomend/hot-recomend.vue";
import EvaluationBox from "@/components/evaluation-box/evaluation-box.vue";
import TitleLine from "@/components/title-line/title-line.vue";
import useEvaluationStore from "@/stores/modules/evaluation";
import { storeToRefs } from "pinia";

const evaluationStore = useEvaluationStore();
evaluationStore.findEvaluation();

const { currentHotList, currentList } = storeToRefs(evaluationStore);
</script>

<style lang="less" scoped>
.evaluation {
  /deep/ .van-grid-item__text {
    font-size: 14px;
  }
  .hot {
    padding-top: 15px;
  }
}
</style>
