// 链表的基本结构
function Node(value) {
  this.value = value;
  this.next = null;
}

let node1 = new Node(1);
let node2 = new Node(2);
let node3 = new Node(3);
let node4 = new Node(4);
node1.next = node2;
node2.next = node3;
node3.next = node4;

// 遍历链表
function eachLink(root) {
  if (root === null) return;
  console.log(root.value);
  eachLink(root.next);
}

// 反转链表
// 1 -> 2 -> 3 -> 4
// 先找到倒数第二个节点，使该节点指向null，下一个节点指向自己（3 -> null, 4 -> 3）
function reverseLink(root) {
  if (root.next.next === null) {
    // 倒数第二个节点
    root.next.next = root; // 让最后一个节点指向倒数第二个节点
    return root.next;
  } else {
    let result = reverseLink(root.next);
    root.next.next = root;
    root.next = null;
    return result;
  }
}
const result = reverseLink(node1);
eachLink(result);

// 双链表 比单链表多个pre引用
function doubleLink(value) {
  this.value = value;
  this.next = null;
  this.pre = null;
}
