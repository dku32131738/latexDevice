function Calculation(props) {
    const { value } = props;
    this.value = (value??0);
    this.text = String(value);
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