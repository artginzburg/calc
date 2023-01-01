export type OperateOperator = '+' | '-' | '*' | '/' | '^';

export interface Operate {
  (op: AutoCompletableString<OperateOperator>, a: number, b: number): number | undefined;
}

export const operateDefault: Operate = (op, a, b) => {
  switch (op) {
    case '+':
      return b + a;
    case '-':
      return b - a;
    case '*':
      return b * a;
    case '/':
      return b / a;
    case '^':
      return Math.pow(b, a);
  }
};

type AutoCompletableString<T> = T | (string & {});
