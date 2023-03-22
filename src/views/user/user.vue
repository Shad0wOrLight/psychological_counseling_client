<template>
  <!-- 用户主界面 -->
  <div class="user">
    <!-- 用户头像 -->
    <div class="head">
      <van-cell-group inset>
        <van-cell
          :title="userInfo?.username"
          is-link
          center
          :title-style="{ marginLeft: 15 + 'px', fontSize: 20 + 'px' }"
          to="/userDetails"
        >
          <template #icon>
            <van-image
              width="4em"
              height="4em"
              fit="cover"
              round
              :src="userInfo?.avatar"
            />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <!-- 功能列表 -->
    <div class="list">
      <van-cell is-link center title="留言咨询" to="/consult" />
      <van-cell is-link center title="我的帖子" to="/user/article" />
      <van-cell is-link center title="我的测评" to="/user/evaluation" />
    </div>
    <!-- 用户注销 -->
    <div class="userLogout">
      <van-button class="logout" block round @click="logout">
        退出登录
      </van-button>
    </div>
  </div>
</template>

<script setup>
import useUserStore from "@/stores/modules/user";

import { storeToRefs } from "pinia";
import { showConfirmDialog } from "vant";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

//用户注销
const logout = () => {
  showConfirmDialog({
    message: "确认退出登录吗？",
  })
    .then(() => {
      router.push("/login");
      userStore.logout();
    })
    .catch(() => {});
};
</script>

<style lang="less" scoped>
.user {
  .head {
    margin-top: 5px;
  }
  .list {
    border-top: 15px solid #eeeeee;
    border-bottom: 15px solid #eeeeee;
  }

  .userLogout {
    .logout {
      width: 200px;
      margin: 0 auto;
      margin-top: 35px;
    }
  }
}
</style>
