function init(el) {
    const props = { el : el }
    const device = new Device(props);
    device.render();
}
function Device(props) {
    const { el } = props;
    this.el = el;
    this.device = document.createElement('div');
    this.el.appendChild(this.device);
}

Device.prototype.render = function() {
    const displayDiv = document.createElement('div');
    this.device.appendChild(displayDiv);
    this.display = new Display({ el : displayDiv });
    for(let i = 0; i < 10; i++) {
        const buttonArea = document.createElement('div');
        this.device.appendChild(buttonArea);
        new Button({el : buttonArea, value : i });
    }
}

function Display(props) {
    const { el } = props;
    this.el = document.createElement('input');
    this.el.type = 'text';
    el.appendChild(this.el);
}

Display.prototype.setText =  function(text) {
    this.el.value = text;
}

Display.prototype.getText = function() {
    return this.el.value;
}

function Button(props) {
    const { el, value, clickEvent } = props;
    this.el = document.createElement('div');
    el.appendChild(this.el);
    this.el.innerText = value;
    this.el.addEventListener('click',(ev) => {
        alert(value);
    });
}