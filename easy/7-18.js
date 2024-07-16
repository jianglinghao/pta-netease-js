/**

https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1744596436660166663?type=7&page=0
7-18 最长回文子串
给你一个字符串s，找到s中最长的回文子串。

如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

输入格式:
1<=s.length<=1000

输出格式:
s中最长的回文子串


输入样例:
在这里给出一组输入。例如：

zyrcbabd
输出样例:
在这里给出相应的输出。例如：

bab

 */

function findSubString(inputString) {
  if (!inputString) {
    return ''
  }

  let index = 0;
  let maxLength = 1;
  let subLeft = 0;

  while(index < inputString.length) {
    let left = index;
    let right = index;

    // 回文字符个数为奇数个的情况，以 index 为中心
    search(left-1, right+1);

    // 回文字符个数为偶数个的情况，以 index 为左中心
    search(left, right+1);
    index++;
  }

  function search(left, right) {
    if (left < 0 && right >= inputString.length) {
      return;
    }
    if (inputString[left] === inputString[right]) {
      if (right - left + 1 > maxLength) {
        maxLength = right - left + 1;
        subLeft = left;
      }
      search(left-1, right+1)
    }
  }
  return inputString.substring(subLeft, subLeft + maxLength)
}

function test(inputs) {
  console.log(findSubString(inputs));
}

(function start() {
  var buf = '';
  process.stdin.on('readable', function() {
      var chunk = process.stdin.read();
      if (chunk) buf += chunk.toString();
  })
  
  process.stdin.on('end', function() {
      test(buf)
  })
})()

// console.log(findSubString('zyrcbabd'))