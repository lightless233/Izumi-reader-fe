<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";

export default defineComponent({
  name: "MainApp",
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
