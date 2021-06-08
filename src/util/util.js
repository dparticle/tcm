// 空字符检测
export function stringCheck(string) {
  if (typeof string === "string") {
    const result = removeSpace(string);
    return result.length !== 0;
  }
  return false;
}

function removeSpace(string) {
  let result;
  result = string.trim();
  result = result.replace(/\s/g, "");
  return result;
}
