import { useState } from 'preact/hooks';
import { lczList } from './countryLocalization';
import ChevronUp from 'mdi-preact/ChevronUpIcon';
import ChevronDown from 'mdi-preact/ChevronDownIcon';
import { Code } from './codeType';
import { getContinent, getFlagColors, getName } from './getters';

export default function Country({
	info,
	removeCountryScore,
}: {
	info: {
		readonly index: number;
		code: Code;
		found: boolean;
		score: number;
	};
	removeCountryScore: (index: number, score: number) => void;
}) {
	const [expanded, setExpanded] = useState(false);
	const [done, setDone] = useState(false);
	const [revealedHints, setRevealedHints] = useState({
		continent: false,
		borders: false,
		flagColorNumber: false,
		flagColors: 0,
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
			flagColors: getFlagColors(info.code).length,
			coastal: true,
		});
	}

	function giveUp() {
		setDone(true);
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
						color: '#b1f0b1',
						alignSelf: 'flex-end',
						marginLeft: 'auto',
					}}
				>
					{info.score}
				</p>
			</div>
			<div className="Hints">
				<Reveal
					info={getContinent(info.code)}
					cost={50}
					removeScore={removeScore}
					reveal={() => setRevealedHints({ ...revealedHints, continent: true })}
					revealed={revealedHints.continent}
				>
					Continent
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
	children,
	reveal,
	revealed,
}: {
	info: string;
	cost: number;
	removeScore: (score: number) => void;
	children: string;
	reveal: () => void;
	revealed: boolean;
}) {
	function localReveal() {
		reveal();
		removeScore(cost);
	}

	return (
		<div className="Reveal">
			<p className="infoDesc">{children}</p>
			{revealed ? (
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
