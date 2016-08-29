import test from 'ava';
import MakeAnExample, {
  getArgsNames,
  generateArgsObj,
  generateFunctionObj,
  formatFunction,
} from '../src/';

test('Get argument names', t => {
  function aFunc(arg1, arg2) {
    return [arg1, arg2];
  }
  const result = getArgsNames(aFunc);
  const expected = ['arg1', 'arg2'];
  t.deepEqual(result, expected);
});

test('Generate Arguments Object', t => {
  function aFunc(arg1, arg2) {
    return arguments;
  }
  const args = aFunc('value 1', 'value 2');
  const argNames = getArgsNames(aFunc);
  const argValues = Array.prototype.slice.call(args);
  const argsObj = generateArgsObj(argNames, argValues);
  const expected = { arg1: 'value 1', arg2: 'value 2' };
  t.deepEqual(argsObj.args, expected);
});

test('Generate Arguements Object with extra arguments', t => {
  function aFunc(arg1, arg2) {
    return arguments;
  }
  const args = aFunc('value 1', 'value 2', 'extra 1', 'extra 2');
  const argNames = getArgsNames(aFunc);
  const argValues = Array.prototype.slice.call(args);
  const argsObj = generateArgsObj(argNames, argValues);
  const expected = {
    args: { arg1: 'value 1', arg2: 'value 2' },
    extraArgs: ['extra 1', 'extra 2'],
  };
  t.deepEqual(argsObj, expected);
});

test('Generate Function Object', t => {
  function aFunc(arg1, arg2) {
    return arguments;
  }
  const args = aFunc('value 1', 'value 2', 'extra 1', 'extra 2');
  const funcName = args.callee.name;
  const argNames = getArgsNames(aFunc);
  const argValues = Array.prototype.slice.call(args);
  const argsObj = generateArgsObj(argNames, argValues);
  const funcObj = generateFunctionObj(funcName, argsObj);
  const expected = {
    args: { arg1: 'value 1', arg2: 'value 2' },
    extraArgs: ['extra 1', 'extra 2'],
  };
  t.deepEqual(funcObj, expected);
});
