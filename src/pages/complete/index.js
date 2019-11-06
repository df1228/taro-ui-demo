import Taro from '@tarojs/taro'
import { View, Text, Button, Input } from '@tarojs/components'
import { AtButton, AtImagePicker } from 'taro-ui'
import DocsHeader from '../components/doc-header'
import './index.scss'


export default class CompletePage extends Taro.Component {
  config = {
    navigationBarTitleText: '确定服务完成'
  }

  constructor() {
    super(...arguments)
    this.state = {
      files: []
    }
  }

  onChange(files) {
    this.setState({
      files
    })
  }
  onFail(mes) {
    console.log(mes)
  }
  onImageClick(index, file) {
    console.log(index, file)
  }

  componentWillMount() {
    console.log(this.$router.params)
    this.setState({
      id: this.$router.params.id
    })
  }

  handleSubmit() {

    const { files } = this.state
    if (files.length > 0) {
      // const rootUrl = get('rootUrl') // 服务器地址
      // const cookieData = Taro.getStorageSync('token')  // 图片上传需要单独写入token
      const rootUrl = "http://xsjd123.com/admin/upload"
      this.uploadLoader({ rootUrl, path: files })
    } else {
      Taro.showToast({
        title: '请先点击+号选择图片',
        icon: 'none',
        duration: 2000
      })
    }


    console.log(this.state.reserved_service_time)
    // Taro.showLoading({
    //   title: '提交中'
    // })

    console.log(this.state.files)

    // let url = "http://api.xsjd123.com/aftersales?id=eq." + this.state.id
    // let data = {
    //   state: "processed"
    // }
    // fetch(url, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then((res) => {
    //     console.log(res)
    //     if (res.ok && res.status == 204) {
    //       Taro.hideLoading()
    //       Taro.redirectTo({
    //         url: '/'
    //       })
    //     }
    //   })
  }

  // 上传组件
  uploadLoader = (data) => {
    let that = this
    let i = data.i ? data.i : 0 // 当前所上传的图片位置
    let success = data.success ? data.success : 0//上传成功的个数
    let fail = data.fail ? data.fail : 0;//上传失败的个数
    Taro.showLoading({
      title: `正在上传第${i + 1}张`
    })
    //发起上传
    Taro.uploadFile({
      url: data.rootUrl + '/app/index/uploadFile',
      header: {
        'content-type': 'multipart/form-data',
        'cookie': 'token=' + data.cookieData // 上传需要单独处理cookie
      },
      name: 'file',
      filePath: data.path[i].url,
      success: (resp) => {
        //图片上传成功，图片上传成功的变量+1
        let resultData = JSON.parse(resp.data)
        if (resultData.code === "0") {
          success++;
          this.setState((prevState) => {
            let oldUpload = prevState.upLoadImg
            oldUpload.push(resultData.data)
            return ({
              upLoadImg: oldUpload
            })
          }, () => {
            // setSate会合并所有的setState操作，所以在这里等待图片传完之后再调用设置url方法
            /*
            * 该处十分重要
            **/
            //this.setFatherUploadSrc()// 设置数据图片地址字段
          })
        } else {
          fail++;
        }
      },
      fail: () => {
        fail++;//图片上传失败，图片上传失败的变量+1
      },
      complete: () => {
        Taro.hideLoading()
        i++;//这个图片执行完上传后，开始上传下一张
        if (i == data.path.length) {   //当图片传完时，停止调用
          Taro.showToast({
            title: '上传成功',
            icon: 'success',
            duration: 2000
          })
          console.log('成功：' + success + " 失败：" + fail);
        } else {//若图片还没有传完，则继续调用函数
          data.i = i;
          data.success = success;
          data.fail = fail;
          that.uploadLoader(data);
        }
      }
    })
  }

  render() {
    return (
      <View className='page'>
        <DocsHeader title='确认服务完成' desc='在图片上传功能完成之前，请拍照后在微信上发给客服审核， 发了之后，点确认按钮'></DocsHeader>

        <View className='doc-body'>
          <View className='panel'>

            <AtImagePicker
              mode='top'
              files={this.state.files}
              onChange={this.onChange.bind(this)}
              onFail={this.onFail.bind(this)}
              onImageClick={this.onImageClick.bind(this)}
            />

            <View className='example-form'>
              <AtButton type='primary' size='normal' onClick={this.handleSubmit.bind(this)}>确认</AtButton>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
