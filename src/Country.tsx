import { useState, useEffect } from 'preact/hooks';
import ChevronUp from 'mdi-preact/ChevronUpIcon';
import ChevronDown from 'mdi-preact/ChevronDownIcon';
import { Code } from './codeType';
import {
	getBorders,
	getContinent,
	getFlagColors,
	getName,
	getCode,
} from './getters';

export default function Country({
	info,
	removeCountryScore,
	setFound,
}: {
	info: {
		readonly index: number;
		code: Code;
		found: boolean;
		score: number;
	};
	removeCountryScore: (index: number, score: number) => void;
	setFound: (index: number) => void;
}) {
	const [expanded, setExpanded] = useState(false);
	const [revealedHints, setRevealedHints] = useState<{ [K: string]: boolean }>({
		continent: false,
		borders: false,
		flagColorNumber: false,
		flagColors: false,
		coastal: false,
	});

	const name = getName(info.code);

	function expand() {
		setExpanded(!expanded);
	}

	function removeScore(score: number) {
		removeCountryScore(info.index, score);
	}

	function revealAll() {
		removeScore(info.score);
		setRevealedHints({
			continent: true,
			borders: true,
			flagColorNumber: true,
			flagColors: false,
			coastal: true,
		});
	}

	function giveUp() {
		setFound(info.index);
	}

	return (
		<div
			className="Country"
			style={{ height: `${expanded ? '640px' : '50px'}` }}
		>
			<div className="HeaderDiv" onClick={expand}>
				<span>
					{expanded ? (
						<ChevronUp className="ButtonIcon" />
					) : (
						<ChevronDown className="ButtonIcon" />
					)}
				</span>
				<p className="countryName">{info.found ? name : '???'}</p>
				<p
					style={{
						alignSelf: 'flex-end',
						marginLeft: 'auto',
					}}
					className="score"
				>
					{info.score}
				</p>
			</div>
			<div className="Hints">
				<Reveal
					info={getContinent(info.code)}
					cost={50}
					removeScore={removeScore}
					value="continent"
					revealedHintsState={[revealedHints, setRevealedHints]}
				>
					Continent
				</Reveal>
				<Reveal
					info={getBorders(info.code).length}
					cost={50}
					removeScore={removeScore}
					value="borders"
					revealedHintsState={[revealedHints, setRevealedHints]}
				>
					Borders
				</Reveal>
				<RevealAll score={info.score} revealAll={revealAll} giveUp={giveUp} />
			</div>
		</div>
	);
}

function Reveal({
	info,
	cost,
	removeScore,
	value,
	revealedHintsState: [revealedHints, setRevealedHints],
	children,
}: {
	info: any;
	cost: number;
	removeScore: (score: number) => void;
	value: string;
	revealedHintsState: [
		{ [K: string]: boolean },
		(value: { [K: string]: boolean }) => void
	];
	children: string;
}) {
	function localReveal() {
		setRevealedHints({ ...revealedHints, [value]: true });
		removeScore(cost);
	}

	return (
		<div className="Reveal">
			<p className="infoDesc">{children}</p>
			{revealedHints[value] ? (
				<p>{info}</p>
			) : (
				<button onClick={localReveal} className="revealButton">
					Reveal <span className="cost">-{cost}</span>
				</button>
			)}
		</div>
	);
}

function RevealAll({
	score,
	revealAll,
	giveUp,
}: {
	score: number;
	revealAll: () => void;
	giveUp: () => void;
}) {
	const [revealed, setRevealed] = useState(score === 0);

	function reveal() {
		setRevealed(true);
		revealAll();
	}

	return (
		<div className="Reveal">
			{revealed ? (
				<button onClick={giveUp} className="revealButton">
					<span className="cost">Give up?</span>
				</button>
			) : (
				<button onClick={reveal} className="revealButton">
					<span className="cost">Reveal all -{score}</span>
				</button>
			)}
		</div>
	);
}
