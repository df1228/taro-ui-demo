import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index/index'
import util from './utils/util'

import './app.scss'

class App extends Component {
  config = {
    pages: [
      'pages/index/index',
      'pages/basic/index',
      'pages/view/index',
      'pages/view/article/index',
      'pages/feedback/index',
      'pages/data-entry/index',
      'pages/layout/index',
      'pages/navigation/index',
      'pages/navigation/indexes/index',
      'pages/advanced/index',
      'pages/order/index',
      'pages/detail/index',
      'pages/bindPhone/index',
      'pages/reserve/index',
      'pages/complete/index',
      'pages/complete/success',
      'pages/profile/index',
      'pages/settlement/index',
      'pages/settlement/withdraw',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  constructor() {
    super(...arguments)
    this.state = {
      userInfo: {}
    }
  }

  componentWillMount() {
    let userInfo = {}
    let info = util.getCookieValueByName("i")
    if (info != "") {
      userInfo = JSON.parse(window.atob(info))
      console.log(userInfo)
      this.setState({
        userInfo: userInfo
      }, () => {
        console.log(this.state.userInfo)
      })
    }
  }

  componentDidMount() {
    console.log(this.state.userInfo.user_id == undefined)
    if (this.state.userInfo.user_id == undefined) {
      console.log("if unanthenticated and not in bindPhone page, redirect to auth")
      console.log(window.location.hash)
      if (window.location.hash != "#/pages/bindPhone/index") {
        window.location.href = "http://wx.xsjd123.com/auth"
      }
    }
  }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  render() {
    return <Index />
  }
}

Taro.render(<App />, document.getElementById('app'))
