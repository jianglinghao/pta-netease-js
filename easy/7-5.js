/**
题目: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588686434304?type=7&page=0
如果在将所有大写字符转换为小写字符、并移除所有非字母数字字符之后，短语正着读和反着读都一样。则可以认为该短语是一个 回文串 。
字母和数字都属于字母数字字符。
给你一个字符串 s，如果它是 回文串 ，返回 1；否则，返回 0。

输入格式:
一行包含一个字符串，长度大于0同时小于2000

输出格式:
输入是一行，如果这个字符串是回文，返回 1，否则返回 0。


输入样例1:
在这里给出一组输入。例如：

A man, a plan, a canal: Panama
输出样例1:
在这里给出相应的输出。例如：

1
输入样例2:
在这里给出一组输入。例如：

race a car
输出样例2:
在这里给出相应的输出。例如：
0



 */

// 是否是回文字符串，需将大写转为小写，去除所有非字母和数字的字符
function isRevertString(text) {
  // 注: node v12.22.8 没有 replaceAll 方法
  const lowercaseText = text.toLowerCase().split('').filter(it => {
    return /[\da-z]/.test(it);
  })
  const len = lowercaseText.length;

  let i = 0; j = len - 1;

  while (i < j) {
    if (lowercaseText[i] !== lowercaseText[j]) {
      return 0;
    }
    i++;
    j--;
  }
  return 1
}

function test(input) {
  console.log(isRevertString(input));
}


(function start() {
  var buf = '';
  process.stdin.on('readable', function () {
    var chunk = process.stdin.read();
    if (chunk) buf += chunk.toString();
  })

  process.stdin.on('end', function () {
    test(buf)
  })
})()


// console.log(isRevertString('A man, a plan, a canal: Panama'))
// console.log(isRevertString('race a car'))