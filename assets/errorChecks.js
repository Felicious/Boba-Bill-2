// where all the error checking occurs

let formTests = {
  /**
   * @param: error array (of objs) + form data object
   *
   * returns a mutated error array.
   *  If no errors, the array will be empty: [].
   *
   *  a non-empty error array will always be length === 4:
   *  ex: 1 error in payers will be stored as
   *    [ {}, {}, {}, {id: "payers", msg: "u errored"}]
   *
   * to check if obj is empty, use `Object.keys()`
   *
   */
  formIsFilled(errors, formData) {
    console.log("starting error checking!");
    console.log(`current errors: ${errors}`);
    if (
      formData.name &&
      formData.expense > 0 &&
      formData.ppl > 0 &&
      formData.payers > 0
    ) {
      console.log("no errors! (:");
      return [];
    }

    // clear residual errors from last time
    // note: cannot use errors = []
    errors.splice(0);

    // check if name is empty
    // AND if the error is already inside the error array
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
      console.log("errors we end up with:");
      console.log(errors);
      return errors;
    }
  }
};

export default formTests;
