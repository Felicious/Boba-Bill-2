# Boba Bill

A front-end web app which tracks and calculates amounts friends owe each other for multiple transactions. Aims to simplify the accounting details when socializing and present clearly who to pay back

# To Contribute

After [installing Vue](https://vuejs.org/v2/guide/installation.html) and downloading relevant files using `git pull`, `cd` into the project's main directory and use

```
vue serve App.vue
```

to use the framework to build and view the web program on your local host.

# File Organization

This project is separated into three main components

- Friends: the users who the bills will be split between
- Transactions: details on expenditures and identifying who paid and which users participated
- Calculate: displays, by user, how much they owe and to whom

# Deployment

Using the `package.json`, where the list of dependencies and build steps are, and a `deploy.yml` file we copied from Derrick to document the build steps, we can go to the terminal and type

```
npm run serve
```

to ask node to build and deploy our project. The resulting pages that get published to the web are stored in the `dist` folder, which we added to our gitignore.

Now, we can view the project on <githubpa.com>.com>/Boba-Bill-2
