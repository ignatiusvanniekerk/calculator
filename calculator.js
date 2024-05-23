const historyArr = ['10 + 10 + 10 = 30', '20 - 10 = 10']

const allowedOperations = ['+', '-']
let currentValue = ''
let currentCalculationArr = []
let resetOnStart = true


/**
 * Clears All values
 */
function clearAll(){
    document.getElementById("screen").innerHTML = "";    
}

function calcVal(value){
    if(resetOnStart){
        clearAll()
        resetValues()
        resetOnStart= false
    }

    if(allowedOperations.includes(currentValue)){
        currentValue = ''
    }
    const numberDiv =`<span class="number">${value}</span>`;
    const el = document.querySelector('#screen');
    el.insertAdjacentHTML('beforeend', numberDiv);
    currentValue = currentValue + value
    console.log(currentValue, currentCalculationArr)
}

function operatorVal(value){
    if(resetOnStart){
        clearAll()
        resetValues()
        resetOnStart= false
    }

    if(allowedOperations.includes(currentValue)){
        removeLastHTML()
        console.log(currentCalculationArr.pop())
    }else{
        currentCalculationArr.push(currentValue)
    }
    const operatorDiv =`<span class="operation">${value}</span>`;
    const el = document.querySelector('#screen');
    el.insertAdjacentHTML('beforeend', operatorDiv);
    
    currentValue = value
    currentCalculationArr.push(currentValue)
    console.log(currentValue, currentCalculationArr)
}

/**
 * Removes only the last entry
 */
function backspace(){
    if(allowedOperations.includes(currentValue)){
        currentCalculationArr.pop()
        currentValue = currentCalculationArr[currentCalculationArr.length -1 ]
        
    }else if(currentValue){
        if(currentCalculationArr[currentCalculationArr.length -1 ] == currentValue) currentCalculationArr.pop()        
        currentValue = currentValue.substring(0, currentValue.length - 1) || currentCalculationArr.pop();
        currentCalculationArr.push(currentValue)
    }    
    console.log(currentValue, currentCalculationArr)
    removeLastHTML()
}

function removeLastHTML(){
    const myElement = document.getElementById("screen");
    if(!myElement.lastChild){
        resetValues()
        return
    }
    myElement.removeChild(myElement.lastChild)
}

function resetValues(){
    currentCalculationArr = []
    currentValue = ''    
}

function operatorEqual(){
    if(currentCalculationArr[currentCalculationArr.length -1 ] !== currentValue){
        currentCalculationArr.push(currentValue)
    }
    const result = currentCalculationArr.reduce((acc, val) => {
        if (!isNaN(val)) {
            if (acc.operator === null) {
                return { result: parseFloat(val), operator: null };
            } else {
                if (acc.operator === '+') {
                    console.log("in plus")
                    return { result: acc.result + parseFloat(val), operator: null };
                }

                if (acc.operator === '-') {
                    console.log("in minus")
                    return { result: acc.result - parseFloat(val), operator: null };
                }
            }
        } else {
            return { ...acc, operator: val };
        }
    }, { result: 0, operator: null }).result;
    const operatorDiv =`<span class="equal">=</span><span class="value">${result}</span>`;
    const el = document.querySelector('#screen');
    el.insertAdjacentHTML('beforeend', operatorDiv);
    historyArr.push(`${currentCalculationArr}`)
    resetOnStart = true
}

/**
 * Display History
 */
function history(){

}

