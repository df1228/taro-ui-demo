import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import DocsHeader from '../components/doc-header'
import './index.scss'


export default class CompleteSuccessPage extends Taro.Component {
  config = {
    navigationBarTitleText: '确定服务完成'
  }

  constructor() {
    super(...arguments)
    this.state = {
      count: 5
    }
  }

  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      id: this.$router.params.id
    })

  }

  counter() {
    var c = this.state.count
    this.setState({
      count: c - 1
    })
  }

  componentDidMount() {
    // setInterval(this.counter.bind(this), 1000)

    // setTimeout(function () {
    //   // clearInterval(this.counter)
    //   Taro.redirectTo({
    //     url: `/`
    //   })
    // }, 5000)
  }

  handleSubmit() {
    Taro.redirectTo({
      url: `/`
    })
  }

  render() {
    var { count } = this.state
    var text = "操作成功，即将为你跳转，倒计时 " + count + " 秒 ....."

    return (
      <View className='page'>
        <DocsHeader title='操作成功' desc={text}></DocsHeader>

        <View className='doc-body'>
          <View className='panel'>

            <View className='example-form'>
              <AtButton type='primary' size='normal' onClick={this.handleSubmit.bind(this)}>立即跳转</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
