// Ejercicio 1:


const wordsList = ["hola", "mona"]

for (word of wordsList){
    console.log(word);
}



// Ejercicio 2:

const numbers = [1,2,3,4,5,6,7,8,9,10];

const substractEven = (numbers) => {
    const even = [];       

    for (num of numbers){
        if (num % 2 === 0){
            even.push(num);
        }
    }
    return even;
};

const evens = substractEven(numbers);


// Ejercicio 2.2:

const subEven = (numbers) => {
    const even = numbers.filter((num) => num % 2 === 0);
    return even;
}

const even = subEven(numbers);
console.log(even)

// Ejercicio 3:

const listOfDegrees = [120, 349, 344, 12];

const convertedToFahrenheit = listOfDegrees.map((element) => {
    return 1.8 * element + 32;
});

console.log(convertedToFahrenheit)


// Ejercicio 4:


// tengo que recorrer el string hasta que un valor sea igual a " ", anadiendo todos los valores a una variable, cuando eso pase, cambiar la
// posicion de inicio de la funcion a la siguiente despues del espacio


const example = "Este ejercicio esta cool."

function stripWord(example) {
    const array = [];
    let word = '';

    for (let num=0; num < example.length; num++){
    
    if (example[num] != " "){
        word += example[num];
    }
    else{
        array.push(word);
        word = '';
    };
    };
    if (word.length > 0){
        array.push(word)
    }
    return array; 
}

const array = stripWord(example)

// Ejercicio 5:

// Entrada
const student = {
	name: "John Doe",
	grades: [
		{name: "math",grade: 80},
		{name: "science",grade: 100},
		{name: "history",grade: 60},
		{name: "PE",grade: 90},
		{name: "music",grade: 98}
	]
}



function Students(student) {
    const grades = student.grades.map((element) => element.grade);
    const average =  () => grades.reduce((sum, g) => sum + g, 0) / grades.length;
    const highest = () => result = Math.max(...grades);
    const lowest = () => result = Math.min(...grades);

    return {
        name: student.name,
        gradeAvg: average(),
        highestGrade: highest(),
        lowestGrade: lowest()
    }
};


// Salida

const studentResults = new Students(student);
studentResults