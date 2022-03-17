Page({
  onShow() {
    wx.reportAnalytics('enter_home_programmatically', {})

    // http://tapd.oa.com/miniprogram_experiment/prong/stories/view/1020425689866413543
    if (wx.canIUse('getExptInfoSync')) {
      console.log('getExptInfoSync expt_args_1', wx.getExptInfoSync(['expt_args_1']))
      console.log('getExptInfoSync expt_args_2', wx.getExptInfoSync(['expt_args_2']))
      console.log('getExptInfoSync expt_args_3', wx.getExptInfoSync(['expt_args_3']))
    }
    if (wx.canIUse('reportEvent')) {
      wx.reportEvent('expt_event_1', {
        expt_data: 1
      })
      wx.reportEvent('expt_event_2', {
        expt_data: 5
      })
      wx.reportEvent('expt_event_3', {
        expt_data: 9
      })
      wx.reportEvent('expt_event_4', {
        expt_data: 200
      })

      wx.reportEvent('weexpt_event_key_1', {
        option_1: 1,
        option_2: 10,
        option_str_1: 'abc'
      })
      wx.reportEvent('weexpt_event_key_1', {
        option_1: 'abc',
        option_2: '1000',
        option_str_1: '1'
      })
    }
  },
  onShareAppMessage() {
    return {
      title: '足迹',
      path: 'page/component/index'
    }
  },
  onShareTimeline() {
    '足迹'
  },

  data: {
    markers: [{
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/2.jpg",
        id: 0,
        latitude: 40.002607,
        longitude: 116.487847,
        width: 50,
        height: 50
      },
      {
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/3.jpg",
        id: 1,
        latitude: 40.002607,
        longitude: 116.887847,
        width: 50,
        height: 50
      },
      {
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/3.jpg",
        id: 2,
        latitude: 39.902607,
        longitude: 116.387847,
        width: 50,
        height: 50
      },
      {
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/1.jpg",
        id: 3,
        latitude: 39.602607,
        longitude: 116.587847,
        width: 50,
        height: 50
      },
      {
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/sjtu1.JPG",
        id: 4,
        latitude: 31.024144,
        longitude: 121.428079,
        width: 50,
        height: 50
      },
      {
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/sjtu2.JPG",
        id: 5,
        latitude: 31.021978,
        longitude: 121.432948,
        width: 50,
        height: 50
      },
      {
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/sjtu3.JPG",
        id: 6,
        latitude: 31.020125,
        longitude: 121.433085,
        width: 50,
        height: 50
      },
      {
        iconPath: "https://footer-1310236141.cos.ap-shanghai.myqcloud.com/public/sjtu4.JPG",
        id: 7,
        latitude: 31.02019,
        longitude: 121.429013,
        width: 50,
        height: 50
      }
    ],
    list: [{
      id: 'view',
      name: '视图容器',
      open: false,
      pages: ['view', 'scroll-view', 'swiper', 'movable-view', 'cover-view']
    }, {
      id: 'content',
      name: '基础内容',
      open: false,
      pages: ['text', 'icon', 'progress', 'rich-text']
    }, {
      id: 'form',
      name: '表单组件',
      open: false,
      pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'picker-view', 'radio', 'slider', 'switch', 'textarea', 'editor']
    }, {
      id: 'nav',
      name: '导航',
      open: false,
      pages: ['navigator']
    }, {
      id: 'media',
      name: '媒体组件',
      open: false,
      pages: ['image', 'video', 'camera', 'live-pusher', 'live-player']
    }, {
      id: 'map',
      name: '地图',
      open: false,
      pages: ['map', {
        appid: 'wxe3f314db2e921db0',
        name: '腾讯位置服务示例中心'
      }]
    }, {
      id: 'canvas',
      name: '画布',
      open: false,
      pages: ['canvas-2d', 'webgl']
    }, {
      id: 'open',
      name: '开放能力',
      open: false,
      pages: ['ad', 'open-data', 'web-view']
    }, {
      id: 'obstacle-free',
      name: '无障碍访问',
      open: false,
      pages: ['aria-component']
    }],
    theme: 'light'
  },

  onLoad() {
    this.setData({
      theme: wx.getSystemInfoSync().theme || 'light'
    })

    if (wx.onThemeChange) {
      wx.onThemeChange(({
        theme
      }) => {
        this.setData({
          theme
        })
      })
    }
  },
  kindToggle(e) {
    const id = e.currentTarget.id
    const list = this.data.list
    for (let i = 0, len = list.length; i < len; ++i) {
      if (list[i].id === id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list
    })
    wx.reportAnalytics('click_view_programmatically', {})
  },
  searchRefresh: function(e) {
    this.setData({
      searchContent : e.detail.value
    })
  },
  pathSearch: function() {
    
    let plugin = requirePlugin('routePlan');
    let key = '6ZIBZ-3KS3O-AIZWN-S6WXJ-JACNF-MJBQW';
    let referer = 'app'; //调用插件的app的名称
    let endPointName = this.data.searchContent;
   
    console.log(endPointName);  
  
    let endPoint = { //终点
      'name': endPointName
    };

    endPoint = JSON.stringify(endPoint);

    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    });
  },
  previewImage: function(e){
    let picUrl = this.data.markers[e.detail.markerId].iconPath;
  
    wx.previewImage({
      urls: [picUrl], // 需要预览的图片http链接列表
    })
  }
})