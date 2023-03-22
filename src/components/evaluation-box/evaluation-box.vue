<template>
  <!-- 测评封面信息 -->
  <div class="evaluationCover">
    <div class="evaluation-box">
      <div class="item" v-for="item in list" :key="item.id">
        <van-card @click="showDetail(item)">
          <template #thumb>
            <img class="cover" :src="item.cover" alt="" />
          </template>
          <template #title>
            <div class="title">{{ item.name }}</div>
          </template>
          <template #tags>
            <div class="desc">[预计用时:约{{ item.spentTime }}分钟]</div>
          </template>
          <template #price>
            <van-tag plain round size="medium"> 进入测试 </van-tag>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  list: Array,
});
const router = useRouter();

// 展示测评详情
const showDetail = ({ id }) => {
  router.push({
    name: "evaluationDetails",
    query: {
      id,
    },
  });
};
</script>

<style lang="less" scoped>
.van-card {
  background: none;
  border-bottom: 1px solid #eeeeee;
  margin: 5px 0;
  .van-card__thumb {
    .cover {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  /deep/ .van-card__content {
    font-size: 16px;
    color: #000018;
    padding-left: 10px;
  }

  .desc {
    font-size: 13px;
    font-weight: normal;
    color: #a7afc6;
    margin-top: 8px;
  }
  .van-tag--default.van-tag--plain {
    margin-right: 5px;
    font-weight: normal;
    color: #a7a7a7;
  }
}
</style>
