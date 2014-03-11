/*jslint browser:true, evil: true, plusplus: true, white: true, indent: 4 */

(function () {
  "use strict";

  // Set variables
  var doc = document,
  $ = doc.querySelector.bind(doc),
  $$ = doc.querySelectorAll.bind(doc),
  calcWindow = $(".calc-window"),
  digitBtns = $$(".btn-digit"),
  methodBtns = $$(".btn-method"),
  percentBtn = $('.btn-percent'),
  clearBtn = $(".btn-clear"),
  equalBtn = $(".btn-equals"),
  currentExp = "",
  numBuilder = "";
  
  // Create event listener function
  function addEventListenerList(list, event, fn) {
    var i,
    len = list.length;
    for (i = 0; i < len; i++) {
      list[i].addEventListener(event, fn, false);
    }
  }

  // Gets value from button text
  function getValue(item) {
    var thisValue = item.textContent || item.innerText;
    return thisValue;
  }
  
  // Sets current expression
  function setExp(exp) {
    currentExp = exp;
    return currentExp;
  }
  
  // Gets current expression
  function getExp() {
    return currentExp;
  }

  // Displays expression in window
  function display(input) {
    calcWindow.innerHTML = input;
  }

  // Assigns arithmetic operators to buttons
  function methodBtn() {
  	var thisMethod,
  	separatedExp = "(" + currentExp + ")";
    if (this.classList.contains('btn-add')) {
      thisMethod = "+";
    } else if (this.classList.contains('btn-subtract')) {
      thisMethod = "-";
    } else if (this.classList.contains('btn-multiply')) {
      thisMethod = "*";
    } else if (this.classList.contains('btn-divide')) {
      thisMethod = "/";
    } else {
      thisMethod = this.textContent || this.innerText;
    }
    numBuilder = "";
    currentExp = separatedExp + thisMethod;
    setExp(currentExp);
    return currentExp;
  }

  // Calculates percent
  function calculatePercent() {
    var num = getExp(),
    percent = (num / 100);
    setExp(percent);
    display(percent);
    return percent;
  }
  
  // Evaluates current expression
  function calculate(exp) {
  	var num = eval(exp),
    calculatedVal;
    calculatedVal = Math.round(num * 100) / 100;
    return calculatedVal;
  }

  // Add digit to expression
  function touchBtn() {
    var thisNum = getValue(this);
    currentExp += thisNum;
    numBuilder += thisNum;
    display(numBuilder);
    return currentExp;
  }

  function keyBtn() {
    var thisNum = getKey();
    console.log(thisNum);
    currentExp += thisNum;
    numBuilder += thisNum;
    display(numBuilder);
    return currentExp;
  }

  // Calculate expression and display result
  function evaluateExp() {
  	var result = calculate(currentExp);
  	display(result);
    setExp(result);
    return result;
  }
  
  // Reset expression
  function reset() {
  	currentExp = "";
    numBuilder = "";
    display(0);
  }

  // Handle key press
  function getKey(e) { 
    e = e || window.event; 
    var charCode = e.keyCode || e.charCode, 
    keyPressed = String.fromCharCode(charCode);
    if (charCode >= 48 && charCode <= 57) {
      // Digit
      currentExp += keyPressed;
      numBuilder += keyPressed;
      display(numBuilder);
      setExp(currentExp);
    } else if (charCode > 41 && charCode < 48) {
      // Symbol
      var thisMethod = keyPressed,
          separatedExp = "(" + currentExp + ")";
        numBuilder = "";
    currentExp = separatedExp + thisMethod;
    setExp(currentExp);
    return currentExp;
    } else {
     return false;
   }
 };

 // Handle special keys
 function specialKeys(evt) {
  evt = evt || window.event;
  var charCode = evt.keyCode || evt.charCode,
  keyPressed = String.fromCharCode(charCode),
  currentExp = getExp();
  if (charCode == 8 || charCode == 46) {
    // 'Delete' or 'Backspace' key
    evt.preventDefault();
    reset();
  } else if (charCode === 13) {
    // 'Enter' key
    evaluateExp();
  }
}

  // Attach event listeners
  addEventListenerList(digitBtns, 'click', touchBtn);
  addEventListenerList(methodBtns, 'click', methodBtn);
  percentBtn.addEventListener('click', calculatePercent, false);
  equalBtn.addEventListener('click', evaluateExp, false);
  clearBtn.addEventListener('click', reset, false);
  doc.addEventListener('keypress', getKey, false);
  doc.addEventListener('keydown', specialKeys, false);

  // Set initial display
  display(0);

}());