/**
 * Remove item form array
 * @param {Array<*>} array the array
 * @param {*} item the item to remove
 * @returns the new array
 */
export function removeItemFromArray(array, item) {
  return array.filter((_item) => item !== _item);
}
