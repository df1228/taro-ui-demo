import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import {
  AtAvatar,
  AtBadge,
  AtButton,
  AtCountdown,
  AtCurtain,
  AtDivider,
  AtLoadMore,
  AtNoticebar,
  AtSteps,
  AtTag,
  AtTimeline,
  AtList,
  AtListItem,
  AtTabBar,
} from 'taro-ui'
import util from '../../utils/util'
import DocsHeader from '../components/doc-header'
import NavigatorBtn from '../components/navigator-btn'
import './index.scss'

import curtainPng from '../../assets/images/curtain.png'

export default class ProfilePage extends Taro.Component {
  config = {
    navigationBarTitleText: '家电售后接单平台'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 2,
      item: {},
      loading: true,
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
      title: '加载中'
    })

    console.log(this.state)
    var url = "http://api.xsjd123.com/balances?user_id=eq." + this.state.userInfo.user_id
    console.log(url)


    Taro.request({
      method: "get",
      url: url
    })
      .then(res => {
        console.log("fuck")
        console.log(res.data[0])
        this.setState({ item: res.data[0] })
        Taro.hideLoading()


        console.log(this.state.item)
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


  handleWithdrawClick(data) {
    Taro.redirectTo({
      url: "/pages/settlement/withdraw"
    })
  }

  handleSettlementsClick(data) {
    Taro.redirectTo({
      url: "/pages/settlement/index"
    })
  }

  handleFrozenClick(data) {
    Taro.redirectTo({
      url: "/pages/settlement/index?type=frozen"
    })
  }

  handleWithdrawHistoryClick(data) {
    Taro.redirectTo({
      url: "/pages/settlement/index?type=withdraw"
    })
  }

  handleAwardsClick(data) {
    Taro.redirectTo({
      url: "/pages/settlement/index?type=award"
    })
  }
  handleIncomesClick(data) {
    Taro.redirectTo({
      url: "/pages/settlement/index?type=income"
    })
  }
  handleFinesClick(data) {
    Taro.redirectTo({
      url: "/pages/settlement/index?type=fine"
    })
  }

  handleAmount(d) {
    if (d == 0) {
      return "0 元"
    } else {
      return d + " 元"
    }
  }

  render() {
    const { item } = this.state

    return (
      <View className='page page-index profile'>

        <View className="avatar">
          <AtAvatar circle size="large" image={this.state.userInfo.headimgurl}></AtAvatar>
        </View>

        {/* <View className='logo'>
          <Image src='https://jdc.jd.com/img/200' className='img' mode='widthFix' />
        </View> */}

        <AtList>
          <AtListItem title='剩余可提现' extraText={this.handleAmount(item.free_amount)} arrow='right' onClick={this.handleWithdrawClick.bind(this)} />
          <AtListItem title='冻结中' extraText={this.handleAmount(item.frozen_amount)} arrow='right' onClick={this.handleFrozenClick.bind(this)} />
          <AtListItem title='已提现' extraText={this.handleAmount(item.withdraw_amount)} arrow='right' onClick={this.handleWithdrawHistoryClick.bind(this)} />
          <AtListItem title='奖励' extraText={this.handleAmount(item.award_amount)} arrow='right' onClick={this.handleAwardsClick.bind(this)} />
          <AtListItem title='罚款' extraText={this.handleAmount(item.fine_amount)} arrow='right' onClick={this.handleFinesClick.bind(this)} />
          <AtListItem title='历史总收入' extraText={this.handleAmount(item.total_amount)} arrow='right' onClick={this.handleIncomesClick.bind(this)} />
          <AtListItem title='所有结算明细' arrow='right' onClick={this.handleSettlementsClick.bind(this)} />
        </AtList>

        <View className='at-article__content remark'>
          <View className='at-article__section'>
            <View className='at-article__p'>
              每完成一笔服务单之后，通过审核之后, 该服务单的服务费用会自动转入冻结期，冻结期过后，会自动解冻，即可提现。
            </View>
            <View className='at-article__p'>
              历史总收入 不一定等于  冻结中 + 剩余可提现 - 已提现 （在没有奖励和罚款的情况下是相等的）
            </View>
            <View className='at-article__p'>
              剩余可提现 = 历史总收入 + 奖励 - 已提现  - 罚款
            </View>
          </View>
        </View>

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
      </View >
    )
  }
}
