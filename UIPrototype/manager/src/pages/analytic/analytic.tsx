import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtList, AtListItem } from 'taro-ui'
import './analytic.less'

export default class Analytic extends Component {
  render () {
    return (
      <View className='analytic'>
        <AtNavBar title='数据分析' />
        <View className='analyticTitle'>
          <Text>去年记录距离最长用户</Text>
        </View>
        <AtList>
          <AtListItem title='Top1 Mars' extraText='xx km' thumb='https://avatars.githubusercontent.com/u/38391284' />
          <AtListItem title='Top2 Mercury' extraText='xx km' thumb='https://avatars.githubusercontent.com/u/38391284' />
          <AtListItem title='Top3 Pluto' extraText='xx km' thumb='https://avatars.githubusercontent.com/u/38391284' />
        </AtList>
        <View className='analyticTitle'>
          <Text>去年分享次数最多用户</Text>
        </View>
        <AtList>
          <AtListItem title='Top1 Mars' extraText='xx 次' thumb='https://avatars.githubusercontent.com/u/38391284' />
          <AtListItem title='Top2 Mercury' extraText='xx 次' thumb='https://avatars.githubusercontent.com/u/38391284' />
          <AtListItem title='Top3 Pluto' extraText='xx 次' thumb='https://avatars.githubusercontent.com/u/38391284' />
        </AtList>
      </View>
    )
  }
}
