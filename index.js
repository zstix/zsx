// TODO: remove anything not supported by browsers
// TODO: sassy readme
// TODO: package.json improvements
const isArray = Array.isArray;
const isUndefined = (x) => x === undefined;
const isString = (x) => typeof x === "string";
const isObject = (x) => typeof x === "object" && !isArray(x);

const DEBUG = false;

// ["a", { href: "https://google.com" }, "link"]
const zsx = (h) => (node) => {
  // if it's a string, just return the string
  if (isString(node)) return node;

  // if it's not an array and not a string, it's not a valid type
  if (!isArray(node)) throw "Invalid type provided";

  const [a, b, c] = node;
  if (DEBUG) console.log(`[${a}, ${b}, ${c}]`);

  // [?, o, u]
  // if we have two elements, and the second is an object, call fn
  if (isUndefined(c) && isObject(b)) return h(a, b);
  if (DEBUG) console.log("--- (1)");

  // [?, ?, u]
  // if we have two elements otherwise, shift b over
  if (isUndefined(c)) return zsx(h)([a, null, b]);
  if (DEBUG) console.log("--- (2)");

  // [?, ?, s]
  // if c is a string, great - just call the h
  if (isString(c)) return h(a, b, c);
  if (DEBUG) console.log("--- (3)");

  // [?, ?, z]
  // if c is an zsx array (not nested array)
  if (isArray(c) && !isArray(c[0])) return h(a, b, zsx(h)(c));
  if (DEBUG) console.log("--- (4)");

  // [?, ?, a]
  // if c is an array of arrays, map over it
  if (isArray(c) && isArray(c[0])) return h(a, b, c.map(zsx(h)));
  if (DEBUG) console.log("--- (5)");
};

module.exports = zsx;
