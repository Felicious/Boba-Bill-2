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

Todo: add documentation on this LOL

By this stage of development, my project has started to have quite a few components, and with many components requires more knowledge of how to pass data between components.
