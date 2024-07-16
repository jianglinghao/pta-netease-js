/**
https://pintia.cn/problem-sets/1740639867689107456/exam/problems/1740640149902721026?type=7&page=0
7-8 分段反转链表

给定一个常数 K 和一个单链表 L，请你在单链表上每 K 个元素做一次反转，
// 并输出反转完成后的链表。

如果链表最后一部分不足 K 个元素，则最后一部分不翻转。

例如，假设 L 为 1→2→3→4→5→6

如果 K=3，则你应该输出 3→2→1→6→5→4

如果 K=4，则你应该输出 4→3→2→1→5→6


输入格式:
第一行包含头节点地址，总节点数量 N 以及常数 K。1≤N≤100000，1≤K≤N 。

节点地址用一个 5 位非负整数表示（可能有前导 0），NULL 用 −1 表示。

接下来 N 行，每行描述一个节点的信息，格式如下：

Address Data Next

其中 Address 是节点地址，Data 是一个绝对值不超过100000的整数，Next 是下一个节点的地址。

输出格式:
将重新排好序的链表，从头节点开始，依次输出每个节点的信息，格式与输入相同。


输入样例:
在这里给出一组输入。例如：

00100 6 4
00000 4 99999
00100 1 12309
68237 6 -1
33218 3 00000
99999 5 68237
12309 2 33218
输出样例:
在这里给出相应的输出。例如：

00000 4 33218
33218 3 12309
12309 2 00100
00100 1 99999
99999 5 68237
68237 6 -1
 */


/**
00100 6 4
00000 4 99999
00100 1 12309
68237 6 -1
33218 3 00000
99999 5 68237
12309 2 33218
 */


function revertLinkList(firstAddr, n, k, listData) {
  const addrMap = {}
  debugger
  listData.forEach(row => {
    const [addr, data, next] = row.split(' ');
    addrMap[addr] = {
      data,
      next
    }
  })

  let res = [];
  let remainNode = n;
  let next = firstAddr;
  while (res.length < n) {
    // 如果剩余长度大于等于k 则进行翻转
    if (remainNode >= k) {
      const slice = [];
      while (slice.length < k) {
        slice.unshift(next);
        next = addrMap[next].next;
      }
      res.push(...slice);
      remainNode -= k
    } else {
      // 长度小于 k，则直接拼接
      while (next != '-1') {
        res.push(next);
        next = addrMap[next].next;
      }
    }
  }

  const outPut = [];
  for (let i = 0; i < res.length; i++) {
    const addr = res[i];
    const next = i === res.length - 1 ? -1 : res[i + 1];
    outPut.push(`${addr} ${addrMap[addr].data} ${next}`)
  }
  return outPut;
}


function test(inputs) {
  const [firstLine, ...listData] = inputs.split('\n');
  const [addr, n, k] = firstLine.split(' ');
  const outputs = revertLinkList(addr, +n, +k, listData);
  console.log(outputs.join('\n'));
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


// test(
// `00100 6 4
// 00000 4 99999
// 00100 1 12309
// 68237 6 -1
// 33218 3 00000
// 99999 5 68237
// 12309 2 33218`)

// test(
// `00100 6 7
// 00000 4 99999
// 00100 1 12309
// 68237 6 -1
// 33218 3 00000
// 99999 5 68237
// 12309 2 33218`)



// gpt  感觉这次是js 方便 gpt的更通用
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseKGroup(head, k) {
  const reverse = (start, end) => {
    let prev = null;
    let curr = start;
    while (curr !== end) {
      const nextTemp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = nextTemp;
    }
    return prev;
  };

  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;
  let curr = head;

  while (curr) {
    let start = curr;
    let end = curr;
    for (let i = 0; i < k - 1; i++) {
      end = end.next;
      if (!end) {
        return dummy.next;
      }
    }

    const next = end.next;
    const reversed = reverse(start, next);
    prev.next = reversed;
    start.next = next;
    prev = start;
    curr = next;
  }

  return dummy.next;
}