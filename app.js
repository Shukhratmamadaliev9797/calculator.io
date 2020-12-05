const input = document.querySelector('input');

document.querySelectorAll('.digits').forEach(
    function(el){
        el.onclick = function(){
            if(input.value !== '0'){
                input.value = input.value + el.innerText; 
            }else{
                input.value = el.innerText;
            }
        }
    }
)

const buffer = [];
const opCallback = opName => () =>{
    let currentValue = parseFloat(input.value);
    if (opName === "percent"){
        currentValue *= 0.01;
        input.value = currentValue;
    }else{
        if(buffer && buffer.length){
            buffer.push({value: currentValue});
            const result = evaluate(buffer);

            buffer.push({value: result});
            buffer.push({value: opName});

            input.value = '';
        }else{
            buffer.push({ value: currentValue});
            buffer.push({ value: opName});
            input.value = "";
        }
    }
}

const evaluate = function(buffer){
    const secondOperand = buffer.pop().value;
    const operator = buffer.pop().value;
    const firstOperand = buffer.pop().value;

    switch (operator){
        case "add":
            return firstOperand + secondOperand;
            break;
        case "subtract":
            return firstOperand - secondOperand;
            break;
        case "multiply":
            return firstOperand * secondOperand;
            break;
        case "divide":
            return firstOperand / secondOperand;
            break;
        default:
            return secondOperand;
    }
}

for (const opName of ["add", "subtract", "multiply", "divide", "percent"]){
    document.querySelector(`.op-key[op=${opName}]`).onclick = opCallback(opName);
}

document.querySelector("#equal").onclick = function(){
    if(buffer && buffer.length){
        buffer.push({ value: parseFloat(input.value)});
        input.value = evaluate(buffer);
    }
};

document.querySelector('#clear').onclick = function(){
    input.value = 0;
    buffer.length = 0;
}

document.querySelector('#backspace').onclick = function(){
    input.value = input.value.substring(0, input.value.length-1);
};


//////////scroll animation ////////////
AOS.init();
