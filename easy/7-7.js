/**
 *
题目: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588686434306?type=7&page=0

《数字拆分求和》
对于给定的正整数k，将其表示为一个正整数序列之和，
且该序列中相邻元素的差值为等差分布（等差分布从1开始）。
注意，请打印出所有可能的序列（打印多个序列时，按照首个数字从小到大依次打印）

例如：输入k=26，输出[[4, 5, 7, 10]]，该序列的和为26，相邻元素的差值为1,2,3

输入k=55，输出[[7, 8, 10, 13, 17], [17, 18, 20], [27, 28]]，即，有3个序列满足条件，其和均为55，且相邻元素的差值为等差分布（从1开始）

注：若没有满足条件的序列，则返回[]

输入格式:
正整数k

输出格式:
输出所有满足条件的序列，例如k=55，输出[[7, 8, 10, 13, 17], [17, 18, 20], [27, 28]]。若没有满足条件的序列，则返回[]


输入样例:
在这里给出一组输入。例如：

55
输出样例:
在这里给出相应的输出。例如：

[[7, 8, 10, 13, 17], [17, 18, 20], [27, 28]]
 */


function findSeq(k) {
  const res = [];
  const mid = Math.floor(k / 2)  //  55/2 27.5  27 + 28   56/2 28 + 29

  for(let i = 1; i <= mid; i++) {
    let seq = [i];
    let sum = i;
    let delta = 1;
    let current = i;

    while(sum < k) {
      current = current + delta++;
      seq.push(current);
      sum += current
    }
    if (sum === k) {
      res.push(seq);
    }
  }
  return res;
}

function test(inputs) {
  const res = findSeq(+inputs);
  const format = res.map(seq => `[${seq.join(', ')}]`).join(', ')
  console.log(`[${format}]`)
}

// (function start() {
//   var buf = '';
//   process.stdin.on('readable', function() {
//       var chunk = process.stdin.read();
//       if (chunk) buf += chunk.toString();
//   })

//   process.stdin.on('end', function() {
//       test(buf)
//   })
// })()

console.log(test('55'))