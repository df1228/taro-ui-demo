import Taro from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import DocsHeader from '../components/doc-header'
import './index.scss'
import {
  AtButton,
  AtTabBar,
} from 'taro-ui'

export default class ReservePage extends Taro.Component {
  config = {
    navigationBarTitleText: '确定预约时间'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 2,
    }
  }

  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      id: this.$router.params.id
    })
  }

  handleChange(e) {
  }

  handleClick(value) {
    this.setState({
      current: value
    })

    if (value == 1) {
      // // 跳转到目的页面，打开新页面
      Taro.navigateTo({
        url: '/pages/order/index'
      })
      // // 跳转到目的页面，在当前页面打开
      // Taro.redirectTo({
      //   url: '/pages/page/path/name'
      // })
    } else if (value == 2) {
      Taro.navigateTo({
        url: '/pages/profile/index'
      })
    } else {
      Taro.navigateTo({
        url: '/'
      })
    }
  }

  handleSubmit() {
    console.log(this.state.reserved_service_time)
    Taro.showLoading({
      title: '提交中......'
    })

    let url = "http://api.xsjd123.com/aftersales?id=eq." + this.state.id
    let data = {
      reserved_service_time: this.state.reserved_service_time,
      state: "processing"
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
            url: "/pages/order/index?id=" + this.state.id
          })
        }
      })
  }

  render() {

    var tabs = [
      { title: '待处理', iconType: 'check-circle' },
      { title: '所有订单', iconType: 'list' },
      { title: '我的', iconType: 'user' }
    ]

    return (
      <View className='page page-index settlements'>

        提现功能正在开发中 ......
        {/* <DocsHeader title='提现' desc='可提现额度: 1000元'></DocsHeader>

        <View className='doc-body'>
          <View className='panel'>
            <View className='example-form'>
              <Input type='text' placeholder='时间' maxLength='30' focus onChange={this.handleChange.bind(this)} />
              <AtButton type='primary' size='normal' disabled={this.state.reserved_service_time.length == 0} onClick={this.handleSubmit.bind(this)}>确认</AtButton>
            </View>
          </View>
        </View> */}


        <AtTabBar
          fixed
          tabList={tabs}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />
      </View>
    )
  }
}
