import Taro from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import DocsHeader from '../components/doc-header'
import './index.scss'
// import { Picker } from '@tarojs/components'

export default class CompletePage extends Taro.Component {
  config = {
    navigationBarTitleText: '确定服务完成'
  }

  constructor() {
    super(...arguments)
    this.state = {}
  }

  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      id: this.$router.params.id
    })
  }

  handleSubmit() {
    console.log(this.state.reserved_service_time)
    Taro.showLoading({
      title: '提交中'
    })

    let url = "http://api.xsjd123.com/aftersales?id=eq." + this.state.id
    let data = {
      state: "processed"
    }
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => {
        console.log(res)
        if (res.ok && res.status == 204) {
          Taro.hideLoading()
          Taro.redirectTo({
            url: '/'
          })
        }
      })
  }
  render() {
    return (
      <View className='page'>
        <DocsHeader title='确认服务完成' desc='在图片上传功能完成之前，请拍照后在微信上发给客服审核， 发了之后，点确认按钮'></DocsHeader>

        <View className='doc-body'>
          <View className='panel'>
            {/* <View className='panel__title'>ActionSheet 动作面板</View> */}
            <View className='example-form'>
              <AtButton type='primary' size='normal' onClick={this.handleSubmit.bind(this)}>确认</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
