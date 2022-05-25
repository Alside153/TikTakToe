var oTurn = [];                 //tracks the turn of o
var xTurn = [];                 //tracks the turn of x
var which = true, done = false; //which - tracks who's turn it is, done- if the game is finished or not 
var winner = [];                //tracks the possible wins
var counter = 0;                //tracks the number of moves done in the game
var plan = [];                  //tracks the index of each player

function showConsole() {                //to show the progress of arrays in console (dev tool)
    console.log("x: " , xTurn);
    console.log("o: ", oTurn);
    console.log("plan: ", plan);
    console.log("winner: ", winner);
    console.log("which: ", which);
    console.log("        ");
}

function stepBack(){                    //function used to move a step back each time pressed

    if(counter != 0) {
        if(plan[plan.length-1] === xTurn[xTurn.length-1]){  //check who's turn was last and removes the sign accordingly
            xTurn.pop();
        }
        else{
            oTurn.pop();
        }

        var temp1 = document.getElementById(`td${plan[plan.length-1]}`);  //finds last pressed square
        temp1.src = "img/W.png";                                          //sets white clean picture as background
        winner[plan[plan.length-1]] = 99;                                 //"cleans" the indexed array
        plan.pop();                                                       //removes the last inserted play
        counter--;                                                        //decrease a move
        which = !which;                                                   //lets the last player move

        if(done){                                               //checks if the last move has been made(either one of the characters win or the game finished in draw)
            var hostDiv = document.getElementById("hostDiv");   //marks the specified host and sets as "hostDiv"
            hostDiv.innerHTML = "";                             //cleans the specified div
        }
        done = false;                                           //sets the game as "unfinished"
    }

}

function cleaner(){                                     //cleans the board to restart the game  
    if(counter == 9){                                   //checks if the game is finished
        done = false;                                   //sets the game as "unfinished"
    }
    for(var i=1; i<=9 ; i++){                           //moves through all the squares
        var temp = document.getElementById(`td${i}`);   //sets temp as temporary square
        temp.src = "img/W.png";                         //sets white picure as background
        
    }
    /* redeclare all the global variables*/ 
    oTurn = [];
    xTurn = [];
    which = true, done = false;
    winner = [];
    counter = 0;
    plan = [];
    var hostDiv = document.getElementById("hostDiv");
    hostDiv.innerHTML = "";

}

function turn(square){                                                  //function called each turn to set square as 'o' or 'x'
    if(!done){                                                          //check if if the game is done or not
        for(var i = 1; i <= 9; i++) {                                   //check each turn if the square choosen havent been choosen before

            if(xTurn[i] === square|| oTurn[i] === square){              //if one of the squares had been choosen before mark j as true and exit the loop
                var j= true;
                break;
            }
        }

        if (which&& !j) {                                               //if which = true its 'x' turn and will continue only if the square wasnt choosen before
            var temp = document.getElementById(`td${square}`);          //sets specified square as temp
            temp.src = "img/x.png";                                     //sets x in specified square
            xTurn.push(square);                                         //pushes index in X turn
            winner[square] = 'x';                                       //sets 'x' in specified square in winner array
            plan.push(square);                                          //pushes specified square in plan array

            if( winner[1]==='x'&&winner[2]==='x'&&winner[3]==='x'||     //checks all winning options - 1,2,3
                winner[4]==='x'&&winner[5]==='x'&&winner[6]==='x'||     //4,5,6
                winner[7]==='x'&&winner[8]==='x'&&winner[9]==='x'||     //7,8,9
                winner[1]==='x'&&winner[4]==='x'&&winner[7]==='x'||     //1,4,7
                winner[2]==='x'&&winner[5]==='x'&&winner[8]==='x'||     //2,5,8
                winner[3]==='x'&&winner[6]==='x'&&winner[9]==='x'||     //3,6,9
                winner[1]==='x'&&winner[5]==='x'&&winner[9]==='x'||     //1,5,9
                winner[3]==='x'&&winner[5]==='x'&&winner[7]==='x'  ) {  //3,5,7
                    /*if the condition is met announce it with the following commands*/ 
                    var newHeader = document.createElement("h1");
                    newHeader.innerHTML = "X IS THE WINNER!!!!";
                    newHeader.style.color = "red";
                    newHeader.style.backgroundColor= "black";
                    var hostDiv = document.getElementById("hostDiv");
                    hostDiv.appendChild(newHeader);
                    done= true;
                }

        }
        else if(!which && !j ) {
            var temp = document.getElementById(`td${square}`);
            temp.src = "img/o.png";
            oTurn.push(square);
            winner[square] = 'o';
            plan.push(square);

            if( winner[1]==='o'&&winner[2]==='o'&&winner[3]==='o'||
                winner[4]==='o'&&winner[5]==='o'&&winner[6]==='o'||
                winner[7]==='o'&&winner[8]==='o'&&winner[9]==='o'||
                winner[1]==='o'&&winner[4]==='o'&&winner[7]==='o'||
                winner[2]==='o'&&winner[5]==='o'&&winner[8]==='o'||
                winner[3]==='o'&&winner[6]==='o'&&winner[9]==='o'||
                winner[1]==='o'&&winner[5]==='o'&&winner[9]==='o'||
                winner[3]==='o'&&winner[5]==='o'&&winner[7]==='o'  ) {
                    
                    var newHeader = document.createElement("h1");
                    newHeader.innerHTML = "O IS THE WINNER!!!!";
                    newHeader.style.color = "red";
                    newHeader.style.backgroundColor= "black";
                    var hostDiv = document.getElementById("hostDiv");
                    hostDiv.appendChild(newHeader);
                    done= true;
                }
            }
          
        which = !which; //change each turn to other play's sign
        counter++;      //follow the number of moves made
        if(counter == 9){       //if 9 moves where made annouce DRAW with the following commands
            var newHeader = document.createElement("h1");
            newHeader.innerHTML = "DRAW";
            newHeader.style.color = "red";
            newHeader.style.backgroundColor= "black";
            var hostDiv = document.getElementById("hostDiv");
            hostDiv.appendChild(newHeader);
            done= true;
        }
    }
}

