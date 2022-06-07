import names from './json/names.json';
import list from './json/coastal.json';

export function getName(code: Code) {
	return names[code][0];
}

export function getCode(name: string): Code | undefined {
	for (const code in names) {
		if (code === name) {
			return code as Code;
		}
		for (const cName of names[code as Code]) {
			if (cName.toLowerCase() === name.toLowerCase()) {
				return code as Code;
			}
		}
	}
}

export type CountryType = {
	names: string[];
	area: number;
	areaRank: number;
	borders: Code[];
	borderCount: number;
	capital: string;
	coastal: boolean;
	continent: Continent;
	flagColors: Color[];
	flagColorCount: number;
	government: Government;
	headOfState: string;
	population: number;
	populationRank: number;
	religion: Religion;
};

export type Code = keyof typeof names;

export type Continent =
	| 'Africa'
	| 'Asia'
	| 'Europe'
	| 'North America'
	| 'Oceania'
	| 'South America';

export type Color =
	| 'red'
	| 'saffron'
	| 'yellow'
	| 'green'
	| 'liblue'
	| 'blue'
	| 'white'
	| 'black';

export type Government =
	| 'Republic'
	| 'Absolute Monarchy'
	| 'Constitutional Monarchy'
	| 'Provisional';

export type Religion =
	| 'Christianity'
	| 'Islam'
	| 'Hinduism'
	| 'Buddhism'
	| 'Judaism'
	| 'Folk Religion'
	| 'Irreligion'
	| 'Other';
