/**
https://pintia.cn/problem-sets/1740639867689107456/exam/problems/1740640149898526722?type=7&page=0
7-6 最小数

给定一组非0整数 nums，重新排列每个数的顺序（每个数不可拆分）使之组成一个最小的整数。

注意：

输入整数数组中，可能存在负数，但最多只会有一个负数

输出结果可能非常小，所以你需要返回一个字符串而不是整数。

输入格式:
一个整数数组，每个元素其间以“空格”分隔

输出格式:
最小数的字符串

输入样例1:
在这里给出一组输入。例如：

10 2
输出样例1:
在这里给出相应的输出。例如：

102
输入样例2:
在这里给出一组输入。例如：

3 30 34 5 -9
输出样例2:
在这里给出相应的输出。例如：

-9534330

 */

function getMinNumString(inputs) {
  const negativeIndex = inputs.findIndex(it => it < 0);
  if (negativeIndex !== -1) {
    //有负数的情况
    const negativeNum = inputs[negativeIndex];
    const remainInputs = inputs.filter(it => it !== negativeNum);
    const sorted = sortArray(remainInputs, 'desc');
    sorted.unshift(negativeNum)
    return sorted.join('');
  } else {
    // 没有负数的情况
    const sorted = sortArray(inputs, 'asc');
    return sorted.join('');
  }

  // 按数字高位逐个按位进行比较
  function sortArray(origin, order = 'desc') {
    origin.sort((it1, it2) => {
      if(it1 === it2) {
        return 0;
      }
      const nums1 = (it1+'').split('').map(it => +it);
      const nums2 = (it2+'').split('').map(it => +it);;

      let index = 0;

      while(true) {
        let num1 = getNum(nums1, index);
        let num2 = getNum(nums2, index);
        if (num1 === num2) {
          index++;
          continue;
        }
        return order === 'desc' ? num2 - num1 : num1 - num2
      }

      function getNum(arr, index) {
        if (arr[index] !== undefined) {
          return arr[index];
        }
        // 如果是逆序，考虑 8 和 89  及 9 和 99 两个 case 的第二位比较。
        if (order === 'desc') {
          return getNum(arr, index-1) + 0.1
        }
        // 如果是增序，考虑 1 和 10，应该是单个的 1 更小
        if (order === 'asc') {
          return -1
        }
      }

    })
    return origin;
  }
}
// test('3 30 34 5 -9')
// test('10 2')
function test(inputs) {
  // 3 30 34 5 -9
  const nums = inputs.split(' ').map(it => +it);
  console.log(getMinNumString(nums));
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

