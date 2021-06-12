import store from "../store";
import moment from "moment";

// 空字符检测
export function stringCheck(string) {
  // 判断传入的对象是不是字符串，否则没有 length 的属性会报错
  if (typeof string === "string") {
    const result = removeSpace(string);
    return result.length !== 0;
  }
  return false;
}

// 去除字符串首尾空格
function removeSpace(string) {
  let result;
  // 双重去除
  result = string.trim();
  result = result.replace(/\s/g, "");
  return result;
}

// 解析 token
function parseToken() {
  return JSON.parse(
    Buffer.from(store.state.token.split(".")[1], "base64").toString()
  );
}

// 获取 token 手机号
export function getPhone() {
  if (store.state.token) {
    const phone = parseToken().phone;
    console.log("解析 token 获取手机号 => " + phone);
    return phone;
  } else {
    return undefined;
  }
}

// 获取 token 有效期
export function getExpires() {
  if (store.state.token) {
    // 获取到是 string，需转成 number
    // egg-jwt 的时间只记录到秒，所以它保存的是 10 位时间戳
    // Date().getTime() 获取的是 13 位时间戳，做计算需要乘以 1000
    const exp = Number(parseToken().exp) * 1000;
    console.log("解析 token 获取有效期 => " + formatDate(exp));
    return Number(exp);
  } else {
    return undefined;
  }
}

export function formatDate(milliseconds) {
  return moment(new Date().setTime(milliseconds)).format("YYYY-MM-DD HH:mm:ss");
}
