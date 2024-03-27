var tree = ["A", "B", "C", "D", "E", "F", "G"];
//     A
//  B     C
// D E   F G

// 前序遍历： 根节点 -> 左子树 -> 右子树   ABDECFG
// 中序遍历： 左子树 -> 根节点 -> 右子树   DBEAFCG
// 后序遍历： 左子树 -> 右子树 -> 根节点   DEBFGCA

function Node(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}
let a = new Node("a");
let b = new Node("b");
let c = new Node("c");
let d = new Node("d");
let e = new Node("e");
let f = new Node("f");
let g = new Node("g");
a.left = b;
a.right = c;
b.left = d;
b.right = e;
c.left = f;
c.right = g;

// 前序遍历
function f1(root) {
  if (root === null) return;
  console.log(root.value);
  f1(root.left);
  f1(root.right);
}
// f1(a);

// 中序遍历
function f2(root) {
  if (root === null) return;
  f2(root.left);
  console.log(root.value);
  f2(root.right);
}
// f2(a);

// 后序遍历
function f3(root) {
  if (root === null) return;
  f3(root.left);
  f3(root.right);
  console.log(root.value);
}
// f3(a);

// 根据前序中序 还原二叉树
function reBuildTree(qian, zhong) {
  if (
    !qian ||
    !zhong ||
    !qian.length ||
    !zhong.length ||
    qian.length !== zhong.length
  )
    return;
  let root = new Node(qian[0]);
  const index = zhong.findIndex((v) => v === root.value);
  const qianLeft = qian.slice(1, 1 + index);
  const qianRight = qian.slice(1 + index);
  const zhongLeft = zhong.slice(0, index);
  const zhongRight = zhong.slice(index + 1);
  root.left = reBuildTree(qianLeft, zhongLeft);
  root.right = reBuildTree(qianRight, zhongRight);
  return root;
}
let qian = ["a", "c", "f", "g", "b", "d", "e"];
let zhong = ["f", "c", "g", "a", "d", "b", "e"];
const root = reBuildTree(qian, zhong);
// console.log(root.left);
// console.log(root.right);

// 深度优先搜索： 往下查找
// 广度优先搜素： 横向查找
function deepSearch(root, target) {
  // 对二叉树来说，深度优先搜索和前序遍历的顺序是一致的
  if (root === null) return false;
  if (root.value === target) return true;
  const left = deepSearch(root.left, target);
  const right = deepSearch(root.right, target);
  return left || right;
}
// console.log(deepSearch(a, "k"));
function guangSearch(rootList, target) {
  if (!rootList || !rootList.length) return false;
  const childList = [];
  for (let i = 0; i < rootList.length; i++) {
    if (rootList[i] && rootList[i].value === target) {
      return true;
    } else {
      rootList[i].left && childList.push(rootList[i].left);
      rootList[i].right && childList.push(rootList[i].right);
    }
  }
  return guangSearch(childList, target);
}
// console.log(guangSearch([a], "k"));

// 二叉树的比较: 比较两个二叉树是否相等
function compareTree(root1, root2) {
  if (root1 === root2) return true;
  if ((root1 && !root2) || (!root1 && root2)) return false;
  if (root1.value !== root2.value) return false;
  const left = compareTree(root1.left, root2.left); // 判断左子树
  const right = compareTree(root1.right, root2.right); // 判断右子树
  return left && right;
  // 特殊条件下，左右子树互换也认为相等
  // return left && right || compareTree(root1.left,root2.right) && compareTree(root1.right,root2.left)
}

// 二叉树的diff算法 （查询新增的内容，修改的内容，删除的内容）
function diffTree(root1, root2, diffList) {
  if (root1 === root2) return diffList;
  if (!root1 && root2) {
    diffList.push({ type: "新增", origin: null, now: root2 });
  } else if (root1 && !root2) {
    diffList.push({ type: "删除", origin: root1, now: null });
  } else if (root1.value !== root2.value) {
    diffList.push({ type: "修改", origin: root1, now: root2 });
    // 修改后也需继续遍历子节点，子节点可能有改变
    diffTree(root1.left, root2.left, diffList);
    diffTree(root1.right, root2.right, diffList);
  } else {
    diffTree(root1.left, root2.left, diffList);
    diffTree(root1.right, root2.right, diffList);
  }
  return diffList;
}

// 最小生成树（有向无环图）
// 普利姆算法（加点法）任选一个点为起点，找起点周围最短的边，重复该行为，连接所有的点
// 克鲁斯卡尔算法(加边法) 先选择最短的边，保证连接的两端至少有一个点是新的（或者这个边连接两个部落），重复该行为，连接所有的点
const pointSet = ["A", "B", "C", "D", "E"]; // 点集合
const distance = [
  [0, 4, 7, max, max],
  [4, 0, 8, 6, max],
  [8, 8, 0, 5, max],
  [max, 6, 5, 0, 7],
  [max, max, max, 7, 0],
]; // 边集合

// 二叉搜索树（二叉排序树） 左子树都比当前节点小，右子树都比当前节点大
// 构建二叉搜索树
function buildSearchTree(arr) {
  if (!arr || !arr.length) return;
  const root = new Node(arr[0]);
  for (let i = 0; i < arr.length; i++) {
    addNode(root, arr[i]);
  }
  return root;
}
function addNode(root, num) {
  if (!root || root.value === num) return;
  if (root.value < num) {
    // 添加到右子树
    if (root.right === null) root.right = new Node(num);
    else addNode(root.right, num);
  } else {
    // 添加到左子树
    if (root.left === null) root.left = new Node(num);
    else addNode(root.left, num);
  }
}
// 使用二叉搜索树查找
function searchByTree(root, target) {
  if (!root) return false;
  if (root.value === target) return true;
  if (root.value < target) return searchByTree(root.right, target);
  else return searchByTree(root.left, target);
}

// 平衡二叉树  所有子树的左子树和右子树高度差不能超过1
function isBanlance(root) {
  if (!root) return true;
  const leftDeep = getDeep(root.left);
  const rightDeep = getDeep(root.right);
  if (Math.abs(leftDeep - rightDeep) > 1) {
    // 不平衡
    return false;
  } else {
    return isBanlance(root.left) && isBanlance(root.right);
  }
}
function getDeep(root) {
  if (!root) return 0;
  const leftDeep = getDeep(root.left);
  const rightDeep = getDeep(root.right);
  return Math.max(leftDeep, rightDeep) + 1;
}

// 二叉树的单旋操作（左单旋、右单旋）,按后序遍历的顺序查找,返回平衡二叉树
function change(root) {
  // if (isBanlance)
}
