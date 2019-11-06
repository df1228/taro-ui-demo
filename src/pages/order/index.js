import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import logoImg from '../../assets/images/logo_taro.png'
import './index.scss'
import { AtTabBar } from 'taro-ui'
import util from '../../utils/util'

export default class OrderPage extends Taro.Component {
  config = {
    navigationBarTitleText: '家电售后接单平台'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 1,
      orders: [],
      todosCount: 0,
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
      // // 跳转到目的页面，在当前页面打开
      // Taro.redirectTo({
      //   url: '/pages/page/path/name'
      // })
    } else if (value == 2) {
      Taro.redirectTo({
        url: '/pages/profile/index'
      })
    } else {
      Taro.redirectTo({
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
  }

  componentDidMount() {

    Taro.showLoading({
      title: '加载中......'
    })

    Taro.request({
      method: "get",
      url: 'http://api.xsjd123.com/aftersales?order=created_at.desc&user_id=eq.' + this.state.userInfo.user_id
    })
      .then(res => {
        console.log(res.data)
        this.setState({ orders: res.data })
        this.setState({ todosCount: "new" })
        Taro.hideLoading()
      })
  }

  onShareAppMessage() {
    return {
      title: 'Taro UI',
      path: '/pages/index/index',
      imageUrl: 'http://storage.360buyimg.com/mtd/home/share1535013100318.jpg'
    }
  }

  gotoPanel = e => {
    const { id } = e.currentTarget.dataset
    Taro.redirectTo({
      // url: `/pages/panel/index?id=${id.toLowerCase()}`
      url: `/pages/detail/index?id=${id.toLowerCase()}`
    })
  }

  render() {
    const { orders } = this.state
    const { todosCount } = this.state
    var tabs = [
      { title: '待处理', iconType: 'check-circle', text: todosCount },
      { title: '所有订单', iconType: 'list' },
      { title: '我的', iconType: 'user' }
    ]
    return (
      <View className='page page-index'>
        {/* <View className='logo'>
          <Image src={logoImg} className='img' mode='widthFix' />
        </View> */}
        <View className='page-title'>所有订单</View>
        <View className='module-list'>
          {orders.map((item, index) => (
            <View
              className='module-list__item order'
              key={index}
              data-id={item.id}
              data-name={item.customer_name}
              data-list={item.subpages}
              onClick={this.gotoPanel}
            >
              <View className='module-list__item-title'>{item.service_content}</View>
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
