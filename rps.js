const { printTable } = require('console-table-printer'); //prints the choices and scores in tabular format
let scores = [];

const returnChoiceArray = (noOfPlayers) => {
    const choices = []
    for (i = 0; i < noOfPlayers; i++) {
        choices.push(Math.floor(Math.random() * 3));  /*Returns an array of random choices from 0 to 2 for
                                                      specified no of players
                                                      0:-Rock 1:-Paper 2:-Scissors */
    }

    return choices;
}


const playerWiseScores = (value, index, array) => {
    result = [[-1, 1, 0],
    [0, -1, 1],                                    //A 2D Matrix to make comparision between two players
    [1, 0, -1]]                                    // 0:-First Player Won   1:-Second Player Won   -1:Tie

    if (scores[index] === undefined) {
        scores.push({ CurrentPlayer: (index + 1) });
    }

    //Comparision of each player with every other player
    for (i = 0; i < array.length; i++) {
        if (index == i) {
            scores[index]["Against-Player-" + (index + 1)] = '-';  //If both are same return '-' 
        }

        else {
            //If first player wons increase its score by 1
            if (result[value][array[i]] === 0) {
                //console.log(index, i)
                if (scores[index]["Against-Player-" + (i + 1)] == undefined) {
                    scores[index]["Against-Player-" + (i + 1)] = 1
                }

                else {
                    scores[index]["Against-Player-" + (i + 1)] = scores[index]["Against-Player-" + (i + 1)] + 1;
                }
            }

            //If first player loses or there is a tie then keep the score same
            else if (result[value][array[i]] === 1 || result[value][array[i]] === -1) {

                if (scores[index]["Against-Player-" + (i + 1)] == undefined) {
                    scores[index]["Against-Player-" + (i + 1)] = 0
                }

                else {
                    scores[index]["Against-Player-" + (i + 1)] = scores[index]["Against-Player-" + (i + 1)] + 0;
                }

            }
        }

    }
}

//Runs the game for specified no of rounds.
module.exports.runRounds = (rounds, players) => {
    if (rounds <= 0 || players <= 1) {
        console.log("Please enter the fields within the specified range") //Initial Check
        process.exit();
    }
    for (var i = 0; i < rounds; i++) {
        console.log('Round ' + (i + 1) + ':-');
        const choiceTable = []
        const choices = returnChoiceArray(players);

        choices.forEach((value, index) => {
            choiceMap = {
                0: 'Rock',
                1: 'Paper',                             //Maps the returned integer choices to the original 
                2: 'Scissors'                          // values for printing purpose
            }

            choiceTable.push({ Player: index + 1, Choice: choiceMap[value] });

        });
        console.log("Choices of Each Player");
        printTable(choiceTable);  //Prints choices
        choices.forEach(playerWiseScores);
        console.log("Wins of Each Player w.r.t Every Other Player after " + (i + 1) + "th round.");
        printTable(scores); //Prints Scores
    }
}



/*const calculateScores = (value, index, array) => {
    result = [[-1, 1, 0],
    [0, -1, 1],
    [1, 0, -1]]

    for (i = index; i < array.length; i++) {
        console.log(index, i)
        //console.log(result[value][array[i]])
        if (i !== index) {
            if (result[value][array[i]] === 1) {
                scores[i] = scores[i] + 1;
            }
            else if (result[value][array[i]] == 0) {
                scores[index] = scores[index] + 1;
            }
        }
    }

};*/









