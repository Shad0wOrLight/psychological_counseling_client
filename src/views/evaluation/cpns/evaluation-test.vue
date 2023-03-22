<template>
  <!-- 测评界面 -->
  <div class="evaluationTest">
    <NavBar title="测试" />
    <h4 class="title">{{ currentEvaluation?.name }}</h4>
    <!-- 测评进度 -->
    <div class="line">
      <div class="desc">
        <div class="text">
          您正在做测试
          <span v-if="itemNum > 1">，已完成{{ percentage }}%</span>
        </div>
        <div class="num text">
          {{ itemNum }}/{{ currentEvaluation?.topicList?.length }}题
        </div>
      </div>
      <van-progress
        color="#50D25B"
        stroke-width="2"
        :percentage="percentage"
        :show-pivot="false"
      />
    </div>
    <!-- 测评题目列表 -->
    <div class="list">
      <van-cell-group inset>
        <div class="question">
          <div class="question_title">
            {{ itemNum + ". " + question.topicName }}
          </div>
          <van-radio-group v-model="checked">
            <van-cell
              :title="item"
              clickable
              v-for="(item, i) in question.options"
              @click="selectOption(i)"
              title-class="option"
            >
              <template #icon>
                <van-radio :name="question.scores[i]" />
              </template>
            </van-cell>
            <div class="change">
              <van-button
                @click="changeQuestion(-1)"
                type="primary"
                :disabled="itemNum == 1"
              >
                上一题
              </van-button>

              <van-button
                type="primary"
                @click="changeQuestion(1)"
                v-if="itemNum < currentEvaluation?.topicList?.length"
              >
                下一题
              </van-button>
              <van-button type="primary" @click="submit" v-else>
                提交
              </van-button>
            </div>
          </van-radio-group>
        </div>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import useEvaluationStore from "@/stores/modules/evaluation";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { showConfirmDialog, showToast } from "vant";
import { ref } from "vue";
import { getResultByScore, getDescByResult } from "@/utils/find";
import descriptionList from "@/assets/data/description";
import { useRouter } from "vue-router";
import { getUserInfo } from "@/utils/storage";

const router = useRouter();
const evaluationStore = useEvaluationStore();
const { currentEvaluation, itemNum, answer } = storeToRefs(evaluationStore);
const checked = ref(""); //当前选择内容
//进度百分比
const percentage = computed(() =>
  Math.floor(
    ((itemNum.value - 1) / currentEvaluation.value?.topicList?.length) * 100
  )
);
//当前问题
const question = computed(
  () => currentEvaluation.value.topicList[itemNum.value - 1]
);
//分数汇总
const score = new Map();

//选中选项后
const selectOption = (i) => {
  score.set(itemNum.value, question.value.scores[i]);
  checked.value = question.value.scores[i];
};

//改变题目
const changeQuestion = (num) => {
  evaluationStore.changeItemNum(num);
  checked.value = score.get(itemNum.value);
};

//提交问卷
const submit = () => {
  if (score.size != currentEvaluation.value.topicList.length) {
    showToast({
      message: "还有题目没有回答哦！",
      type: "fail",
    });
  } else {
    showToast({
      duration: 2000,
      message: "分析中",
      loadingType: "spinner",
      type: "loading",
    });

    let sum = evaluationStore.countSum(score);

    const res = getResultByScore(sum, answer.value);
    const desc = getDescByResult(res, descriptionList);
    let time = new Date().toLocaleString();
    setTimeout(() => {
      showConfirmDialog({
        title: "测试结果分析",
        messageAlign: "left",
        cancelButtonText: "再测一次",
        message: () => (
          <div>
            <h4>{currentEvaluation.value.name}</h4>
            <div>测试于{time}</div>
            <h2 style={{ marginTop: "10px", textAlign: "center" }}>{res}</h2>
            <p>{desc}</p>
          </div>
        ),
      })
        .then(() => {
          evaluationStore.addRecord({
            userId: getUserInfo().uid,
            questionnaireId: currentEvaluation.value.id,
            score: sum,
            result: res,
            testTime: time,
          });
          router.push("/evaluation");
        })
        .catch(() => {
          itemNum.value = 1;
          score.clear();
          checked.value = "";
        });
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.evaluationTest {
  .title {
    color: #a7a7a7;
    text-align: center;
    margin-top: 5px;
  }
  .line {
    padding: 10px 20px;
    .desc {
      display: flex;
      justify-content: space-between;
      .text {
        font-size: 13px;
        color: #a7a7a7;
        padding-bottom: 8px;
      }
    }
  }
  .list {
    .question_title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    /deep/ .option {
      padding-left: 10px;
      font-size: 17px;
      font-weight: bold;
      height: 30px;
      line-height: 30px;
    }
    .change {
      display: flex;
      justify-content: space-between;
      margin: 8px 10px;
    }
  }
}
</style>
