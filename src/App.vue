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
