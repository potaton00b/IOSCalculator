//variables to keep track of
let storedOperator = "";
let mostRecentKeystroke = undefined;
let screenNumber = 0;
let numberA;
let equalMode = false;
let currentHighlightedOperator = undefined;


let buttonList = document.querySelectorAll("button");
for (let i =0; i < buttonList.length; i++){
    buttonList[i].addEventListener("click", function() {
        let buttonKey = this.innerHTML;
        console.log(buttonKey);
        
        if (currentHighlightedOperator !== undefined){
            currentHighlightedOperator.classList.remove("flashed");
            currentHighlightedOperator = undefined;
        }

        //check if button pressed is digit. buttonKey is a string
        if (isNumber(buttonKey)){
            
            flashNumber(this);
            //If most recent keystroke was digit
            if (isNumber(String(mostRecentKeystroke))){
                screenNumber = document.querySelector(".screen p").innerHTML;
                screenNumber = screenNumber + buttonKey;
                mostRecentKeystroke = buttonKey;
                document.querySelector(".screen p").innerHTML = screenNumber;
                console.log("if MRK is digit");
                console.log("MRK: " + mostRecentKeystroke);

                //if most recent keystroke does not exist, just set the digit as new screen
            } else if (mostRecentKeystroke === undefined){ 
                screenNumber = buttonKey;
                mostRecentKeystroke = buttonKey;
                document.querySelector(".screen p").innerHTML = screenNumber;
                console.log("if MRK doesnt exist");
                console.log("MRK: " + mostRecentKeystroke);

                //if most recent keystroke was operator, store operator and start new num
            } else if (isOperator(mostRecentKeystroke)){
                screenNumber = buttonKey;
                storedOperator = mostRecentKeystroke;
                mostRecentKeystroke = buttonKey;
                document.querySelector(".screen p").innerHTML = screenNumber;
                console.log("stored operator is now: " + storedOperator);
            } else {
                alert("error!");
            }
            
        } else if (isOperator(buttonKey)){
            if (buttonKey !== "="){
                this.classList.add("flashed");
                currentHighlightedOperator = this;
            } else {
                tempFlash(this);
            }

            if (isNumber(mostRecentKeystroke)){
                if (numberA === undefined){ //if numA doesnt exist
                    let currentNumber = Number(document.querySelector(".screen p").innerHTML);
                    console.log("if numA doesn't exist and operator was pressed, currentNumber is: " + currentNumber);
                    numberA = currentNumber;
                    mostRecentKeystroke = buttonKey;
                    

                } else { //if numA DOES exist
                    console.log("numA does exist and its value is: " + numberA);
                    let currentNumber = Number(document.querySelector(".screen p").innerHTML);

                    if (equalMode){
                        storedOperator = buttonKey;
                        console.log("storedOperator is " + storedOperator);
                        equalMode = false;
                    } else {
                        document.querySelector(".screen p").innerHTML = calculate(Number(numberA), currentNumber, storedOperator);
                    }
                    
                    numberA = Number(document.querySelector(".screen p").innerHTML);
                    
                    if (buttonKey === "="){
                        mostRecentKeystroke = String(numberA % 10);
                        console.log(mostRecentKeystroke);
                        equalMode = true;
                        storedOperator = "";
                    } else {
                        mostRecentKeystroke = buttonKey;
                        storedOperator = buttonKey;
                    }
                }
            } else if (isOperator(mostRecentKeystroke)){
                storedOperator = buttonKey;
                mostRecentKeystroke = buttonKey; 
            }
            
        } else if (buttonKey === 'AC'){
            ACFlash(this);
            storedOperator = "";
            mostRecentKeystroke = undefined;
            console.log("AC MRK: " + mostRecentKeystroke);
            screenNumber = 0;
            numberA = undefined;
            equalMode = false;
            document.querySelector(".screen p").innerHTML = "0";
        }



    });
}

function flashNumber(element){
    element.classList.add("pressed");
    setTimeout(function () {
        element.classList.remove("pressed");
    }, 150);
}

function tempFlash(element){
    element.classList.add("flashed");
    setTimeout(function () {
        element.classList.remove("flashed");
    }, 150);
}

function ACFlash(element){
    element.classList.add("ACFlash");
    setTimeout(function () {
        element.classList.remove("ACFlash");
    }, 150);
}


function isNumber(char){
    //console.log("Input:", char, "Type:", typeof char); 
    let isOther = false;
    if (char === '00' || char === '.'){isOther=true;}

    return (!Number.isNaN(Number(char)) && char.trim() !== '') || isOther;
}

function isOperator(char){
    if (char === 'X' || char === '-' || char === '÷' || char === '+' || char === '='){
        
        return true;
    }
    return false;
}

function limitDecimals(number, maxDecimals) {
    const factor = Math.pow(10, maxDecimals);
    return Math.round(number * factor) / factor;
}


function calculate(num1, num2, operator){
    switch (operator){
        case '+':
            return limitDecimals((num1+num2),11);
        case '-':
            return limitDecimals((num1-num2), 11);
        case '÷':
            return limitDecimals((num1/num2), 11);
        case 'X':
            return limitDecimals((num1*num2),11);
    }
}


