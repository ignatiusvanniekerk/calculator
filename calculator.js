/**
 * Allowed Math Operators
 */
const allowedOperations = ['+', '-']

/**
 * Current value
 */
let currentValue = ''

/**
 * Calculation Array
 */
let currentCalculationArr = []

/**
 * Should the next operator reset
 */
let resetOnStartValue = true


/**
 * Clears All values
 */
function clearAll(){
    document.getElementById("screen").innerHTML = "";    
}

/**
 * Reset all values
 */
function resetOnStart(){
    if(resetOnStartValue){
        clearAll()
        resetValues()
        resetOnStartValue= false
    }
}

/**
 * Calculate numbers
 * @param {string} value 
 */
function calcVal(value){
    resetOnStart()

    if(allowedOperations.includes(currentValue)){
        currentValue = ''
    }

    const numberDiv =`<span class="number">${value}</span>`;
    const el = document.querySelector('#screen');
    el.insertAdjacentHTML('beforeend', numberDiv);
    currentValue = currentValue + value
}

/**
 * When a Operator is selected
 * @param {*} value 
 */
function operatorVal(value){
    resetOnStart()

    if (allowedOperations.includes(currentValue)){
        removeLastHTML()
        currentCalculationArr.pop()
    } else {
        currentCalculationArr.push(currentValue || '0')
    }

    const operatorDiv =`<span class="operation">${value}</span>`;
    const el = document.querySelector('#screen');
    el.insertAdjacentHTML('beforeend', operatorDiv);
    
    currentValue = value
    currentCalculationArr.push(currentValue)
}

/**
 * Removes only the last entry
 */
function backspace(){
    resetOnStart()

    if (allowedOperations.includes(currentValue)){
        currentCalculationArr.pop()
        currentValue = currentCalculationArr[currentCalculationArr.length -1 ]        
    } else if (currentValue){
        if(currentCalculationArr[currentCalculationArr.length -1 ] == currentValue) currentCalculationArr.pop()        
        currentValue = currentValue.substring(0, currentValue.length - 1) || currentCalculationArr.pop();
        currentCalculationArr.push(currentValue)
    }    
    removeLastHTML()
}

/**
 * Removes the last child entry
 * @returns 
 */
function removeLastHTML(){
    const myElement = document.getElementById("screen");
    if(!myElement.lastChild){
        resetValues()
        return
    }
    myElement.removeChild(myElement.lastChild)
}

/**
 * Reset all values
 */
function resetValues(){
    currentCalculationArr = []
    currentValue = ''    
}

/**
 * Equal Button
 */
function operatorEqual(){
    if(resetOnStartValue){
        resetOnStart()
        currentValue = '0' 
    }

    if(currentCalculationArr[currentCalculationArr.length -1 ] !== currentValue){
        currentCalculationArr.push(currentValue)
    }

    const result = calculateTotals()

    totalsHTML(result)

    resetOnStartValue = true

    addToHistoryContainer()
}

/**
 * Takes the screen details to the history container
 */
function addToHistoryContainer(){
    const screenHistory = document.querySelector('#history-container');
    screenHistory.insertAdjacentHTML("afterbegin", `<div class="keys txt-decoration tall-wide">${document.getElementById("screen").innerHTML}</div>`);
}

/**
 * adds the results to the html
 * @param {*} result 
 */
function totalsHTML(result){
    const operatorDiv =`<span class="equal">=</span><span class="value">${result}</span>`;
    const el = document.querySelector('#screen');
    el.insertAdjacentHTML('beforeend', operatorDiv);
}

/**
 * Calculates the total of the array
 * @returns number
 */
function calculateTotals(){
    return currentCalculationArr.reduce((acc, val) => {
        if (!isNaN(val)) {
            if (acc.operator === null) {
                return { result: parseFloat(val), operator: null };
            } else {
                if (acc.operator === '+') {
                    return { result: acc.result + parseFloat(val), operator: null };
                }

                if (acc.operator === '-') {
                    return { result: acc.result - parseFloat(val), operator: null };
                }
            }
        } else {
            return { ...acc, operator: val };
        }
    }, { result: 0, operator: null }).result;
}

/**
 * Display History
 */
function history(){
    if(document.getElementById('history-container').matches('.hide-history')){
        document.getElementById('history-container').classList.remove('hide-history')
    }else{
        document.getElementById('history-container').classList.add('hide-history')
    }
}

