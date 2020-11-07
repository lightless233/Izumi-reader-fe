<template>
  <div class="login-div">
    <a-row>
      <a-col :span="4"></a-col>
      <a-col :span="16">
        <a-card title="登录到 Izumi 阅读器" class="login-card">
          <a-form
            ref="loginForm"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 16 }"
            :model="formData"
            :rules="rules"
          >
            <a-form-item label="邮箱" name="email">
              <a-input v-model:value="formData.email"></a-input>
            </a-form-item>
            <a-form-item label="密码" name="password">
              <a-input
                v-model:value="formData.password"
                type="password"
              ></a-input>
            </a-form-item>
          </a-form>

          <a-row type="flex" justify="end">
            <a-col :span="19" align="center">
              <a-button
                style="width: 120px"
                type="primary"
                :loading="loading"
                @click="handleLoginClick"
              >
                登录
              </a-button>
            </a-col>
            <a-col :span="5">
              <a-button type="link">还没有账户？点我注册！</a-button>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="4"></a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import md5 from "js-md5";
import { doLogin } from "@/services/login";

export default defineComponent({
  name: "Login",
  data() {
    return {
      formData: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          { required: true, message: "请输入登录邮箱!", trigger: "blur" },
          { type: "email", message: "邮箱格式不合法!" },
        ],
        password: [
          { required: true, message: "请输入密码!", trigger: "blur" },
          { min: 6, message: "密码长度太短!" },
        ],
      },

      loading: false,
    };
  },

  methods: {
    async handleLoginClick() {
      // https://stackoverflow.com/questions/52109471/typescript-in-vue-property-validate-does-not-exist-on-type-vue-element
      // eslint-disable-next-line
      const loginForm: any = this.$refs.loginForm;

      try {
        const result = await loginForm.validate();
        const loginData = {
          email: result.email,
          password: md5(result.password),
        };
        this.loading = true;
        const response = await doLogin(loginData);
        console.log("response", response);
        const data = response.data;
        if (data.code === 2000) {
          this.$message.success("登录成功!");
          window.localStorage.setItem(
            "token",
            response.headers["x-readertoken"]
          );
          this.$router.replace("home");
        } else {
          this.$message.error("账号或密码错误!");
        }
      } catch (error) {
        this.$message.error("网络异常.");
        console.error("Login Error: ", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
</script>

<style scoped>
.login-div {
  background: #ececec;
  height: 100vh;
}

.login-card {
  margin-top: 25%;
}
</style>