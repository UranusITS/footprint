import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtNavBar, AtList, AtListItem } from 'taro-ui'
import './blacklist.less'

export default class Blacklist extends Component {
  render () {
    return (
      <View className='blacklist'>
        <AtNavBar title='用户管理' />
        <AtList>
          <AtListItem title='Mars' isSwitch switchColor='red' thumb='https://avatars.githubusercontent.com/u/38391284' />
          <AtListItem title='Mercury' isSwitch switchColor='red' thumb='https://avatars.githubusercontent.com/u/38391284' />
          <AtListItem title='Pluto' isSwitch switchColor='red' thumb='https://avatars.githubusercontent.com/u/38391284' />
        </AtList>
      </View>
    )
  }
}
