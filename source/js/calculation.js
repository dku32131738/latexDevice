function Calculation(props) {
    const { value } = props;
    this.value = (value??0);
    this.text = String(value);
    this.operator = null;
    this.prevValue = 0;
}

Calculation.prototype.inputNumber = function(number) {
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

Calculation.prototype.clear = function() {
    this.text = '0';
    this.value = 0;
}

Calculation.prototype.push = function () {
    this.value = Number(this.text);
    if(this.operation !== null) {

    }
}

Calculation.prototype.plus = function () {
    this.push();
    this.operation = 'plus';
}

Calculation.prototype.calculate = function (prevValue,operator,value) {
    let result = 0;
    if(operator === 'plus') {
        result = prevValue + value;
    }
    return result;
}