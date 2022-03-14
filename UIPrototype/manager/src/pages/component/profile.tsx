import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtAvatar, AtList, AtListItem } from 'taro-ui'
import PropTypes from 'prop-types'
import './profile.less'

export default class Profile extends Component {
  static propTypes = {
    adminName: PropTypes.string.isRequired,
    adminAvatar: PropTypes.string.isRequired
  }

  render () {
    return (
      <View className='profile'>
        <View className='avatar'>
          <View id='adminAvatar' style='display:inline-block'>
            <AtAvatar circle image={this.props.adminAvatar} />
          </View>
          <View id='adminText' style='display:inline-block'>
            <Text id='adminName'>{this.props.adminName}</Text>
            <Text id='adminGroup'>管理员</Text>
          </View>
        </View>
        <View className='functions'>
          <AtList>
            <AtListItem title='修改个人信息' iconInfo={{value: 'edit', color: 'grey'}} />
            <AtListItem title='退出登录' iconInfo={{value: 'close-circle', color: 'red'}} />
          </AtList>
        </View>
      </View>
    )
  }
}
