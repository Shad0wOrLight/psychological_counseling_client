<template>
  <div class="messageInfo" ref="messageRef">
    <NavBar :title="name" :show="false" />
    <div class="container" v-for="item in session" :key="item.id">
      <div class="message" v-if="item.content">
        <div class="time">{{ item.sendTime }}</div>
        <div class="info" :class="id == item.sendId ? 'left' : 'right'">
          <div class="image">
            <van-image
              width="3em"
              height="3em"
              fit="cover"
              round
              :src="item.sendAvatar"
            />
          </div>
          <div class="content">
            {{ item.content }}
          </div>
        </div>
      </div>
    </div>
    <!-- 底部适配区域 -->
    <div class="placeholder" style="height: 80px"></div>
    <div class="reply">
      <van-cell-group inset>
        <van-field v-model="message" autosize type="textarea" center rows="1">
          <template #button>
            <van-button
              size="small"
              type="success"
              @click="sendInfo"
              :disabled="isComplete"
            >
              发送
            </van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import useConsultStore from "@/stores/modules/consult";
import { storeToRefs } from "pinia";
import { computed, nextTick, ref, watch } from "vue";
import useUserStore from "@/stores/modules/user";
import { sendMessage } from "@/utils/websocket";

const route = useRoute();
const { id } = route.params;
const consultStore = useConsultStore();
const userStore = useUserStore();
const { messageList } = storeToRefs(consultStore);

// 消息记录
const session = computed(() =>
  messageList.value.filter((item) => item.sendId == id || item.receiveId == id)
);
//聊天对象
const name = computed(() => {
  const message = messageList.value.find(
    (item) => item.sendId == id || item.receiveId == id
  );
  return message?.receiveUsername;
});
const message = ref(""); //消息内容
const messageRef = ref(null); //盒子Dom元素
const isComplete = computed(() => !message.value); //是否输入消息

//始终保持在底部
watch(session, () => {
  nextTick(() => {
    window.scrollTo(0, messageRef.value.scrollHeight);
  });
});
//发送消息
const sendInfo = () => {
  const data = {
    sendId: userStore.userInfo.uid,
    receiveId: id,
    content: message.value,
    sendTime: new Date().toLocaleString(),
  };
  sendMessage(data);
  message.value = "";
};
</script>

<style lang="less" scoped>
.messageInfo {
  background-color: #ededed;
  overflow: auto;
  min-height: 667px;
  .message {
    margin-top: 10px;
    .time {
      text-align: center;
      font-size: 12px;
      margin: 10px;
    }
    .info {
      margin-left: 10px;

      display: flex;
      .content {
        background-color: #ffffff;
        border-radius: 5px;
        margin: 11px;
        padding: 5px 8px;
        max-width: 235px;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  .left {
    flex-direction: row;
  }
  .right {
    flex-direction: row-reverse;
  }
  .reply {
    width: 100%;
    position: fixed;
    bottom: 5px;
    left: 0;
  }
}
</style>
