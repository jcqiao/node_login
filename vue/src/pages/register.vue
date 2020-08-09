<template>
  <div style="padding-top:50px">
    <div style="width:600px;margin:0px auto  ;font-size:16px">
      <div class="row">
        <span class="xinghao">*</span>
        <span class="inputcontent">邮箱地址：</span>
        <input v-model="email" class="inputcontent" style="width:200px" type="text" />
        <span>@</span>
        <select v-model="myselect">
          <option v-for="(item,index) in emailurl" :value="item" :key="index">{{item}}</option>
        </select>
        <div class="tip">6-18个字符，可使用字母、数字、下划线、需以字母开头</div>
      </div>
      <div class="row">
        <span class="xinghao">*</span>
        <span class="inputcontent">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码：</span>
        <input class="inputcontent" type="password" v-model="password" style="width:300px" />
        <div class="tip">6-16个字符，区分大小写</div>
      </div>
      <div class="row">
        <span class="xinghao">*</span>
        <span class="inputcontent">确定密码：</span>
        <input v-model="repassword" class="inputcontent" type="password" style="width:300px" />
        <div class="tip">请再次输入密码</div>
      </div>
      <div class="row">
        <span class="xinghao">*</span>
        <span class="inputcontent">&nbsp;&nbsp;&nbsp;验证码：</span>
        <input
          class="inputcontent code"
          id="code"
          v-model="code"
          placeholder="请输入您的验证码"
          style="width:200px"
        />
        <div class="login-code" @click="refreshCode">
          <!--验证码组件-->
          <s-identify :identifyCode="identifyCode"></s-identify>
          <span style="font-size:13px;margin-left:13px;color:blue">看不清图？换一张</span>
        </div>
        <div class="tip">请再次输入密码</div>
      </div>
      <div class="row">
        <span class="xinghao">*</span>
        <span class="inputcontent">手机号码：</span>
        <input v-model="mobile" class="inputcontent" style="width:300px" />
        <div class="tip">请再次输入手机号码</div>
      </div>
      <div class="register" @click="register()">注册</div>
    </div>
  </div>
</template>
<script>
import SIdentify from "./sidentify";
export default {
  components: {
    //用来注册子组件的节点
    SIdentify,
  },
  created() {
    this.refreshCode();
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      code: "", //text框输入的验证码
      emailurl: ["qq.com", "163.com", "126.com", "cn.com"],
      username: "",
      password: "",
      repassword: "",
      mobile: "",
      email: "",
      myselect: "126.com",
    };
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    isemail(s) {
      var patrn = /^[a-zA-Z]{1}([a-zA-Z0-9]|[_]){5,17}$/;
      if (!patrn.exec(s)) return false;
      return true;
    },
    ispassword(s) {
      if (s.length < 6 || s.length > 16) return false;
      return true;
    },
    isrepassword(s, ss) {
      if (s != ss) return false;
      return true;
    },
    ismoible(s) {
      if (s.length != 11) return false;
      return true;
    },
    register() {
      console.log(this.isemail(this.email));
      if (!this.isemail(this.email)) {
        alert("邮箱不合法");
        return;
      } else if (!this.ispassword(this.password)) {
        alert("密码不合法");
        return;
      } else if (!this.isrepassword(this.password, this.repassword)) {
        alert("两次密码不一致");
        return;
      } else if (!this.ismoible(this.mobile)) {
        alert("手机号码不正确");
        return;
      } else if (this.code == "") {
        alert("请输入验证码");
        return;
      } else if (this.identifyCode !== this.code) {
        this.code = "";
        this.refreshCode();
        alert("请输入正确的验证码");
        return;
      } else {
        let data = {
          username: this.mobile,
          password: this.password,
          repassword: this.repassword,
          mobile: this.mobile,
          email: this.email + "@" + this.myselect,
        };
        let that = this
        $.ajax({
          type: "POST",
          url: "/myapi/api/user/register",
          data: data,
          dataType: "json",
          success: function (result) {
            alert(result.message);
            // 注册成功 去登录
            if (result.code == 4) {
                that.$router.push("/login")
            }
          },
        });
      }
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log(this.identifyCode);
    },
  },
};
</script>
<style scoped>
.row {
  margin-bottom: 14px;
}
.xinghao {
  color: red;
  width: 20px;
  margin: 0 3px;
}
.inputcontent {
  height: 31px;
  width: 100px;
}
.register {
  height: 30px;
  line-height: 30px;
  background: blue;
  width: 300px;
  text-align: center;
  color: #fff;
  margin-left: 100px;
}
.tip {
  font-size: 12px;
  margin-left: 105px;
  margin-top: 3px;
  width: 400px;
  color: gray;
}
.code {
  width: 124px;
  height: 31px;
  border: 1px solid rgba(186, 186, 186, 1);
}
.login-code {
  cursor: pointer;
  float: right;
  margin-right: 150px;
}
</style>