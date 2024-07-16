/**
https://pintia.cn/problem-sets/1740639867689107456/exam/problems/1740640113873649669?type=7&page=0
7-3 删除无效的括号
1、给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
2、括号只考虑 "(" 和 ")" ，有效的括号是指一系列左括号 "(" 和 ")" 组成；但是如果有一些额外的括号，使得括号不能正确配对，就需要删除。

输入格式:
输入一个字符串，字符串的长度小于1000。字符串中只包含字母、 "(" 和 ")"

输出格式:
输出处理后的字符串

输入样例:
在这里给出一组输入。例如：

a)())()
输出样例:
在这里给出相应的输出。例如：

a()()
 */

function getValidString(input) {
  let stack = [];
  let inValidIndex = [];

  for(let i = 0; i < input.length; i++) {
    if (['(', ')'].includes(input[i])) {
      if (input[i] === '(') {
        stack.push(i);
      } else {
        if (stack.length) {
          stack.pop(i);
        } else {
          inValidIndex.push(i);
        }
      }
    }
  }
  inValidIndex = inValidIndex.concat(stack);
  return input.split('').filter((_, i) => !inValidIndex.includes(i)).join('')
}

function test(inputs) {
  console.log(getValidString(inputs));
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