<template>
  <a-row style="margin-bottom: 20px">
    <a-col :span="24" align="center">
      <a-button
        style="width: 90%; margin-top: 40px"
        type="default"
        @click="this.$router.push('addFeed')"
      >
        添加订阅源
      </a-button>
    </a-col>
  </a-row>

  <a-menu class="base-menu">
    <a-menu-item key="today" class="menu-item-top">
      <ThunderboltOutlined /><span>Today</span>
    </a-menu-item>

    <a-menu-item key="read-later" class="menu-item-top">
      <BookOutlined /><span>Later</span>
    </a-menu-item>

    <a-menu-item-group key="g1" style="margin-top: 20px">
      <template #title><span>FEEDS</span></template>

      <a-menu-item class="menu-item" key="all">
        <BorderlessTableOutlined /><span>ALL</span>
      </a-menu-item>
      <a-menu-item class="menu-item" key="favorites">
        <StarOutlined /><span>Favorites</span>
      </a-menu-item>
      <!-- 后端返回的 feed 列表 -->
      <a-menu-item
        v-for="item in feedList"
        :key="item.feedId"
        class="menu-item"
      >
        {{ item.feedName }}
      </a-menu-item>
    </a-menu-item-group>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { axios } from "@/utils/axiosCreator";
import {
  ThunderboltOutlined,
  BorderlessTableOutlined,
  StarOutlined,
  BookOutlined,
} from "@ant-design/icons-vue";

interface FeedInfo {
  feedName: string;
  feedId: number;
}

export default defineComponent({
  name: "Sidebar",
  components: {
    ThunderboltOutlined,
    BorderlessTableOutlined,
    StarOutlined,
    BookOutlined,
  },
  data() {
    return {
      feedList: [] as FeedInfo[],
    };
  },
  async mounted() {
    // TODO: move to service
    let response = undefined;
    try {
      response = await axios.get("/api/v1/feed/list");
    } catch (e) {
      console.log(e)
      this.$router.replace("/error");
      return;
    }
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
  margin-top: 5px;
  margin-bottom: 40px;
  background: #f6f7f8;
}

.menu-item {
  line-height: 30px;
  height: 30px;
  margin-top: 0px;
  margin-bottom: 0px !important;
}

.menu-item-top {
  height: 25px;
  line-height: 25px;
  padding-left: 28px;
}
</style>
