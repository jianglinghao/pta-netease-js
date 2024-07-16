/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1740640696596824066?type=7&page=0
7-3 拼接最大数
给定长度分别为 m 和 n 的两个数组，
其元素由 0-9 构成，表示两个自然数各位上的数字。
现在从这两个数组中选出 k (0 <=k <= m + n) 个数字拼接成一个新的数，
要求从同一个数组中取出的数字保持其在原数组中的相对顺序。
求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。

输入格式:
输入三个行内容：

第一行是数组nums1，元素内容用逗号分隔；数组最大长度为1000。

第二行是数组nums2，元素内容用逗号分隔；数组最大长度为1000。

第三行是长度k；

输出格式:
返回一个表示该最大数的长度为 k 的数组，数组元素用逗号隔开。

输入样例:
在这里给出一组输入。例如：

3,4,6,5
9,1,2,5,8,3
5
输出样例:
在这里给出相应的输出。例如：

9,8,6,5,3
提示：
1 <= nums1.length, nums2.length <= 1000

0 <= nums1[i], nums2[i] <= 9
 */

// 第一版 12分
function getMaxNumber(nums1, nums2, k) {
  let max = 0;
  travel(0, 0, []);

  function travel(start1, start2, selected) {
    if (selected.length === k) {
      const num = +selected.join('');
      if (num > max) { max = num; }
      return;
    }

    let nums1Remain = start1 < nums1.length ? nums1.length  - start1 : 0;
    let nums2Remain = start2 < nums2.length ? nums2.length  - start2 : 0;

    if (nums1Remain === 0 && nums2Remain === 0) {
      return;
    }

    if (selected.length + nums1Remain + nums2Remain < k) {
      return;
    }

    // let potentialMax = +(selected.join('') + new Array(k - selected.length).fill(0).join(''));
    // if (selected.join('')=== '98') {
    //   console.log(potentialMax)
    // }
    // if (potentialMax < max) {
    //   console.log(potentialMax, max)
    //   return;
    // } else {
    //   max = potentialMax;
    // }


    if (start1 < nums1.length) {
      // 从 nums1 中选择1个数
      selected.push(nums1[start1]);
      travel(start1+1, start2, selected)
      selected.pop();

      // nums 1 不选
      travel(start1 + 1, start2, selected);
    }

    if (start2 < nums2.length) {
      // 从 nums2 中选择1个数
      selected.push(nums2[start2]);
      travel(start1, start2+1, selected)
      selected.pop();
      // nums 2 不选
      travel(start1, start2+1, selected);
    }

    // nums 1、2 都不选
    travel(start1 + 1, start2 + 1, selected);

  }
  return max
}

// 第二版 48分
function getMaxNumberV2(nums1, nums2, k) {

  // 给 nums1、nums2 的数字排序
  // 首先凑第一位，从最大数开始取，看能否凑出 k-1 位。如果不可以从第二大数开始取，直到能凑够 k-1位。
  // 凑第二位，从剩余的最大的数开始取，看能否凑出 k-2 位,以此类推。

  let max = [];
  const queue = [{ start1: 0, start2: 0, nums: [] }];

  while(queue.length) {
    const state = queue.shift();
    const res = findLargest(state.start1, state.start2, k - state.nums.length);
    res.forEach(({larger, from}) => {
      let { start1, start2, nums } = state;
      if (from === 1) {
        start1 = larger.index+1;
      } else {
        start2 = larger.index+1;
      }
      const newNums = [...nums, larger.value];
      if (newNums.length < k) {
        queue.push({ start1, start2, nums: newNums })
      } else if (isLargerThanMax(newNums)){
        max = newNums
      }
    })
  }

  function isLargerThanMax(nums){
    if (max.length === 0) {
      return true;
    }
    let i = 0;
    while(i < nums.length) {
      if (max[i] === nums[i]) {
        i++;
        continue
      }
      return nums[i] > max[i]
    }
  }

  return max

  function findLargest(start1, start2, k) {
    let nums1Elements = getSortedElements(nums1, start1);
    let nums2Elements = getSortedElements(nums2, start2);

    let i = 0, j = 0;
    const res = [];
    // 注意此处容易写错
    while(i < nums1Elements.length || j< nums2Elements.length) {
      // 当其中一个为空时，使用虚拟值 -1
      let ele1 = nums1Elements[i] || {value: -1};
      let ele2 = nums2Elements[j] || {value: -1};

      // ele1 与 ele2 相等的情况下，需要特殊处理!!!
      if (ele1.value === ele2.value) {
        if (isValid(ele1, 1)) {
          res.push({ larger: ele1, from: 1 })
        }
        if (isValid(ele2, 2)) {
          res.push({ larger: ele2, from: 2 })
        }
        if (res.length > 0) { return res; }
        i++;
        j++;
        continue;
      }

      let larger = ele1.value > ele2.value ? ele1 : ele2;
      let from = ele1.value > ele2.value ? 1 : 2;
      if (isValid(larger, from)) {
        return [{larger, from }]
      }
      if (larger === ele1) {
        i++
      } else {
        j++
      }
    }

    function isValid(larger, from) {
      let arr1Remain, arr2Remain
      if (from === 1) {
        arr1Remain = nums1.length - larger.index - 1
        arr2Remain = nums2.length - start2
      } else {
        arr1Remain = nums1.length - start1;
        arr2Remain = nums2.length - larger.index - 1
      }
      return arr1Remain + arr2Remain >= k - 1
    }

    function getSortedElements(nums, start) {
      let elements = [];
      for(let i = start; i < nums.length; i++) {
        elements.push({
          value: nums[i],
          index: i
        })
      }

      elements.sort((it1, it2) => {
        if (it2.value === it1.value) {
          return it1.index - it2.index
        }
        return it2.value - it1. value
      })
      return elements;
    }

  }
}

// 第三版
function getMaxNumberV3(nums1, nums2, k) {
  let n = nums1.length;
  let m = nums2.length;
  // 需要从 nums1 中取出最少字符数
  let minLen = Math.max(0, k - m);
  // 需要从 nums1 中取出的最多字符数
  let maxLen = Math.min(k, n);
  let maxSequence = [];

  for(let i = minLen; i <= maxLen; i++) {
    let subsequenceA = maxSubsequence(nums1, i);
    let subsequenceB = maxSubsequence(nums2, k - i);
    let merged = merge(subsequenceA, subsequenceB);
    if (merged.join('') === '98653') {
      debugger
    }
    if (compare(merged, 0, maxSequence, 0) > 0) {
      maxSequence = merged;
    }
  }
  return maxSequence;
}

function merge(subA, subB) {
  const merged = [];
  let index = 0;
  let i = 0;
  let j = 0;

  while(i < subA.length || j < subB.length) {
    if (compare(subA, i, subB, j) > 0 ) {
      merged[index++] = subA[i++];
    } else {
      merged[index++] = subB[j++];
    }
  }
  return merged;
}

function compare(subA, i , subB, j) {
  const lenA = subA.length;
  const lenB = subB.length;

  while(i < lenA && j < lenB) {
    if (subA[i] === subB[j]) {
      i++;
      j++;
      // 首次提交遗漏了 continue
      continue;
    }
    return subA[i] - subB[j]
  }
  return i === lenA ? -1 : 1
}

function maxSubsequence(nums, k) {
  const stack = [];
  for(let i = 0; i < nums.length; i++) {
    const num = nums[i];
    // 还剩下几个元素可以入栈
    let remain = nums.length - i;
    while (stack.length && stack[stack.length-1] < num && remain + stack.length - 1 >= k) {
      stack.pop()
    }
    stack.push(num);
  }
  // 容易遗漏的取 k 个
  return stack.slice(0, k);
}



function test(inputs) {
  const [firstLine, secondLine, k] = inputs.split('\n');
  const toNums = input => input.split(',').map(it => +it);
  const max = getMaxNumberV3(toNums(firstLine), toNums(secondLine), +k);
  console.log(max.join(','));
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


// console.log(getMaxNumberV2([3,4,6,5], [9,1,2,5,8,3], 5))
// console.log(getMaxNumberV2([3,4,6,5], [9,1,2,5,8,3], 8))
// console.log(getMaxNumber([3,4,6,5], [9,1,2,5,8,3], 8))

// 首次提交 没有通过的 case
// console.log(getMaxNumberV2([8,9], [3,9], 3))
// console.log(getMaxNumberV2([7,9,0,4,7,0,7,1,2,9,5], [9,1,5,8,3,9], 17))

// 第三版首次提交 没有通过的 case
// console.log(getMaxNumberV3([9,1,2,5,8,3], [3,4,6,5], 5))


// console.log(maxSubsequence([5, 4, 8, 3], 3));
// console.log(maxSubsequence([5, 4, 8, 3], 2));
// console.log(maxSubsequence([5, 4, 8, 3], 0));

// gpt
// 这个问题可以使用贪心算法贪心算法和单调栈来解决。以下是大致的思路：

// 遍历k的可能取值。假设从数组1中取i个数字，从数组2中取k-i个数字。

// 对于每个i，分别在数组1和数组2中使用单调栈（monotonic stack）找到长度为i的最大数和长度为k-i的最大数。

// 合并两个数组，得到一个长度为k的候选最大数。

// 将所有的候选最大数中选出最大的那个。
function maxNumber(nums1, nums2, k) {
  function merge(nums1, nums2) {
      const res = [];
      while (nums1.length || nums2.length) {
          const max = nums1.join('') > nums2.join('') ? nums1 : nums2;
          res.push(max.shift());
      }
      return res;
  }

  function getMaxSubsequence(nums, k) {
      const stack = [];
      let popCount = nums.length - k;
      for (const num of nums) {
          while (popCount && stack.length && stack[stack.length - 1] < num) {
              stack.pop();
              popCount--;
          }
          stack.push(num);
      }
      return stack.slice(0, k);
  }

  let result = [];
  for (let i = 0; i <= k; i++) {
      if (i <= nums1.length && k - i <= nums2.length) {
          const merged = merge(getMaxSubsequence(nums1, i), getMaxSubsequence(nums2, k - i));
          if (merged.join('') > result.join('')) {
              result = merged;
          }
      }
  }
  return result;
}

// 示例用法
const nums1 = [3, 4, 6, 5];
const nums2 = [9, 1, 2, 5, 8, 3];
const k = 5;
console.log(maxNumber(nums1, nums2, k)); // 输出最大的拼接数
