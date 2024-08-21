# Tailwind - HTML - Vanilla JS - Express JS - MySQL stack

It is my first time to use vanilla JS as the pure front end interactivity, but it was challenging and quite fun, I may miss a thing or two but this experience is unforgettable. But still if there is any chance, I prefer to use react as it is easier to manage state.

The challanges were:
- There are many template literals for the DOM manipulation (using innerHTML)
- There are many ids to be detected and used to have the interactivity
- I use a single page approach, at first I don't want to use reload, but there are a limitation because js sometimes having the issue of the dataStore variable api call to return asynchronously and then the result was still the previous data when the promise is not yet resolved
- I use plain XHR as my first time (usually I use axios interceptors), it was quite fun. At first I was confused about how to store the data to be accessible to other variables outside the callback inside the xhr, but fortunately I was able to use Promise so the parameter that was inserted to resolve callback can be accessed and the data can be passed around
- I want to split my front end javascript files, but I end up having one big file that is functions.js, I have commented the parts so it can be easier to refactor later, but to chase the time and the functionality it might be good enough
- For the backend, the challange of the progress field and project status was fun and challenging too, I use SUM - GROUP BY - CASE WHEN combination, in other case I used SELECT FROM SELECT using CASE WHEN to reduce data to be able to have what I want
- I use tailwind for the styling, but I am afraid that I wouldn't be having enough time for the slider effect
- The tailwind that I use is the online version, the configuration in html seems not working and to not be having a long time for me to only adjust the styling, I choose styling that are using url in href of link stylesheet
- Because the tailwind that I use is the online version, make sure to have INTERNET CONNECTION on running this project
- i use live server in the development, it was quite a good experience, for backend i use nodemon as dependency using `npx nodemon app.js`

That was the recap of the projects that I make today