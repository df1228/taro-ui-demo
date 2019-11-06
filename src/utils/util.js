// 用在列表页
function i18n_state(state) {
  switch (state) {
    case "scheduled":
      return "已指派"
    case "overdue":
      return "已超时"
    case "processing":
      return "待处理"
    case "processed":
      return "待审核"
    case "audited":
      return "已审核"
    case "frozen":
      return "已冻结"
    case "completed":
      return "已解冻"
    default:
      return state;
    // break;
  }
}

// 用在详情页
function i18n_state1(state) {
  switch (state) {
    case "scheduled":
      return "该订单已经指派给你了，请您和客户预约具体上门服务时间"
    case "processing":
      return "待处理"
    case "audited":
      return "已审核"
    case "frozen":
      return "已冻结, 该订单的费用暂时冻结不可结算"
    case "completed":
      return "已解冻, 该订单的费用已可结算"
    default:
      return state;
    // break;
  }
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
// 调用：
// var time2 = new Date().Format("yyyy-MM-dd HH:mm:ss");
function formatDate(s, fmt) {
  var d = new Date(s)
  var o = {
    "M+": d.getMonth() + 1, //月份
    "d+": d.getDate(), //日
    "h+": d.getHours(), //小时
    "m+": d.getMinutes(), //分
    "s+": d.getSeconds(), //秒
    "q+": Math.floor((d.getMonth() + 3) / 3), //季度
    "S": d.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

module.exports = {
  i18n_state: i18n_state,
  formatDate: formatDate,
  i18n_state1: i18n_state1,
  getCookieValueByName: getCookieValueByName,
}


// get cookie value by name
function getCookieValueByName(a) {
  var b = document.cookie.match('(^|[^;]+)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}


function loadCookieToState() {
  let info = getCookieValueByName("i")
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
}
