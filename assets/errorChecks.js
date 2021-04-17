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

    /* check if errors array has errors inside */
    console.log("oop there are errors! begin error checking.");
    if (errors.length > 0) {
      /* TODO: handle duplicate error msg:
          user fked up data entry for the same input AGAIN >.> */

      for (let i = 0; i < errors.length; i++) {
        // check if errors[i] is empty {}
        if (() => Object.keys(errors[i]).length === 0) {
          // no previously added errors.
          // todo: check if user messed it up this time LOL
        } else {
          // ignore and don't push new error message
        }
      }
    }

    // check if name is empty
    // AND if the error is already inside the error array
    if (!formData.name) {
      errors.push({ id: "name", msg: "Shop name required." });
    }
    if (!formData.expense) {
      // does falsy include 0?
      errors.push({ id: "expense", msg: "Amount spent required." });
    }
    if (formData.ppl.length === 0) {
      errors.push({ id: "ppl", msg: "People to split costs with required." });
    }
    if (formData.payers.length === 0) {
      errors.push({ id: "payers", msg: "Payer required." });
    }

    if (!errors.length) {
      return [];
    } else {
      return errors;
    }
  }
};

export default formTests;
