# Developing using Vue

```
vue serve App.vue
```

As usual, Derrick taught me this. Vue is a UI **framework**, which provides foundation for software developers to build web programs. While this is the general definition of a framework, I'm not too sure how a UI framework is distinct from this definition, but I guess I'll learn as I go.

**how is this diff from gcc**
vue serve app.vue preprocesses ???

gcc is compiler
run the outputed binary filename.o

we use vue (UI framework)

# Things I should prob use

## Props

"Child components are like functions, and props are like arguments. Can use props to pass stuff"

[an example](https://vuejs.org/v2/guide/components.html#Passing-Data-to-Child-Components-with-Props)

## Parent-Child Components

In the early stages of my project, I was confused about everything that was going on and I couldn't describe my questions without really circumstantial questions regarding my code with screenshots. Derrick articulated my question best:

> The checkbox is in Friend component but you want to have a list of what's checked in the FriendList parent component?

The reason why my code didn't work was because **props** are for passing data only from parent to child, so if you want to pass it the other way, in Vue, you [emit events](https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events).

Derrick explains colloquially that

> "something" can emit events and another part of your code can listen for those events and run stuff based on those events.
> So parent waits for x to happen, then when you, for example, click a child, it yells "I got clicked!" and parent hears it and runs some code

# Explaining my code

### Documentation of the instance of emitting in my project (:

I'm super proud of when I finally learned how to allow the parent component to listen for a response from the child component!

In this super clear example of how to [emit child events](https://vuejs.org/v2/guide/components.html#Listening-to-Child-Components-Events), one thing I was a little confused about was which code snippets belonged in the parent and child components. So first, I'd like to clarify that code snippets 1, 2, and 4 are in the parent components. Code snippets 3 and 5, the ones relating to the `<button> Enlarge text </button>` and `$emit` are in Child.

#### explaining the example

To summarize what the example in the Vue docs illustrates, you need to do 4 things to enable the parent component to listen for child events:

1. a data property in the Vue component declaration to store the information you're listening for from the Child component (this is `postFontSize` from code snippet 1 from the Vue docs example)
   - located in parent component, written in [java]`<script>`
2. specify using the data property you declared, where this information will be presented in the template (code snippet 2)
3. Use the `v-on` directive while calling the child to listen for an event in child (in this case, when the button is pressed), and run some Javascript (which is to increment `postFontSize`) when the child is triggered. (an example of this is in code snippet 4)
   - both this and #2 are in the parent component, in the `<template>` section
4. Include `v-on:...="$emit('...')"` in the HTML element that will communicate a user's response back to the parent (code snippet 5)
   - located in the child component

#### Emitting (obsolete but simple ex. nonetheless)

Long after this project is over, I might forget how exactly I emitted information from the Child component back to the parent, so I'll show code snippets of my code as examples for each of the numbered parts I explained in the section above.

1. Variable declaration `selectedFriends` in the Vue component that will store the results of what we're listening for in the Child component. [link to repo](https://github.com/Felicious/Boba-Bill-2/blob/8c0cca3576cbcfc39bdab9551978fb3a9a3e40fe/components/FriendList.vue#L50)

```js
export default {
  components: {
    InputText,
    Friend
  },
  data() {
    return {
      ... ,
      selectedFriends: []
    };
  },
  methods: {
    ...
  }
};
```

2. Where the results of the response from the Child component will be displayed. [link](https://github.com/Felicious/Boba-Bill-2/blob/8c0cca3576cbcfc39bdab9551978fb3a9a3e40fe/components/FriendList.vue#L22)

```html
<p>{{ selectedFriends }}</p>
```

3. The `FriendList` component listens for `select-friend` events from its children `Friend` and runs the provided event handler `"selectedFriends.push(friend.text)"` when it receives a `select-friend` event. [link](https://github.com/Felicious/Boba-Bill-2/blob/8c0cca3576cbcfc39bdab9551978fb3a9a3e40fe/components/FriendList.vue#L20)

```html
<Friend
  v-for="friend in friends"
  :key="friend.id"
  :name="friend"
  v-on:select-friend="checkboxHandler(friend)"
/>
```

4. Inside the Child component, the `v-on` listener will notify the parent in the event of a `select-friend`-- which occurs when the checkbox is clicked. [link to repo](https://github.com/Felicious/Boba-Bill-2/blob/8c0cca3576cbcfc39bdab9551978fb3a9a3e40fe/components/Friend.vue#L5)

```html
<input type="checkbox" id="checkbox" v-on:click="$emit('select-friend')" />
```

5. Then, in a class method (which is called by `v-on` modifier in parent), I saved the names of the friends who were checked in this array called `selectedFriends` using this method:

```js
/* @param: instance of friend; {id: someNum, text: "name"}
     * returns: name of friend added/removed from selectedFriends list
     */
    checkboxHandler(friend) {
      // if name is in list, remove name
      if (this.selectedFriends.find(element => element === friend.text)) {
        /* why is it so complicated to remove an item from an array?
          splice requires 1) index of thing you're removing
          2) num of things you're removing*/
        this.selectedFriends.splice(
          this.selectedFriends.indexOf(friend.text),
          1
        );
      } else {
        this.selectedFriends.push(friend.text);
      }
    }
```

#### 2 way binding by emitting

Problem: I had difficulty allowing for the exchange of data between parent and child components using emitting. As demonstrated above, I had to write a function in the parent `TransactionList` to both save and remove the name from the array `selectedFriends`, and I felt like Vue should have an easier way to do all of this.

I could achieve this behavior by using the `sync` modifier and a getter and setter in the `computed` part of the child component. From [StackOverFlow](https://stackoverflow.com/questions/62429355/check-uncheck-a-checkbox-in-a-child-component-with-vuejs)

**TL;DR** of what's happening in the code:

`.sync` is used in the parent component while calling the child, and `cats` is the temporary array that stores the emitted responses from the child. Inside the child's method, the child does (`update:cats`, [info that child component is passing back to the parent]).

```
< SplitBetw :cats.sync="selectedFriends">

// inside child component, method section:
this.$emit('update:cats, newValue);
```

The long explanation, with examples of this phenomenon in my code to follow.

1. While passing the array to the child component, an additional [.sync modifier](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) is used on `cats`, a temporary array that stores the emitted responses from the child. The responses are then safely stored in `selectedFriends`.

```html
<SplitBetw
  v-for="friend in friends"
  :key="friend"
  :name="friend"
  :cats.sync="selectedFriends"
/>
```

- `:key` is used so that Vue can understand how to loop and go through your array. Typically, key is the index or a unique name.
- I used `:name` to change friend into name on the child-level, so that the component uses `name` to refer to a single friend. The variable `friend` does not exist on the child-level, even though it does on the parent.
- `selectedFriends` is an array in the parent that will store the emitted responses (checked checkboxes in this case) from child. It is found within `data()` of `TransactionList`.

2. Moving onto the child component, the `input` tag for the checkbox requires the `v-model` to be set to a function defined in the `computed` section of the component. I named this function `updateCheckbox`, and it is under this function where the getter and setter is defined.

```html
<label for="{name}">
  <input
    v-model="updateCheckbox"
    type="checkbox"
    id="{name}"
    :value="{ name }"
  />
  {{ name }}
</label>
```

3. The getter and setter. Again, `cats` is a temporary place to store the emitted value the child will send back to parent. Remember to include `cats` in prop!

```js
export default {
  props: {
    // return selected checkboxes to selectedFriends
    cats: Array,
    ...
    }
  },
  computed: {
    updateCheckbox: {
      get() {
        return this.cats;
      },
      set(newValue) {
        this.$emit("update:cats", newValue);
      }
    }
  }
};
```

4. Going back to the `input` tag declaration, I had a [bug](https://github.com/Felicious/Boba-Bill-2/issues/8) where clicking on one checkbox checked them all, and it was fixed by including the `:value = {name}` modifier! So don't forget it.

### TODO: give example and explantion from own code

## data as a function?

In the parent(?) definition of the Vue component, [data must be returned as a function](https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function) so that both the parent and child instances can retain an independent copy of the returned data object.

## The importance of gitignore

node_modules are build packages generated by Vue for my project and can grow to an **astronomical** size, hence this joke shared by Derrick:
![1](images/documentation/node_modules.png)

Therefore, it's important to include node_modules in your .gitignore file, but if you already committed the node_modules file before adding the .gitignore, you need to untrack the directory and remove it from git, while keeping the file
`git rm -r --cached node_modules`

## Checkboxes

God were they unexpectedly difficult to get right ^^;

I used many components to organize my data, so the parent component always passed a string (the name of the friend) to the checkbox components, so that the checkbox components would generate the checkboxes themselves. (see the relationship between `TransactionList` and `SplitBetw`)

However, this meant the the child component, SplitBetw, had to [emit the checked checkboxes back to the parent](https://github.com/Felicious/Boba-Bill-2/blob/main/notes.md#2-way-binding-by-emitting). This emitting behavior is basically the child component telling the parent which checkbox has been clicked.

## Migrating a Form to a New Component

By this stage of development, my project has started to have quite a few components, and with many components requires more knowledge of how to pass data between components.

### Potential Errors when using Repeated Components

When re-using components, for example in my project when I re-used the `SplitBetw` component to display the list of checkboxes selected from both the "Split Between" and "Payers" section. For example, I have the following friends to choose from each section:

```
{"Split Between": [Derrick, Bunbun]}
{"Payers": [Derrick, Bunbun]}
```

Since I had set the `id` of the checkbox input in `SplitBetw` to simply be the name (ie. "Derrick"), clicking on the checkbox for "Split Between"'s Derrick also checked the box for "Payer"'s Derrick. Therefore, the `id` needed to not only contain the name but the section ("Split Between" or "Payers") as well.

**Problematic**:

```html
<input type="checkbox" :id="name" ... />
<label :for="name">
  {{ name }}
</label>
```

**Fixed bugs** (for now):
Out in the parent component, the `name` and `type` are passed in:

```html
<h2>Payers</h2>
<SplitBetw
  v-for="friend in friends"
  :name="friend"
  type="payers"
  :key="friend"
  :returnedCheckboxes.sync="selectedPayers"
/>
```

To ensure that the child component `SplitBetw` knows what those two values `name` and `type` are, make sure to include them in the `props` section of the Vue instance!

```js
export default {
  props: {
    // sync-ed with parent, parent receives an arr selectedFriends
    returnedCheckboxes: Array,

    // local re-name of "friend", so the ids can be unique across diff iterations of SplitBetw component
    name: String,
    type: String
  },
  ...
};
```

In the child component, the html portion:

```html
<!-- now, ids are unique across diff iterations of component-->
<input
  :id="name + type"
  v-model="updateCheckbox"
  type="checkbox"
  :value="name"
/>
<label :for="name + type">
  {{ name }}
</label>
```

#### Explanation of what `v-model` and `:value` do

`v-model` syncs the checkbox with the function `updateCheckbox`. Thus, every time a certain checkbox is clicked or unclicked, this function updates the `returnedCheckboxes` array that returns the list of friends selected from this component.

This is why the `:value` of the checkbox must be set to the name of the friend, as the getter and setter use `value` to add/remove the name from the `returnedCheckboxes` array that is emitted back up to the parent component, `InputForm`

### Unexpected usage of v-model

Up until this point, I had used v-model to save an input value to an initialized variable in the Vue instance, such as these code snippets from [InputForm](https://github.com/Felicious/Boba-Bill-2/blob/main/components/InputForm.vue)

```html
<input id="expense" v-model="yourExpense" ... />
```

```js
export default {
  ...
  data() {
    return {
      ...
      yourExpense: "",
    }
  },
  methods: {
    checkForErrors:{
      ...
      // then do something with the input u got
      this.yourExpense
    }
  }
};
```

However, it was the first time I saw v-model used to **trigger a function** like [here](https://github.com/Felicious/Boba-Bill-2/blob/main/notes.md#Explanation-of-what-v-model-and-:value-do). please look above in the previous section for the example! it's really interesting.

#### what is value used for?

By default, `v-model` uses `value` as a prop! [This can be modified](https://vuejs.org/v2/guide/components-custom-events.html#Customizing-Component-v-model), however

## Nested Vue Components

I found this [blog](https://zaengle.com/blog/using-v-model-on-nested-vue-components) while working with nested Vue components that was sooo useful!

## WHAT IS THE COMPUTED THING

Apparently, it's a [computed setter](https://vuejs.org/v2/guide/computed.html#Computed-Setter)

"which allows us to both receive a dynamic value as well as call a function when we attempt to change that value." - zaengle blog

?? still have many questions. get to this later LOL

**HOWEVER** the example noted in the docs doesn't work for our use case.

NO!! :

```js
computed: {
  localForm: {
      get() { return this.value },
      set(localForm) {this.$emit('input', localForm)}
  }
```

"`v-html` should only used when you want to render HTML content from a variable"

### Use v-on to send data + call parent's method from child

I learned this from this [StackOverFlow post](https://stackoverflow.com/a/61998896) that when emitting a value from the child component, in the parent component, you can:

1. Bind the emitted variable to a parent-level property like this:

```html
<InputForm :friends="friends" :emit-form.sync="newTransaction" />
```

so that the emitted `localForm` object (from the child using this call: `this.$emit('update:emit-form', this.localForm);`) is saved to the parent-level property `newTransaction`. You can then take this `newTransaction` property and add it to the list of transactions you have in the component, OR

2. Directly use `v-on` to listen for the child-level emit event `update:emit-form` to be called in the child `InputForm` and call the parent-level method `addTransaction`.

```html
<InputForm :friends="friends" @update:emit-form="addTransaction" />
```

Conveniently, the second field of the emit statement used in the child (so `this.localForm`) is the **parameter** of the method you will declare in parent!

```js
methods: {
    // @param: returned form data from InputForm
    addTransaction(newTransaction) {
      console.log("Adding a transaction");
      this.transactions.push(newTransaction);
    }
  }
```

So in this method, you can directly add the emitted object from child into the list `transactions` in parent! This is a better solution for this situation compared to the first because the 1st only handles passing the form object from the child, whereas the second handles both passing the object and triggering a method to add the object to the list `transactions`.

### Hovering with Vue

I had been following this [blog post](https://michaelnthiessen.com/hover-in-vue/) on how to toggle hovering over components on Vue to toggle visibility of an edit name button next to the name itself.

**The how-to**:
In the parent component `FriendList`, I included `v-on` (the @) to listen to the child component for a new edited friend name, if any.

```html
<ol>
  <Friend
    v-for="friend in friends"
    :key="friend"
    :name="friend"
    @update:emit-name="editName"
  />
</ol>
```

Inside the child component `Friend`, each `for` loop passes in a friend name that needs to be created into a list item. I used `v-on` to listen for when the mouse hovers over the specific list item, like "1. Derrick", and this toggles the visibility of the `edit` button.
``html

<li @mouseover="hover = true" @mouseleave="hover = false">
  {{ name }}
  <a class="link" v-show="hover" @click="edit = true">edit</a>
</li>
```

`hover` and `edit` are both booleans I initialized in this component to help me keep track of which elements I want to show.

#### v-if vs v-show

So far, I've only used `v-if`, but the difference (described in the [docs](https://vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)) is that event listeners and components are actually created and destroyed on toggle with `v-if`. On the other hand, elements tagged with `v-show` are always rendered, with css-based toggling.

> "Generally speaking, v-if has higher toggle costs while v-show has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime."

Therefore, I used `v-show` to toggle the edit button in `Friend.vue` that becomes visible on hover, and `v-if` for editing the name, as the components for that operation would only be generated when the user clicks on the "edit" button, and not on render.

# Design Thoughts

## Fonts

So far, my **not finalized** font choices are

- [Biorhyme](https://fonts.google.com/specimen/BioRhyme?preview.text_type=custom&sidebar.open=true&selection.family=BioRhyme#standard-styles) for headings
  - I found these font recommendations from this [blog post](https://www.typewolf.com/biorhyme)
- [Varela Round](https://fonts.google.com/specimen/Varela+Round?preview.text_type=custom&sidebar.open=true&selection.family=BioRhyme|Varela+Round&query=vare) for the body
- [Cute Font](https://fonts.google.com/specimen/Cute+Font?preview.text_type=custom&sidebar.open=true&selection.family=BioRhyme|Varela+Round&query=cute+), my most questionable choice, is for displaying restaurant names in the boba balls

```

```

# Refactoring

## Using js functions from another file

Following this [StackOverFlow post](https://stackoverflow.com/questions/43608457/how-to-import-functions-from-different-js-file-in-a-vuewebpackvue-loader-proje), I was able to import functions from a local js file in order to move the error checking functions out to an external file so I don't have to look at it while debugging component stuff!

To do this, I must export the error checking functions as an object that I named `formTests`

```js
let formTests = {
  formIsFilled() {
    // error checking to see if all form fields are filled
  }
};

export default formTests;
```

This all was written in a file I named "errorChecks.js"

Then in the Vue component I wish to use these functions in, I must include the relational file path and the name of the file that contains the js tests.

```js
import formTests from "../assets/errorChecks.js";
```

where the file organization is as follows

```
- assets
  -errorChecks
- components
  - current Vue component
```

Then when I want to use the function `formIsFilled` from another js file in the Vue component, I simply call

```js
formTests.formIsFilled();
```

## Flexbox tips for self

1. Use a container to wrap elements in a row.
   - containers are the bread and butter of flexbox. My naming scheme for these wrappers are \_\_\_Container
   - Without containers, you can't align
2. `align-items` to vertically align html elemnts. [See ex](https://css-tricks.com/almanac/properties/a/align-items/)
3. Use `justify-content` to determine space between each other. [See examples](https://css-tricks.com/almanac/properties/j/justify-content/)
   - Most notable example is like when u write a diary entry, maybe u have the title aligned left, and the date aligned right on the same line. You'd use `justify-content: space-between` on the container wrapping those two `<span>` elements to display them on opposite ends
4. Use `column-gap` within a container to put space between elements

- ex:

```css
.buttonsContainer {
  margin: 0 1rem; /*space between elements*/
  display: flex;
  column-gap: 0.5rem;
}
```

# My Animation Struggles

## animating the text box

When collecting text inputs, I wanted to animate the bottom of the input box expanding when the user focuses on the text box.
Visualizing the behavior, this is an unselected text box vs a text box that's being typed in

```
Name        Name
____        Feli
            --------
```

**note about focus** that I initially made a mistake with: "focus" is a state only applied to inputs, so I couldn't `focus` on a `<div>`, only a button, text box, and etc.

## Coding the Animation

Inside `InputText.vue`, the html for the input text box, I need a container (in this case, it is the `label`) that encapsulates everything.

```html
<label :for="question">
  Name
  <br />
  <input type="text" id="question" />
  <!-- styling for the line is found in Stylesheet.css -->
  <span class="line"></span>
</label>
```

Thus, when the `input` is **focused**, the label and line both need to respond by:

1. changing color to pink and
2. line needs to be animated traveling down.

**To achieve this behavior**, Derrick suggested that I use the [adjacent sibling combinator](https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator) `+` to indicate that I'd like to **style** the **second** html element when the **first** element is focused.

```css
/* adjacent sibling combinator in use
  animation for focus enter  */
#name:focus + .line {
  transition: transform 125ms;
  transform: translateY(10px);
  border-color: #f09381;
}

/* animation for when focus leaves */
.line {
  will-change: transform;
  transition: transform 450ms;
}
```

[StackOverflow](https://stackoverflow.com/questions/4502633/how-to-affect-other-elements-when-one-element-is-hovered) post that helped me figure out which combinator to use.

To animate the label, I took advantage of `focus-within`.

I initially ran into an obstacle while animating this because the focus element, the text input, is sandwiched between the label and line, which both required css animations. However, adjacent combinators like `+` and `~` discussed only serve to style elements that come after the focused element. Therefore the label can't be animated with simply those combinators.

To solve this, I moved the input and line elements into the `<label>` element (since i remembered that u could treat the label as a wrapper), so the label is now the container holding the `<input>`. This works, because `focus-within` styles the container when the input element inside is focused.

Therefore, the css animating the label (when the label is the container) is

```css
label:focus-within {
  color: #f09381;
}
```

### Conditional Styling

What happens when I use a component for two different instances, once on white background, and another on black background, and the black text cannot be seen on black background?

Check this [issue](https://github.com/Felicious/Boba-Bill-2/issues/35) for an image showing this problem!

The font color depended on a conditional, and how would you implement this in Vue?

In my two instances of `InputForm`, the empty form was on white background, and modify-able, filled out form on black background. Thus, to determine whether the font should be black or white, I needed to know whether the form was empty or not.

Fortunately, upon creation of a form, my `initEdits()` method executes only when the form is filled in advance, so I added to this method, directly changing the font color to `white`.

```js
initEdits(){
  // if form is filled
  if(this.autoFillFormData){
  ...

  /* directly manipulate InputText to change font color
      of input to white so it can be seen on black background */
  this.$refs.busnInput.changeColor();
  }
}
```

#### How to directly modify styles for a child component

In the parent, I marked the child component I'm going to be directly modifying with a `ref`

```html
<InputText v-model="localForm.name" question="Business name" ref="busnInput" />
```

Inside the child, since I wanted to change the font color of the `<input>` element only and nothing else, I also marked the input element with a `ref`

```html
<label>
  {{ question }}
  <br />
  <input type="text" ... ref="input" />
</label>
```

**note:** Notice that the `ref` names are different!

Then, I defined in the child component `InputText` a method that the parent will call to change the color of the `<input>` element to white.

```js
methods: {
  changeColor: function() {
    this.$refs.input.style.color = "white";
  }
}
```

Then, back in the parent `InputForm`, we can use

```js
this.$refs.busnInput.changeColor();
```

to call the child component's method from the parent and change the font color to white!
