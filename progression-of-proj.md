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

## Week 8 (2/21 ~ 2/27)

### 2/21/21 Sun

- Attempt to design, add wave pattern, and make mockup

### 2/22/21 Mon

- Organize issues

### 2/23/21 Tue

- meow reminded me to use `array.some()` callback functions to check for duplicate friend names before adding
- Implement error checking for adding friend name

### 2/24/21 Wed

- Begin implementing edit friend name feature

### 2/25/21 Thu

- Add edit friend feature! This is important bc I achieved this without referencing someone's guide or blog post (: Proud of myself
- Add some styling but it's not that great yet LOL come back to thiss
- Add minor error checking for editing friend name

### 2/26/21 Fri

- Begin reading beginner CSS for transitional animations (:
- Determine what needs to be styled next: how to display transaction, buttons, expand/collapse buttons. Wonder if u can over-design a button LOL

### 2/27/21 Sat

- Derrick showed me some [pretty checkboxes](https://tailwindui.com/components/application-ui/forms/form-layouts) and I tried to copy them by inspecting the CSS

## Week 9 (2/28 ~ 3/6)

### 2/28/21 Sun

- add id attribute to transaction
- outline `editTransaction` function, but not implement it yet
- add more intuitive UX: pressing "edit" the second time also closes edit tab

### 3/1/21 Mon

- attempted and failed to reverse engineer css animation of moving bottom border line of a text input down during focus

### 3/3/21 Wed

- realized, through Derrick while asking him about how to implement edit Transaction, that im confused about how props work and that's why i've been stuck

### 3/4/21 Thu

- Begin edit transaction, one part at a time!

### 3/5/21 Fri

- use `mounted()` to initialize + auto-fill form

### 3/6/21 Sat

- got InputFrom to emit!

### 3/7/21 Sun

- failed to emit to grandparent component. perhaps need to use [sync](https://vuejs.org/v2/guide/components-custom-events.html#sync-Modifier) to update the bill obj??

### 3/10/21 Wed

- sync isn't the answer. maybe `this.listeners()`? Check out this thread for help: https://stackoverflow.com/questions/42615445/vuejs-2-0-emit-event-from-grand-child-to-his-grand-parent-component
- followed stackoverflow, and changes from grandchild component are received, but it's at EVERY SINGLE EDIT, not on submit.

### 3/15/21 Mon

- solved a handful of issues, and can now edit a business name while editing transactions
- discovered sometime this past week that updating the grandparent, `TransactionList` by changing the key automatically passes down the updates to `Transaction`. Thus, `Transaction` only needs to switch back from editing status to the display status
- can now successfully edit transaction, only SIDE EFFECT is that changes to the checkboxes are automatically updated without pressing the "submit" button in `InputForm`. watch out, as this might cause undesired side effects later on, so the issue is still open. however, i still don't know how to fix this

### 3/16/21 Tue

- add calculateOwed method, without edge cases

### 3/19/21 Fri

- Handle edge case described on 3/16

### 3/20/21 Sat

- Add "read" flag to transactions, so that pressing the "Calculate" button won't recount any transactions, doubling ppl's debts.

### 3/21/21 Sun

- Add error check when adding friend names
- Now checks if the name field is empty
- suggests a random name from a list

### 3/22/21 Mon

- style (minimized) transaction box
- Review flex grow and aligning things

### 3/23/21 Tue

- complete styling transaction boxes

### 3/24/21 Wed

- clickable elements include class name `button` to change cursor to "click hand" when it hovers over a clickable obj

### 3/26/21 Fri

- draw mockup for mobile view (2/3)

### 3/28/21 Sun

- begin implementing changes from mockup!
- implement (in isolated Codepen env) lowering bottom margin line animation for text boxes on `hover`

### 3/29/21 Mon

- document the logic for this animation
- can style textbox on `focus` now, but not label
- learned about the adjacent sibling combinator `+`

### 3/30/21 Tu

- styled and animated textboxes! Yayy it looks so good

### 3/31/21 Wed

- use `refs` to modify font color on a condition

### 4/1/21 Thu

- realized an annoying bug I was trying to fix in the morning where the text color kept being white even tho I modified the ref to change it to black in some situations was caused by an external factor (something related to the browser caching or needing an update) bc it resolved itself after I restarted the tab!

### 4/2/21 Fri

- placed the two text boxes for name and cost beside each other using `flex`

### 4/3/21 Sat

- read blog post about making a beautiful button. I might want to make 1 for calculating the totals, but in the shape of a circle to boba? o;
  - form submission button should look pretty but not too fancy
  - the blog post is this https://www.joshwcomeau.com/animation/3d-button/

### 4/5/21 Tu

- finished following the 3D button tutorial and implemented a submit button for `InputForm`
- discovered and fixed a parsing bug for `cost`
- added a couple more issues
- first time in 2 weeks that I commited more than twice in a day!

### 4/6/21 Wed

- begin working on calculate button (a circular ver of the 3-D button completed yesterday)

### 4/9/21 Fri

- implement dynamic components to create tabs! :D
  - `is` attribute is a lifesaver

### 4/10/21 Sat

- add docs on dynamic components bc I know i'll forget it later

### 4/12/21 Mon

- think about how to style the tab + animations
- implement basic css w/o transitions

### 4/14/21 Wed

- been stressed about styling an active component and chose to re-augment myself by reading [blog posts](https://michaelnthiessen.com/conditional-class-binding-vue/) to gain a better understandin of `v-bind:class` and `v-bind:style` bindings for components

### 4/16/21 Fri

- worked on error checks instead
- ran into an unusual reactivity issue when resetting an array to an empty array [see issue](https://github.com/Felicious/Boba-Bill-2/issues/45)
- Derrick explained that the changes to array isn't saved by Vue because of the reactivity issue
- For more info, see this [StackOverflow](https://stackoverflow.com/questions/57834381/vue-js-clearing-an-array-content-and-reactivity-issues)

### 4/17/21 Sat

- solved reactivity issue and explained why it occurred
- error checks now deal with duplicate error msgs (I originally implemented something super complicated but Derrick suggested I just reset the array)

### 4/20/21 Tu

- successfully implemented dynamic style bindings for the first time!! the "active" tab now has a pink underline <3 Was struggling over this problem for 2 weeks at least
- made the style bindings neater by putting them in a computed function
