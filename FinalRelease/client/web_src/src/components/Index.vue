<template>
  <div class="mainPage">
    <!--    header-->
    <div class="colorElem"></div>
    <div class="colorElem"></div>
    <div class="colorElem"></div>

    <div class="header">
      <div class="header-wrap">
        <div class="logo">
          <a href="/" style="display:flex; align-items:center">
            <img style="width: 30%" src="static/imgs/sjtu.png" />
            <span style="color: #df1d59; font-size: 28px;  font-family: 'KaiTi';"
            >
              在线文档服务
            </span>
          </a>
        </div>
        <input type="checkbox" name id="mobile-menu-toggle" value />
        <label class="gh" for="mobile-menu-toggle">
          <span></span>
        </label>
      </div>
    </div>

    <div class="login_register_bgpic">
      <img src="static/imgs/hello.png" id="login_register_hello" alt="Image can't display!"/>
      <div style="text-align: center"
      >
        <router-link :to="link"><button class="functionButton">登录/注册</button></router-link>
        <a href='http://10.119.10.104:3000'><button class="functionButton">水源文档</button></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      height: '',
      link: '',
      link_text: '',
      lang: '',
      beian: ''
    }
  },
  methods: {
    getHeight() {
      var winHeight
      if (window.innerHeight) {
        winHeight = window.innerHeight
      } else if (document.body && document.body.clientHeight) {
        winHeight = document.body.clientHeight
      }
      this.height = winHeight + 'px'
    },
    homePageSetting() {
      var url = DocConfig.server + '/api/common/homePageSetting'
      this.axios.post(url, this.form).then(response => {
        if (response.data.error_code === 0) {
          this.beian = response.data.data.beian
          if (response.data.data.home_page == 2) {
            // 跳转到登录页面
            this.$router.replace({
              path: '/user/login'
            })
          }
          if (
            response.data.data.home_page == 3 &&
            response.data.data.home_item
          ) {
            // 跳转到指定项目
            this.$router.replace({
              path: '/' + response.data.data.home_item
            })
          }
        }
      })
    }
  },
  mounted() {
    var that = this
    this.lang = DocConfig.lang
    this.getHeight()
    this.homePageSetting()
    that.link = '/user/login'
    that.link_text = that.$t('index_login_or_register')
    this.get_user_info(function(response) {
      if (response.data.error_code === 0) {
        that.link = '/item/index'
        that.link_text = that.$t('my_item')
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped src="@/../static/css/qietu.css"></style>
<style scoped src="@/../static/css/style.css"></style>
<style scoped src="@/../static/css/responsive.css"></style>
