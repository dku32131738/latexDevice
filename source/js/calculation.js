function Calculation(props) {
    const { value } = props;
    this.value = (value??0);
    this.text = String(value);
    this.operator = null;
}

Calculation.prototype.inputNumber = function(number) {
    if(number === '.' && this.text.includes('.')){
        return;
    }
    this.text = this.text + String(number);
}

Calculation.prototype.getText = function() {
    if(this.text.length > 1) {
        if(this.text[0] === '0' && this.text[1] !== '.'){
            this.text = this.text.substring(1,this.text.length);
        }
    }
    return this.text;
}

Calculation.prototype.getValue = function() {
    return this.value;
}


Calculation.prototype.clear = function() {
    this.text = '';
    this.value = 0;
}

Calculation.prototype.push = function () {
    const inputNum = Number(this.text);
    if(this.operator !== null) {
        this.calculate(inputNum);
    }else {
        this.value = inputNum;
    }
    this.operator = null;
    this.text = '';
}

Calculation.prototype.inputOperator = function (operator) {
    this.push();
    this.operator = operator;
}

Calculation.prototype.calculate = function (inputNum) {
    if(this.operator === 'plus') {
        this.value = this.value + inputNum;
    }else if(this.operator === 'minus') {
        this.value = this.value - inputNum;
    }else if(this.operator === 'multiple') {
        this.value = this.value * inputNum;
    }else if(this.operator === 'divide'){
        if(inputNum === 0) {
            return;
        }
        this.value = this.value / inputNum;
    }else {
        this.value = this.value;
    }
}