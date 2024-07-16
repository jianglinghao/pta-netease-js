/**

https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638588686434308?type=7&page=0

7-9 最小硬币个数 
假设现在有一堆硬币，其中有足够个1元硬币、足够个2元硬币和足够个5元硬币。现在需要用这些硬币凑出总价值为n元的钱，求最少需要多少枚硬币？

输入格式:
每一组输入为一行，代表需要凑出的钱的价值n。其中0<=n<=2147483647

输出格式:
对每一组输入，在一行中输出需要的硬币的值。如果不能凑出指定价值，请返回-1。


输入样例1:
在这里给出一组输入。例如：

100
输出样例1:
在这里给出相应的输出。例如：

20

输入样例2:
在这里给出一组输入。例如：

14
输出样例2:
在这里给出相应的输出。例如：

4
 */

// 6= 5 + 1
// 7 = 5 + 2
// 8 = 5 + 2 + 1
// 9 = 5 + 2 + 2
// 10 = 5 + 5
// 11 = 5 + 5 + 1
// 12 = 5 + 5 + 2
// 13 = 5 + 5 + 2 + 1
// 14 = 5 + 5 + 2 + 2
// 15 = 5 + 5 + 5
// 16 = 5 + 5 + 5 + 1



// 这道题出的给的硬币面值有点太简单了吧。
function coinCount(n) {
  if (n === 0) {
    return -1
  }
  let coin5 = Math.floor(n / 5)
  let coin2 = Math.floor((n - coin5 * 5) / 2)
  let coin1 = n - coin5 * 5 - coin2 * 2
  return coin5 + coin2 + coin1
}


function test(inputs) {
  console.log(coinCount(+inputs))
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

// console.log(coinCount(0))
// console.log(coinCount(2147483647))