/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1740640696596824068?type=7&page=0
7-4 最长递增子序列

给你一个整数数组nums，找到其中最长严格递增子序列的长度。

子序列 是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序
。例如，[3,6,2,7] 是数组 [0,3,1,6,2,2,7] 的子序列。

输入格式:
1 <= nums.length <= 2000
-10000 <= nums[i] <= 10000

输出格式:
最长严格递增子序列的长度


输入样例:
在这里给出一组输入。例如：

10 9 2 5 3 7 101 18
输出样例:
在这里给出相应的输出。例如：

4

 */

function getLongestSubSequence(nums) {
  let max = 0;
  travel(0, []);

  function travel(start, sequence) {
    if (start >= nums.length) {
      if (sequence.length > max) {
        max = sequence.length;
      }
      return
    }

    let num = nums[start];
    let last = sequence.length ? sequence[sequence.length - 1] : Number.MIN_SAFE_INTEGER;

    // 注意是严格递增，不能包含等于
    if (num > last) {
      // 选择
      sequence.push(num)
      travel(start + 1, sequence)
      sequence.pop()

      // 不选择
      travel(start + 1, sequence)
    } else {
      travel(start + 1, sequence)
    }
  }
  return max;
}

function test(inputs) {
  const nums = inputs.split(' ').map(it => +it);
  console.log(getLongestSubSequence(nums));
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

// console.log(getLongestSubSequence([10, 9, 2, 5, 3, 7, 101, 18]))
// console.log(getLongestSubSequence([10, 9, 7, 9, 101, 9, 9, 18]))
// console.log(getLongestSubSequence([2, 3, 9, 9, 3]))

// gpt dp 更好一点
function lengthOfLIS(nums) {
  if (nums.length === 0) {
      return 0;
  }
// dp，该数组的每个元素代表以当前元素为结尾的最长递增子序列的长度（初始值为1）。
// 然后，我们遍历数组，对于每个元素，再从开头到当前位置之前的元素进行比较，
// 如果当前元素大于之前的某个元素，更新以当前元素结尾的最长递增子序列的长度。
// 最终，返回dp数组中的最大值，即为最长严格递增子序列的长度。
  const dp = new Array(nums.length).fill(1);
  let maxLen = 1;

  for (let i = 1; i < nums.length; i++) {
      for (let j = 0; j < i; j++) {
          if (nums[i] > nums[j]) {
              dp[i] = Math.max(dp[i], dp[j] + 1);
          }
      }
      maxLen = Math.max(maxLen, dp[i]);
  }

  return maxLen;
}

// 示例用法
const nums = [10, 9, 2, 5, 3, 7, 101, 18];
console.log(lengthOfLIS(nums)); // 输出最长严格递增子序列的长度