/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1746729666142191620?type=7&page=0

7-13 最多能完成排序的块

给你一个整数数组 arr 。将 arr 分割成若干 块 ，并将这些块分别进行排序。之后再连接起来，使得连接的结果和按升序排序后的原数组相同。

返回能将数组分成的最多块数？

输入格式:
输入整数数列，元素之间以空格分开

输出格式:
数组能分成的最多块数

输入样例:
在这里给出一组输入。例如：

5 4 3 2 1
输出样例:
在这里给出相应的输出。例如：

1

 */


// 在 leetCode 查看错误用例后，修正的解法。可拿满分
// 若 数字 大于等于 前一个 chunk 的最大值，可开启一个新的 chunk, {min: 前一个 chunk 的最大值 max: now}
// 后续每个数字要大于等于当前 chunk 中的最小值，否则需要进行 chunk 合并，至到满足条件。
// chunk 合并规则:
//   将最后一个 chunk 与 前一个 chunk 合并，并更新 chunk 的最大值。
//   如果只有一个 chunk 只更新 chunk 的最小值即可。
function maxChunk(nums) {
  if (!nums.length) {
    return 0;
  }

  let chunks = [{ min: nums[0], max: nums[0] }];

  for (let i = 1; i < nums.length; i++) {
    let { min, max } = chunks[chunks.length - 1];
    if (nums[i] >= max) {
      chunks.push({ max: nums[i], min: max })
      continue;
    }

    // 注意容易遗漏
    if (nums[i] < min && chunks.length === 1) {
      chunks[0].min = nums[i]
    }

    while (nums[i] < min && chunks.length > 1) {
      const last = chunks.pop();
      const curr = chunks[chunks.length - 1]
      // 注意容易遗漏
      curr.max = last.max;
      min = curr.min;
    }
  }
  return chunks.length;
}

function test(inputs) {
  if (!inputs.trim()) {
    return console.log(0)
  }
  const nums = inputs.trim().split(' ').map(it => +it);
  console.log(maxChunk(nums));
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

/**
3 2 1 5 4
解题思路: 
对于一个数，如果比前面最大值都大，那么可以进行切割。
如果一个数，比前面最小值都小，则需要与前面连接在一起。
否则要和前面连在一块。
 */

// 首次提交只能满足部分 case . 拿 48/60 分
function maxChunkV0(nums) {
  if (!nums.length) {
    return 0;
  }
  let chunk = 1;
  let min = nums[0];
  let max = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] >= max) {
      max = nums[i];
      chunk++;
    }

    // 错误点在于合并 chunk 时， 都合并到了首位。
    if (nums[i] < min) {
      chunk = 1;
      min = nums[i]
    }
  }
  return chunk;
}

// test('5 4 3 2 1')
// test('3 2 1 5 4 11 10 9 12 13\n')
// test('1 1 1 1')
// test('5 4 4 7')

// leetCode 上的 TestCase:
// 首次提交无法通过的 case
// test('0 3 0 3 2')
// 第二次提交无法通过的 case
// test('5 1 1 8 1 6 5 9 7 8')