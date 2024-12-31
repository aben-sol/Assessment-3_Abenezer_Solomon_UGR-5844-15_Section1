export class Calculator {
    constructor() {}

    calculate(a,b,operand){
        switch(operand){
            case '+':
                return a + b;
            case '-':
                return a - b;
            case '*':
                return a * b;
            case '/':
                if (b == 0) {
                    return new Error('Division by zero');
                }
                return a / b;
            default:
                return 'Invalid operand';
        }
    }
}