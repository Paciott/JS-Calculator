const darkmodeToggle = document.querySelector('.darkmode');
const dark = document.querySelector('.material-symbols-outlined');
const light = document.querySelector('.light');

//DARK MODE CODE

darkmodeToggle.addEventListener('click', () => {
  dark.classList.toggle('material-symbols-outlined');
  dark.classList.toggle('hidden');
  light.classList.toggle('material-symbols-outlined');
  light.classList.toggle('hidden');

  if(!light.classList.contains('hidden')) {
    document.documentElement.classList.add("lightMode");
  } else {
    document.documentElement.classList.remove("lightMode")
  }
})

//
//CREATE CALCULATOR CLASS 

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear();
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  appendNumber(number) {
    if(number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  compute() {
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current)) return
    switch(this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
        default:
          return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return 
    if(this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    if(this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = this.previousOperand
    }
  }

}

const numberBtns = document.querySelectorAll('.number');
const operationBtns = document.querySelectorAll('.operand , .minus');
const equalsBtn = document.querySelector('.equals');
const allClearBtn = document.querySelector('.ac');
const deleteBtn = document.querySelector('.del');
const currentOperandTextElement = document.querySelector('.current-operand');
const previousOperandTextElement = document.querySelector('.previous-operand');
const minus =  document.querySelector('.minus');

//CREATE CALCULATOR

  const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

  //ADD EVENT LISTENERS

  numberBtns.forEach(btn => {
    btn.addEventListener('click', () => {
     calculator.appendNumber(btn.innerText)
     calculator.updateDisplay()
    })
  })

  operationBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if(btn.innerText === '-' && currentOperandTextElement.innerText === ''){
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
      } else {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay() 
    }})
  })

  equalsBtn.addEventListener('click', ()=> {
    calculator.compute()
    calculator.updateDisplay()
  })

  deleteBtn.addEventListener('click', ()=> {
    calculator.delete()
    calculator.updateDisplay()
  })

  allClearBtn.addEventListener('click', ()=> {
    calculator.clear()
    calculator.updateDisplay()
  })



