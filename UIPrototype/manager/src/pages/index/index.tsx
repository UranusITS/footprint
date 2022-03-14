import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtNavBar, AtTabBar } from 'taro-ui'
import AdminIndex from '../component/adminIndex'
import Todo from '../component/todo'
import Profile from '../component/profile'
import './index.less'

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {pageCur: 0};
  }

  switchPage(pagePos) {
    this.setState({pageCur: pagePos})
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    let content;
    if (this.state.pageCur==0) {
      content = <AdminIndex />
    }
    else if (this.state.pageCur==1) {
      content = <Todo />
    }
    else if (this.state.pageCur==2) {
      content = <Profile adminName='Uranus' adminAvatar="https://avatars.githubusercontent.com/u/38391284"/>
    }
    return (
      <View className='index'>
        <AtNavBar title='后台管理' />
        <View className='content'>
          {content}
        </View>
        <AtTabBar
          fixed
          tabList={[
            { title: '主页', iconType:'home' },
            { title: '待办事项', iconType:'list' },
            { title: '个人信息', iconType:'user' }
          ]}
          onClick={this.switchPage.bind(this)}
          current={this.state.pageCur}
        />
      </View>
    )
  }
}
