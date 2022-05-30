import { getCode } from './getters';
import { Code } from './codeType';
import json from './colors.json';

export type Continent =
	| 'Africa'
	| 'Asia'
	| 'Europe'
	| 'North America'
	| 'Oceania'
	| 'South America';

export const conList: { [K in Code]: Continent } = {
	ad: 'Europe',
	ae: 'Asia',
	af: 'Asia',
	ag: 'North America',
	al: 'Europe',
	am: 'Asia',
	ao: 'Africa',
	ar: 'South America',
	at: 'Europe',
	au: 'Oceania',
	az: 'Asia',
	ba: 'Europe',
	bb: 'North America',
	bd: 'Asia',
	be: 'Europe',
	bf: 'Africa',
	bg: 'Europe',
	bh: 'Asia',
	bi: 'Africa',
	bj: 'Africa',
	bn: 'Asia',
	bo: 'South America',
	br: 'South America',
	bs: 'North America',
	bt: 'Asia',
	bw: 'Africa',
	by: 'Europe',
	bz: 'North America',
	ca: 'North America',
	cd: 'Africa',
	cf: 'Africa',
	cg: 'Africa',
	ch: 'Europe',
	ci: 'Africa',
	cl: 'South America',
	cm: 'Africa',
	cn: 'Asia',
	co: 'South America',
	cr: 'North America',
	cu: 'North America',
	cv: 'Africa',
	cy: 'Asia',
	cz: 'Europe',
	de: 'Europe',
	dj: 'Africa',
	dk: 'Europe',
	dm: 'North America',
	do: 'North America',
	dz: 'Africa',
	ec: 'South America',
	ee: 'Europe',
	eg: 'Africa',
	er: 'Africa',
	es: 'Europe',
	et: 'Africa',
	fi: 'Europe',
	fj: 'Oceania',
	fm: 'Oceania',
	fr: 'Europe',
	ga: 'Africa',
	gb: 'Europe',
	gd: 'North America',
	ge: 'Asia',
	gh: 'Africa',
	gm: 'Africa',
	gn: 'Africa',
	gq: 'Africa',
	gr: 'Europe',
	gt: 'North America',
	gw: 'Africa',
	gy: 'South America',
	hn: 'North America',
	hr: 'Europe',
	ht: 'North America',
	hu: 'Europe',
	id: 'Asia',
	ie: 'Europe',
	il: 'Asia',
	in: 'Asia',
	iq: 'Asia',
	ir: 'Asia',
	is: 'Europe',
	it: 'Europe',
	jm: 'North America',
	jo: 'Asia',
	jp: 'Asia',
	ke: 'Africa',
	kg: 'Asia',
	kh: 'Asia',
	ki: 'Oceania',
	km: 'Africa',
	kn: 'North America',
	kp: 'Asia',
	kr: 'Asia',
	kw: 'Asia',
	kz: 'Asia',
	la: 'Asia',
	lb: 'Asia',
	lc: 'North America',
	li: 'Europe',
	lk: 'Asia',
	lr: 'Africa',
	ls: 'Africa',
	lt: 'Europe',
	lu: 'Europe',
	lv: 'Europe',
	ly: 'Africa',
	ma: 'Africa',
	mc: 'Europe',
	md: 'Europe',
	me: 'Europe',
	mg: 'Africa',
	mh: 'Oceania',
	mk: 'Europe',
	ml: 'Africa',
	mm: 'Asia',
	mn: 'Asia',
	mr: 'Africa',
	mt: 'Europe',
	mu: 'Africa',
	mv: 'Asia',
	mw: 'Africa',
	mx: 'North America',
	my: 'Asia',
	mz: 'Africa',
	na: 'Africa',
	ne: 'Africa',
	ng: 'Africa',
	ni: 'North America',
	nl: 'Europe',
	no: 'Europe',
	np: 'Asia',
	nr: 'Oceania',
	nz: 'Oceania',
	om: 'Asia',
	pa: 'North America',
	pe: 'South America',
	pg: 'Oceania',
	ph: 'Asia',
	pk: 'Asia',
	pl: 'Europe',
	ps: 'Asia',
	pt: 'Europe',
	pw: 'Oceania',
	py: 'South America',
	qa: 'Asia',
	ro: 'Europe',
	rs: 'Europe',
	ru: 'Europe',
	rw: 'Africa',
	sa: 'Asia',
	sb: 'Oceania',
	sc: 'Africa',
	sd: 'Africa',
	se: 'Europe',
	sg: 'Asia',
	si: 'Europe',
	sk: 'Europe',
	sl: 'Africa',
	sm: 'Europe',
	sn: 'Africa',
	so: 'Africa',
	sr: 'South America',
	ss: 'Africa',
	st: 'Africa',
	sv: 'North America',
	sy: 'Asia',
	sz: 'Africa',
	td: 'Africa',
	tg: 'Africa',
	th: 'Asia',
	tj: 'Asia',
	tl: 'Asia',
	tm: 'Asia',
	tn: 'Africa',
	to: 'Oceania',
	tr: 'Asia',
	tt: 'North America',
	tv: 'Oceania',
	tw: 'Asia',
	tz: 'Africa',
	ua: 'Europe',
	ug: 'Africa',
	us: 'North America',
	uy: 'South America',
	uz: 'Asia',
	va: 'Europe',
	vc: 'North America',
	ve: 'South America',
	vn: 'Asia',
	vu: 'Oceania',
	ws: 'Oceania',
	xk: 'Europe',
	ye: 'Asia',
	za: 'Africa',
	zm: 'Africa',
	zw: 'Africa',
};
