import { h, render } from "preact";
import zsx from "../index";

const z = zsx(h);

const testCases = [
  ["basic span", ["span", "hello"], `<span>hello</span>`],
  [
    "with attributes",
    ["a", { href: "https://google.com" }, "link"],
    `<a href="https://google.com">link</a>`,
  ],
  [
    "nested one child",
    ["div", ["span", "nested"]],
    `<div><span>nested</span></div>`,
  ],
  [
    "nested two children",
    [
      "div",
      [
        ["span", "one"],
        ["span", "two"],
      ],
    ],
    `<div><span>one</span><span>two</span></div>`,
  ],
  [
    "style props",
    ["div", { style: { color: "red" } }, "red"],
    `<div style="color: red;">red</div>`,
  ],
  [
    "input props",
    ["input", { type: "checkbox", checked: true }],
    `<input type="checkbox" checked />`,
  ],
];

test.each(testCases)("%s", (_, input, expected) => {
  render(z(input), document.body);
  expect(document.body.innerHTML).toBe(expected);
});
