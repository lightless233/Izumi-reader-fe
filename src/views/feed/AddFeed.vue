<template>
  <a-row type="flex" justify="center">
    <a-col :span="16">
      <a-card title="添加订阅源" class="add-feed-card">
        <a-form
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
          :model="formData"
          :rules="rules"
          ref="addFeedForm"
        >
          <a-form-item label="订阅源链接" name="feedUrl">
            <a-input
              v-model:value.trim="formData.feedUrl"
              autocomplete="off"
            ></a-input>
          </a-form-item>

          <a-form-item label="订阅源标题" name="title">
            <a-input
              v-model:value.trim="formData.title"
              autocomplete="off"
            ></a-input>
          </a-form-item>

          <a-form-item label="刷新间隔" name="interval">
            <a-input-number
              v-model:value.number="formData.interval"
            ></a-input-number>
            分钟
          </a-form-item>

          <a-form-item label="描述" name="description">
            <a-textarea
              v-model:value.trim="formData.description"
              autocomplete="off"
              :auto-size="{ minRows: 2, maxRows: 4 }"
            ></a-textarea>
          </a-form-item>
        </a-form>

        <a-row type="flex" justify="center">
          <a-col :span="5">
            <a-button type="primary" style="width: 120px" @click="Add(false)"
              >添加</a-button
            >
          </a-col>

          <a-col :span="5">
            <a-button type="primary" style="width: 160px" @click="Add(true)"
              >添加并清空表单</a-button
            >
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { addFeed } from "@/services/feed";

export default defineComponent({
  name: "AddFeedView",
  data() {
    return {
      formData: {
        feedUrl: "",
        title: "",
        interval: 15,
        description: "",
      },
      rules: {
        feedUrl: [
          {
            required: true,
            message: "请输入订阅源URL!",
            trigger: "blur",
          },
          {
            type: "url",
            message: "URL格式不合法!",
            trigger: "blur",
          },
        ],
        title: [{ required: true, message: "标题不能为空!", trigger: "blur" }],
      },

      loading: false,
    };
  },

  methods: {
    resetForm() {
      this.formData.feedUrl = "";
      this.formData.title = "";
      this.formData.interval = 15;
      this.formData.description = "";
    },

    async Add(reset = false) {
      console.log("reset: ", reset);

      // eslint-disable-next-line
      const form: any = this.$refs.addFeedForm;
      let result;

      try {
        result = await form.validate();
      } catch (error) {
        this.$message.error("订阅源填写错误!");
        return;
      }

      try {
        this.loading = true;
        const response = await addFeed({
          feedUrl: result.feedUrl,
          name: result.title,
          interval: parseInt(result.interval),
          description: result.description,
        });
        console.log("response: ", response);

        const data = response.data;
        if (data.code === 2000) {
          this.$message.success("添加成功!");
          if (reset) {
            this.resetForm();
          }
        } else {
          this.$message.error(`添加失败! ${data.message}`);
          return;
        }
      } catch (error) {
        this.$message.error("网络异常.");
        console.error("Add Feed Error: ", error);
      } finally {
        this.loading = false;
      }
    },

    // 
  },
});
</script>

<style scoped>
.add-feed-card {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}
</style>
