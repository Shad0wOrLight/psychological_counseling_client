import { defineStore } from "pinia";
import {
  getEvaluationByCondition,
  getAnswer,
  addTestRecord,
} from "@/http/modules/evaluation";
import { formatAnswer, formatTopicList } from "@/utils/format";

const useEvaluationStore = defineStore("evaluation", {
  state: () => ({
    currentEvaluation: "", //当前测评列表
    currentList: [], //当前分类下测评列表
    currentHotList: [], //当前热门测评
    topicList: [], //题目列表
    itemNum: 1, //当前题目索引
    answer: "", // 测评结果
  }),
  actions: {
    // 获取测评列表
    async findEvaluation(data) {
      const res = await getEvaluationByCondition(data);

      this.currentHotList = res.data.filter((item) => item.isHot == 1);

      this.currentList = formatTopicList(res.data);

      if (data && Object.keys(data)[0] == "id") {

        this.changeCurrentEvaluation(formatTopicList(res.data)[0]);
      }
    },

    // 改变当前测评
    async changeCurrentEvaluation(data) {
      this.currentEvaluation = data ;
      this.itemNum = 1;
      this.getQuestionAnswer(this.currentEvaluation.id);
    },

    // 改变当前测评题目索引
    changeItemNum(num) {
      num > 0 ? this.itemNum++ : this.itemNum--;
    },

    // 计算总分
    countSum(score) {
      let sum = 0;
      for (let [key, value] of score) {
        sum += value * 1;
      }
      return sum;
    },

    // 获取测评结果分析
    async getQuestionAnswer(id) {
      const res = await getAnswer(id);
      this.answer = formatAnswer(res.data);
    },

    // 记录测评结果
    async addRecord(data) {
      const res = await addTestRecord(data);
    },
  },
});

export default useEvaluationStore;
