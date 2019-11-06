import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import logoImg from '../../assets/images/logo_taro.png'
import './index.scss'
import { AtTabBar } from 'taro-ui'

export default class OrderPage extends Taro.Component {
  config = {
    navigationBarTitleText: 'Taro UI'
  }

  constructor() {
    super(...arguments)

    this.state = {
      current: 1,
      list: [
        {
          id: 'Basic',
          title: '基础',
          content: '按钮组件',
        },
        {
          id: 'View',
          title: '视图',
          content: '通告栏等8个组件',
        },
        {
          id: 'Feedback',
          title: '操作反馈',
          content: '对话框等7个组件',
        },
        {
          id: 'Data-entry',
          title: '数据录入',
          content: '输入框等13个组件',
        },
        {
          id: 'Layout',
          title: '布局',
          content: '列表等6个组件',
        },
        {
          id: 'Navigation',
          title: '导航',
          content: '标签栏等7个组件',
        }, {
          id: 'Advanced',
          title: '高阶',
          content: '日历组件',
        }
      ]
    }
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
      url: `/pages/${id.toLowerCase()}/index`
    })
  }

  render() {
    const { list } = this.state

    return (
      <View className='page page-index'>
        <View className='logo'>
          <Image src={logoImg} className='img' mode='widthFix' />
        </View>
        <View className='page-title'>Taro UI</View>
        <View className='module-list'>
          {list.map((item, index) => (
            <View
              className='module-list__item'
              key={index}
              data-id={item.id}
              data-name={item.title}
              data-list={item.subpages}
              onClick={this.gotoPanel}
            >
              <View className='module-list__item-title'>{item.title}</View>
              <View className='module-list__item-content'>{item.content}</View>
            </View>
          ))}

          <AtTabBar
            fixed
            tabList={[
              { title: '待处理', iconType: 'bullet-list' },
              { title: '所有订单', iconType: 'list' },
              { title: '我的', iconType: 'folder' }
            ]}
            onClick={this.handleClick.bind(this)}
            current={this.state.current}
          />
        </View>
      </View>
    )
  }
}
