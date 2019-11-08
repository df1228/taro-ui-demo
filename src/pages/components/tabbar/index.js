import Taro, { Component } from '@tarojs/taro'
import {
  AtTabBar,
} from 'taro-ui'
import PropTypes from 'prop-types'
import { View } from '@tarojs/components'

export default class TabBar extends Component {

  constructor() {
    super(...arguments)
    this.state = {}
  }

  handleClick(value) {
    this.setState({
      current: value
    })

    if (value == 1) {
      // 跳转到目的页面，打开新页面
      Taro.redirectTo({
        url: '/pages/order/index'
      })
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

  render() {
    const { current } = this.props || this.state

    return (

      <AtTabBar
        fixed
        tabList={[
          { title: '待处理', iconType: 'check-circle' },
          { title: '所有订单', iconType: 'list' },
          { title: '我的', iconType: 'user' }
        ]}
        onClick={this.handleClick.bind(this)}
        current={current}
      />

    )
  }
}

TabBar.defaultProps = {
  current: 0,
}

TabBar.propTypes = {
  title: PropTypes.number,
}

