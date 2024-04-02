export enum OperatorSymbol {
	NONE = '',
	PLUS = '+',
	MINUS = '-',
	MULTIPLE = '✕️',
	DIVISION = '⁒'
}

export enum CompareSymbol {
	NONE = '',
	EQUAL = "=",
	GREATER = ">",
	LESS = "<"
}

export interface Equation {
	left: number;
	operator: OperatorSymbol;
	right: number;
	compare?: CompareSymbol;
	result?: number;
}


export interface ResultInfo {
	index: number,
	error: string,
	correct: string
}