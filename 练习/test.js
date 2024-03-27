function counter() {
  let num = null;
  let count = () => {
    if (typeof num !== "number") num = 0;
    else num++;
    return num;
  };
  let reset = () => {
    num = 0;
  };
  return { count, reset, num };
}
let c = counter(),
  d = counter();
c.count();
c.count();
d.count();
