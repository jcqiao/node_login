<!--
 * @FilePath: \node登录注册\vue\src\pages\main.vue
-->
<template>
  <div style="padding:30px ">
    <table>
      <tr>
        <td style="font-size:18px">序号</td>
        <td style="font-size:18px">邮箱</td>
        <td style="font-size:18px">手机号</td>
      </tr>
      <tr v-for="(item,index) in userlist" :key="index">
        <td>{{index}}</td>
        <td>{{item.email}}</td>
        <td>{{item.mobile}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],
    };
  },
  created() {
    //判断是否已经登录
    let data = sessionStorage.getItem("userloginflag");
    if (data == "1") this.getlist();
    else {
      alert("您还没有登录");
      this.$router.push("/login");
    }
  },
  methods: {
    //获取用户信息列表
    getlist() {
      let that = this;
      $.ajax({
        type: "GET",
        url: "/myapi/admin/user",
        dataType: "json",
        success: function (result) {
          console.log(result);
          that.userlist = result;
        },
      });
    },
  },
};
</script>
<style scoped>
tr td {
  width: 180px;
  margin: 3px 0;
  font-size: 16px;
}
tr td:nth-child(1) {
  width: 50px;
}
</style>
