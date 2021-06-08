<template>
  <div>
    <font-awesome-icon v-if="value" :icon="['fas', 'eye']" />
    <font-awesome-icon v-else :icon="['fas', 'eye-slash']" />
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add([faEye, faEyeSlash]);

export default {
  name: "PasswordSeenIcon",
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  watch: {
    value: function (val) {
      if (val) {
        console.log("显示密码");
      } else {
        console.log("隐藏密码");
      }
    },
  },
  components: {
    FontAwesomeIcon,
  },
};
</script>

<style scoped></style>
