const controller = require('./rps.js');


const noOfRounds = 25 //Specify the no of rounds of the game to be played(>0)
const noOfPlayers = 4 //Specify the no of players (>1)
controller.runRounds(noOfRounds, noOfPlayers);