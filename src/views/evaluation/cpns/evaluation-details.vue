<template>
  <!-- 测评内容详情 -->
  <div class="evaluationDetails">
    <NavBar title="详情" />
    <div class="container">
      <div class="cover">
        <img :src="currentEvaluation?.cover" alt="" />
      </div>
      <div class="title">{{ currentEvaluation?.name }}</div>

      <p class="content" v-html="currentEvaluation?.introduction"></p>
      <div class="notice">
        <van-cell-group inset center>
          <van-cell class="head" title="测试须知" />
          <van-cell class="item" title="题目数">
            <template #value>
              <span>{{ currentEvaluation?.topicList?.length }}题</span>
            </template>
          </van-cell>
          <van-cell class="item" title="预计用时">
            <template #value>
              <span>约{{ currentEvaluation?.spentTime }}分钟</span>
            </template>
          </van-cell>
          <van-cell class="item">
            <template #value>
              <van-button
                class="middle"
                block
                round
                color="#50d25b"
                to="/evaluation/test"
              >
                开始测试
              </van-button>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/nav-bar/nav-bar.vue";
import { useRoute } from "vue-router";
import useEvaluationStore from "@/stores/modules/evaluation";
import { storeToRefs } from "pinia";

const route = useRoute();
const evaluationStore = useEvaluationStore();
evaluationStore.findEvaluation({ id: route.query.id });
const { currentEvaluation } = storeToRefs(evaluationStore);
</script>

<style lang="less" scoped>
.container {
  padding: 0 15px;
  .cover {
    margin-top: 5px;
    text-align: center;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .title {
    margin-top: 25px;
    font-size: 18px;
    font-weight: 560;
    text-align: center;
  }
  .content {
    font-size: 14px;
    font-family: Arial;
    line-height: 1.8em;
    text-indent: 2.2em;
    color: rgb(89, 89, 89);
  }
  .notice {
    .head {
      font-size: 16px;
      font-weight: 400;
    }
    .item {
      font-size: 13px;
      color: #737373;
    }
    .middle {
      font-weight: 400;
      color: #fff;
    }
    .van-cell {
      background-color: #f9f9f9;
    }
  }
}
</style>
