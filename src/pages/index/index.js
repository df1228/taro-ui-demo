import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import logoImg from '../../assets/images/logo_taro.png'
import './index.scss'
import { AtTabBar } from 'taro-ui'
import util from '../../utils/util'
import TabBar from '../components/tabbar'

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: '家电售后接单平台'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 0,
      userInfo: null,
      orders: [],
      todosCount: 0,
      loading: true,
    }
  }

  componentWillMount() {
    if (process.env.TARO_ENV === 'h5') {
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
    }
  }

  componentDidMount() {
    if (process.env.TARO_ENV === 'h5') {
      Taro.showLoading({
        title: '加载中......'
      })

      Taro.request({
        method: "get",
        url: 'http://api.xsjd123.com/aftersales?order=created_at.desc&state=in.(scheduled,processing)&user_id=eq.' + this.state.userInfo.user_id
      })
        .then(res => {
          console.log(res.data)
          this.setState({ orders: res.data })
          this.setState({ todosCount: res.data.length })

          Taro.hideLoading()
          this.setState({
            loading: false
          })
        })
    }
  }

  gotoPanel = e => {
    const { id } = e.currentTarget.dataset
    Taro.navigateTo({
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
        <View className='page-title'>待处理</View>
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

          {
            !this.state.loading && orders.length <= 0 && <View>暂无</View>
          }

          <TabBar current={0} ></TabBar>

        </View>
      </View >
    )
  }
}
