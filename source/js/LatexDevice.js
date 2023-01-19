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
    const displayDiv = document.createElement('div');
    this.device.appendChild(displayDiv);
    this.display = new Display({ el : displayDiv });
    this.display.setText(this.calculation.getText());
    for(let i = 0; i < 10; i++) {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : i, clickEvent : (props) => {
            const { value, button, event } = props;
            this.calculation.inputNumber(value);
            this.display.setText(this.calculation.getText());
        }});
    }
    {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : 'c', clickEvent : (props) => {
                this.calculation.clear();
                this.display.setText(this.calculation.getText());
            }
        });
    }
    {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : '+', clickEvent : (props) => {
                this.calculation.inputOperator('plus');
                this.display.setPrevDisplay(this.calculation.getValue());
            }
        });
    }
    {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : '-', clickEvent : (props) => {
                this.calculation.inputOperator('minus');
                this.display.setPrevDisplay(this.calculation.getValue());
            }
        });
    }
    {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : '*', clickEvent : (props) => {
                this.calculation.inputOperator('multiple');
                this.display.setPrevDisplay(this.calculation.getValue());
            }
        });
    }
    {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : '/', clickEvent : (props) => {
                this.calculation.inputOperator('divide');
                this.display.setPrevDisplay(this.calculation.getValue());
            }
        });
    }
    {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : '=', clickEvent : (props) => {
                this.calculation.push();
                this.display.setText(this.calculation.value);
            }
        });
    }
}

function Display(props) {
    const { el } = props;
    this.el = document.createElement('input');
    this.el.type = 'text';
    el.appendChild(this.el);
    this.prevDisplay = document.createElement('input');
    this.prevDisplay.type = 'text';
    el.appendChild(this.prevDisplay);
}

Display.prototype.setText =  function(text) {
    this.el.value = text;
}

Display.prototype.getText = function() {
    return this.el.value;
}

Display.prototype.setPrevDisplay = function(value) {
    this.prevDisplay.value = value;
}

function Button(props) {
    const { el, value, clickEvent } = props;
    this.el = document.createElement('div');
    el.appendChild(this.el);
    this.el.innerText = value;
    this.el.addEventListener('click',(ev) => {
        clickEvent({ 'value' : value, 'button' : this, 'event' : ev });
    });
}