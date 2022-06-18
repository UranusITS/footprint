<template>
  <div class="hello"
       style="height: 100vh; background-image: url('static/imgs/sjtu-BG-01.jpg');
       background-position: center;background-repeat: no-repeat;"
  >
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
      <el-card class="center-card">
        <el-form
          status-icon
          label-width="0px"
          class="demo-ruleForm"
          @keyup.enter.native="onSubmit"
        >
          <h2>{{ $t('login') }}</h2>
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

          <el-form-item label v-if="show_v_code">
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
              $t('login')
            }}</el-button>
          </el-form-item>

          <el-form-item label>
            <router-link to="/user/register">{{
              $t('register_new_account')
            }}</router-link
            >&nbsp;&nbsp;&nbsp;
            <a :href="oauth2_url">{{ oauth2_entrance_tips }}</a>
          </el-form-item>
        </el-form>
      </el-card>
    </el-container>

    <Footer></Footer>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      username: '',
      password: '',
      v_code: '',
      v_code_img: DocConfig.server + '/api/common/verify',
      show_v_code: false,
      is_show_alert: false,
      oauth2_entrance_tips: '',
      oauth2_url: DocConfig.server + '/api/ExtLogin/oauth2'
    }
  },
  methods: {
    onSubmit() {
      if (this.is_show_alert) {
        return
      }
      // 对redirect参数进行校验，以防止钓鱼跳转
      if (this.$route.query.redirect) {
        let redirect = decodeURIComponent(this.$route.query.redirect)
        if (
          redirect.search(/[^A-Za-z0-9/:\?\._\*\+\-]+.*/i) > -1 ||
          redirect.indexOf('.') > -1 ||
          redirect.indexOf('//') > -1
        ) {
          this.$alert('illegal redirect')
          return false
        }
      }
      // this.$message.success(this.username);
      var that = this
      var url = DocConfig.server + '/api/user/login'
      var params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.password)
      params.append('v_code', this.v_code)

      that.axios.post(url, params).then(function(response) {
        if (response.data.error_code === 0) {
          // that.$message.success("登录成功");
          localStorage.setItem('userinfo', JSON.stringify(response.data.data))
          let redirect = decodeURIComponent(
            that.$route.query.redirect || '/item/index'
          )
          that.$router.replace({
            path: redirect
          })
        } else {
          if (
            response.data.error_code === 10206 ||
            response.data.error_code === 10210
          ) {
            that.show_v_code = true
            that.change_v_code_img()
          }
          that.is_show_alert = true
          that.$alert(response.data.error_message, {
            callback: function() {
              setTimeout(function() {
                that.is_show_alert = false
              }, 500)
            }
          })
        }
      })
    },
    change_v_code_img() {
      var rand = '&rand=' + Math.random()
      this.v_code_img += rand
    },
    script_cron() {
      var url = DocConfig.server + '/api/ScriptCron/run'
      this.axios.get(url)
    },
    getOauth() {
      var url = DocConfig.server + '/api/user/oauthInfo'
      this.axios.get(url).then(response => {
        if (response.data.error_code === 0) {
          if (response.data.data.oauth2_open > 0) {
            this.oauth2_entrance_tips = response.data.data.oauth2_entrance_tips
          }
        }
      })
    }
  },
  mounted() {
    var that = this
    // 对redirect参数进行校验，以防止钓鱼跳转
    if (this.$route.query.redirect) {
      let redirect = decodeURIComponent(this.$route.query.redirect)
      if (
        redirect.search(/[^A-Za-z0-9/:\?\._\*\+\-]+.*/i) > -1 ||
        redirect.indexOf('.') > -1 ||
        redirect.indexOf('//') > -1
      ) {
        this.$alert('illegal redirect')
        return false
      }
    }
    this.get_user_info(function(response) {
      if (response.data.error_code === 0) {
        let redirect = decodeURIComponent(
          that.$route.query.redirect || '/item/index'
        )
        that.$router.replace({
          path: redirect
        })
      }
    })

    this.script_cron()
    this.getOauth()
  },
  watch: {
    $route(to, from) {
      this.$router.go(0)
    }
  },
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
    width: 40%;
  }

  .header{
    height: 10vh;
    /*position: fixed;*/
    display:flex;
    align-items:center;
  }
}

</style>
