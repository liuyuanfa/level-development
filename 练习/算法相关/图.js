function Node(value) {
  this.value = value;
  this.neighbor = [];
}
const a = new Node("a");
const b = new Node("b");
const c = new Node("c");
const d = new Node("d");
const e = new Node("e");

a.neighbor.push(b);
a.neighbor.push(c);
b.neighbor.push(a);
b.neighbor.push(c);
b.neighbor.push(d);
c.neighbor.push(a);
c.neighbor.push(b);
c.neighbor.push(d);
d.neighbor.push(b);
d.neighbor.push(c);
d.neighbor.push(e);
e.neighbor.push(d);

// 深度优先搜索
function deepSearch(node, target, path) {
  if (!node === null) return false;
  if (node.value === target) return true;
  if (path.includes(node)) return false;
  path.push(node);
  let result = false;
  for (let i = 0; i < node.neighbor.length; i++) {
    result |= deepSearch(node.neighbor[i], target, path);
  }
  return Boolean(result);
}
// console.log(deepSearch(b, "g", []));

// 广度优先搜索
function bfs(nodes, target, path) {
  if (!nodes || !nodes.length) return false;
  let nextNodes = [];
  for (let i = 0; i < nodes.length; i++) {
    if (path.includes(nodes[i])) continue;
    path.push(nodes[i]);
    if (nodes[i].value === target) return true;
    else nextNodes.push(...nodes[i].neighbor);
  }
  return bfs(nextNodes, target, path);
}
console.log(bfs([b], "c", []));
