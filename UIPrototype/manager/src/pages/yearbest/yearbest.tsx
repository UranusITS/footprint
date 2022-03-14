import { Component } from 'react'
import { View } from '@tarojs/components'
import { AtButton, AtNavBar, AtRadio } from 'taro-ui'
import './yearbest.less'

export default class Yearbest extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
  }
  handleChange(value) {
    this.setState({ value })
  }
  render() {
    let button;
    if (this.state.value=='')
      button=<AtButton full disabled type='primary'>提交</AtButton>
    else
      button=<AtButton full type='primary'>提交</AtButton>
    return (
      <View className='yearbest'>
        <AtNavBar title='年度评选' />
        <AtRadio
          options={[
            { label: 'Mars', value: 'user1', desc: '记录距离最长 Top1' },
            { label: 'Mercury', value: 'user2', desc: '分享次数最多 Top2' },
            { label: 'Pluto', value: 'user3' }
          ]}
          value={this.state.value}
          onClick={this.handleChange.bind(this)}
        />
        <View className='submit'>
          {button}
        </View>
      </View>
    )
  }
}
