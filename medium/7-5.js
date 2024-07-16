/**
https://pintia.cn/problem-sets/1740639867689107456/exam/problems/1740640149898526721?type=7&page=0
7-5 三数之和

给你一个整数数组 nums ，
判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，
同时还满足 nums[i] + nums[j] + nums[k] == 0 。
请你返回所有和为 0 且不重复的三元组的数量。

注意：答案中不可以包含重复的三元组（例如[a,b,c]与[c,b,a]为重复），如果无符合要求的三元组，则返回0。

提示：
3 <= nums.length <= 3000

-10^5 <= nums[i] <= 10^5

运行有时间、内存限制

输入格式:
一个整数数组，每个元素其间以“空格”分隔

输出格式:
所有符合题目要求三元组的数量，如果无符合要求的三元组，则返回0。

输入样例1:
在这里给出一组输入。例如：

-1 0 1 2 -1 -4
输出样例1:
在这里给出相应的输出。例如：

2
解释：

nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0 。

nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0 。

nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0 。

不重复的三元组总共有2组。

输入样例2:
在这里给出一组输入。例如：

0 1 1
输出样例2:
在这里给出相应的输出。例如：

0
解释：无符合条件的三元组

 */


// 回溯思想 n^3 复杂度，只能拿20分，另外用例超时
function sumOfZero(nums) {
  const minSort = (it1, it2) => it1 - it2;
  let sorted = nums.sort(minSort);
  let select = [];
  let sum = 0;
  let res = new Set();
  let exitMap = {};
  backtrace(0);


  function backtrace(start) {
    if (select.length === 3) {
      if (sum === 0) {
        let copy = [...select];
        copy.sort(minSort);
        res.add(copy.join(','))
      }
      return;
    }

    for (let i = start; i < sorted.length; i++) {
      let num = sorted[i];
      select.push(num);
      sum += num;
      let cacheKey = [...select].sort(minSort).join(',');
      if (!exitMap[cacheKey]) {
        backtrace(i + 1);
        exitMap[cacheKey] = true;
      }
      select.pop();
      sum -= num;
    }
  }
  return res.size;
}

// n^2 复杂度，通过全部用例
function sumOfZeroV2(nums) {
  const minSort = (it1, it2) => it1 - it2;
  let sorted = nums.sort(minSort);
  let numIndexMap = {};
  for (let i = 0; i < sorted.length; i++) {
    if (!numIndexMap[sorted[i]]) {
      numIndexMap[sorted[i]] = [];
    }
    numIndexMap[sorted[i]].push(i);
  }
  let res = new Set();


  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      let sum = sorted[i] + sorted[j];
      if (numIndexMap[-1 * sum]) {
        let target = numIndexMap[-1 * sum].findIndex(it => it !== i && it !== j);
        if (target !== -1) {
          let copy = [sorted[i], sorted[j], -1 * sum];
          copy.sort(minSort);
          res.add(copy.join(','))
        }
      }
    }
  }
  return res.size;
}


function test(inputs) {
  // -1 0 1 2 -1 -4
  const nums = inputs.split(' ').map(it => +it);
  console.log(sumOfZeroV2(nums));
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

// console.log(sumOfZeroV2([-1, 0, 1, 2, -1, -4]))
// console.log(sumOfZeroV2([0, 1, 1]))

// gpt 这次还是gpt的好理解： 遍历nuims x=基准数1 取反；双指针找剩下的数加和为x
function threeSum(nums) {
  const result = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    if (i === 0 || (i > 0 && nums[i] !== nums[i - 1])) {
      let left = i + 1;
      let right = nums.length - 1;
      let target = 0 - nums[i];

      while (left < right) {
        if (nums[left] + nums[right] === target) {
          result.push([nums[i], nums[left], nums[right]]);
          while (left < right && nums[left] === nums[left + 1]) left++;
          while (left < right && nums[right] === nums[right - 1]) right--;
          left++;
          right--;
        } else if (nums[left] + nums[right] < target) {
          left++;
        } else {
          right--;
        }
      }
    }
  }

  return result;
}

let nums = [-1, 0, 1, 2, -1, -4];
console.log(threeSum(nums));