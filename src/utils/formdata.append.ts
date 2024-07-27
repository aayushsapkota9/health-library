export function objectToFormData(formValues: any): FormData {
  let formData = new FormData();
  Object.keys(formValues).forEach((mainKey) => {
    const value = formValues[mainKey];

    if (Array.isArray(value)) {
      value.forEach((element, index) => {
        if (typeof element === 'object' && element !== null) {
          // Handle array of objects
          Object.keys(element).forEach((key) => {
            if (key !== 'key') {
              formData.append(`${mainKey}[${index}][${key}]`, element[key]);
            }
          });
        } else {
          // Handle array of primitive values (e.g., strings)
          formData.append(`${mainKey}[${index}]`, element);
        }
      });
    } else {
      formData.append(mainKey, value);
    }
  });

  return formData;
}
