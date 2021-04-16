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

    /* check if errors array has errors inside */
    if (errors.length > 0) {
      // remove error messages if the user has filled them since last time
      // possibly use switch statement?

      let toRemove = [];
      // it'll be ok to use a loop + switch statement bc errors can only have a max length of 4
      for (let i = 0; i < errors.length; i++) {
        console.log(errors[i][id]);
        switch (errors[i][id]) {
          case "name":
            if (formData.name) {
              // push index of the error we can remove
              toRemove.push(i);
            }
            // breaks out of switch statement right?
            break;
          case "expense":
            if (formData > 0) {
              toRemove.push(i);
            }
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
