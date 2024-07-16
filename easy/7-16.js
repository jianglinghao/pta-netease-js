/**
 * https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1744596436660166658?type=7&page=0
 * 7-16 给定数字组成最大时间

给定一个由 4 位数字组成的数组，返回可以设置的符合 24 小时制的最大时间。

24 小时格式为HH:MM ，其中 HH 在 00 到 23 之间，MM 在 00 到 59 之间。最小的 24 小时制时间是 00:00 ，而最大的是 23:59。

以长度为 5 的字符串，按 HH:MM 格式返回答案。如果不能确定有效时间，则返回空字符串。

输入格式:
4个0~9之间的数字，以,分隔。例如4,2,3,1

输出格式:
23:41


输入样例:
在这里给出一组输入。例如：

4,2,3,1
输出样例:
在这里给出相应的输出。例如：

23:41
 */
// 递归回溯 排列组合   permute backtrack
function maxTime(numArray) {
  // 4个数字排列组合
  // 从中筛选出最大有效时间
  debugger
  const totalTimes = [];
  // 收集数字的排列组合
  travel([], numArray)

  let max = -1;
  let maxTimeString = '';

  for(let i = 0; i < totalTimes.length; i++) {
    const time = totalTimes[i];
    const hh = +(time.slice(0, 2).join(''))
    const mm = +(time.slice(2, 4).join(''))

    if (hh > 23 || mm > 59) {
      continue
    }

    if (hh * 60 + mm > max) {
      max = hh * 60 + mm
      // 需要注意 00:00 这个 case
      maxTimeString = `${time.slice(0, 2).join('')}:${time.slice(2, 4).join('')}`
    }
  }

  if (max === -1) {
    return ''
  }
  return maxTimeString


  function travel(usedNum, remainNum) {
    if (usedNum.length === 4) {
      totalTimes.push(usedNum)
      return;
    }

    for(let i  = 0; i < remainNum.length; i++) {
      travel([...usedNum, remainNum[i]], remainNum.filter((_, index) => index !== i))
    }
  }

}

function test(inputs) {
  const numArray = inputs.split(',').map(it => +it);
  console.log(maxTime(numArray))
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

console.log(maxTime([4,2,3,1]));
console.log(maxTime([9,9,9,9]));
console.log(maxTime([0,0,0,0]));