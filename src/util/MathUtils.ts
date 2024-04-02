import * as Api from "@/util/Api"
import {CompareSymbol, Equation, OperatorSymbol} from "@/util/Api"


const TOTAL_SCORE = 100;


function randomByArea(base: number, max: number) {
	let rangePoor = base > 5 ? Math.floor(base/2) : 5;
	let range = randomNumber(0, 10)%2===1 ? base-rangePoor : base+rangePoor;
	let rangeValue = range<1 ? 1 : range>max ? max: range;

	if(rangeValue > base) {
		return randomNumber(base, rangeValue)
	}
	else {
		return randomNumber(rangeValue, base-1);
	}
}

/**
 * 获取得分
 * @param count: 题目数量
 * @param correctNumber: 正确题目数量
 * @param total: 总分
 * @return 分数
 */
export function getScore(count: number, correctNumber: number, total: number=TOTAL_SCORE): number {
	return total / count * correctNumber;
}

/**
 * 格式化一个等式为字符串
 * @param equation
 * @return string
 */
export function format(equation: Equation): string {
	return `${equation.left} ${equation.operator===OperatorSymbol.NONE ? '___' : equation.operator} ${equation.right} ${equation.compare==CompareSymbol.NONE ? '___' : equation.compare} ${equation.result!==undefined ? equation.result : '___'}`
}

/**
 * 判断两个算式是否相等
 * @param left
 * @param right
 * @return boolean
 */
export function equal(left: Equation, right: Equation): boolean {
	return format(left) === format(right)
}

export function getAnswer(equation: Equation): number {
	let answer = 0;
	if (equation.operator === OperatorSymbol.PLUS) {
		answer = equation.left + equation.right;
	} else if (equation.operator === OperatorSymbol.MINUS) {
		answer = equation.left - equation.right;
	} else if(equation.operator === OperatorSymbol.MULTIPLE){
		answer = equation.left * equation.right;
	}
	else {
		answer = equation.left / equation.right;
	}

	// console.log(`equation: ${firstNumber} ${operator} ${second} = ${answer}`);
	return answer;
}

/**
 * 生成随机数，具有范围最大约束[min, max)
 * return: randomValue
 */
export function randomNumber(min: number, max: number): number {
	let range = max - min;
	return Math.floor(Math.random() * range) + min;
}

export function randomAnswers(answer: number, max: number): number[] {
	let array: number[] = []
	array.push(answer)

	while(array.length < 4) {
		let value = randomByArea(answer, max);
		if(array.includes(value)) {
			continue;
		}

		array.push(value);
	}

	return array.sort(() => { return 0.5 - Math.random(); });
}

export function randomArrays(size: number, max: number): number[][] {
	let array: number[][] = []

	while(array.length < size) {
		let baseNumber = randomNumber(0, max);
		let secondNumber = randomByArea(baseNumber, max);

		let val = [baseNumber, secondNumber];
		if(array.includes(val)) {
			continue
		}

		array.push(val)
	}

	return array
}

export class RandomEquation {

	private containEquation(listEqas: Api.Equation[], eqa: Api.Equation): boolean {
		let value = listEqas.find(data => {
			if(data.operator === eqa.operator) {
				if(data.left === eqa.left && data.right === eqa.right)
					return true;
			}

			return false;
		})

		return value !== undefined;
	}

	private getDivisorList(dividend: number): number[] {
		let divisors: number[] = []
		for(let i = 0; i <= dividend; i++) {
			if(dividend % i === 0) {
				divisors.push(i);
			}
		}
		return divisors
	}


	/**
	 * 生成一个随机运算式（加、减、乘、除）
	 * @param maxValue 最大范围值 (当最大值为0时不处理最大值）
	 * @param operators 运算式范围
	 *
	 * @return 一个运算式
	 */
	buildOne(maxValue: number = 0,
	         operators: Api.OperatorSymbol[] = [Api.OperatorSymbol.PLUS, Api.OperatorSymbol.MINUS]): Api.Equation {

		let oper = operators[randomNumber(0, operators.length)];
		let firstNumber = randomNumber(0, maxValue + 1);

		let sendNumber = 0;

		if(oper === Api.OperatorSymbol.PLUS) {
			sendNumber = randomNumber(0, maxValue-firstNumber+1);
		}
		else if(oper === Api.OperatorSymbol.MINUS) {
			sendNumber = randomNumber(0, firstNumber+1);
		}
		else if(oper === Api.OperatorSymbol.MULTIPLE){
			sendNumber = randomNumber(0, Math.ceil(maxValue/firstNumber))
		}
		else {
			let divisors = this.getDivisorList(firstNumber);
			sendNumber = divisors[randomNumber(0, divisors.length)]
		}

		if(oper === Api.OperatorSymbol.DIVISION) {
			return {left: firstNumber, right: sendNumber, operator: Api.OperatorSymbol.DIVISION, compare: CompareSymbol.EQUAL}
		}
		return {left: firstNumber, right: sendNumber, operator: oper, compare: CompareSymbol.EQUAL}
	}

	/**
	 * 生成一组不重复的随机运算式（加、减、乘、除）
	 * @param maxValue 最大范围值
	 * @param total 生成的运算式个数
	 * @param operators 运算式范围
	 * @return 一组运算式
	 */
	buildMultiple(maxValue: number, total: number,
	              operators: Api.OperatorSymbol[] = [Api.OperatorSymbol.PLUS, Api.OperatorSymbol.MINUS]): Api.Equation[] {
		let listEqas: Api.Equation[] = []

		while(listEqas.length < total) {
			let eqa = this.buildOne(maxValue, operators);
			if(this.containEquation(listEqas, eqa)) {
				continue;
			}

			listEqas.push(eqa);
		}

		return listEqas;
	}
}