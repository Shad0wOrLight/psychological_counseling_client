<template>
  <div class="userArticle">
    <NavBar title="我的帖子" />
    <van-tabs v-model:active="active" @click-tab="changeTab">
      <van-tab title="主贴">
        <van-pull-refresh
          v-model="loading"
          @refresh="onRefresh"
          style="min-height: 621px"
        >
          <van-swipe-cell v-for="item in articleList" :key="item.id">
            <van-cell class="item" center :to="`/forum/article/${item.id}`">
              <template #title>
                <h3>{{ item.title }}</h3>
                <div class="label">{{ item.content }}</div>
              </template>
              <template #value>
                <span class="time">{{ timediff(item.createTime) }}</span>
              </template>
            </van-cell>
            <template #right>
              <van-button
                block
                type="danger"
                text="删除"
                style="height: 100%"
                @click="delArticle(item.id)"
              />
            </template>
          </van-swipe-cell>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="回复">
        <van-cell-group inset>
          <van-cell v-for="item in commentList" :key="item.id" center>
            <template #title>
              <div class="head">
                <van-image
                  width="3em"
                  height="3em"
                  fit="cover"
                  round
                  :src="item.avatar"
                />
                <div class="user">
                  <span>{{ item.username }}</span>
                  <br />
                  <span>{{ item.createTime.split(" ")[0] }}</span>
                </div>
                <div class="option" @click="showOption(item.id)">
                  <van-icon name="ellipsis" size="18" />
                </div>
              </div>
            </template>
            <template #label>
              <div class="reply">
                <span>回复：{{ item.content }}</span>
                <van-button
                  block
                  :to="`/forum/article/${item.articleId}`"
                  color="#eee"
                >
                  <span style="color: #333">原帖：{{ item.title }}</span>
                </van-button>
              </div>
            </template>
          </van-cell>
          <template #right>
            <van-button square type="danger" text="删除" />
          </template>
        </van-cell-group>
      </van-tab>
    </van-tabs>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { timediff } from "@/utils/format";
import useUserStore from "@/stores/modules/user";
import { storeToRefs } from "pinia";
import { showConfirmDialog } from "vant";

const userStore = useUserStore();
const { articleList, commentList } = storeToRefs(userStore);
userStore.getUserArticleList();

const active = ref(0); //当前标签页索引
const loading = ref(false); //是否加载中
const show = ref(false); //是否展示删除弹框
let commentId = "";

//下拉刷新
const onRefresh = () => {
  userStore.getUserCommentList().then(() => {
    setTimeout(() => {
      loading.value = false;
    }, 1000);
  });
};
// 切换标签页内容
const changeTab = ({ name: i }) => {
  i ? userStore.getUserCommentList() : userStore.getUserArticleList();
};
//删除帖子
const delArticle = (id) => {
  showConfirmDialog({
    title: "确认删除此条帖子",
    message: "删除帖子后将不可恢复，确认删除吗",
  })
    .then(() => {
      userStore.deleteUserArticle(id);
    })
    .catch(() => {});
};
// 动作面板数据
const actions = [{ name: "删除" }, { name: "取消" }];
// 展示删除动作面板
const showOption = (id) => {
  show.value = true;
  commentId = id;
};
// 删除回复评论
const onSelect = ({ name }) => {

  name == "删除" &&
    showConfirmDialog({
      title: "确认删除此条评论",
      message: "删除评论后将不可恢复，确认删除吗",
    })
      .then(() => {
        userStore.deleteUserComment(commentId);
      })
      .catch(() => {});

  show.value = false;
};
</script>

<style lang="less" scoped>
.item {
  .label {
    width: 270px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .time {
    display: inline-block;
    padding-top: 22px;
    font-size: 12px;
  }
}
.head {
  display: flex;
  align-items: center;
  .user {
    margin-left: 10px;
  }
  .option {
    padding-left: 150px;
    padding-top: 20px;
  }
}
.reply {
  color: #333;
}
</style>
