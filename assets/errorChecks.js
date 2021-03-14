// where all the error checking occurs

let formTests = {
  /**
   * @param: empty error [] array + form data object
   * returns a mutated error array.
   *  If there are errors, the array will have content.
   */
  formIsFilled(errors, formData) {
    if (
      formData.name &&
      formData.expense > 0 &&
      formData.ppl > 0 &&
      formData.payers > 0
    ) {
      return [];
    }

    if (!formData.name) {
      errors.push("Shop name required.");
    }
    if (!formData.expense) {
      // does falsy include 0?
      errors.push("Amount spent required.");
    }
    if (formData.ppl.length === 0) {
      errors.push("People to split costs with required.");
    }
    if (formData.payers.length === 0) {
      errors.push("Payer required.");
    }

    if (!errors.length) {
      return [];
    } else {
      return errors;
    }
  }
};

export default formTests;
