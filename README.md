# Project Trybe Futebol Clube

## Description
Trybe Futebol Clube is a website built for managing football championships information. The application includes features such as viewing teams, matches, and leaderboards, as well as adding and updating matches, which updates the leaderboards. The website is built with a front-end, back-end, and database layer.
<br><br>
The back-end of the application was built from scratch, using TypeScript, Node.js, and Express.js. The database is managed using the ORM tool Sequelize, which also facilitates future changes to the code and database. Users' authentication and authorization are handled using JSON Web Token (JWT). The project has over 80% test coverage, developed using Mocha, Chai, and Sinon.

# Main Technologies Used
>TypeScript (with OOP)
>
>Node.js
>
>Express.js
>
>JSON Web Token (JWT)
>
>Sequelize
>
>MySQL
>
>Mocha, Chai and Sinon
>
>Docker

# Instructions for Utilizing the Application
1. Install Docker on your machine.
2. Clone the repository.
3. Go to the application's root directory and `run npm install`.
4. Go to the app directory and run `docker-compose up -d` to start the orchestrated Docker.
5. Access the application (via front-end) locally in your browser using Port 3000.
6. To run the back-end, go to the back-end directory and run `npm run dev`.
7. To run the front-end, go to the front-end directory and `run npm start`.
8. To check the test coverage, run `npm run test:coverage` inside the back-end directory.

<br>

You can interact with the back-end API through an HTTP client (Insomnia, Postman, HTTPie, etc.) and make requests to it. Below is a list of the endpoints:

<details>
  <summary>Endpoint for <i>Login</i></summary>
  <ul>
  <li>post('/');</li>
  <li>post('/validate');</li>
  </ul>
</details>

<details>
  <summary>Endpoints for <i>Teams</i></summary>
  <ul>
  <li>get('/');</li>
  <li>get('/:id');</li>
  </ul>
</details>

<details>
  <summary>Endpoints for <i>Matches</i></summary>
  <ul>
  <li>post('/');</li>
  <li>get('/');</li>
  <li>get('/:id');</li>
  <li>get('/:id/finish');</li>
  </ul>
</details>

<details>
  <summary>Endpoints for <i>Leaderboards</i></summary>
  <ul>
  <li>get('/');</li>
  <li>get('/home');</li>
  <li>get('/away');</li>
  </ul>
</details>


## Contact
You can get in touch with me at ismcondan2019@gmail.com or by <a href="https://www.linkedin.com/in/ismaeldantas/">Linkedin</a>.
