/**
 * 계산기 생성 함수
 * @param {*} el : 계산기 생성 위치
 */
function init(el) {
    const props = { el : el }
    const device = new Device(props);
    device.render();
}

/**
 * 계산기 생성자 초기값 0
 * @param {} props 
 */
function Device(props) {
    const { el } = props;
    this.calculation = new Calculation({ value : 0 }); //계산 객체 생성
    this.el = el;
    this.device = document.createElement('div');
    this.el.appendChild(this.device);
}

/**
 * 디바이스 렌더링 함수
 */
Device.prototype.render = function() {
    const deviceRenderer = new DeviceRenderer(this.el); //렌더링 객체 생성
    this.display = new Display({ el : deviceRenderer.getDisplayArea() }); //디스플레이 생성
    this.display.setText(this.calculation.getText()); //디스플레이의 값 생성
    /**
     * 클리어 버튼 생성
     */
    new Button({ el : deviceRenderer.findButtonArea('c'), value : 'c', clickEvent : (props) => {
        this.calculation.clear();
        this.display.setText(this.calculation.getText());
        this.display.setPrevDisplay(this.calculation.getValue());
        this.display.setOperator("");
    }});
    /**
     * = 버튼 생성
     */
    new Button({ el : deviceRenderer.findButtonArea('='), value : '=', clickEvent : (props) => {
        this.calculation.push();
        this.display.setText(this.calculation.getValue());
        this.display.setPrevDisplay("");
        this.display.setOperator("");
    }});
    /**
     * 숫자 버튼 생성
     */
    for(let i = 0; i < 10; i++) {
        new Button({el : deviceRenderer.findButtonArea(i), value : i, clickEvent : (props) => {
            const { value, button, event } = props;
            this.calculation.inputNumber(value);
            this.display.setText(this.calculation.getText());
        }});
    }
    /**
     * 덧셈 버튼 생성
     */
    new Button({el : deviceRenderer.findButtonArea('+'), value : '+', clickEvent : (props) => {
            this.calculation.inputOperator('plus');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
            this.display.setText(this.calculation.getText());
        }
    });
    /**
     * 소숫점 버튼 생성
     */
    new Button({el : deviceRenderer.findButtonArea('.'), value : '.', clickEvent : (props) => {
        this.calculation.inputNumber('.');
        this.display.setText(this.calculation.getText());
    }});
    /**
     * 뺄셈 버튼 생성
     */
    new Button({el : deviceRenderer.findButtonArea('-'), value : '-', clickEvent : (props) => {
            this.calculation.inputOperator('minus');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
        }
    });
    /**
     * 곱셈 버튼 생성
     */
    new Button({el : deviceRenderer.findButtonArea('*'), value : '*', clickEvent : (props) => {
            this.calculation.inputOperator('multiple');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
        }
    });
    /**
     * 나눗셈 버튼 생성
     */
    new Button({el : deviceRenderer.findButtonArea('/'), value : '/', clickEvent : (props) => {
            this.calculation.inputOperator('divide');
            this.display.setPrevDisplay(this.calculation.getValue());
            this.display.setOperator(props.value);
        }
    });
}

/**
 * 계산기 렌더링 객체
 * 기능은 구현되지 않고 위치만 렌더링한다
 * @param  el 렌더링 되는 태그
 */
function DeviceRenderer(el) {
    this.buttonMap = {}; // 버튼 검색용 오브젝트
    const operatorOrder = ['/','*','-','+']; //연산자 렌더링 순서 : 역순
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
    this.buttonMap['c'] = clearButton; //클리어 버튼
    const enterButton = document.createElement('button');
    enterButton.classList.add('enter');
    topRow.appendChild(enterButton);
    this.buttonMap['='] = enterButton; //=버튼
    el.appendChild(container);
    /**
     * 숫자와 연산자 버튼 위치 렌더링
     */
    for(let i = 3; i >= 1; i--){
        const row = document.createElement('div');
        row.classList.add('row');
        for(let j = 0; j < 3; j++) {
            const button = document.createElement('button');
            button.classList.add('number');
            row.appendChild(button);
            this.buttonMap[String(((i - 1) * 3) + (j + 1))] = button;
        }
        //연산자 버튼 렌더링
        buttonsArea.appendChild(row);
        const operatorButton = document.createElement('button');
        operatorButton.classList.add('operator');
        row.appendChild(operatorButton);
        this.buttonMap[operatorOrder[i]] = operatorButton;
    }
     /**
         * 마지막 버튼 렌더링 0,.,/
    */
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

/**
 * 디스플레이 영역 반환
 * @returns 
 */
DeviceRenderer.prototype.getDisplayArea = function() {
    return this.displayArea;
}

/**
 * 버튼 검색
 * @param  text 버튼의 텍스트 => 키 
 * @returns 
 */
DeviceRenderer.prototype.findButtonArea = function (text) {
    return this.buttonMap[text];
}

/**
 * 디스플레이 객체
 * @param {el : 영역} props 
 */
function Display(props) {
    const { el } = props;
    this.prevDisplay = document.createElement('div'); //이전 계산 디스플레이
    el.appendChild(this.prevDisplay);
    this.prevDisplay.classList.add('process');
    this.operatorDisplay = document.createElement('div'); //연산자 디스플레이
    el.appendChild(this.operatorDisplay);
    this.operatorDisplay.classList.add('operator');
    this.el = document.createElement('div');
    el.appendChild(this.el);
}

Display.prototype.setText =  function(text) {
    this.el.innerText = text;
}

Display.prototype.getText = function() {
    return this.el.value;
}

/**
 * 계산 결과 입력
 * @param {} value 
 */
Display.prototype.setPrevDisplay = function(value) {
    const num = Number(value).toFixed(5); //소숫점 5자리 수만
    this.prevDisplay.innerText = String(num);
}

/**
 * 연산자 디스플레이 설정
 */
Display.prototype.setOperator = function (operator) {
    this.operatorDisplay.innerText = operator;
}

/**
 * 버튼 생성자
 * @param {el : 버튼 태그, value : 버튼 텍스트, clickEvent : 클릭이벤트} props 
 */
function Button(props) {
    const { el, value, clickEvent } = props;
    this.el = el;
    this.el.innerText = value;
    this.el.addEventListener('click',(ev) => {
        clickEvent({ 'value' : value, 'button' : this, 'event' : ev });
    });
}