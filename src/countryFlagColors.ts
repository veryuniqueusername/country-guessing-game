import { Code } from './codeType';
import { getCode } from './getters';

export type Color =
	| 'red'
	| 'green'
	| 'blue'
	| 'yellow'
	| 'saffron'
	| 'liblue'
	| 'white'
	| 'black';

export const clrList: { [K in Code]: Color[] } = {
	ad: ['red', 'blue', 'yellow', 'white', 'saffron'],
	ae: ['green', 'black', 'red', 'white'],
	af: ['green', 'black', 'red', 'white', 'saffron'],
	ag: ['red', 'black', 'liblue', 'white', 'yellow'],
	al: ['red', 'black'],
	am: ['red', 'saffron', 'blue'],
	ao: ['red', 'black', 'yellow'],
	ar: ['liblue', 'white', 'saffron'],
	at: ['red', 'white'],
	au: ['blue', 'white', 'red'],
	az: ['green', 'liblue', 'red', 'white'],
	ba: ['blue', 'yellow', 'white'],
	bb: ['blue', 'yellow', 'black'],
	bd: ['green', 'red'],
	be: ['red', 'yellow', 'black'],
	bf: ['red', 'green', 'yellow'],
	bg: ['red', 'green', 'white'],
	bh: ['red', 'white'],
	bi: ['green', 'white', 'red'],
	bj: ['green', 'red', 'yellow'],
	bn: ['yellow', 'white', 'black', 'red'],
	bo: ['red', 'yellow', 'green'],
	br: ['green', 'yellow', 'blue', 'white'],
	bs: ['liblue', 'yellow', 'black'],
	bt: ['yellow', 'red', 'white', 'saffron'],
	bw: ['liblue', 'black', 'white'],
	by: ['red', 'green', 'white'],
	bz: ['blue', 'white', 'red', 'green', 'black'],
	ca: ['red', 'white'],
	cd: ['liblue', 'red', 'yellow'],
	cf: ['yellow', 'green', 'white', 'blue', 'red'],
	cg: ['red', 'yellow', 'green'],
	ch: ['red', 'white'],
	ci: ['saffron', 'green', 'white'],
	cl: ['red', 'white', 'blue'],
	cm: ['yellow', 'green', 'red'],
	cn: ['red', 'yellow'],
	co: ['yellow', 'red', 'blue'],
	cr: ['red', 'blue', 'white'],
	cu: ['blue', 'white', 'red'],
	cv: ['blue', 'white', 'red', 'yellow'],
	cy: ['white', 'saffron', 'green'],
	cz: ['red', 'white', 'blue'],
	de: ['red', 'yellow', 'black'],
	dj: ['green', 'liblue', 'white', 'saffron'],
	dk: ['red', 'white'],
	dm: ['green', 'red', 'yellow', 'black', 'white'],
	do: ['red', 'blue', 'white', 'green'],
	dz: ['white', 'green', 'red'],
	ec: ['yellow', 'red', 'blue', 'saffron', 'green', 'black'],
	ee: ['liblue', 'black', 'white'],
	eg: ['red', 'black', 'white', 'yellow'],
	er: ['red', 'green', 'liblue', 'yellow'],
	es: ['red', 'yellow', 'saffron', 'white'],
	et: ['red', 'green', 'yellow', 'liblue'],
	fi: ['white', 'blue'],
	fj: ['liblue', 'red', 'white', 'blue'],
	fm: ['liblue', 'white'],
	fr: ['red', 'blue', 'white'],
	ga: ['yellow', 'green', 'liblue'],
	gb: ['red', 'white', 'blue'],
	gd: ['red', 'yellow', 'green'],
	ge: ['white', 'red'],
	gh: ['red', 'green', 'yellow', 'black'],
	gm: ['red', 'green', 'blue', 'white'],
	gn: ['red', 'yellow', 'green'],
	gq: ['red', 'green', 'white', 'liblue'],
	gr: ['blue', 'white'],
	gt: ['liblue', 'white', 'saffron', 'green'],
	gw: ['yellow', 'green', 'red', 'black'],
	gy: ['green', 'red', 'yellow', 'white', 'black'],
	hn: ['liblue', 'white'],
	hr: ['red', 'blue', 'white', 'liblue'],
	ht: ['blue', 'red', 'white', 'green'],
	hu: ['red', 'green', 'white'],
	id: ['red', 'white'],
	ie: ['saffron', 'green', 'white'],
	il: ['white', 'liblue'],
	in: ['saffron', 'green', 'white', 'blue'],
	iq: ['white', 'black', 'red', 'green'],
	ir: ['white', 'red', 'green'],
	is: ['blue', 'red', 'white'],
	it: ['red', 'green', 'white'],
	jm: ['yellow', 'green', 'black'],
	jo: ['green', 'black', 'red', 'white'],
	jp: ['white', 'red'],
	ke: ['red', 'black', 'green', 'white'],
	kg: ['red', 'yellow'],
	kh: ['blue', 'red', 'white', 'black'],
	ki: ['red', 'blue', 'white', 'yellow'],
	km: ['yellow', 'green', 'liblue', 'white', 'red'],
	kn: ['black', 'red', 'green', 'yellow', 'white'],
	kp: ['white', 'black', 'red', 'blue'],
	kr: ['red', 'blue', 'white'],
	kw: ['red', 'green', 'white', 'black'],
	kz: ['liblue', 'yellow'],
	la: ['red', 'blue', 'white'],
	lb: ['saffron', 'white', 'green'],
	lc: ['blue', 'yellow', 'black', 'white'],
	li: ['red', 'blue', 'yellow', 'black'],
	lk: ['yellow', 'red', 'saffron', 'green'],
	lr: ['red', 'white', 'blue'],
	ls: ['white', 'green', 'blue', 'black'],
	lt: ['red', 'yellow', 'green'],
	lu: ['red', 'liblue', 'white'],
	lv: ['red', 'white'],
	ly: ['black', 'red', 'green', 'white'],
	ma: ['red', 'green'],
	mc: ['red', 'white'],
	md: ['red', 'blue', 'yellow', 'black'],
	me: ['red', 'saffron', 'green', 'liblue'],
	mg: ['red', 'green', 'white'],
	mh: ['blue', 'white', 'saffron'],
	mk: ['red', 'yellow'],
	ml: ['red', 'yellow', 'green'],
	mm: ['red', 'blue', 'white'],
	mn: ['red', 'liblue', 'yellow'],
	mr: ['green', 'yellow'],
	mt: ['red', 'white'],
	mu: ['red', 'green', 'yellow', 'blue'],
	mv: ['red', 'green', 'white'],
	mw: ['red', 'green', 'black'],
	mx: ['red', 'green', 'white', 'saffron'],
	my: ['white', 'red', 'blue', 'yellow'],
	mz: ['yellow', 'green', 'black', 'red', 'white'],
	na: ['green', 'blue', 'red', 'white', 'yellow'],
	ne: ['saffron', 'green', 'white'],
	ng: ['green', 'white'],
	ni: ['liblue', 'white'],
	nl: ['red', 'blue', 'white'],
	no: ['red', 'blue', 'white'],
	np: ['red', 'blue', 'white'],
	nr: ['blue', 'yellow', 'white'],
	nz: ['blue', 'red', 'white'],
	om: ['saffron', 'white', 'green'],
	pa: ['white', 'red', 'liblue'],
	pe: ['red', 'white'],
	pg: ['black', 'red', 'yellow', 'white'],
	ph: ['red', 'blue', 'white', 'yellow'],
	pk: ['green', 'white'],
	pl: ['red', 'white'],
	ps: ['green', 'black', 'white', 'red'],
	pt: ['red', 'green', 'yellow', 'white'],
	pw: ['liblue', 'yellow'],
	py: ['red', 'blue', 'white'],
	qa: ['red', 'white'],
	ro: ['red', 'yellow', 'blue'],
	rs: ['red', 'white', 'blue', 'yellow'],
	ru: ['red', 'blue', 'white'],
	rw: ['liblue', 'yellow', 'green', 'saffron'],
	sa: ['green', 'white'],
	sb: ['green', 'liblue', 'yellow', 'white'],
	sc: ['red', 'yellow', 'green', 'blue', 'white'],
	sd: ['red', 'black', 'white', 'green'],
	se: ['blue', 'yellow'],
	sg: ['white', 'red'],
	si: ['red', 'liblue', 'white'],
	sk: ['red', 'white', 'blue'],
	sl: ['green', 'liblue', 'white'],
	sm: ['white', 'liblue', 'green', 'yellow'],
	sn: ['green', 'red', 'yellow'],
	so: ['liblue', 'white'],
	sr: ['green', 'red', 'white', 'yellow'],
	ss: ['green', 'black', 'blue', 'red', 'white', 'yellow'],
	st: ['green', 'yellow', 'red', 'black'],
	sv: ['blue', 'white'],
	sy: ['red', 'black', 'white', 'green'],
	sz: ['liblue', 'red', 'yellow', 'black', 'white', 'saffron'],
	td: ['red', 'yellow', 'blue'],
	tg: ['green', 'yellow', 'red', 'white'],
	th: ['red', 'blue', 'white'],
	tj: ['white', 'red', 'green', 'yellow'],
	tl: ['red', 'black', 'yellow', 'white'],
	tm: ['green', 'red', 'saffron', 'white'],
	tn: ['red', 'white'],
	to: ['red', 'white'],
	tr: ['red', 'white'],
	tt: ['red', 'black', 'white'],
	tv: ['liblue', 'red', 'white', 'blue', 'yellow'],
	tw: ['red', 'blue', 'white'],
	tz: ['green', 'liblue', 'black', 'yellow'],
	ua: ['yellow', 'liblue'],
	ug: ['yellow', 'red', 'black', 'white'],
	us: ['red', 'white', 'blue'],
	uy: ['white', 'blue', 'yellow', 'black'],
	uz: ['white', 'green', 'liblue', 'red'],
	va: ['yellow', 'white', 'saffron'],
	vc: ['yellow', 'green', 'liblue'],
	ve: ['red', 'yellow', 'blue', 'white'],
	vn: ['red', 'yellow'],
	vu: ['red', 'green', 'black', 'yellow'],
	ws: ['red', 'blue'],
	xk: ['blue', 'yellow', 'white'],
	ye: ['red', 'black', 'white'],
	za: ['green', 'red', 'blue', 'white', 'black', 'yellow'],
	zm: ['green', 'saffron', 'red', 'black'],
	zw: ['yellow', 'green', 'red', 'black', 'white'],
};

// export function colorStuff() {
// 	for (let i = 0; i < json.length; i++) {
// 		const country = json[i];
// 		const countryName = country.Country;
// 		const countryCode = getCode(countryName);
// 		if (getCode(countryName) === undefined) {
// 			console.log(countryName);
// 		}
// 		const colorList: Color[] = [];
// 		const countryColors: { [K in Color]: number } = {
// 			red: country.Red,
// 			saffron: country.Saffron,
// 			yellow: country.Yellow,
// 			green: country.Green,
// 			blue: country.Blue,
// 			liblue: country.LiBlue,
// 			black: country.Black,
// 			white: country.White,
// 		};
// 		for (const color in countryColors) {
// 			if (countryColors[color as Color] === 0) {
// 				continue;
// 			}
// 			let done = false;
// 			if (0 === colorList.length) {
// 				colorList.push(color as Color);
// 				continue;
// 			}
// 			for (let j = 0; j < colorList.length; j++) {
// 				if (countryColors[color as Color] > countryColors[colorList[j]]) {
// 					colorList.splice(j, 0, color as Color);
// 					done = true;
// 					break;
// 				}
// 			}
// 			if (!done) {
// 				colorList.push(color as Color);
// 			}
// 		}

// 		clrList[countryCode as Code] = colorList;
// 	}
// 	console.log(clrList);
// }
