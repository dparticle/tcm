<template>
  <div>
    <BackNav title="个人信息" />
    <!-- 防止未销毁路由导致的 undefined 报错 -->
    <div v-if="$store.state.user">
      <!--TODO 固定的 cell 是不是没必要用 js，我个人觉得写死更好 -->
      <van-cell-group>
        <van-cell
          center
          title="头像"
          is-link
          @click="avatarActionSheet.show = true"
        >
          <template #default>
            <van-image
              width="25"
              height="25"
              :src="
                $store.state.user.avatar_url ||
                'https://img01.yzcdn.cn/vant/leaf.jpg'
              "
              style="border-radius: 3px"
            />
          </template>
        </van-cell>
        <!--TODO 用户头像更新、保存 -->
        <van-action-sheet
          v-model="avatarActionSheet.show"
          :actions="avatarActionSheet.actions"
          @select="onSelect"
          cancel-text="取消"
          close-on-click-action
          @cancel="avatarActionSheet.show = false"
        />
        <van-cell
          center
          title="用户名"
          is-link
          :value="$store.state.user.username"
          @click="dialogs.username.show = true"
        />
        <van-dialog
          v-model="dialogs.username.show"
          title="修改用户名"
          showCancelButton
          @confirm="usernameDialogConfirm"
          @cancel="dialogs.username.show = false"
        >
          <van-field
            v-model="dialogs.username.value"
            name="newUsername"
            clearable
            placeholder="请输入新用户名"
            style="margin-bottom: 16px"
          />
        </van-dialog>
        <van-cell center title="手机号" :value="$store.state.user.phone" />
        <van-cell center title="二维码名片" is-link>
          <template #default>
            <van-icon name="qr" size="16" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group style="margin-top: 6px">
        <van-cell center title="更改密码" is-link />
      </van-cell-group>
    </div>
    <van-button
      plain
      hairline
      type="danger"
      @click="logout"
      style="width: 100%; margin-top: 20px"
      >退出登录
    </van-button>
  </div>
</template>

<script>
import BackNav from "../../components/BackNav";
import { Dialog, Toast } from "vant";

export default {
  name: "UserInfo",
  data() {
    return {
      dialogs: {
        username: {
          show: false,
          value: "",
        },
      },
      avatarActionSheet: {
        show: false,
        actions: [
          {
            name: "拍照",
          },
          {
            name: "从手机相册选择",
          },
          {
            name: "保存图片",
          },
        ],
      },
    };
  },
  methods: {
    logout: function () {
      Dialog.confirm({
        title: "退出登录",
        message: "是否确认退出登录",
      })
        .then(() => {
          localStorage.removeItem("token");
          this.$store.commit("SET_TOKEN", { token: undefined });
          this.$store.commit("SET_USER", { user: undefined });
          // 返回上一个页面，放前面和放后面都会出现报错，因为路由销毁要在这个路由的动作都做完后
          this.$router.back();
        })
        .catch(() => {
          // on cancel
        });
    },
    usernameDialogConfirm: function () {
      console.log("确认修改用户名，用户名为 => " + this.dialogs.username.value);
      this.$api.users
        .update(this.$route.params.phone, {
          username: this.dialogs.username.value,
        })
        .then((response) => {
          if (response.status === 204) {
            this.$store.dispatch("me", this.$api);
            Toast.success("更新成功");
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.dialogs.username.show = false;
      this.dialogs.username.value = "";
    },
    // 动作面板 item 选择
    onSelect: function (item) {
      this.avatarActionSheet.show = false;
      console.log("选择 item 名为 => " + item.name);
    },
  },
  components: {
    BackNav,
  },
};
</script>

<style scoped></style>
