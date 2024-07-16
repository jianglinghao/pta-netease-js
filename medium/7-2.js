/**
7-2 或运算的最小翻转次数
https://pintia.cn/problem-sets/1740639867689107456/exam/problems/1740640113873649664?type=7&page=0

给你三个正整数 a、b 和 c。

你可以对 a 和 b 的二进制表示进行位翻转操作，返回能够使按位或运算   a OR b == c 成立的最小翻转次数。

「位翻转操作」是指将一个数的二进制表示任何单个位上的 1 变成 0 或者 0 变成 1 。


![image](./assets/medium-7-2.png)

提示：

1 <= a <= 10^9

1 <= b <= 10^9

1 <= c <= 10^9

输入格式:
3个正整数a,b,c，以","分隔。

输出格式:
一个数字，字符串形式

输入样例:
a,b,c分别为：

1,2,3
输出样例:
最小翻转次数：

0
 */

function minOp(a, b, c) {
  // 1. 将 a,b,c 转为位数组
  // 2. 最大的不非0位
  let binaryA = toBinaryArray(a);
  let binaryB = toBinaryArray(b);
  let binaryC = toBinaryArray(c);
  let maxLen = max(binaryA.length, binaryB.length, binaryC.length);

  let op = 0;
  for(let i = 0; i < maxLen; i++) {
    let iofA = binaryA[i] ? 1 : 0;
    let iofB = binaryB[i] ? 1 : 0;
    let iofC = binaryC[i] ? 1 : 0;

    if (iofC) {
      // C 为 true, 但 A B 同时为 false
      if (!iofA && !iofB) {
        op++;
      }
    } else {
      // C 为 false
      if (iofA) op++;
      if (iofB) op++;
    }
  }
  return op;
}

function max(a, b, c) {
  let max = a;
  if (b > max) { max = b; }
  if (c > max) { max = c; }
  return max;
}

// 10进制转2进制数组
function toBinaryArray(num) {
  // 二进制 从低到高
  let binary = []

  while (num !== 0) {
    binary.push(num % 2);
    num = Math.floor(num / 2);
  }
  return binary
}

function test(inputs) {
  const [a, b, c] = inputs.split(',').map(it => +it);
  console.log(minOp(a, b, c));
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

// console.log(toBinaryArray(5), toBinaryArray(8))
// console.log(minOp(2, 3, 5))
// console.log(minOp(1, 2, 3))