import Taro from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import DocsHeader from '../components/doc-header'
import './index.scss'

export default class BindPhonePage extends Taro.Component {
  config = {
    navigationBarTitleText: '绑定手机号'
  }

  constructor() {
    super(...arguments)
    this.state = {
      mobile: ""
    }
  }

  handleMobileChange(e) {
    // console.log(e.target.value)
    this.setState({
      mobile: e.target.value
    })
  }

  // get cookie value by name
  getCookieValue(a) {
    var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
  }

  handleSubmit() {
    console.log(this.state.mobile)
    console.log(this.getCookieValue("u"))
    Taro.showLoading({
      title: '提交中'
    })
    let url = "http://wx.xsjd123.com/bindPhone"
    let data = {
      mobile_phone: this.state.mobile,
      cookie: this.getCookieValue("u")
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then((res) => { return res.json() })
      .then(data => {
        console.log(data)
        Taro.hideLoading()
        if (data.status == "ok") {
          window.location.href = "http://mp.xsjd123.com"
        }
      })
  }
  render() {
    return (
      <View className='page'>
        <DocsHeader title='绑定手机号' desc='请你绑定申请时填写的手机号'></DocsHeader>

        <View className='doc-body'>
          <View className='panel'>
            {/* <View className='panel__title'>ActionSheet 动作面板</View> */}
            <View className='panel__content'>
              <View className='example-form'>
                <Input type='number' placeholder='手机号' maxLength='11' focus onChange={this.handleMobileChange.bind(this)} />

                <AtButton type='primary' size='normal' disabled={this.state.mobile.length != 11} onClick={this.handleSubmit.bind(this)}>绑定</AtButton>
              </View>
            </View>
          </View>
        </View>
      </View >
    )
  }
}
