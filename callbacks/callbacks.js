
// Ejercicio 1:

const printEven = (num) =>{
    console.log("This value is even: " + num)
};

const printOdd = (num) =>{
    console.log("This value is odd: " + num)
};



const verifyIfOddOrEven = (num, printEven, printOdd) => {
    if (num % 2 === 0){
        printEven(num);
    }
    else{
        printOdd(num);
    }
}

const num = 2;

const result1 = verifyIfOddOrEven(num, printEven, printOdd);

// Ejercicio 2:


const fs = require('fs');

const findDuplicates = (firstFile, secondFile) => {
    const fileOne = fs.readFileSync(firstFile, 'utf-8').split("\n");
    const fileTwo = fs.readFileSync(secondFile, 'utf-8').split("\n")

    return fileOne.filter(word => {return fileTwo.includes(word)})
};


const result = findDuplicates('callbacks/words1.txt', 'callbacks/words2.txt')
console.log(result)
