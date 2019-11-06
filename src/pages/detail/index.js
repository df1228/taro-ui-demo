import Taro, { useCallback } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import './index.scss'

import {
  AtTabBar,
  AtButton
} from 'taro-ui'

import util from '../../utils/util'

export default class DetailPage extends Taro.Component {
  config = {
    navigationBarTitleText: '家电售后接单平台'
  }

  constructor() {
    super(...arguments)

    this.state = {
      id: 0,
      current: 0,
      userInfo: null,
      item: {
        "created_at": "2019-10-09T06:03:07.625808+00:00",
        "updated_at": "2019-10-09T06:03:07.625808+00:00",
        "customer_name": "客户姓名",
        "customer_phone": "客户手机号",
        "customer_address": "客户地址",
        "service_type": "服务类型",
        "service_content": "服务内容",
        "reserved_service_time": "",
        "source": "海尔",
        "remark": "",
        "user_id": null,
        "created_by": "1",
        "updated_by": "",
        "state": "created"
      },
      error: false,
    }
  }

  componentWillMount() {
    let info = util.getCookieValueByName("i")
    if (info != "") {
      let userInfo = JSON.parse(window.atob(info))
      console.log(userInfo)
      console.log("before set state")
      this.setState((state) => {
        return { userInfo: userInfo }
      }, () => {
        console.log("cookie loaded")
        console.log(this.state.userInfo)
      })
    }
    console.log("userInfo in Index page")
    console.log(this.state.userInfo)

    console.log(this.$router.params)
    this.setState({
      id: this.$router.params.id
    })

    Taro.showLoading({
      title: '加载中......'
    })
      .then(res => console.log(res))


  }

  componentDidMount() {
    let url = "http://api.xsjd123.com/aftersales?id=eq." + this.$router.params.id
    console.log(url)
    Taro.request({
      method: "get",
      url: url
    })
      .then(res => {
        console.log(res.data)
        this.setState({ item: res.data[0] })
        // in js 2 == "2" true
        // if (this.state.item.user_id != this.state.userInfo.user_id) {
        console.log(res.data.length == 0)
        if (res.data.length == 0 || res.data[0].user_id != this.state.userInfo.user_id) {
          this.setState({
            error: true
          })
        }

        Taro.hideLoading()
      })
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

  handleReserve() {
    Taro.navigateTo({
      url: '/pages/reserve/index?id=' + this.state.id
    })
  }

  handleComplete() {
    Taro.navigateTo({
      url: '/pages/complete/index?id=' + this.state.id
    })
  }

  render() {
    const { item } = this.state
    let { error } = this.state
    let status = error ? "" : item.state
    let btn = null
    if (status == "scheduled") {
      btn = <AtButton type='secondary' size='normal' onClick={this.handleReserve.bind(this)}>填写预约时间</AtButton>
    } else if (status == "processing") {
      btn = <AtButton type='secondary' size='normal' onClick={this.handleComplete.bind(this)}>拍照上传、确认服务完成</AtButton>
    } else if (status == "processed") {
      btn = ""
    } else {
      btn = ""
    }

    var tabs = [
      { title: '待处理', iconType: 'check-circle' },
      { title: '所有订单', iconType: 'list' },
      { title: '我的', iconType: 'user' }
    ]
    return (
      <View className='page'>
        {
          !error &&
          <View className='doc-body'>
            <View className='at-article'>
              <View className='at-article__h1'>{item.service_content}</View>
              <View className='at-article__info'>{util.formatDate(item.created_at, "yyyy-MM-dd hh:mm:ss")}&nbsp;&nbsp;&nbsp; {item.service_type}</View>
              <View className='at-article__content'>

                <View className='at-article__section'>
                  <View className='at-article__h3'>客户姓名</View>
                  <View className='at-article__p'>
                    {item.customer_name}
                  </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>客户电话</View>
                  <View className='at-article__p'>
                    {item.customer_phone}
                  </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>客户地址</View>
                  <View className='at-article__p'>
                    {item.customer_address}
                  </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>服务内容</View>
                  <View className='at-article__p'>
                    {item.service_content}
                  </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>来源</View>
                  <View className='at-article__p'>
                    {item.source}
                  </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>品牌</View>
                  <View className='at-article__p'>
                    {item.brand}
                  </View>
                </View>


                <View className='at-article__section'>
                  <View className='at-article__h3'>信息员备注</View>
                  <View className='at-article__p'>
                    {item.remark}
                  </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>费用</View>
                  <View className='at-article__p'>
                    {item.fee}
                  </View>
                </View>


                <View className='at-article__section'>
                  <View className='at-article__h3'>预约时间</View>
                  <View className='at-article__p'>
                    暂无
                </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>订单创建时间</View>
                  <View className='at-article__p'>
                    {util.formatDate(item.created_at, "yyyy-MM-dd hh:mm:ss")}
                  </View>
                </View>

                <View className='at-article__section'>
                  <View className='at-article__h3'>订单最后更新时间</View>
                  <View className='at-article__p'>
                    {util.formatDate(item.updated_at, "yyyy-MM-dd hh:mm:ss")}
                  </View>
                </View>

                <View className='at-article__section order-state'>
                  <View className='at-article__h3'>当前状态</View>
                  <View className='at-article__p' style="color: red">
                    {util.i18n_state1(item.state)}
                  </View>
                </View>

                <View className='at-article__section bottom-button'>
                  {btn}
                </View>

              </View>
            </View>
          </View>
        }

        {error && <View>你无权限查看此服务单（可能该服务单不存在，也可能因为你超时未响应分配给其他人了)</View>}

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
