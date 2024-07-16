/**
 * https://pintia.cn/problem-sets/1740631898909958144/exam/problems/1740638633187987456?type=7&page=0
 * 7-12 无法吃午餐的学生数量

学校的自助午餐提供圆形和方形的三明治，分别用数字 0 和 1 表示。
所有学生站在一个队列里，每个学生要么喜欢圆形的要么喜欢方形的。
餐厅里三明治的数量与学生的数量相同。所有三明治都放在一个 栈 里，每一轮：

如果队列最前面的学生 喜欢 栈顶的三明治，那么会 拿走它 并离开队列。

否则，这名学生会 放弃这个三明治 并回到队列的尾部。

这个过程会一直持续到队列里所有学生都不喜欢栈顶的三明治为止。

输入格式:
两个整数数组 students 和 sandwiches ，其中 sandwiches[i] 是栈里面第 i​​​​​​ 个三明治的类型（i = 0 是栈的顶部）， students[j] 是初始队列里第 j​​​​​​ 名学生对三明治的喜好（j = 0 是队列的最开始位置）。

第一行为students，以空格分隔

第二行为sandwiches，以空格分隔

输出格式:
无法吃午餐的学生数量。

输入样例:
在这里给出一组输入。例如：

1 1 0 0
0 1 0 1
输出样例:
在这里给出相应的输出。例如：

0
注意事项：
1 <= students.length, sandwiches.length <= 100

students.length == sandwiches.length

sandwiches[i] 要么是 0 ，要么是 1 。

students[i] 要么是 0 ，要么是 1 。
 */


function remainStudents(students, sandwiches) {
  while(sandwiches.length) {
    let sandwich = sandwiches.shift();
    let match = false;
    // 无法满足的学生数  这里是模拟的对于一个 三明治 不能满足的学生数 防止无限排队
    let unMatchCount = 0;
    while (students.length) {
      let stu = students.shift();
      if (stu === sandwich) {
        match = true;
        break;
      } else {
        unMatchCount++
        students.push(stu);
      }
      if (unMatchCount === students.length) {
        break;
      }
    }
    if (!match) {
      return students.length
    }
  }
  return 0;
}

students = [1 ,1, 0, 0]
sandwiches = [0 ,1 ,0 ,1]

remainStudents(students, sandwiches)
function test(inputs) {
  const [first, second] = inputs.split('\n');
  const students = first.split(' ').map(it => +it);
  const sandwiches = second.split(' ').map(it => +it);
  console.log(remainStudents(students, sandwiches));
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