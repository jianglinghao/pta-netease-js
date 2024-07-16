/**
7-1 连续的子数组和

你一个整数数组 nums 和一个整数 k ，编写一个函数来判断该数组是否含有同时满足下述条件的连续子数组：

子数组大小 至少为 2 ，且

子数组元素总和为 k 的倍数。

如果存在，返回 1 ；否则，返回 0 。
如果存在一个整数 n ，令整数 x 符合 x = n * k ，则称 x 是 k 的一个倍数。0 始终视为 k 的一个倍数。


输入样例1:
在这里给出一组输入。例如：

nums = [23,2,4,6,7], k = 6
输出样例1:
在这里给出相应的输出。例如：

1
解释：[2,4] 是一个大小为 2 的子数组，并且和为 6 。


输入样例2:
在这里给出一组输入。例如：

nums = [23,2,6,4,7],k = 6
输出样例2:
在这里给出相应的输出。例如：

1
解释：[23, 2, 6, 4, 7] 是大小为 5 的子数组，并且和为 42 。 42 是 6 的倍数，因为 42 = 7 * 6 且 7 是一个整数。


输入样例3:
在这里给出一组输入。例如：

nums = [23,2,6,4,7], k = 13
输出样例3:
在这里给出相应的输出。例如：

0
注意：输入会严格按照以上模式输入，可以放心字符串解析
提示：

1 <= nums.length <= 10^5

0 <= nums[i] <= 10^9

0 <= sum(nums[i]) <= 2^31 - 1

1 <= k <= 2^31 - 1

 */


// 求数组的前缀和
// 数组:   [23,  2,  6,  4, 7]
// 前缀和: [23, 25, 31, 35, 42]
// 复杂度 O(n^2)
function hasValidSubArray(array, k) {
  if (array.length === 1) {
    return 0;
  }
  debugger
  const preSumArray = [];
  let lastSum = 0;
  for (let i = 0; i < array.length; i++) {
    lastSum += array[i];
    if ((lastSum === 0 || lastSum % k === 0) && i >= 1) { return 1; }
    preSumArray.push(lastSum);
  }
  for (let i = 1; i < preSumArray.length; i++) {
    for (let j = 0; j < i - 1; j++) {
      const delta = preSumArray[i] - preSumArray[j];
      if ((delta === 0 || delta % k === 0)) {
        return 1
      }
    }
  }
  return 0
}
console.log(hasValidSubArray([23,2,4,6,7], 6));

// 求数组的前缀和，并用同余原理。时间复杂度 O(n)
// 数组:   [23,  2,  6,  4, 7]
// 前缀和: [23, 25, 31, 35, 42]
// 如果 (preSumArray[j] - preSumArray[i]) % k == 0 则 praSumArray[j] % k == preSumArray[i]) % k
function hasValidSubArrayV2(array, k) {
  if (array.length === 1) {
    return 0;
  }
  const preSumArray = [];
  let lastSum = 0;
  for (let i = 0; i < array.length; i++) {
    lastSum += array[i];
    if ((lastSum === 0 || lastSum % k === 0) && i >= 1) { return 1; }
    preSumArray.push(lastSum);
  }
  const map = {};
  for (let i = 0; i < preSumArray.length; i++) {
    const sumMod = preSumArray[i] % k;
    if (sumMod in map) {
      if (i - map[sumMod] >= 2) {
        return 1;
      }
    } else {
      map[sumMod] = i;
    }
  }
  return 0
}

function test(inputs) {
  const match = /\[(.+)\].+k = (\d+)/.exec(inputs)
  const array = match[1].split(',').map(it => +it);
  const k = +match[2]
  console.log(hasValidSubArray(array, k));
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

// console.log(hasValidSubArray([23,2,4,6,7], 6));
// console.log(hasValidSubArray([23,2,6,4,7], 6));
// console.log(hasValidSubArray([23,2,6,4,7], 13));

// console.log(hasValidSubArrayV2([1,2,3],5));