// Ejercicio 1

const array = 'Jovan es muy buen amigo.   ';


function reverseArray(array){
    let result = '';
    for (let val = array.length - 1; val >= 0; val--){
        result += array[val];
    }
    return result;
};

const result = reverseArray(array);

// Ejercicio 2
// guardo el primer valor, lo agrego a una nueva lista, paso al segundo, verifico si ya esta en la lista, si no, lo agrego, si si, paso al siguiente numero de la lista

const list = [1,2,3,2,4,1,5];

function deleteDuplicates(array){
    const unique = [];
    for (num of array){
        if (!unique.includes(num)){
            unique.push(num);
        }
    };
    return unique;
};

const unique = deleteDuplicates(list);

