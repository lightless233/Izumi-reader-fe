<template>
  <a-row type="flex" justify="center">
    <a-col :span="16">
      <a-card title="Add Feeds" class="add-feed-card">
        <a-form>
          <a-form-item label="Feed URL" name="feedUrl">
            <a-input></a-input>
          </a-form-item>

          <a-form-item lable="Title">
            <a-input></a-input>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.add-feed-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}
</style>
