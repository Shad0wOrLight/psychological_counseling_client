<template>
  <!-- 咨询师列表 -->
  <div class="consultList">
    <van-cell-group>
      <van-cell
        center
        :title-style="{ marginLeft: 5 + 'px' }"
        v-for="item in list"
        :key="item.uid"
        @click="connetSession(item.uid)"
      >
        <template #icon>
          <van-image
            width="4em"
            height="4em"
            fit="cover"
            round
            :src="item.avatar"
          />
        </template>

        <template #title>
          <h3>{{ item.username }}</h3>
        </template>
        <template #value>
          <div class="value">
            <van-icon name="location-o" class="location" />
            <span>{{ item.address.split(" ").at(-1) }}</span>
          </div>
        </template>
        <template #label>
          <div class="declare">
            {{ item.declare }}
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script setup>
import useConsultStore from "@/stores/modules/consult";
import { getUserInfo } from "@/utils/storage";
import { useRouter } from "vue-router";

const props = defineProps({
  list: Array,
});
const router = useRouter();
const consultStore = useConsultStore();
const { uid: userId } = getUserInfo();
const connetSession = (id) => {
  consultStore
    .addSession({
      sendId: userId,
      receiveId: id,
      sendTime: new Date().toLocaleString(),
    })
    .then(() => {
      router.push(`/message/info/${id}`);
    });
};
</script>

<style lang="less" scoped>
.value {
  .location {
    font-size: 20px;
  }
}
</style>
