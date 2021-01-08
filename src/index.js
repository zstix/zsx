import { h, render } from 'preact';

// --- helpers

const addHtml = (html) => document.body.innerHTML += `\n${html}`;
const addCode = (code) => addHtml(`<textarea cols=40 style="border:none;background:lightgray;">${code}</textarea>`);

const test = ({ label, expected, actual }, i) => {
	const $expected = document.createElement('div');
	const $actual = document.createElement('div');

	render(expected, $expected);
	render(actual, $actual);

	const e = $expected.innerHTML;
	const a = $actual.innerHTML;
	const passed = e === a;

	const style = `font-size:1.5em;font-weight:600;margin-top:1em;color:${passed ? 'green' : 'red'}`;
	addHtml(`<div style="${style}">(${i+1}) ${label}: ${String(passed)}</div>`);
	addHtml(`<i>Expected:</i><br />`);
	addCode(e);
	addHtml(`<i>Actual:</i><br />`);
	addCode(a);

	// console.log(`-------- (${i + 1}) ${label}: ${expected == actual}`);
	// console.log('expected', expected);
	// console.log('actual  ', actual);
}

// -- input

const vPreact = h('div', null, ['woah', ' ', h('span', null, 'preact')]);

const input = ['div', ['woah', ' ', ['span', 'new stuff']]];

// --- implementation

const isArray = Array.isArray;
const isString = (x) => typeof x === 'string';
const isObject = (x) => typeof x === 'object' && !isArray(x);

const zsx = (fn) => (node) => {
	if (isString(node)) return node;
	if (!isArray(node)) throw "Invalid type provided";

	const [a, b, c] = node;

	/*
	console.log('---');
	console.log('[a]', a);
	console.log('[b]', b);
	console.log('[c]', c);
	console.log('[*]', 'b is not an object', !isObject(b));
	console.log('[*]', 'c is an array', isArray(c));
	*/

	return !isObject(b)
		? zsx(fn)([a, null, b])
		: isArray(c)
			? fn(a, b, c.map(zsx(fn)))
			: fn(a, b, zsx(fn)(c))
};

const z = zsx(h);

// --- test

const testCases = [
	{ // pass
		label: 'basic span',
		expected: h('span', null, 'hello'),
		actual:   z(['span', 'hello']),
	},
	{ // pass
		label: 'with attributes',
		expected: h('a', { href: 'https://google.com' }, 'link'),
		actual:   z(['a', { href: 'https://google.com' }, 'link']),
	},
	{ // pass
		label: 'nested one child',
		expected: h('div', null, h('span', null, 'nested')),
		actual:   z(['div', ['span', 'nested']]),
	},
	{ // pass
		label: 'nested two children',
		expected: h('div', null, [h('span', null, 'one'), h('span', null, 'two')]),
		actual:   z(['div', [['span', 'one'], ['span', 'two']]]),
	},
	{ // pass
		label: 'style props',
		expected: h('div', { style: { color: 'red' } }, 'red'),
		actual:   z(['div', { style: { color: 'red' } }, 'red']),
	},
	// { // ?
		// label: 'input props',
		// expected: h('input', { type: 'checkbox', checked: true }),
		// actual:   z(['input', { type: 'checkbox', checked: true }]),
	// }
];

testCases.map(test);

// --- run

const todos = [
	{ label: 'create zsx', done: true },
	{ label: 'write example', done: false },
	{ label: 'write tests', done: false },
	{ label: 'publish package', done: false }
];

const TodoItem = ({ label, done }) =>
	['li', [
		['input', { type: 'checkbox', checked: done }],
		['span', label]
	]];

const TodoList = (list) => ['ul', list.map(TodoItem)];

// const App = TodoList({ todos });
// const App = TodoItem(todos[0])

// render(zsx(h)(App), document.body);

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
