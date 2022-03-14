import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtList, AtListItem } from 'taro-ui'
import './todo.less'

export default class Todo extends Component {
  render () {
    return (
      <View className='todo'>
        <AtList>
          <AtListItem title='2021年第4季度用户信息备份' note='Due: 2022/01/10' arrow='right' iconInfo={{value: 'alert-circle', color: 'cornflowerblue'}} />
          <AtListItem title='2021年11月份刷步用户的处理' note='Due: 2022/01/15' arrow='right' iconInfo={{value: 'alert-circle', color: 'red'}} />
          <AtListItem title='2022年第1季度开发组会议报告提交' note='Due: 2022/01/20' arrow='right' iconInfo={{value: 'alert-circle', color: 'cornflowerblue'}} />
          <AtListItem title='2021年度最佳用户评选' note='Due: 2022/02/01' arrow='right' iconInfo={{value: 'alert-circle', color: 'red'}} />
        </AtList>
      </View>
    )
  }
}
