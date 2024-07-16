/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1752988109534081024?type=7&page=0
7-14 异次元星人的文字

外星文明中，异次元ABA星人的文字非常有特点，他们输出的文字翻译成地球上可见的字符串后
必定有英文字母
且正着看还是倒着看都是一样的
亦即 ：对于长度为n的字符串s
若i+j == n+1， 那么s[i] = s[j]
其中i，j均为字符串位置下标，1<=i,j<=n，且n>=3

ABA星人于是将他们的间谍信息隐藏在地球字符中，便于传递消息
请你识别以下给出的几组字符串
并输出是否隐藏有ABA星文
有则输出1
否则输出0。

给定长度为n的字符串L，1<=n<=10000
L由大小写字母和数字组成，其中ABA星文，其星文长度3<=m<=n。若找不到匹配的ABA星文，输出0

输入格式:
长度为n的字符串L，1<=n<=10000, L由大小写字母和数字组成，其中ABA星文，其星文长度m满足 3<=m<=n

输出格式:
输出能够匹配到的最长ABA星文的长度m，无则输出0


输入样例:
在这里给出一组输入。例如：

ABA3
AABBCC
00A00
输出样例:
在这里给出相应的输出。例如：

3
0
5

 */

function getABAString(input) {
  let maxLen = 0;

  for (let i = 1; i < input.length; i++) {
    // 以 i 位为中心的奇数长度
    search(i - 1, i + 1)
    // 以 i 为为左中心的偶数长度
    search(i, i + 1);
  }

  function search(left, right) {
    if (left < 0 || right > input.length) {
      return
    }
    if (input[left] !== input[right]) {
      return
    }
    let len = right - left + 1;
    // 遗漏了 必定有字母的要求
    if (len >= 3 && len > maxLen && /[a-zA-Z]+/.test(input.substring(left, right))) {
      maxLen = right - left + 1
    }
    search(left - 1, right + 1);
  }
  return maxLen;
}

function test(inputs) {
  const lines = inputs.split('\n').filter(it => !!it); // 用例需要特殊处理
  lines.forEach((l) => console.log(getABAString(l)))
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

// console.log(getABAString('ABA3'))
// console.log(getABAString('AABBCC'))
// console.log(getABAString('00A00'))
// console.log(getABAString('0000a0'))