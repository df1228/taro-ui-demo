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
} from 'taro-ui'
import DocsHeader from '../components/doc-header'
import NavigatorBtn from '../components/navigator-btn'
import './index.scss'

import curtainPng from '../../assets/images/curtain.png'


import { AtTabBar } from 'taro-ui'

export default class ProfilePage extends Taro.Component {
  config = {
    navigationBarTitleText: 'Taro UI'
  }

  constructor() {
    super(...arguments)
    this.state = {
      current: 2,

      isCurtainOpened: false,
      loadMoreStatus: 'more',
      stepsCurrent1: 0,
      stepsCurrent2: 0,
      stepsCurrent3: 0,
      stepsCurrent4: 1,
      imgUrls: [
        'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
        'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180'
      ],
      hollowTagList: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      solidTagList: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      hollowTagList2: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
      solidTagList2: [
        { name: '标签1', active: false },
        { name: '标签2', active: false },
        { name: '标签3', active: true },
        { name: '标签4', active: true }
      ],
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

  handleCurtainClick(flag) {
    this.setState({
      isCurtainOpened: flag,
    })
  }

  handleLoadMoreClick() {
    this.setState({
      loadMoreStatus: 'loading'
    })
    setTimeout(() => {
      this.setState({
        loadMoreStatus: 'noMore'
      })
    }, 2000)
  }

  handleStepsChange(stateName, current) {
    this.setState({
      [stateName]: current
    })
  }

  handleHollowClick(data) {
    const { hollowTagList } = this.state
    const findIndex = hollowTagList.findIndex(item => item.name === data.name)

    hollowTagList[findIndex].active = !hollowTagList[findIndex].active
    this.setState({ hollowTagList })
  }

  handleSolidClick(data) {
    const { solidTagList } = this.state
    const findIndex = solidTagList.findIndex(item => item.name === data.name)

    solidTagList[findIndex].active = !solidTagList[findIndex].active
    this.setState({ solidTagList })
  }

  handleHollowSmallClick(data) {
    const { hollowTagList2 } = this.state
    const findIndex = hollowTagList2.findIndex(item => item.name === data.name)

    hollowTagList2[findIndex].active = !hollowTagList2[findIndex].active
    this.setState({ hollowTagList2 })
  }

  handleSolidSmallClick(data) {
    const { solidTagList2 } = this.state
    const findIndex = solidTagList2.findIndex(item => item.name === data.name)

    solidTagList2[findIndex].active = !solidTagList2[findIndex].active
    this.setState({ solidTagList2 })
  }

  render() {
    const { isCurtainOpened, loadMoreStatus } = this.state
    const avatarImg = 'http://storage.360buyimg.com/mtd/home/32443566_635798770100444_2113947400891531264_n1533825816008.jpg'
    const dot = '···'

    return (
      <View className='page'>
        <DocsHeader title='结算'></DocsHeader>

        {/* Divider */}
        <View className='panel'>
          <View className='panel__content'>
            {/* 一般用法 */}
            <View className='example-item'>
              <AtDivider content='开发中' />
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
