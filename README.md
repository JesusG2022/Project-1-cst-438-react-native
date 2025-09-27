# CST 438 Poetry Blog Project

This is a CST 438 project about creating a poetry blog with a word of the day using an API.

# Project 01 Retrospective and overview

Github Repo: https://github.com/JesusG2022/Project-1-cst-438-react-native

## What to add to this project

- Start by typing in the terminal
- npm i
- npm start (and choose what device you want it).

## If you error with SQL and react-native use this:

- npm install react-native @types/react-native
- npm install expo-sqlite

## How to navigate

- Home page shows daily posts
- The accounts page shows all existing users, and clicking their name shows all their posts
- Word shows the daily word and its definition, synonyms, and antonyms
- My Posts shows logged-in users' posts
- Search for a word that appears in a poem

## Future features

- Sort posts by date
- Favorite poems

# Overview

This is a poetry posting app, Poet’s Pick, that utilizes an API called ‘Free Dictionary API’ and
another called ‘Random Free Random Word Generator API’. Here, the user can create
and log in, where they will be suggested a random word of the day and create a poetry post that
other users can view based on that given word. These were stored in a local database as a
result. Users would also be able to modify their posts to edit what they made. This was built
through React Native that consumed information from a REST API and used a local database
for caching.

- Free Dictionary API: https://dictionaryapi.dev/
- Random Free Random Word Generator API: https://random-word-api.vercel.app/

We got styling help for this document from this guide and this guide.
- Guide 1: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax
- Guide 2: https://google.github.io/styleguide/

# Introduction

How was communication managed:

- Communication was mainly managed via Slack, Google Docs, and a group chat with our
    personal phone numbers. The group chat was mainly used to notify team members if we
    had a pull request to be merged, any questions we had, and anything we needed to let
    members know about availability and projected issues.
- Through Google Docs, we communicated our notes, ideas, and brainstorming to keep
    track of progress and keep each other accountable.
How many stories/issues were initially considered
- Initially, the stories and issues we considered were 26.
How many stories/issues were completed
- 19 were completed as of September 11, 2025.

Google Docs: https://docs.google.com/document/d/1xcH4lTldHDI7QZPknxUf0h0TRs253RKgLHzJwp9SCE8/edit?usp=sharing

# Team Retrospective

## Shannyn Cabi

- a link to your pull requests
  
https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

- a link to your issues

https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/

https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/

https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/

https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/

https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/

## What was your role / which stories did you work on

What was the biggest challenge?


# Unit tests

Why was it a challenge?

● Many attempts at creating unit tests resulted in hours of diagnosing issues with
package/dependency mismatches or not being found, removing many files and
reinstalling dependencies, to no avail.

How was the challenge addressed?

● After discussing with my teammates who ran into similar issues, and bringing it up to Dr.
C, who saw other groups with similar experiences, due to this, taking a large amount of
time with no seeming progress toward success, I decided to leave it alone and focus on
other issues.

Favorite / most interesting part of this project

● I really enjoyed brainstorming with my team and having our user stories developed during
this process. I also really enjoyed it when each member would have a big breakthrough
with a new feature, which brought us closer to a finalized product. It was also interesting to
look over their code and see the approaches they took for certain functionalities, such as
the word of the day or random word functions.

If you could do it over, what would you change?

● Next time, I will create the unit tests first, then write my code around those to ensure they
are successful. It also seems this approach prevents issues with dependencies like I was
facing. I think I would also get really specific about the urgency of each feature, and
make a numbered list in the order I want to implement them.

What is the most valuable thing you learned?

● I learned the importance of creating detailed user stories, so each team member can
narrow down on something very specific to work on. Building on top of that, being very
clear about what features we want the app to have, since this helps with building the
database accurately early on. I also experienced working on an issue and knowing when
to let it go and move on to another functionality, or differentiating which issues/stories are
really critical, or not too important, and would take up lots of my time working on them. I
further experienced the importance of clear communication between teammates, since
this ensures no one is stepping over each other’s code, and we all know what to expect
to be updated in incoming pull requests.

## Jesus Garcia-Loyola

a link to your pull requests

https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

https://github.com/JesusG2022/Project-1-cst-438-react-native/pull/

a link to your issues

Restart the file again: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/25

Search Word - Search function: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/18

Create a database for user: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/13

Add style to the pages: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/3

### What was your role / which stories did you work on

My role in this project is to jump-start the project by creating the React file and exporting SQLite.
It is difficult for me since I did not know how to use React. So I watch YouTube videos on how to
start a React project. But when I try to add Expo SQLite, it throws me some errors, and it came
to my attention that I was using the wrong type of React. So I was able to change the project
early on and fix my errors. I was also in charge of adding a search function and adding style to
the project. I knew SQL, so I was able to make it quickly.

What was the biggest challenge?

● Start/learn about React and start using SQLite.e

Why was it a challenge?

● I am new to these tools and have never used this one before.

How was the challenge addressed?

● I asked the TA and teacher about how to start.
● I would ask during office hours and class time.

Favorite / most interesting part of this project

● I discovered that React and React Native are two different things.
○ One only works for the website (regular React), and the other can work for almost
all devices (Native React).

If you could do it over, what would you change?

● I would try to add more cool features, like changing the password securely by passing
the current password. If correct, can change the password.
● Add more style, like more color, since it seems it ot plain.

What is the most valuable thing you learned?

● Learning how to use React and TypeScript. I know how to use Node.js, JavaScript, and
HTML, so I was able to pick up the languages and technology

## Justin Park

Justin’s Pull requests here: https://github.com/JesusG2022/Project-1-cst-438-react-native/pulls?q=is%3Apr+is%3Aclosed+author%3Ahoostinn

Justin’s GitHub issues:
Link 1: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues?q=is%3Aissue%20state%3Aclosed%20assignee%3Ahoostinn

Link 2: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues?q=is%3Aissue%20state%3Aopen%20assignee%3Ahoostinn

### What was your role / which stories did you work on

- Justin’s role was to work on the app and be able to pull information from the API’s. They
    primarily contributed to the project by making the Word of the Day page, showing the
    word of the day, definitions, examples, part of speech, synonyms, and antonyms. They
    also made sure to keep the group on track and accountable throughout the duration of
    Project01. This was achieved by creating Google documents, the group chat, and
    facilitating brainstorming ideas and issues to carry on. While they did not
    delegate this role and others, they mainly helped get things going and interact with the
    API.

What was the biggest challenge?
- Learning how to use React Native and Git/GitHub.

Why was it a challenge?
- Being able to figure out how to merge and pull requests without causing issues was
difficult. Being able to understand commands to input into the terminal and understand
the process was also proven to be challenging. React Native and Git/GitHub were new
to them, so having to learn them all at once proved to be challenging and overwhelming.

How was the challenge addressed?
- This was addressed by speaking with the TAs and running through examples and the
processes one by one. I wrote notes and documentation to refer back to to
remember and remind myself how things worked, and tried to teach it back to myself.
- As for React Native, this was tackled by referring to a lot of documentation and YouTube
tutorials, while trying to apply what was being shown to the project.

Favorite / most interesting part of this project
- My favorite part was being able to actually learn what Git and GitHub are and put that
into practice.

If you could do it over, what would you change?
- I would change how I approached how I learned React Native and do more by doing.
Rather than consuming multiple YouTube tutorials and wasting time as a result.
What is the most valuable thing you learned?
- The most valuable thing I learned was how to actually start practically applying Git and
GitHub, and how to actually make branches and Pull Requests.

## Roy Sanchez-Ibarra

A link to your pull requests:

Roy's Pull Requests: https://github.com/JesusG2022/Project-1-cst-438-react-native/pulls?q=is%3Apr+author%3AyYor+is%3Aclosed


A link to your issues: 

Delete post functionality: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/2

Daily word - Time reset: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/5

Edit post functionality: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/6

Home Page draft: https://github.com/JesusG2022/Project-1-cst-438-react-native/issues/8

### What was your role / which stories did you work on

- I worked on the poems posts, home page, and also made some adjustments to the database.

What was the biggest challenge?
- Adding, removing, and updating poem posts for each user was the biggest challenge.

Why was it a challenge?
- At first, the poems weren’t showing on the poems page. I would add a post to a user's account
and it would display as a post for all the users on the database.

How was the challenge addressed?
- I created a UserContext file to wrap around the application and it was able to handle the user’s
post better. It also made it a lot easier to add a log-out button.

Favorite / most interesting part of this project
- My favorite part of this project was coming up with ideas in our team. Working as a
team to build on top of ideas helped us create a unique product.

If you could do it over, what would you change?
- If I could do this project again, I would add more user functionality. I think that adding aA 
A favorite or a like button would make this app more engaging for the user.

What is the most valuable thing you learned?
- Working on this project helped me get better at using GitHub.


# Conclusion

**How successful was the project?
Think in terms of what you set out to do and what actually got done.**

- We believe that the project was a success. We were able to create an idea on Day 1 and
    actually execute it while facing hurdles and hiccups. Regardless of the problems that
    arose, we were able to create a functioning app that was able to execute what we
    envisioned at the very least.
-
**What was the largest victory?**
- The largest victory for this project overall was being able to learn and apply React Native
and TypeScript. As a group of four that had no prior experience, it was amazing to see
that we were able to learn a new technology and apply it while being practical and using
the lecture concepts as well.
**Final assessment of the project**
- As an overall assessment of the project, we believe that everyone in the group
contributed and performed well in the roles that they were assigned.
