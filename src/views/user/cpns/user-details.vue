<template>
  <!-- 用户信息详情 -->
  <div class="userDetails">
    <NavBar title="个人信息" :show="false" />
    <!-- 信息列表 -->
    <div class="list">
      <van-cell is-link center title="头像" @click="showAvatar = true">
        <template #value>
          <van-image
            width="3.5em"
            height="3.5em"
            fit="cover"
            round
            :src="userInfo.avatar"
          />
        </template>
      </van-cell>
      <van-cell is-link center title="用户名" @click="showUsername = true">
        <template #value>
          <span>{{ userInfo.username }}</span>
        </template>
      </van-cell>
      <van-cell is-link center title="性别" @click="showGender = true">
        <template #value>
          <span>{{ userInfo.gender || "未设置" }}</span>
        </template>
      </van-cell>
      <van-cell is-link center title="地区" @click="showAddress = true">
        <template #value>
          <span>{{ userInfo.address || "未设置" }}</span>
        </template>
      </van-cell>
      <van-cell is-link center title="电话号码" @click="showPhone = true">
        <template #value>
          <span>{{ userInfo.phone || "未设置" }}</span>
        </template>
      </van-cell>
    </div>

    <!-- 修改头像 -->
    <van-dialog
      v-model:show="showAvatar"
      title="设置头像"
      show-cancel-button
      @confirm="confirm"
      @closed="cancel"
    >
      <div class="content">
        <div class="request">
          <h4>【照片要求】</h4>
          <span>严禁上传色情、暴力、反动等违法照片</span>
        </div>
        <div class="fileLoader">
          <van-uploader v-model="image" :after-read="afterRead" max-count="1" />
        </div>
      </div>
    </van-dialog>
    <!-- 修改用户名 -->
    <van-dialog
      v-model:show="showUsername"
      title="设置用户名"
      show-cancel-button
      @confirm="confirm"
      @closed="cancel"
    >
      <div class="content">
        <van-field class="name" v-model="username" placeholder="请输入用户名" />
      </div>
    </van-dialog>
    <!-- 修改性别 -->
    <van-popup v-model:show="showGender" round position="bottom">
      <van-picker
        v-model="gender"
        :columns="columns"
        @cancel="showGender = false"
        @confirm="confirm"
      />
    </van-popup>
    <!-- 修改地区 -->
    <van-popup v-model:show="showAddress" round position="bottom">
      <van-cascader
        v-model="address"
        title="请选择所在地区"
        :options="options"
        @close="showAddress = false"
        @finish="onFinish"
      />
    </van-popup>
    <!-- 修改电话号码 -->
    <van-dialog
      v-model:show="showPhone"
      title="设置电话号码"
      show-cancel-button
      @confirm="confirm"
      @cancel="cancel"
    >
      <div class="content">
        <van-form>
          <van-field
            class="name"
            v-model="phone"
            placeholder="请输入电话号码"
            :rules="[{ validator, message: '请输入正确的电话号码！' }]"
          />
        </van-form>
      </div>
    </van-dialog>
  </div>
</template>

<script setup>
import NavBar from "@/components/nav-bar/nav-bar.vue";
import useUserStore from "@/stores/modules/user";
import { useCascaderAreaData } from "@vant/area-data";
import { testPhone } from "@/utils/validate";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const userStore = useUserStore();
const { userInfo } = storeToRefs(userStore);

// 是否展示修改框
const showAvatar = ref(false);
const showUsername = ref(false);
const showGender = ref(false);
const showAddress = ref(false);
const showPhone = ref(false);

const image = ref([]); //上传图片
const avatar = ref(); //用户头像
const username = ref(userInfo.value.username); //用户名
const address = ref(userInfo.value.address); //用户地址
const phone = ref(userInfo.value.phone); //用户电话号码
const gender = ref([userInfo.value.gender]); //用户性别

const validator = (val) => testPhone(val); //检验电话号码

//性别选择列表
const columns = [
  { text: "男", value: "男" },
  { text: "女", value: "女" },
];
const options = useCascaderAreaData(); //地区数据选择列表

// 上传图片后
const afterRead = ({ content }) => {
  avatar.value = content;
};

//确认修改
const confirm = () => {
  showAvatar.value &&
    userStore.updateUserInfo({ uid: userInfo.value.uid, avatar: avatar.value });
  showUsername.value &&
    userStore.updateUserInfo({
      uid: userInfo.value.uid,
      username: username.value,
    });
  showGender.value &&
    userStore.updateUserInfo({
      uid: userInfo.value.uid,
      gender: gender.value[0],
    });
  showGender.value = false;

  showPhone &&
    userStore.updateUserInfo({
      uid: userInfo.value.uid,
      phone: phone.value,
    });
};

//选择相应地区选项后
const onFinish = ({ selectedOptions }) => {
  address.value = selectedOptions.map((option) => option.text).join(" ");

  userStore.updateUserInfo({
    uid: userInfo.value.uid,
    address: address.value,
  });
  showAddress.value = false;
};

// 取消修改
const cancel = () => {
  avatar.value = [];
  username.value = userInfo.value.username;
  phone.value = userInfo.value.phone;
};
</script>

<style lang="less" scoped>
.content {
  padding-left: 15px;
  .request {
    font-size: 13px;
  }
  .fileLoader {
    margin-top: 5px;
    text-align: center;
  }
  .name {
    width: 200px;
    border: 1px solid #eee;
    margin: 15px auto;
  }
}
</style>
