<template>
  <div class="hello" style="height: 100vh; background-image: url('static/imgs/sjtu-BG-03.jpg');
       background-position: center;background-repeat: no-repeat;">
    <Header></Header>

    <div class="header" style="background: #eaf2ff;opacity: 0.85">
      <div class="header-wrap">
        <div class="logo">
          <a href="/" style="display:flex; align-items:center">
            <img class="SJTU-loginLogoIMG" src="static/imgs/sjtu.png"/>
            <span class="loginText"
            >
              在线协同文档
            </span>
          </a>
        </div>
        <label class="gh" for="mobile-menu-toggle">
          <span></span>
        </label>
      </div>
    </div>

    <el-container style="opacity: 0.85">
      <el-card class="center-card" style="margin-top: 5vh">
        <el-form
          status-icon
          label-width="0px"
          class="demo-ruleForm"
          @keyup.enter.native="onSubmit"
        >
          <h2>{{ $t('register') }}</h2>
          <el-form-item label>
            <el-input
              type="text"
              auto-complete="off"
              :placeholder="$t('username_description')"
              v-model="username"
            ></el-input>
          </el-form-item>

          <el-form-item label>
            <el-input
              type="password"
              auto-complete="off"
              v-model="password"
              :placeholder="$t('password')"
            ></el-input>
          </el-form-item>

          <el-form-item label>
            <el-input
              type="password"
              auto-complete="off"
              v-model="confirm_password"
              :placeholder="$t('password_again')"
            ></el-input>
          </el-form-item>

          <el-form-item label>
            <el-input
              type="text"
              auto-complete="off"
              v-model="v_code"
              :placeholder="$t('verification_code')"
            ></el-input>
            <img
              v-bind:src="v_code_img"
              class="v_code_img"
              v-on:click="change_v_code_img"
            />
          </el-form-item>

          <el-form-item label>
            <el-button type="primary" style="width:100%;" @click="onSubmit">{{
              $t('register')
            }}</el-button>
          </el-form-item>

          <el-form-item label>
            <router-link to="/user/login">{{ $t('login') }}</router-link>
            &nbsp;&nbsp;&nbsp;
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>

    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'Register',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      confirm_password: '',
      v_code: '',
      v_code_img: DocConfig.server + '/api/common/verify'
    }
  },
  methods: {
    onSubmit() {
      // this.$message.success(this.username);
      var that = this
      var url = DocConfig.server + '/api/user/register'

      var params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.password)
      params.append('confirm_password', this.confirm_password)
      params.append('v_code', this.v_code)

      that.axios.post(url, params).then(function(response) {
        if (response.data.error_code === 0) {
          // that.$message.success("注册成功");
          localStorage.setItem('userinfo', JSON.stringify(response.data.data))
          that.$router.push({ path: '/item/index' })
        } else {
          that.change_v_code_img()
          that.$alert(response.data.error_message)
        }
      })
    },
    change_v_code_img() {
      var rand = '&rand=' + Math.random()
      this.v_code_img += rand
    }
  },
  mounted() {},
  beforeDestroy() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.center-card a {
  font-size: 12px;
}

.center-card {
  text-align: center;
}

.v_code_img {
  margin-top: 20px;
}

/*-------------------下面是移动端适配的代码----------------------*/

.loginText{
  color: #df1d59;
  font-size: 30px;
  font-family: KaiTi,fangsong;
}

.SJTU-loginLogoIMG{
  width: 20%;
}

@media only screen and (max-width: 500px) {
  .loginText{
    font-size: 25px;
  }

  .SJTU-loginLogoIMG{
    width: 30%;
  }

  .header{
    height: 10vh;
    /*position: fixed;*/
    display:flex; align-items:center;
  }
}

</style>
