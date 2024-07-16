// 题目链接: https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588682240001?type=7&page=0

/**
 * 计算合作圈个数
 * @param {*} matrix n*n的二维矩阵
 */
function calculateC(matrix) {
  let n = matrix.length;
  // 与当前员工有关系的员工队列
  let queue = [];
  // 已遍历过的员工
  let travelMap = {};
  // 合作圈总数
  let total = 0;
  for(let i = 0; i < n; i++) {
    if (travelMap[i]) {
      continue
    }
    travel(i);
  }
  return total;

  function travel(index) {
    queue.push(index);
    while(queue.length) {
      const current = queue.shift();
      travelMap[current] = 1;
      const arr = matrix[current];
      for(let i = 0; i < n; i++) {
        if (current !== i && !travelMap[i] && arr[i]) {
          queue.push(i);
        }
      }
    }
    total++;
  }
}

function test(input) {
  const lines = input.split('|');
  const matrix = lines.map(l => {
    const arr = l.split(' ').map(it => +it);
    return arr;
  })
  const count = calculateC(matrix);
  console.log(count);
}
[
[1,1,0],
[1,1,0],
[0,0,1]
]
test(`1 1 0|1 1 0|0 0 1`)
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