import { Code } from './codeType';
import { lczList } from './countryLocalization';
import { brdList } from './countryBorders';
import { cstList } from './countryCoastal';
import { conList } from './countryContinents';
import { clrList } from './countryFlagColors';
import { govList } from './countryGovernments';

export function getCode(name: string): Code | undefined {
	if (name.toLowerCase() in lczList) {
		return name.toLowerCase() as Code;
	}
	const code = Object.keys(lczList).find((key) => {
		return lczList[key as Code].find((lcz) => {
			if (lcz.toLowerCase() === name.toLowerCase()) {
				return true;
			}
		});
	});
	return code !== undefined ? (code as Code) : undefined;
}

export function getName(country: Code) {
	return lczList[country][0];
}

export function getBorders(country: Code) {
	return brdList[country];
}

export function getCoastal(country: Code) {
	return cstList[country];
}

export function getContinent(country: Code) {
	return conList[country];
}

export function getFlagColors(country: Code) {
	return clrList[country];
}

export function getGovernment(country: Code) {
	return govList[country];
}
