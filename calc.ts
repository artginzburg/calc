import { operate } from './operate';

/** get the precedence of the given operator */
function prec(str: string) {
  switch (str) {
    case ')':
      return 0;
    case '+':
    case '-':
      return 1;
    case '*':
    case '/':
      return 2;
    case '^':
      return 3;
    default:
      return -1;
  }
}

/** pop one operator off the stack and evaluate it */
function popOp(nums: (number | string)[], ops: string[]) {
  const op = ops.pop();
  const a = parseFloat(String(nums.pop()));
  const b = parseFloat(String(nums.pop()));

  const operated = operate(op!, a, b);
  if (operated) {
    nums.push(operated);
  }
}

/**
 * evaluate str and return numerical result
 *
 * evaluate sub-expressions in parenthesis first
 */
export default function calc(str: string) {
  let newNumF = true;
  let needOpF = false;
  const nums: (number | string)[] = [];
  const ops: string[] = [];

  for (let i = 0; i < str.length; i++) {
    switch (str[i]) {
      case '-':
        if (!needOpF) {
          nums.push(0);
          ops.push('-');
          break;
        }
      case '+':
      case '*':
      case '/':
      case '^':
      case ')':
        if (needOpF) {
          newNumF = true;
          while (prec(str[i]) <= prec(ops[ops.length -1])) {
            popOp(nums, ops);
          }
          if (str[i] === ')') {
            const open = ops.pop();
            if (open !== '(') {
              console.log("Error parenthesis: " + open);
            }
          } else {
            ops.push(str[i]);
            needOpF = false;
          }
        } else {
          console.log("Parse error: " + str[i] + " at position " + i);
        }
        break;
      case '(':
        ops.push('(');
        break;
      case ' ':
        break;
      default:
        const character = str[i] as `${number}` | '.';

        if (newNumF) {
          nums.push(character);
          newNumF = false;
        } else {
          let num = nums.pop()!;
          num = num + character;
          nums.push(num);
        }
        needOpF = true;
    }
  }
  while (ops.length > 0) {
    popOp(nums, ops);
  }
  return nums[0];
}
