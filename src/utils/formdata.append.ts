export function objectToFormData(formValues: any): FormData {
  let formData = new FormData();
  Object.keys(formValues).forEach((mainKey) => {
    const value = formValues[mainKey];

    if (Array.isArray(value)) {
      value.forEach((obj, index) => {
        Object.keys(obj).forEach((key) => {
          if (key !== 'key') {
            // Assuming 'key' is not meant to be appended
            formData.append(`${mainKey}[${index}][${key}]`, obj[key]);
          }
        });
      });
    } else {
      formData.append(mainKey, value);
    }
  });

  return formData;
}
