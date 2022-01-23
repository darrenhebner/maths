export const operators = new Map([
  ["add", "+"],
  ["subtract", "−"],
  ["multiply", "×"],
  ["divide", "÷"],
]);

export function getNewProblem() {
  const operator = Array.from(operators.keys())[
    Math.floor(Math.random() * operators.size)
  ];

  const multiplier =
    operator === "multiply" || operator === "divide" ? 12 : 100;

  const left = Math.round(Math.random() * multiplier);
  const right = Math.round(Math.random() * multiplier);

  return `/${left}/${operator}/${right}`;
}
