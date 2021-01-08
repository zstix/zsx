const isArray = Array.isArray;
const isString = (x) => typeof x === "string";
const isObject = (x) => typeof x === "object" && !isArray(x);

const zsx = (fn) => (node) => {
  if (isString(node)) return node;
  if (!isArray(node)) throw "Invalid type provided";

  const [a, b, c] = node;

  return !isObject(b)
    ? zsx(fn)([a, null, b])
    : isArray(c)
    ? fn(a, b, c.map(zsx(fn)))
    : fn(a, b, zsx(fn)(c));
};

export default zsx;

// --- notes

// render(zsx(h)(stuff), document.body)

// const isString = x => typeof x === 'string'
// const isArray = Array.isArray
// const arrayPush = Array.prototype.push
// const isObject = x => typeof x === 'object' && !isArray(x)

// const clean = (arr, n) => (
// n && arrayPush.apply(arr, isString(n[0]) ? [n] : n), arr
// )

// const child = (n, cb) =>
// n != null ? (isArray(n) ? n.reduce(clean, []).map(cb) : [n + '']) : []

// export const h = (x, y, z) => {
// const transform = node =>
// isString(node)
// ? node
// : isObject(node[1])
// ? {
// [x]: node[0],
// [y]: node[1],
// [z]: child(node[2], transform),
// }
// : transform([node[0], {}, node[1]])
// return transform
// }
