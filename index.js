// TODO: remove anything not supported by browsers
// TODO: remove need for babel in tests
// TODO: add main script file
// TODO: sassy readme
const isArray = Array.isArray;
const isString = (x) => typeof x === "string";
const isObject = (x) => typeof x === "object" && !isArray(x);

// ["div", ["span", "nested"]]
const zsx = (fn) => (node) => {
  // if it's a string, just return the string
  if (isString(node)) return node;

  // if it's not an array and not a string, it's not a valid type
  if (!isArray(node)) throw "Invalid type provided";

  const [a, b, c] = node;

  // [_, b, _] if b isn't an object, call this again with null in the middle
  // [_, b, _] if b is an array, we've got children but no props - pad it
  if (!isObject(b) || isArray(b)) return zsx(fn)([a, null, b]);

  // [_, _, c] if c is an array, we've got children - run this on them
  if (isArray(c)) return fn(a, b, c.map(zsx(fn)));

  // otherwise, we're assuming that c is either a string or a a simple node
  // h("div", ["span", "nested"], ...)
  return fn(a, b, zsx(fn)(c));
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
