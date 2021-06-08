<template>
  <div class="register">
    <BackNav :title="navTitleName" />
    <RegisterForm />
  </div>
</template>

<script>
import BackNav from "../components/BackNav";
import RegisterForm from "../components/RegisterForm";

export default {
  name: "Register",
  data() {
    return {
      navTitleName: "注册",
    };
  },
  components: {
    BackNav,
    RegisterForm,
  },
};
</script>

<style scoped></style>
