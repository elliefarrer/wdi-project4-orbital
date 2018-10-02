# General Assembly WDI Project 4: Orbital

[Heroku](https://orbital-dating.herokuapp.com/)

[GitHub Repo](https://github.com/platypotomus/wdi-project4-orbital)

## Brief
* Build a full-stack application by making your own backend and your own front-end
* Use an Express API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
* Have a visually impressive design to kick your portfolio up a notch and have something to wow future clients & employers. ALLOW time for this.
* Be deployed online so it's publicly accessible.
* Have automated tests for at least one RESTful resource on the back-end. Improve your employability by demonstrating a good understanding of testing principals.


## App Description
Orbital is a one-page, mobile-first, MERN stack dating app. It works with a Tinder-esque right/left matching system, in which users tap the button on the right to say they like the other person's profile, or left if they don't. Only if both users tap right for each other, then they can message each other. Orbital features a built-in messenger, which allows users to send gifs from GIPHY, as well as timestamped text-based messages.


## Technologies Used
* HTML5
* SCSS
* JavaScript (ECMAScript 6)
* axios: v0.18.0
* babel-plugin-transform-class-properties: v6.24.1
* babel-plugin-transform-object-rest-spread: v6.26.0
* moment: v2.22.2
* react: v16.4.2
* react-dom: v16.4.2
* react-router-dom: v4.3.1
* Node.js
* MongoDB
* bcrypt: v3.0.0
* bluebird: v3.5.1
* body-parser: v1.18.3
* express: v4.16.3
* jsonwebtoken: v8.3.0
* mongoose: v5.2.10
* mongoose-unique-validator: v2.0.1
* morgan: v1.9.0
* request-promise: v4.2.2
* chai: v4.1.2
* mocha: v5.2.0
* nyc: v13.0.1
* supertest: v3.2.0
* Git
* GitHub
* Heroku
* Trello
* Photoshop
* Google Fonts
* Fontawesome


## APIs Used
* GIPHY
* MapQuest
* Nominatim


## Approach Taken

### Wireframes
The wireframes were put together in Photoshop.


#### Login
![Login Wireframe](./wireframes/login.png)


#### Users Index
![Users Index Wireframe](./wireframes/user-index.png)


#### Users Show
![Users Show Wireframe](./wireframes/user-show.png)


#### Profile Page
![Profile Page Wireframe](./wireframes/profile-page.png)


#### Chats and Swipes Index
![Chats and Swipes Index Wireframe](./wireframes/messages-index.png)


#### Chat Show
![Chat Show Wireframe](./wireframes/messages-show.png)

### Functionality
I organised my workload using a Trello board, which I found to be very helpful for planning and deciding which features to prioritise:

![Trello Board](./screenshots/trello.png)


#### Back End
I started out on the back end, with the aim to has as strong and stable a back end as possible before rendering anything on the page. I also wanted the back end to do as much work as possible, especially in terms of filtering. I managed to get most of the back end (apart from the gifController and photoController, which came later) up and running in a few days. To ensure everything worked as it should, I tested at least one route in each controller.

#### Front End
With the front end, I started by rendering data on the page (doing the GET requests) before making it functional (the other requests.) Naturally I did find a couple of things on the back end, whilst they worked on Insomnia and in the tests, did not actually work quite how I wanted when rendering on the front end. Still, I finished the basic front end in a few days, leaving me time to add extra features such as the photo carousel and gifs.


### Styling
I left almost all styling til the very end. I decided not to use Bulma this time, and just revert back to pure SCSS, to have more control over the design.

I stumbled across the colour scheme somewhat by accident, by finding a random chalk board grey, then an off-white, then tested a few dark pinks. I used three Google fonts in total: Meddon and Homemade Apple for the logo; Homemade Apple for the users' names, ages, and occupation; and Oxygen for the main text body.


### Finished Product

#### Login
![Login](./screenshots/loginactual.png)


#### Registration
![Registration](./screenshots/register.png)


#### Users Index
![Users Index](./screenshots/users-index.png)


#### User Show
![User Show](./screenshots/users-show.png)


#### Chats and Swipes Index
![Chats and Swipes Index](./screenshots/chats-index.png)


#### Chat Show
![Chat Show](./screenshots/chats-show.png)


#### Chat Show with Gif Search
![Chat Show with Gif Search](./screenshots/gif-search.png)


## Wins and Blockers
A big win overall was the messaging. I was very nervous about building it, yet it happened relatively smoothly. I'm especially pleased with the different colours and alignments, depending on which user sent the message. Surprisingly, I found floats and clears to be the only way to align the message bubbles horizontally and keep the vertical alignment.

Another win was the GIPHY API integration. Again, I thought this would be more complex than it was. I made sure to look into the API and data ahead of time, so I didn't spend too long finding what I needed (this time.)

The matching system took a while to get working, because of how many possibilities they are, and the conditions they all carry.

Styling both without a framework and without flexbox was also a challenge, given how important responsiveness was.


## Future Features
