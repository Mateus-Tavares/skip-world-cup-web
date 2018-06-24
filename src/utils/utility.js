// Used to update objects safely. It's copies the oldObject along with the newProperties, and returns the updated object.
export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};
