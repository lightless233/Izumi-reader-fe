<template>
  <a-layout>
    <a-layout-sider class="app-sidebar" theme="light">
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="app-content">
          <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  name: "Home",
  components: {
    Sidebar,
  },
});
</script>

<style>
.app-sidebar {
  height: 100vh;
  font-size: 20px;
  overflow-y: auto;
  /* background-color: #f6f7f8; */
  background: #f6f7f8;
  border-right: 1px solid #efefef;
}

.app-content {
  height: 100vh;
  overflow-y: auto;
  font-size: 30px;
  background-color: #fff;
  padding-top: 48px;
}
</style>
