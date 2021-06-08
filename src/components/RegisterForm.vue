<template>
  <div>
    <van-form @submit="onRegister">
      <van-field name="uploader" label="上传头像">
        <template #input>
          <van-uploader
            v-model="user.uploader"
            :after-read="afterRead"
            :max-count="1"
          />
        </template>
      </van-field>
      <van-field
        v-model="user.username"
        name="username"
        label="用户名"
        placeholder="请输入用户名（不填默认手机号）"
      />
      <van-field
        v-model="user.phone"
        name="phone"
        required
        label="手机号"
        placeholder="请输入手机号"
        type="tel"
        :rules="[
          {
            required: true,
            message: '请填写手机号',
          },
          {
            pattern:
              /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
            message: '手机号格式错误',
          },
        ]"
        clearable
      />
      <van-field
        v-model="user.sms"
        name="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary" @click="sendVerificationCode"
            >发送验证码
          </van-button>
        </template>
      </van-field>
      <van-field
        v-model="user.password"
        :type="pwdSeen ? null : 'password'"
        name="password"
        required
        label="密码"
        placeholder="请输入密码"
        :rules="rules.pwd"
        @click-right-icon="onChangePwdSeen"
      >
        <template #right-icon style="color: #b2b5b9">
          <password-seen-icon :value="pwdSeen" />
        </template>
      </van-field>
      <van-field
        v-model="user.rePassword"
        :type="pwdSeen ? null : 'password'"
        name="re-password"
        required
        label="确认密码"
        placeholder="请再次输入密码"
        :rules="rules.rePwd"
      />
      <div style="margin: 16px; padding-top: 10px">
        <van-button round block type="info" native-type="submit"
          >注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import PasswordSeenIcon from "./PasswordSeenIcon";
import md5 from "md5";
import { stringCheck } from "../util/util";
import { mapActions } from "vuex";

export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        uploader: [],
        username: "",
        phone: "",
        sms: "",
        password: "",
        rePassword: "",
      },
      pwdSeen: false,
      rules: {
        pwd: [{ required: true, message: "请填写密码" }],
        rePwd: [
          { required: true, message: "请再次填写密码" },
          {
            validator: () => {
              return this.user.rePassword === this.user.password;
            },
            message: "两次输入密码不一致",
          },
        ],
      },
    };
  },
  methods: {
    onRegister: function (values) {
      for (let key of Object.keys(values)) {
        //TODO uploader 待处理
        if (!stringCheck(values[key])) {
          values[key] = null;
        }
        if (key === "password") {
          values[key] = md5(values[key]);
        }
      }
      // console.log(values);
      const payload = {
        values: values,
        $api: this.$api,
        $router: this.$router,
      };
      // 封装到 Vuex actions 里，通过 ...mapActions 导入（参考 h5vue）
      this.reg(payload);
    },
    afterRead: function (file) {
      //TODO 文件保存及路径返回
      file.status = "uploading";
      file.message = "上传中...";

      setTimeout(() => {
        file.url =
          "https://gitee.com/dparticle/image_host_picgo/raw/master/img/20210608001819.jpg";
        file.status = null;
        file.message = null;
        console.log(this.uploader);
      }, 2000);
    },
    sendVerificationCode: function () {
      //TODO 点击后密码错误提示显示
      console.log("发送验证码！");
    },
    onChangePwdSeen: function () {
      this.pwdSeen = !this.pwdSeen;
    },
    ...mapActions({
      reg: "reg",
    }),
  },

  // 生命周期测试
  beforeCreate() {
    console.log("Register Router: beforeCreate");
  },
  created() {
    console.log("Register Router: created");
  },
  beforeMount() {
    console.log("Register Router: beforeMount");
  },
  mounted() {
    console.log("Register Router: mounted");
  },
  beforeUpdate() {
    console.log("Register Router: beforeUpdate");
  },
  updated() {
    console.log("Register Router: updated");
  },
  beforeDestroy() {
    console.log("Register Router: beforeDestroy");
  },
  destroyed() {
    console.log("Register Router: destroyed");
  },
  components: {
    PasswordSeenIcon,
  },
};
</script>

<style scoped></style>
