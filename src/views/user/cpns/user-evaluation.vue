<template>
  <div class="userEvaluation">
    <NavBar title="我的测试" />
    <div
      class="record"
      v-for="item in evaluationRecordList"
      :key="item.id"
      v-if="evaluationRecordList.length"
    >
      <van-cell>
        <template #title>{{ item.questionnaireName }}</template>
        <template #label>
          <div>{{ timediff(item.testTime) }} 测试过</div>
          <van-button round size="small" @click="showResult(item)">
            查看测试结果
          </van-button>
        </template>
        <template #right-icon>
          <van-image
            :src="item.cover"
            width="6em"
            height="6em"
            fit="cover"
            class="cover"
          />
        </template>
      </van-cell>
    </div>
    <van-empty description="暂无测评记录" style="min-height: 621px;" v-else />
    <van-dialog
      v-model:show="show"
      title="测评结果"
      show-cancel-button
      cancelButtonText="再测一次"
      @cancel="testAgain"
    >
      <van-cell-group inset>
        <div class="content">
          <h4>{{ currentRecord.questionnaireName }}</h4>
          <div class="time">测试于{{ currentRecord.testTime }}</div>
          <h4 class="score">本次测评得{{ currentRecord.score }}分</h4>
          <p>
            {{ getDescByResult(currentRecord.result, descriptionList) }}
          </p>
        </div>
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script setup>
import useUserStore from "@/stores/modules/user";
import { storeToRefs } from "pinia";
import { timediff } from "@/utils/format";
import { ref } from "vue";
import { getDescByResult } from "@/utils/find";
import descriptionList from "@/assets/data/description";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

userStore.getUserEvaluationRecordList();
const { evaluationRecordList } = storeToRefs(userStore);
const currentRecord = ref("");
const show = ref(false); //测评结果弹框

//展示结果
const showResult = (result) => {
  show.value = true;
  currentRecord.value = result;
};

//再测一次
const testAgain = () => {
  router.push({
    name: "evaluationDetails",
    query: { id: currentRecord.value.questionnaireId },
  });
};
</script>

<style lang="less" scoped>
.userEvaluation {
  background-color: #eee;
  .record {
    margin: 10px 0;
  }
  .content {
    .time {
      font-size: 14px;
      margin-top: 5px;
    }
    .score {
      text-align: center;
      padding-top: 8px;
    }
  }
}
</style>
