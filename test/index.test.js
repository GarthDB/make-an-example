import test from 'ava';
import fs from 'fs';
import makeAnExample, {
  getArgsNames,
  getFuncName,
  generateArgsObj,
  generateFunctionObj,
  formatExample,
} from '../src/';

test('Get argument names', t => {
  function aFunc(arg1, arg2) {
    return [arg1, arg2];
  }
  const result = getArgsNames(aFunc);
  const expected = ['arg1', 'arg2'];
  t.deepEqual(result, expected);
});

test('Get function name', t => {
  function aFunc(arg1, arg2) {
    return [arg1, arg2];
  }
  const result = getFuncName(aFunc);
  const expected = 'aFunc';
  t.deepEqual(result, expected);
});

test('Generate Arguments Object', t => {
  // eslint-disable-next-line no-unused-vars
  function aFunc(arg1, arg2) {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  }
  const args = aFunc('value 1', 'value 2');
  const argNames = getArgsNames(aFunc.toString());
  const argsObj = generateArgsObj(argNames, args);
  const expected = { arg1: 'value 1', arg2: 'value 2' };
  t.deepEqual(argsObj.args, expected);
});

test('Generate Arguements Object with extra arguments', t => {
  // eslint-disable-next-line no-unused-vars
  function aFunc(arg1, arg2) {
    // eslint-disable-next-line prefer-rest-params
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
  // eslint-disable-next-line no-unused-vars
  function aFunc(arg1, arg2) {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  }
  const args = aFunc('value 1', 'value 2');
  const funcName = getFuncName(aFunc.toString());
  const argNames = getArgsNames(aFunc);
  const argValues = Array.prototype.slice.call(args);
  const argsObj = generateArgsObj(argNames, argValues);
  const funcObj = generateFunctionObj(funcName, argsObj);
  const expected = {
    name: 'aFunc',
    args: { arg1: 'value 1', arg2: 'value 2' },
  };
  t.deepEqual(funcObj, expected);
});

test('Format Example', t => {
  let result = '';
  function format(message) {
    result += message;
    result += '\n';
  }
  // eslint-disable-next-line no-unused-vars
  function aFunc(arg1, arg2) {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  }
  const args = aFunc('value 1', 'value 2', 'extra 1', 'extra 2');
  const funcName = getFuncName(aFunc);
  const argNames = getArgsNames(aFunc);
  const argValues = Array.prototype.slice.call(args);
  const argsObj = generateArgsObj(argNames, argValues);
  const funcObj = generateFunctionObj(funcName, argsObj);
  formatExample(funcObj, format);
  const expected = fs.readFileSync('./expected/formatted-message.txt', 'utf-8');
  t.deepEqual(result, expected);
});
test('Format Example from MakeAnExample', t => {
  let result = '';
  function log(message) {
    result += message;
    result += '\n';
  }
  // eslint-disable-next-line no-unused-vars
  function aFunc(arg1, arg2) {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  }
  const args = aFunc('value 1', 'value 2', 'extra 1', 'extra 2');
  makeAnExample(aFunc, args, formatExample, log);
  const expected = fs.readFileSync('./expected/formatted-message.txt', 'utf-8');
  t.deepEqual(result, expected);
});
test('Format Example from MakeAnExample with console.log', t => {
  // eslint-disable-next-line no-unused-vars
  function aFunc(arg1, arg2) {
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  }
  const args = aFunc('value 1', 'value 2');
  t.notThrows(() => { makeAnExample(aFunc, args); });
});
