export const removeElementsRandomlyFromArray = <T = unknown>(array: T[], numberElementsToRemove: number) => {
  const countItemsToBeRemoved = numberElementsToRemove;

  Array.from({ length: countItemsToBeRemoved }, () => {
    const randomIndexFromIterations = Math.floor(
      Math.random() * array.length,
    );

    array.splice(randomIndexFromIterations, 1);
  });

  return array
}