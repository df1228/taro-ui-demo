import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import logoImg from '../../assets/images/logo_taro.png'
import './index.scss'
import { AtTabBar } from 'taro-ui'

export default class Index extends Taro.Component {
  config = {
    navigationBarTitleText: 'Taro UI'
  }

  constructor() {
    super(...arguments)
    let orders = null
    this.state = {
      current: 0,
      orders: []
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
        url: '/pages/view/index'
      })
    } else {
      Taro.navigateTo({
        url: '/pages/index/index'
      })
    }
  }

  componentDidMount() {
    Taro.request({
      method: "get",
      url: 'https://api.xsjd123.com/after_sales?order=created_at.desc'
    })
      .then(res => {
        console.log(res.data)
        this.setState({ orders: res.data })
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
    Taro.navigateTo({
      // url: `/pages/panel/index?id=${id.toLowerCase()}`
      url: `/pages/detail/index?id=${id.toLowerCase()}`
    })
  }

  render() {
    const { orders } = this.state

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
              <View className='module-list__item-content'>{item.created_at}
                <View className="module-list__item-state"> {item.state} </View>
              </View>
            </View>
          ))}

          <AtTabBar
            fixed
            tabList={[
              { title: '待办事项', iconType: 'bullet-list', text: 'new' },
              { title: '所有订单', iconType: 'list' },
              { title: '我的', iconType: 'folder', text: '100', max: '99' }
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}
          />
        </View>
      </View>
    )
  }
}
