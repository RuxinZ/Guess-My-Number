# ⁉️ Guess My Number

This is a simple and straightforward number-guessing game. For each game the player has 10 attempts to guess the target number, which is a combination of 4 numbers between 0-7 (the number numbers can be adjusted based on difficulty level).

## 🚀 How To Get Started

- Fork and clone this repo
- Install all dependencies
  ```bash
  npm install
  ```
- Run an instance of the game
  ```bash
  npm run dev
  ```
  Note: the client server will start at `http://localhost:8081/` and API server at `http://localhost:3001/`

## 💪 Features

- A complete game with solid game logic implementation
- An option to adjust the difficulty level
- Uses the [Random generator API](https://www.random.org/clients/http/api/) to conditionally generate the target number based on the selected difficulty
- A `Record` box that displays the players guesses and the game's responses
- A win/lose message and option to restart game

## 🤔 Technical decisions

- Use Vite as build tool
  - Leverage its development server with fast and efficient hot module replacement(HMR) and easy setup.
- Use Node.js with Express.js
  - Node.js is highly scalable, ideal for I/O-intensive applications. Express frameworks helps with responding to requests with route support, which makes the codebase modularized and maintainable
- Use RESTful API architecture to handle API call
  - The network requests needed at the moment is simple and straight forward. Using Rest APIs makes our app scalable and flexible. We can always add different routes to handle other business logic like user authentication and authorization, as well as network request to user database for historical scores (if we keep trace of the user's scores)
- Use backend server to call the Random Generator API and forward the results to frontend client
  - Proxy the requests through the backend helps avoid the CORS error.
- Attention to detail:
  - Error handling
    - Handle errors in network requests
    - Change UI based on the status of fetch request
  - Input validation: Use the HTML element's `pattern` attribute and regular expression `^[0-7]{${digits}}$` to valid the input string.
  - Use conventional commits to create an explicit and clean commit history

## 🛠️ Technologies & Tools

- Vite
- Node.js, Express.js
- React
- Tailwind
- Eslint

## ↗️ Stretch Goals

- Testing
- User Log-in & Sign-up Page
- User database
  - username, password, highest score
- Display user score
