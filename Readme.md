# SuGoKu

## How to play
  1. Select "Create Game" and select your grid size
  2. Have an opponent select "Join Game" then your game ID
  3. The person who created the game (Player 1) goes first: Click on a square, enter a valid number, then press enter
  4. The Board will autocomplete any squares with only 1 possible value
  5. This can result in a cascading effect, so be careful about vulnerable positions
  6. Each captured square will result in 1 point, and the game ends when no valid moves are left.

## The code v1.0
  The backend uses Socket.io to handle clients and Mongoose to store game data.

  The frontend uses React, Typescript, and Redux.