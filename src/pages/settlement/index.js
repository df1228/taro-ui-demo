import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import logoImg from '../../assets/images/logo_taro.png'
import './index.scss'
import { AtTabBar, AtAvatar } from 'taro-ui'
import util from '../../utils/util'

export default class OrderPage extends Taro.Component {
  config = {
    navigationBarTitleText: '家电售后接单平台'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 2,
      items: [],
      todosCount: 0,
      stype: "",
      pageTitle: ""
    }
  }

  handleClick(value) {
    this.setState({
      current: value
    })

    if (value == 1) {
      // // 跳转到目的页面，打开新页面
      Taro.redirectTo({
        url: '/pages/order/index'
      })
    } else if (value == 2) {
      Taro.redirectTo({
        url: '/pages/profile/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }
  }

  componentWillMount() {
    let info = util.getCookieValueByName("i")
    if (info != "") {
      let userInfo = JSON.parse(window.atob(info))
      console.log(userInfo)
      this.setState({
        userInfo: userInfo
      }, () => {
        console.log("userInfo loaded from cookie is :")
        console.log(this.state.userInfo)
      })
    }

    console.log(this.$router.params)
    this.setState({
      stype: this.$router.params.type
    })
  }

  componentDidMount() {

    Taro.showLoading({
      title: '加载中......'
    })

    console.log(this.state)

    var { stype } = this.state
    var url = "http://api.xsjd123.com/settlements?order=updated_at.desc&user_id=eq." + this.state.userInfo.user_id
    var pageTitle = "所有明细"
    if (stype == "award") {
      url = "http://api.xsjd123.com/settlements?order=updated_at.desc&direction=eq.奖励&user_id=eq." + this.state.userInfo.user_id
      pageTitle = "所有奖励"
    } else if (stype == "fine") {
      url = "http://api.xsjd123.com/settlements?order=updated_at.desc&direction=eq.罚款&user_id=eq." + this.state.userInfo.user_id
      pageTitle = "所有罚款"
    } else if (stype == "income") {
      url = "http://api.xsjd123.com/settlements?order=updated_at.desc&direction=eq.收入&user_id=eq." + this.state.userInfo.user_id
      pageTitle = "所有来自服务单的收入"
    } else if (stype == "frozen") {
      url = "http://api.xsjd123.com/settlements?order=updated_at.desc&direction=eq.收入&state=eq.frozen&user_id=eq." + this.state.userInfo.user_id
      pageTitle = "冻结中"
    } else if (stype == "withdraw") {
      url = "http://api.xsjd123.com/settlements?order=updated_at.desc&direction=eq.%E6%8F%90%E7%8E%B0&user_id=eq." + this.state.userInfo.user_id
      pageTitle = "提现历史"
    } else {
      url = "http://api.xsjd123.com/settlements?order=updated_at.desc&user_id=eq." + this.state.userInfo.user_id
      var pageTitle = "所有明细"
    }

    this.setState({
      pageTitle: pageTitle
    })

    console.log(url)

    Taro.request({
      method: "get",
      url: url
    })
      .then(res => {
        console.log(res.data)
        this.setState({ items: res.data })
        this.setState({ todosCount: "new" })
        Taro.hideLoading()
      })
  }

  // gotoPanel = e => {
  //   const { aftersale_id } = e.currentTarget.dataset
  //   if (aftersale_id != 0) {
  //     Taro.navigateTo({
  //       // url: `/pages/detail/index?id=${id.toLowerCase()}`
  //       url: `/pages/detail/index?id=${aftersale_id.toLowerCase()}`
  //     })
  //   }
  // }

  handleAftersaleLink = e => {
    if (e != 0) {
      var url = "/#/pages/detail/index?id=" + e
      return <a href={url}>&nbsp;&nbsp;来源于服务单#{e}</a>
    }
  }

  handleListTitle = item => {
    if (item.direction == "罚款" || item.direction == "提现") {
      item.amount = -item.amount
    }

    return item.direction + " " + item.amount + " 元"
  }

  render() {
    const { items } = this.state
    const { todosCount } = this.state
    var tabs = [
      { title: '待处理', iconType: 'check-circle', text: todosCount },
      { title: '所有订单', iconType: 'list' },
      { title: '我的', iconType: 'user' }
    ]

    return (
      <View className='page page-index settlements'>
        {/* <View className="avatar">
          <AtAvatar circle size="large" image={this.state.userInfo.headimgurl}></AtAvatar>
        </View> */}
        <View className='page-title'>{this.state.pageTitle}</View>
        <View className='module-list'>
          {items.map((item, index) => (
            <View
              className='module-list__item order'
              key={index}
              data-id={item.id}
              data-aftersale-id={item.aftersale_id}
            >
              <View className='module-list__item-title'>{this.handleListTitle(item)} {this.handleAftersaleLink(item.aftersale_id)}</View>
              <View className='module-list__item-content'>最后更新于 {util.formatDate(item.updated_at, "yyyy-MM-dd hh:mm:ss")}
                <View className="module-list__item-state"> {util.i18n_state(item.state)} </View>
              </View>
            </View>
          ))}

          <AtTabBar
            fixed
            tabList={tabs}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}
          />
        </View>
      </View>
    )
  }
}
