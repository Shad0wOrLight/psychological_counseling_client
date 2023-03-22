<template>
  <!-- 评论区 -->
  <div class="comment">
    <div class="contaier">
      <!-- 评论列表 -->
      <van-cell
        v-for="item in commentList"
        :key="item.id"
        :title-style="{ paddingLeft: 8 + 'px' }"
      >
        <template #title>
          <span class="name">{{ item?.username }}</span> :
          <span class="name">{{ item?.content }}</span>
        </template>
        <template #label>
          <span>{{ timediff(item?.createTime) }}</span>
          <span class="replybtn" @click="showReplySheet(item)"> 回复</span>
          <!-- 子评论 -->
          <div class="reply">
            <van-cell
              v-for="reply in item?.reply"
              :key="reply.id"
              :title-style="{ paddingLeft: 8 + 'px' }"
            >
              <template #title>
                <div class="title">
                  <span class="name">{{ reply?.username }}</span>
                  <span v-if="reply?._username !== item.username">
                    <span> 回复 </span>
                    <span class="name">{{ reply?._username }}</span>
                  </span>
                  <span> : {{ reply?.content }}</span>
                </div>
              </template>
              <template #label>
                <span>{{ timediff(reply?.createTime) }}</span>
                <span class="replybtn" @click="showReplySheet(reply)">
                  回复
                </span>
              </template>
              <template #icon>
                <van-image
                  width="2.5em"
                  height="2.5em"
                  fit="cover"
                  round
                  :src="reply?.avatar"
                />
              </template>
            </van-cell>
          </div>
        </template>
        <template #icon>
          <van-image
            width="2.5em"
            height="2.5em"
            fit="cover"
            round
            :src="item?.avatar"
          />
        </template>
      </van-cell>
    </div>
    <van-action-sheet v-model:show="show" @click-overlay="closeSheet">
      <div class="content">
        <div>
          <span class="title">回复 </span>
          <span>{{ info.username }} : </span>
          <span class="desc">{{ info.content }}</span>
        </div>
        <div class="message">
          <van-cell-group inset>
            <van-field
              class="messageInput"
              v-model="comment"
              placeholder="发帖千百度，文明第一步"
              autosize
              center
              type="textarea"
              rows="2"
            >
              <template #button>
                <van-button
                  size="small"
                  type="success"
                  block
                  :disabled="isEmpty"
                  @click="commitComment"
                >
                  发布
                </van-button>
              </template>
            </van-field>
          </van-cell-group>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script setup>
import useForumStore from "@/stores/modules/forum";
import useUserStore from "@/stores/modules/user";
import { timediff } from "@/utils/format";
import { storeToRefs } from "pinia";

import { computed, ref } from "vue";

const props = defineProps({
  articleId: String,
});
const forumStore = useForumStore();
forumStore.getComment(props.articleId);
const { commentList } = storeToRefs(forumStore);
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

const show = ref(false); //展示回复面板
const comment = ref(""); //评论内容
const isEmpty = computed(() => !comment.value); //内容是否为空

let info = "";
//展示回复面板
const showReplySheet = (obj) => {
  show.value = true;
  info = obj;
};

// 关闭面板
const closeSheet = () => {
  comment.value = "";
};

//回复评论
const commitComment = () => {
  let rootId = info.rootId ? info.rootId : info.id;
  let parentId = info.parentId ? info.id : rootId;
  const data = {
    articleId: props.articleId,
    content: comment.value,
    userId: userInfo.value.uid,
    parentId,
    rootId,
  };
  forumStore.commitComment(data).then(() => {
    show.value = false;
    comment.value = "";

    forumStore.getComment(props.articleId).then(() => {});
  });
};
</script>

<style lang="less" scoped>
.comment {
  margin-top: 35px;
  .replybtn {
    color: #279f32;
    padding-left: 5px;
  }
  .reply {
    transform: translateX(-16px);
    .title {
      font-size: 13px;
      .name {
        color: #a7a7a7;
      }
    }
  }
  .content {
    padding: 16px 16px 10px;
    font-size: 13px;

    .title {
      color: #a7a7a7;
    }
    .desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .message {
      padding-top: 15px;
      .messageInput {
        background-color: #f7f8fa;
      }
    }
  }
}
</style>
