import Taro from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import DocsHeader from '../components/doc-header'
import './index.scss'
// import { Picker } from '@tarojs/components'

export default class ReservePage extends Taro.Component {
  config = {
    navigationBarTitleText: '确定预约时间'
  }

  constructor() {
    super(...arguments)
    this.state = {
      id: "",
      reserved_service_time: ""
    }
  }

  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      id: this.$router.params.id
    })
  }

  handleChange(e) {
    // console.log(e.target.value)
    this.setState({
      reserved_service_time: e.target.value
    })
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
    return (
      <View className='page'>
        <DocsHeader title='确认时间' desc='请你填写和客户预约的具体时间 如 10-09 下午2点'></DocsHeader>

        <View className='doc-body'>
          <View className='panel'>
            {/* <View className='panel__title'>ActionSheet 动作面板</View> */}
            <View className='example-form'>
              <Input type='text' placeholder='时间' maxLength='30' focus onChange={this.handleChange.bind(this)} />
              <AtButton type='primary' size='normal' disabled={this.state.reserved_service_time.length == 0} onClick={this.handleSubmit.bind(this)}>确认</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
