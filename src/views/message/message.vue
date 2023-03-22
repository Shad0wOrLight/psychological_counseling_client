<template>
  <div class="message">
    <div class="head">在线咨询</div>
    <van-swipe-cell v-for="item in sessionList" :key="item.id">
      <van-cell
        center
        :title-style="{ marginLeft: 5 + 'px' }"
        :to="`/message/info/${item.sendId}`"
      >
        <template #icon>
          <van-image
            width="4em"
            height="4em"
            fit="cover"
            round
            :src="item.sendAvatar"
          />
        </template>

        <template #title>
          <h3>{{ item.sendUsername }}</h3>
        </template>
        <template #value>
          <div class="value">
            <span>{{ dateFormat(item.sendTime) }}</span>
          </div>
        </template>
        <template #label>
          <div class="info">
            {{ item.content.at(-1).content }}
          </div>
        </template>
      </van-cell>
      <template #right>
        <van-button
          block
          type="danger"
          text="删除"
          style="height: 100%"
          @click="delSession(item.sendId, item.receiveId)"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script setup>
import useConsultStore from "@/stores/modules/consult";
import { storeToRefs } from "pinia";
import { dateFormat } from "@/utils/format";
import { showConfirmDialog } from "vant";
const consultStore = useConsultStore();
consultStore.getUserSessionList();
const { sessionList } = storeToRefs(consultStore);

const delSession = (sendId, receiveId) => {
  showConfirmDialog({
    message: "确认删除此条会话吗",
  })
    .then(() => {
      consultStore.delelteSession(sendId, receiveId);
    })
    .catch(() => {});
};
</script>

<style lang="less" scoped>
.message {
  .head {
    background-color: #ededed;
    text-align: center;
    font-size: 18px;
    padding: 10px 0;
  }
  .info {
    width: 190px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .value {
    font-size: 12px;
  }
}
</style>
