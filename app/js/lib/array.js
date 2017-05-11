

/**
 * Group an array of values by the return value of a function.
 *
 * This function takes an array and groups all members of it using the return
 * value of the passed function.
 *
 * @param {Array[a]} arr - input array
 * @param {a -> b} groupFunction - function to use to group array values
 */
const groupBy = (arr, groupFunction) => (
  arr.reduce((grouped, element) => {
    let key = groupFunction(element);
    (grouped[key] = grouped[key] || []).push(element);
    return grouped;
  }, {})
);

export { groupBy };
