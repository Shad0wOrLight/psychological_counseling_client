<template>
  <div class="consult">
    <NavBar title="咨询"  />
    <div class="header">
      <van-cell-group>
        <van-cell is-link center to="/article/add">
          <template #label>
            <div>描述您的心理困惑，快速获得解答</div>
          </template>
          <template #title>
            <h3>快速咨询</h3>
          </template>
          <template #icon>
            <div class="icon">
              <van-icon name="question-o" size="40" color="#51ad36" />
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    <div class="select">
      <van-dropdown-menu>
        <van-dropdown-item :title="address" ref="addressRef">
          <van-tree-select
            v-model:active-id="activeId"
            v-model:main-active-index="activeIndex"
            :items="items"
            @click-item="pickAddress"
          />
        </van-dropdown-item>

        <van-dropdown-item
          v-model="skillField"
          :options="options"
          @change="fieldChange"
        />
      </van-dropdown-menu>
    </div>
    <div class="list">
      <ConsultList :list="currentList" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { addressFormat } from "@/utils/format";
import useUserStore from "@/stores/modules/user";
import { storeToRefs } from "pinia";
import { findAddress, findAddressId, findAddressIndex } from "@/utils/find";
import ConsultList from "./cpns/consult-list.vue";

const userStore = useUserStore();
const { userInfo, consultantList, currentList } = storeToRefs(userStore);
const addressRef = ref(null);

const addr = userInfo.value.address;
const items = addressFormat();
const options = [
  { text: "擅长领域", value: "" },
  { text: "婚姻恋爱", value: "婚姻恋爱" },
  { text: "亲子教育", value: "亲子教育" },
  { text: "职场人际", value: "职场人际" },
  { text: "性格个性", value: "性格个性" },
];

const activeId = ref(findAddressId(items, addr)); //右侧高亮选项的 id
const activeIndex = ref(findAddressIndex(items, addr)); //左侧高亮选项的索引
const address = ref(findAddress(items, addr));
const skillField = ref("");

//选择地址选项后
const pickAddress = (val) => {
  address.value = val.text;
  addressRef.value.toggle();
};

// 监听当前地址，获取该地址下咨询师列表
watch(
  address,
  (val) => {
    if (skillField.value == "擅长领域") {
      userStore.getConsultantList({ address: val });
    } else {
      userStore.getConsultantList({
        address: val,
        skillField: skillField.value,
      });
    }
  },
  { immediate: true }
);

// 选择领域选项后
const fieldChange = (val) => {
  skillField.value = val;
  let list = null;
  if (val == "all") {
    list = consultantList.value;
  } else {
    list = consultantList.value.filter((item) => item.skillField == val);
  }

  userStore.changeCurrenttList(list);
};
</script>

<style lang="less" scoped>
.consult {
  .header {
    border-bottom: 15px solid #eee;
    .icon {
      margin-right: 5px;
    }
  }
}
</style>
