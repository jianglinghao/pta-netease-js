/**
题目: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588682240003?type=7&page=0

Drizzle 被困到一条充满数字的方块路中，
假设这条路由一个非负的整数数组m组成，
Drizzle 最开始的位置在下标 start 处，
当他位于下标i位置时可以向前或者向后跳跃m[i]步数，
已知元素值为0处的位置是出口，且只能通过出口出去，
不可能数组越界，请你通过编程计算出Drizzle能否逃出这里。

输入格式:
第一行输入数组m的长度n ；
第二行输入数组元素，空格分割开 第三行输入起始下标 start。


范围：

1 <= m.length <= 5 * 10^4

0 <= m[i] < m.length

0 <= start < m.length

输出格式:
True 或 False。

输入样例:
在这里给出一组输入。例如：

7
4 2 3 0 3 1 2
5
输出样例:
在这里给出相应的输出。例如：

True
 */

function findDoor(array, startIndex) {
  const accessMap = {};

  const find = toNext(startIndex);
  console.log(find ? 'True' : 'False')

  function toNext(index) {
    if (index < 0 || index >= array.length) {
      return false
    }
    if (accessMap[index]) {
      return false;
    }
    accessMap[index] = true;

    const step = array[index];
    if (step === 0) {
      return true;
    }
    let left = toNext(index - step);
    let right = toNext(index + step);
    return left || right;
  }
}

function test(input) {
  const lines = input.split('\n');
  const [_, secondLine, thirdLine] = lines;
  const arr = secondLine.split(' ').map(it => +it);
  const startIndex = +thirdLine;
  findDoor(arr, startIndex);
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

// console.log(findDoor([4,2, 3, 0, 3, 1, 2], 5))
// console.log(findDoor([4, 0, 2, 1, 1], 0))