/**
https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1744596436660166659?type=7&page=0
7-17 交换和

给定两个整数数组，请交换一对数值（每个数组中取一个数值），使得两个数组所有元素的和相等。

返回一个数组，第一个元素是第一个数组中要交换的元素，第二个元素是第二个数组中要交换的元素。若有多个答案，返回任意一个均可。若无满足条件的数值，返回空数组。

输入格式:
第一行输入第一个整数数组元素，以空格分开；第二行输入第二个整数数组元素，以空格分开。输入两个数组长度大于1，且小于10000

输出格式:
输出数组，长度为2，输出的数组第一个元素表示第一个数组中需要交换的元素值，第二个元素表示第二个数组中需要交换的元素值。且元素之间以空格分开。若有多个答案，返回任意一个均可。若无满足条件的数值，返回空数组。


输入样例:
在这里给出一组输入。例如：

4 1 2 1 1 2
3 6 3 3
输出样例:
在这里给出相应的输出。例如：

4 6

 */

function findSwapElement(arr1, arr2) {
  let sum1 = arr1.reduce((acc, it) => acc+it, 0);
  let sum2 = arr2.reduce((acc, it) => acc+it, 0);
  // 例如 sum1 = 20  sum2 = 18  delta = 2
  let delta = sum1 - sum2 ;
  // 找到两个元素，a - b = delta / 2
  let halfDelta = delta / 2;

  if (halfDelta % 1 !== 0) {
    return []
  }

  for(let i = 0; i < arr1.length; i++) {
    for(let j = 0; j < arr2.length; j++) {
      if (arr1[i] - arr2[j] === halfDelta) {
        return [arr1[i], arr2[j]]
      }
    }
  }
  return []
}

function test(inputs) {
  const [first , second] = inputs.split('\n');
  const toArray = (line) => line.split(' ').map(it => +it)
  const swap = findSwapElement(toArray(first), toArray(second));
  console.log(swap.join(' '));
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

// console.log(swapElement([4,1,2,1,1,2], [3,6,3,3]))



// gpt 更好一点
function findSwapValues(array1, array2) {
  const sum1 = array1.reduce((a, b) => a + b, 0);
  const sum2 = array2.reduce((a, b) => a + b, 0);

  const targetDiff = (sum1 - sum2) / 2;
  const set1 = new Set(array1);

  for (let num of array2) {
    const complement = num + targetDiff;
    if (set1.has(complement)) {
      return [complement, num];
    }
  }

  return [];
}
