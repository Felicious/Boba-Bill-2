# Progress Blog

I have a problem with not giving myself enough credit for the amount of work I do. And I'm also not that consistent in the amount of work I put in each day. This is a place where I keep track of what I accomplished of the project each day so I can remember how much (or how little) I did.

# January

## Week 0

### 1/2/2021 Sat

- Created empty project (Boba-Bill-vue)
- "Let's be productive this January!"
- jokes I tell myself

### no date

- reading documentation on Vue, installed and used the Vue-cli, but didn't really know what was going on yet

## Week 1

1/3 ~ 1/9

- unrelated, but meowmeow was angy at me so I was too stressed to code ):
- excuses I tell myself lol, I'm just dependent on his helpu x:
- i love u meowmeow, even when i cri cri (':

## Week 2

1/10 ~ 1/16

### 1/10/2021 Sun

- Started project and created this folder locally
- Created `components` file
- finished up copying some code from this [Todo List project](https://codesandbox.io/s/o29j95wx9?file=/components/TodoListItem.vue) I found

## Week 3

1/17 ~ 1/23

### 1/20/21 Wed

- Derrick showed me the command to use Vue to generate build files ("what is the command?" u ask? I [documented it](https://github.com/Felicious/Boba-Bill-2/blob/main/notes.md#developing-using-vue)!!)

### 1/23/21 Sat

- First day of mentoring for the Tech Challenge! Happy to work with Alejandra to guide Camilla, Milca, and Melina at the Young Engineers Program (YEP)!
- made my first commit to this repo!
- First time seeing error msgs for the copied code, realized I made a couple mistakes
- addFriend method doesn't work yet, so the names the user adds into the text input box can not yet be added to the friend list
- default friends in data isn't displayed yet either

## Week 4

1/24 ~ 1/30

### 1/24/21 Sun

- fixed the bug and addFriend method works!
- wants to display the names of the checkboxes that are checked; Derrick explains that this is achieved by [emitting](https://github.com/Felicious/Boba-Bill-2/blob/main/notes.md#parent-child-components)
- Derrick mentions his housekeeper's partner caught COVID )):
- has late night talk with Steph and she encourages me to keep coding <3

### 1/25/21 Mon

- successfully gets child component `Friend` to emit to `FriendList` when a checkbox is checked
- starts to extensively write docs explaining emitting -> [see the commit](https://github.com/Felicious/Boba-Bill-2/commit/da05d1da5e2c2ea9cb9a461df02ec7f63289839f)
- untrack node_modules

### 1/26/21 Tues

- writing hella docs for emitting
- write first issue: realized unchecking the box adds an additional name to friend list when it should remove
- began this journal (:
- fixed the issue!! (:

### 1/27/21 Wed

- Add new feature: entering name saves it in both FriendList that displays a list of friends entered into the app, and checkbox choices to decide who to split between

### 1/28/21 Thurs

- Add [first mockup](https://raw.githubusercontent.com/Felicious/Boba-Bill-2/main/images/mockup/web-view-mockup-1.png); Derrick says the design was too light

### 1/30/21 Sat

- Started designing features again, even if it's ugly
  - This was hard to do, wanted a cute design before implementing ):
- Begin Transaction class

## Week 5 (1/31 ~ 2/6)

### 2/3/21 Wed

- Working on Transaction class, review form submissions
- Todo: write docs of Taiwan Cafe proj!

### 2/4/21 Thurs

- learned about `sync` modifier to achieve a 2 way binding betw parent and child for a checkbox input (something I had trouble with); DELETED bad code ><

### 2/5/21 Fri

- finished first draft of `TransactionList`
- No compilation errors, but `SplitBetw` is not displaying the checkboxes; friends seem to be inherited over fine.

### 2/6/21 Sat

- Use v-bind to pass properties from parent to child
- realize I can move the form to another component (continue tmr)
- Use `prop` to pass `friends` array from parent to child

## Week 6 (2/7 ~ 2/13)

### 2/7/21 Sun

- Begin migrating form info of `TransactionList` into `InputForm` (will continue to have problems doing this for a week)
- Realize that most of the time, u don't want child components 2-way binding with the parent and mutating the parent
  - (unlearn and stop abusing `sync`! sometimes just using `prop:` to pass info from parent -> child is enough)

### 2/10/21

- Kinda sad, but Derrick reminded me that I can use Console to debug web apps in the browser
- Gave unique IDs to the same options of different components (this was causing a bug that added Bunbun to a list of selectedFriends when clicking on Bunbun from the list of payers, a different list!)

~ Stopped coding because I was preparing for Lunar New Year ~

## Week 7 (2/14 ~ 2/20)

### 2/15/21 Mon

- Started coding again today but I didn't get much done x.x
- Confused about `reactive` properties. [doc](https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties)

### 2/16/21 Tue

- Still stuck on the bug ):
- Derrick reminds that even he had experienced being stuck with trying to fix one bug for days, and that I shouldn't feel dumb or anything for getting stuck. I love him (: and should be proud of myself too

### 2/17/21 Wed

- resolved the most annoying bug that I was stuck on for more than a week, and it was all because I placed the method outside of the Vue instance by accident!! It was simply a misplaced comma and '}'!!! Grrr

### 2/18/21 Thu

- spent all day reading about `computed` and `watch`, not sure if i completely get it. [Useful blog post](https://zaengle.com/blog/using-v-model-on-nested-vue-components)
- Successfully emitted form data, but did not use the fancy computed and watch functions I struggled to learn about all day. Used anti-climactic solution of storing form data in temporary object and emitting it
- Very odd because this was the first solution I tried but it failed because I made a syntax mistake while initializing the temp object (`localForm`) and tried it again as the last, at-my-wits-end attempt, and it worked!
- kinda felt like i wasted my whole day but whatever LOL

### 2/19/21 Fri

- Can emit form data now, but how can you call method to add the form data into the `transaction` array?
- use v:on! (: Figured something out quite quickly!
- added docs on this
- Add/organize Issues to keep track of project progress

### 2/20/21 Sat

- Add docs on new things I learned this week (:

### 2/21/21 Sun

- Attempt to design, add wave pattern, and make mockup

### 2/22/21 Mon

- Organize issues
