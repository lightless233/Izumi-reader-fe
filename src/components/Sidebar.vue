<template>
  <a-menu class="base-menu">
    <a-menu-item-group key="g1">
      <template #title><span>FEEDS</span></template>
      <a-menu-item
        v-for="item in feedList"
        :key="item.feedId"
        class="menu-item"
      >
        {{ item.feedName }} - {{ item.feedId }}
      </a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axios } from "@/utils/axiosCreator";

interface FeedInfo {
  feedName: string;
  feedId: number;
}

export default defineComponent({
  name: "Sidebar",
  data() {
    return {
      feedList: [] as FeedInfo[],
    };
  },
  async mounted() {
    // TODO: move to service
    const response = await axios.get("/api/v1/feed/list");
    const data = response.data;
    if (data.code === 2000) {
      //
      console.log(data);
      data.data.forEach((item: { feedName: string; id: number }) => {
        this.feedList.push({
          feedName: item.feedName,
          feedId: item.id,
        });
      });
    } else {
      this.$message.error("Error while loading feed list.");
    }
  },
  methods: {},
});
</script>

<style scoped>
.base-menu {
  margin-top: 40px;
  margin-bottom: 40px;
}

.menu-item {
  line-height: 20px;
  height: 20px;
}
</style>
