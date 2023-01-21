function init(el) {
    const props = { el : el }
    const device = new Device(props);
    device.render();
}
function Device(props) {
    const { el } = props;
    this.calculation = new Calculation({ value : 0 });
    this.el = el;
    this.device = document.createElement('div');
    this.el.appendChild(this.device);
}

Device.prototype.render = function() {
    const deviceRenderer = new DeviceRenderer(this.el); 
    this.display = new Display({ el : deviceRenderer.getDisplayArea() });
    this.display.setText(this.calculation.getText());
    new Button({ el : deviceRenderer.findButtonArea('c'), value : 'c', clickEvent : (props) => {
        this.calculation.clear();
        this.display.setText(this.calculation.getText());
        this.display.setPrevDisplay(this.calculation.getValue());
        this.display.setOperator("");
    }});
    new Button({ el : deviceRenderer.findButtonArea('='), value : '=', clickEvent : (props) => {
        this.calculation.push();
        this.display.setText(this.calculation.getValue());
        this.display.setPrevDisplay(this.calculation.getValue());
        this.display.setOperator(props.value);
    }});
    for(let i = 0; i < 10; i++) {
        new Button({el : deviceRenderer.findButtonArea(i), value : i, clickEvent : (props) => {
            const { value, button, event } = props;
            this.calculation.inputNumber(value);
            this.display.setText(this.calculation.getText());
        }});
    }
    new Button({el : deviceRenderer.findButtonArea('+'), value : '+', clickEvent : (props) => {
            this.calculation.inputOperator('plus');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
            this.display.setText(this.calculation.getText());
        }
    });
    new Button({el : deviceRenderer.findButtonArea('.'), value : '.', clickEvent : (props) => {
        this.calculation.inputNumber('.');
        this.display.setText(this.calculation.getText());
    }});
    new Button({el : deviceRenderer.findButtonArea('-'), value : '-', clickEvent : (props) => {
            this.calculation.inputOperator('minus');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
        }
    });
    new Button({el : deviceRenderer.findButtonArea('*'), value : '*', clickEvent : (props) => {
            this.calculation.inputOperator('multiple');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
        }
    });
    new Button({el : deviceRenderer.findButtonArea('/'), value : '/', clickEvent : (props) => {
            this.calculation.inputOperator('divide');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
        }
    });
}

function DeviceRenderer(el) {
    this.buttonMap = {};
    const operatorOrder = ['/','*','-','+'];
    const container = document.createElement('div');
    container.classList.add('container');
    const calculator = document.createElement('div');
    calculator.classList.add('calculator');
    container.appendChild(calculator);
    this.displayArea = document.createElement('div');
    this.displayArea.classList.add('display');
    calculator.appendChild(this.displayArea);
    const buttonsArea = document.createElement('div');
    buttonsArea.classList.add('buttons');
    calculator.appendChild(buttonsArea);
    const topRow = document.createElement('div');
    topRow.classList.add('top_row');
    buttonsArea.appendChild(topRow);
    const clearButton = document.createElement('button');
    clearButton.classList.add('clear');
    topRow.appendChild(clearButton);
    this.buttonMap['c'] = clearButton;
    const enterButton = document.createElement('button');
    enterButton.classList.add('enter');
    topRow.appendChild(enterButton);
    this.buttonMap['='] = enterButton;
    el.appendChild(container);
    for(let i = 3; i >= 1; i--){
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < 3; j++) {
            const button = document.createElement('button');
            button.classList.add('number');
            row.appendChild(button);
            this.buttonMap[String(((i - 1) * 3) + (j + 1))] = button;
        }
        buttonsArea.appendChild(row);
        const operatorButton = document.createElement('button');
        operatorButton.classList.add('operator');
        row.appendChild(operatorButton);
        this.buttonMap[operatorOrder[i]] = operatorButton;
    }
    const lastRow = document.createElement('div');
    lastRow.classList.add('row');
    buttonsArea.appendChild(lastRow);
    const zeroButton = document.createElement('button');
    zeroButton.classList.add('number','double');
    lastRow.appendChild(zeroButton);
    this.buttonMap['0']= zeroButton;
    const dotButton = document.createElement('button');
    dotButton.classList.add('number');
    lastRow.appendChild(dotButton);
    this.buttonMap['.'] = dotButton;
    const divideOperator = document.createElement('button');
    divideOperator.classList.add('operator');
    lastRow.appendChild(divideOperator);
    this.buttonMap['/'] = divideOperator;
}

DeviceRenderer.prototype.getDisplayArea = function() {
    return this.displayArea;
}

DeviceRenderer.prototype.findButtonArea = function (text) {
    return this.buttonMap[text];
}

function Display(props) {
    const { el } = props;
    this.el = document.createElement('div');
    el.appendChild(this.el);
    this.prevDisplay = document.createElement('div');
    el.appendChild(this.prevDisplay);
    this.operatorDisplay = document.createElement('div');
    el.appendChild(this.operatorDisplay);
}

Display.prototype.setText =  function(text) {
    this.el.innerText = text;
}

Display.prototype.getText = function() {
    return this.el.value;
}

Display.prototype.setPrevDisplay = function(value) {
    this.prevDisplay.innerText = value;
}

Display.prototype.setOperator = function (operator) {
    this.operatorDisplay.innerText = operator;
}

function Button(props) {
    const { el, value, clickEvent } = props;
    this.el = el;
    this.el.innerText = value;
    this.el.addEventListener('click',(ev) => {
        clickEvent({ 'value' : value, 'button' : this, 'event' : ev });
    });
}