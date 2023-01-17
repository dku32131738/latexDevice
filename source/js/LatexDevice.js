function init(el) {
    const props = { el : el }
    const latexDevice = new LatexDevice(props);
    console.log(latexDevice);
    latexDevice.render();
}
function LatexDevice(props) {
    const { el } = props;
    this.el = el;
}

LatexDevice.prototype.render = () => {
    const device = document.createElement('div');
    console.log(this.el);
    this.el.appendChild(device);
}