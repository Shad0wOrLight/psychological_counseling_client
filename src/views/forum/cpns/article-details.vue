<template>
  <!-- 帖子详情 -->
  <div class="articleDetails">
    <NavBar title="帖子详情" />
    <!-- 帖子内容 -->
    <div class="container">
      <div class="title">{{ currentArticle?.title }}</div>
      <div class="desc">
        <span>{{ dateFormat(currentArticle?.createTime) }}</span>
        <span class="author">
          {{ findArticleAuthor(userList, currentArticle?.id) }}
        </span>
      </div>
      <p class="content" v-html="currentArticle?.content"></p>
    </div>
    <Comment :articleId="route.params.id" />
  </div>
  <!-- 底部适配区域 -->
  <div class="placeholder" style="height: 50px"></div>
  <!-- 发布帖子区域 -->
  <div class="commentBox">
    <van-cell-group inset>
      <van-field
        class="messageInput"
        v-model="comment"
        placeholder="发帖千百度，文明第一步"
        autosize
        type="textarea"
        center
        rows="1"
      >
        <template #button>
          <van-button
            size="small"
            type="success"
            :disabled="isEmpty"
            @click="addComment"
          >
            发布
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script setup>
import NavBar from "@/components/nav-bar/nav-bar.vue";
import Comment from "./comment.vue";
import useForumStore from "@/stores/modules/forum";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { dateFormat } from "@/utils/format";
import { findArticleAuthor } from "@/utils/find";
import useHomeStore from "@/stores/modules/home";
import { computed, ref } from "vue";
import useUserStore from "@/stores/modules/user";

const route = useRoute();
const forumStore = useForumStore();
forumStore.getCurrentArticle(route.params.id);
const { currentArticle } = storeToRefs(forumStore);
const { userList } = storeToRefs(useHomeStore());
const { userInfo } = storeToRefs(useUserStore());

const comment = ref(""); //评论内容
const isEmpty = computed(() => !comment.value); //评论是否填写

// 添加评论
const addComment = () => {
  const data = {
    articleId: route.params.id,
    content: comment.value,
    userId: userInfo.value.uid,
  };
  forumStore.commitComment(data).then(() => {
    comment.value = "";

    forumStore.getComment(route.params.id);
  });
};
</script>

<style lang="less" scoped>
.container {
  padding: 15px 15px 0 15px;

  .title {
    margin-top: 15px;
    font-size: 18px;
    font-weight: 550;
  }
  .desc {
    margin-top: 10px;
    font-size: 13px;
    color: #a7a7a7;
    .author {
      margin-left: 10px;
      color: #279f32;
    }
  }
  .content {
    font-size: 14px;
    font-family: Arial;
    line-height: 1.7em;
  }
}
.commentBox {
  width: 100%;
  position: fixed;
  bottom: 5px;
  left: 0;
  .messageInput {
    background-color: #f7f8fa;
  }
}
</style>
