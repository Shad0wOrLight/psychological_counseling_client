<template>
  <div class="register">
    <div class="container">
      <div class="logo">
        <img :src="logo" alt="" />
        <h3>欢迎注册</h3>
        <span>
          注册即代表您同意<a href="#">用户服务协议</a>和<a href="#">隐私政策</a>
        </span>
      </div>
      <div class="userForm">
        <van-form>
          <van-field
            v-model="user.username"
            name="username"
            placeholder="输入用户名"
            clearable
            :rules="[
              {
                validator: validateUserName,
                message: '用户名含有非法字符',
              },
            ]"
          />
          <van-field
            v-model="user.password"
            type="password"
            name="password"
            placeholder="输入密码"
            :rules="[
              {
                validator: validatePassword,
                message: '密码长度在4~8位',
              },
            ]"
          />
          <van-field
            v-model="user.pwd"
            type="password"
            name="password"
            placeholder="再次确认密码"
            :rules="[
              {
                validator: confirmPassword,
                message: '两次输入密码不同',
              },
            ]"
          />
        </van-form>

        <div class="btn">
          <van-button
            block
            @click="register"
            type="success"
            :disabled="isCompelete"
          >
            注册
          </van-button>
        </div>
        <RouterLink class="toggle" to="/login">登录</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { RouterLink, useRouter } from "vue-router";
import useUserStore from "@/stores/modules/user";
import { testUserName, testPassword } from "@/utils/validate";
import { showFailToast } from "vant";

const router = useRouter();
const userStore = useUserStore();
const logo = new URL("../../assets/img/logo.ico", import.meta.url).href;
const user = reactive({ username: "", password: "", pwd: "" });
const isCompelete = computed(() => {
  return !user.username || !user.password || !user.pwd;
});
const validateUserName = (val) => testUserName(val);
const validatePassword = (val) => testPassword(val);
const confirmPassword = (val) => user.password == val;
const register = () => {
  userStore
    .register({ username: user.username, password: user.password })
    .then(() => {
      router.push("/login");
    })
    .catch((err) => {
      showFailToast(err);
    });
};
</script>

<style lang="less" scoped>
.container {
  .logo {
    text-align: center;
    img {
      margin-top: 45px;
      width: 80px;
    }
    span {
      display: inline-block;
      margin-top: 15px;
      font-size: 12px;
      color: #737373;
      a {
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
  .userForm {
    padding: 30px;
    .van-field {
      width: 284px;
      border: 1px solid #000;
      border-radius: 5px;
      margin: 16px;
    }
    .btn {
      margin: 16px;
    }
    .toggle {
      margin-left: 16px;
    }
  }
}
</style>
