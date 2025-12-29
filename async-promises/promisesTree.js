const { setTimeout: delay } = require('node:timers/promises');


function sayCuteWord(){
    const dogs = delay(1000).then(()=> "Dogs")
    const are = delay(2000).then(()=> "are")
    const very = delay(3000).then(()=> "very")
    const cute = delay(4000).then(()=> "cute")

    return Promise.all([dogs, are, very, cute])
    .then(results =>{
        console.log(results.join(" "));
    })
    .catch(error =>{
        console.log("error", error);
    })
}

sayCuteWord()
