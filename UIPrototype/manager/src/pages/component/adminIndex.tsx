import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtNoticebar, AtList, AtListItem } from 'taro-ui'
import './adminIndex.less'
import Taro from '@tarojs/taro'

export default class AdminIndex extends Component {
  switchAnalytic() {
    Taro.navigateTo({url:'/pages/analytic/analytic'})
  }

  switchBlacklist() {
    Taro.navigateTo({url:'/pages/blacklist/blacklist'})
  }

  switchYearbest() {
    Taro.navigateTo({url:'/pages/yearbest/yearbest'})
  }

  render() {
    return (
      <View className='todo'>
        <AtNoticebar close>2021年度最佳用户评选活动请各位管理员相互协助在2022年2月1日前完成。</AtNoticebar>
        <View className='functions'>
          <AtList>
            <AtListItem title='数据分析' iconInfo={{value: 'analytics', color: 'black'}} onClick={this.switchAnalytic} />
            <AtListItem title='用户管理' iconInfo={{value: 'blocked', color: 'red'}} onClick={this.switchBlacklist} />
            <AtListItem title='年度评选' iconInfo={{value: 'star', color: 'gold'}} onClick={this.switchYearbest} />
            <AtListItem title='管理系统' disabled iconInfo={{value: 'settings', color: 'grey'}} />
          </AtList>
        </View>
      </View>
    )
  }
}
