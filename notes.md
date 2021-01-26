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

## data as a function?

In the parent(?) definition of the Vue component, [data must be returned as a function](https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function) so that both the parent and child instances can retain an independent copy of the returned data object.
