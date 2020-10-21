<template>
  <a-layout>
    <a-layout-sider class="app-sidebar" theme="light">
      <Sidebar />
    </a-layout-sider>
    <a-layout>
      <a-layout-content class="app-content">
        <a-skeleton active />

      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  name: 'MainApp',
  components: {
    Sidebar
  }
});
</script>

<style>
.app-sidebar {
  height: 100vh;
  font-size: 20px;
  overflow-y: auto;
}

.app-content {
  height: 100vh;
  overflow-y: auto;
  font-size: 30px;
}
</style>
