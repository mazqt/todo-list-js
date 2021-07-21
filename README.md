Before:
In this project, I aim to use javascript to create a website that lets you create and organize tasks to keep track of things you have to do. My skeleton is a Task class, which will be rather basic and functional, a view module that will use a lot of dom manipulation to render the correct tasks and elements, as well as a memory module to handle the localStorage.

After:
The project ended up having a slight hiccup, where I chose to store my tasks in a plain array, which I realized after a while was rather silly. It'd mean that any time I wanted to grab tasks for a specific project, I'd have to select from the entire array and save it. Instead, I reformated my code so I could use an object with project names for keys, which made the whole ordeal as simple as pulling the value for a specific project. The DOM manipulation was pretty straight-forward, I've gone from being somewhat intimidated by it to it feeling rather second-nature. My CSS skills still leave a lot to desire, but this project wasn't about creating a beautiful website but rather a working one, so I'm not too peeved.

Follow-up: I changed the webapp to use firebase instead of LocalStorage. As is, it has a global storage system so it isn't personalized anymore. I might consider adding authorization via Google login, and then dynamically creating libraries for each user via their google ID.
