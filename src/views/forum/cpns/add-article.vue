<template>
  <div class="addArticle">
    <NavBar title="发布帖子" />
    <div class="question_title">
      <h4>描述您的问题</h4>
      <span>请勿在内容中泄漏您的个人隐私信息</span>
    </div>
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-cell>
          <template #title>
            <div class="title">
              <span>帖子分类</span>
              <van-tag
                :class="index == i ? 'active' : 'tag'"
                round
                v-for="(item, i) in types"
                @click="index = i"
              >
                {{ item }}
              </van-tag>
            </div>
          </template>
        </van-cell>
        <van-field
          v-model="article.title"
          name="title"
          placeholder="请输入完整帖子标题"
          :rules="[{ required: true, message: '请填写标题' }]"
        />
        <van-field
          v-model="article.content"
          type="textarea"
          rows="14"
          autosize
          name="content"
          placeholder="发表您的看法或问题"
        />
      </van-cell-group>
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit">
          发布
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup>
import useForumStore from "@/stores/modules/forum";
import useUserStore from "@/stores/modules/user";
import { storeToRefs } from "pinia";
import { showSuccessToast } from "vant";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const { userInfo } = storeToRefs(useUserStore());
const forumStore = useForumStore();

const index = ref(-1); //选中标签索引
const article = reactive({ title: "", content: "" }); //文章信息
const types = ["婚恋", "职场", "家庭", "其他"]; //类型

//发布帖子
const onSubmit = (values) => {
  const data = {
    ...values,
    type: types[index.value],
    authorId: userInfo.value.uid,
    createTime: new Date().toLocaleString(),
  };
  forumStore.commitArticle(data).then(() => {
    showSuccessToast("发布成功！");
    router.push("/forum");
  });
};
</script>

<style lang="less" scoped>
.addArticle {
  height: 667px;
  background-color: #eeeeee;
  h4 {
    color: black;
    font-weight: normal;
    font-size: 18px;
  }
  span {
    font-size: 14px;
    color: #f30;
  }
  .question_title {
    margin: 10px 0px 10px 20px;
  }
  .title {
    span {
      color: #333;
      margin-right: 10px;
    }
    .tag {
      padding: 5px 10px;
      color: #909090;
      background-color: #f0f0f0;
    }
    .active {
      padding: 5px 10px;
      background-color: #4bc956;
      color: #fff;
    }
  }
}
</style>
