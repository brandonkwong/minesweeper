Minesweeper
==================

A version of Minesweeper built for a software engineer problem challenge.<br>
http://brandonkwong.com/dev/minesweeper/

<h2>Problem 1: Minesweeper</h2>

Create a version of the classic game of Minesweeper. This problem should should take an hour or two to complete, and no more than three hours. Your solution must be in HTML/JavaScript/CSS. If you're applying for one of our mobile engineering positions, use Objective-C (iOS) or Java (Android) as appropriate.


<h3>Rules of Minesweeper</h3>

Minesweeper is a grid of tiles, each of which may or may not cover hidden mines. The goal is to click on every tile except those that have mines. When a user clicks a tile, one of two things happens. If the tile was covering a mine, the mine is revealed and the game ends in failure. If the tile was not covering a mine, it instead reveals the number of adjacent (including diagonals) tiles that are covering mines – and, if that number was 0, behaves as if the user has clicked on every cell around it. When the user is confident that all tiles not containing mines have been clicked, the user presses a Validate button (often portrayed as a smiley-face icon) that checks the clicked tiles: if the user is correct, the game ends in victory, if not, the game ends in failure.


<h3>Design constraints</h3>

Use HTML, CSS, and JavaScript (libraries like jQuery, Backbone, and Angular are welcome) to craft your solution.
The board should be an 8x8 grid and by default 10 hidden mines are randomly placed into the board.
The interface should support these additional functions:
New Game: start a new, randomly generated game.
Validate: check that a user has correctly marked all the tiles and end the game in either victory or failure
Cheat: in any manner you deem appropriate, reveal the locations of the mines without ending the game.

<h3>Most importantly</h3>

Your code must be well-structured and built in the spirit of maintainability and extensibility. Additional features are encouraged though not required: saving/loading, changing difficulty level, changing the size of the board.
