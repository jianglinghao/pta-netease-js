/**
https://pintia.cn/problem-sets/1740640628187717632/exam/problems/1740640696592629760?type=7&page=0
7-1 按格式合并两个链表

给定两个链表L1​=a1​→a2​→⋯→an−1​→an​ 和L2​=b1​→b2​→⋯→bm−1​→bm​，其中n≥2m。

需要将较短的链表L2​反转并合并到较长的链表L1​中

使得合并后的链表如下形式：a1​→a2​→bm​→a3​→a4​→bm−1​→… 

合并规则：在长链表中每隔两个元素，将短链表中的元素倒序插入。

例如：给定一个较长链表1→2→3→4→5，另外一个较短链表6→7，需要输出1→2→7→3→4→6→5

输入格式:
第一行包含两个链表的第一个节点地址（不确定哪个链表更长），以及两个链表的总节点数N(≤100000)。

节点地址用一个 5 位非负整数表示（可能有前导 0），空地址 NULL 用 −1 表示。

例如：00100 01000 7。其中00100表示第一个链表的首个节点地址，01000表示第二个链表的首个节点地址，7表示两个链表的总节点数。

接下来N行，每行描述一个节点的信息，格式如下：

Address Data Next

其中 Address 是节点地址，Data 是一个绝对值不超过100000的整数，Next 是下一个节点的地址。

保证两个链表都不为空，且较长的链表至少是较短链表长度的两倍。

输出格式:
对于每个测试用例，按顺序输出合并后的结果链表。每个结点占一行，按输入的格式输出。


输入样例:
在这里给出一组输入。例如：

00100 01000 7
02233 2 34891
00100 6 00001
34891 3 10086
01000 1 02233
00033 5 -1
10086 4 00033
00001 7 -1
输出样例:
在这里给出相应的输出。例如：

01000 1 02233
02233 2 00001
00001 7 34891
34891 3 10086
10086 4 00100
00100 6 00033
00033 5 -1

 */

function mergeLinkList(l1Addr, l2Addr, listData) {
  const addrMap = {};
  listData.forEach(row => {
    const [addr, value, next] = row.split(' ');
    addrMap[addr] = {
      value,
      next
    }
  });

  let l1Length = getLength(l1Addr);
  let l2Length = getLength(l2Addr);
  let longerHead = l1Length > l2Length ? l1Addr : l2Addr;
  let shorterHead = l1Length > l2Length ? l2Addr : l1Addr;
  let insertNodes = revert(shorterHead);
  let mergedNodes = merge(longerHead, insertNodes);


  return mergedNodes.map((node, i) => {
    // 非常奇怪的是，用 listData.length -1 标记 判断就是 0 分
    // const next = (i === listData.length - 1) ? -1 : mergedNodes[i+1];

    // 用 mergedNodes.length - 1 标记判断就是满分。两个数组的长度什么情况下会有差别呢？
    // listData 中可能会存在非两个链表中的地址!!!!

    // const next = (i === mergedNodes.length - 1) ? -1 : mergedNodes[i+1];
    const next = mergedNodes[i + 1] || -1
    return `${node} ${addrMap[node].value} ${next}`
  })

  function getLength(head) {
    let next = head;
    let count = 0;

    while (next !== '-1') {
      count++;
      next = addrMap[next].next;
    }
    return count;
  }

  function revert(head) {
    const res = [];
    let next = head;
    while (next !== '-1') {
      res.unshift(next);
      next = addrMap[next].next;
    }
    return res;
  }

  function merge(head, invertNodes) {
    let res = []
    let step = 0;
    let next = head;
    let invertIndex = 0;

    while (next !== '-1') {
      res.push(next);
      next = addrMap[next].next;
      step++;
      if (step === 2 && invertIndex < invertNodes.length) {
        res.push(insertNodes[invertIndex++])
        step = 0;
      }
    }
    return res;
  }
}

function test(inputs) {
  const [firstLine, ...listData] = inputs.split('\n');
  const [addrA, addrB] = firstLine.split(' ');
  const outputs = mergeLinkList(addrA, addrB, listData);
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
// `00100 01000 7
// 02233 2 34891
// 00100 6 00001
// 34891 3 10086
// 01000 1 02233
// 00033 5 -1
// 10086 4 00033
// 00001 7 -1`
// )