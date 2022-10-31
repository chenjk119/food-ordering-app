<h1>food-ordering-app</h1>
<hr><p>Front end of food ordering platform</p>
<h2>Table of Content</h2>
<hr>
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#technologies-used">Technologies Used</a>
    </li>
    <li>
      <a href="#features">Features</a>
    </li>
    <li>
      <a href="#setup">Setup</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#folder-structure">Folder Structure</a></li>
    <li><a href="#project-status">Project Status</a></li>
    <li><a href="#improvements">Improvements</a></li>
    <li><a href="#features-that-can-be-added">Features that can be added</a></li>
    <li><a href="#acknowledgement">Acknowledgement</a></li>
  </ol>
</details>
<h2>Technologies Used</h2>
<hr><ul>
<li>HTML</li>
</ul><ul>
<li>CSS</li>
</ul><ul>
<li>JavaScript</li>
</ul><ul>
<li>React</li>
</ul><ul>
<li>Redux</li>
</ul><h2>Features</h2>
<hr><ul>
<li>Signup/Login System</li>
</ul><ul>
<li>Dashboard UI</li>
</ul><ul>
<li>Allows user to upload pictures and edit profile</li>
</ul><ul>
<li>Food purchase and payment system</li>
</ul><ul>
<li>Displays order history and credits</li>
</ul><ul>
<li>Email notification when new order is created</li>
</ul><ul>
<li>Allows users to define food preferences/allergies</li>
</ul><ul>
<li>Displays all the influencers in the dashboard</li>
</ul>

<h2>Components</h2>
<hr>

SignUp: Create an account and store its token in Redux

Login: Log in with an account and store the token in Redux

Home: Dashboard of the web app

EditProfile: Post an image to Cloudinary and put the image public id and other user info to API

Order: Display the pizza options and pass the choice data to payment page

Payment: Create purchase history and send a notification to the influencer

History: Get the purchase history of the user

Credit: Get the credit and earning history of the influencer

AccountMenu: Have a log out option to set the token in Redux store to initial state

ListInfluencer: Get all the influencers and display in seperate cards

<h2>Setup</h2>
<hr><p>Clone down this repository. You will need node and npm installed globally on your machine.</p><h5>Prerequisites</h5><ul>
<li>Node Package Manager (NPM)</li>
</ul><ul>
<li>React</li>
</ul><h5>Installation</h5><ul>
<li>
<ol>
<li>Clone the repo:</li>
</ol>
</li>
</ul><p><code>https://github.com/sfdevshop/food-ordering-app.git</code></p><ul>
<li>
<ol start="2">
<li>Install npm packages:</li>
</ol>
</li>
</ul><p><code>npm install</code></p><ul>
<li>
<ol start="3">
<li>Run command:</li>
</ol>
</li>
</ul><p><code>npm start</code></p><ul>
<li>
<ol start="4">
<li>To visit app:</li>
</ol>
</li>
</ul><p><code>http://localhost:3000</code></p>
<h5>Start with Docker</h5><ul>
<li>
<ol>
<li>Pull image from Docker Hub:</li>
</ol>
</li>
</ul><p><code>docker pull williammengyf/food-ordering-app</code></p><ul>
<li>
<ol start="2">
<li>Run the Docker image:</li>
</ol>
</li>
</ul><p><code>docker run -p 3000:3000 williammengyf/food-ordering-app</code></p>

## Folder Structure
<hr>

 ```
 .
├── public
│   ├── favicon.ico
│   ├── icons8_kawaii_pizza.ico
│   ├── kawaii_pizza_100px.png
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── index.html
│   ├── robots.txt
├── src
│   ├── components                // Components of the front end
│   │   ├── pages                 // All the pages in our app
│   │   │   ├── Credit.js
│   │   │   ├── EditProfile.js
│   │   │   ├── History.js
│   │   │   ├── Home.js
│   │   │   ├── Login.js
│   │   │   ├── Order.js
│   │   │   ├── Payment.js
│   │   │   ├── Signup.js
│   │   ├── AccountMenu.js
│   │   ├── ListInfluencers.js
│   │   ├── TabBar.js
│   │   ├── TopAppBar.js
│   ├── img                       // Image used in the app
│   │   ├── pizza.jpeg
│   │   ├── pizzaIcon.png
│   ├── redux                     // Redux state management
│   │   ├── reducers
│   │   │   ├── index.js
│   │   │   ├── users.js
│   │   ├── action.js
│   │   ├── actionTypes.js
│   │   ├── selectors.js
│   │   ├── store.js
│   ├── styles                     // CSS file for style
│   │   ├── Order.module.css
│   ├── App.js
│   ├── App.scss
│   ├── index.css
│   ├── index.js
│   ├── localStorage.js
├── .gitignore
├── .dockerignore
├── Dockerfile
├── package.json
├── package-lock.json 
├── README.md
└── yarn.lock
 ```
 
<h2>Project Status</h2>
<hr><p>This project is still in progress</p>
<h2>Features that can be added</h2>
<hr><ul>
<li>Chat with influencers</li>
</ul><ul>
<li>Categorize influencers</li>
</ul><ul>
<li>Manage payments</li>
</ul><h2>Acknowledgement</h2>
<hr><ul>
<li>This project was inspired by our sponsor</li>
</ul><ul>
<li>Many thanks to SF dev shop and our sponsor Jose Alvarado</li>
</ul>
