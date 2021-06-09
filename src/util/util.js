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
