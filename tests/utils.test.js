import { removeItemFromArray } from '../src/utils';

describe('Utils', () => {
  test('removeItemFromArray', () => {
    let array = [];

    const item1 = {};
    const item2 = {};
    const item3 = {};

    array.push(item1, item2, item3);

    array = removeItemFromArray(array, item2);

    expect(array).toStrictEqual([item1, item3]);
  });
});
