# SuGoKu

## How to play
  1. Select "Create Game" and select your grid size
  2. Have an opponent select "Join Game" then your game ID
  3. The person who created the game (Player 1) goes first: Click on a square, enter a valid number, then press enter
  4. The Board will autocomplete any squares with only 1 possible value
  5. This can result in a cascading effect, so be careful about vulnerable positions
  6. Each captured square will result in 1 point, and the game ends when no valid moves are left.

## The code
  This is my third iteration of this game and I went with a pretty unconventional approach. I would love to say it was for performance reasons, but it was really just as an exercise in thinking outside the box. In my first iteration, I used a massive object in a backend that stored a ton of different information about the cells in order for it arrange the Grid and execute the autocomplete. While I don't think it's necessarily a bad thing to do that, I feel like I learned a lot by trying to come at this project with a different approach.

  The **Board** is stored in the database as an array of **Turns** as well as a size indicating the user's selected **Grid** size. In the client, the Grid's **Cells** are *inferred* based on the Board's Turns: which contain the Cell's index and input value, as well as the player that made the Turn. The client then calculates which cells were captured based on the Turns and then serves two 2 arrays: one for the input values, and the other to see which player captured the cell.
  
  This makes it so the backend has to do very little besides making small changes to the database and handling the sockets, but the client has to do a lot of operations to figure out what a Cells value is suppose to be. Right now, the client completely recalculates the entire Grid with each turn, which isn't completely catastrophic anymore due to some conditional checks, but I'd like to make it only update the nessecary cells at some point.
  
  Here's a fun question I have: at one point, the client on the 16x16 board would have to check 24 x 24 x 24 x (turns) Cells in order to recreate the board (yikes). The board can reach a "critical mass" of turns (meaning 1 more turn would result in a completely autocompleted board), what's the max number of turns that could be made and how many Cell checks would have to be made? I actually don't know, but if I find out I'll put it down here.