import { useState, useEffect } from 'preact/hooks';
import ChevronUp from 'mdi-preact/ChevronUpIcon';
import ChevronDown from 'mdi-preact/ChevronDownIcon';
import { Code } from './codeType';
import { CountryType, uniList } from './countryUniversal';

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
	const [revealedHints, setRevealedHints] = useState<{
		[K: string]: boolean;
	}>({
		name: false,
		capital: false,
		borders: false,
		borderCount: false,
		coastal: false,
		continent: false,
		flagColors: false,
		flagColorCount: false,
		government: false,
		headOfState: false,
		area: false,
		areaRanking: false,
		population: false,
		populationRanking: false,
		religion: false,
	});

	const name = uniList[info.code].name[0];

	function expand() {
		setExpanded(!expanded);
	}

	function removeScore(score: number) {
		removeCountryScore(info.index, score);
	}

	function revealAll() {
		removeScore(info.score);
		setRevealedHints({
			capital: true,
			borders: true,
			borderCount: true,
			coastal: true,
			continent: true,
			flagColors: true,
			flagColorCount: true,
			government: true,
			headOfState: true,
			area: true,
			areaRanking: true,
			population: true,
			populationRanking: true,
			religion: true,
		});
	}

	function giveUp() {
		setFound(info.index);
	}

	function Reveal({
		value,
		cost,
		children,
	}: {
		value: keyof CountryType;
		cost: number;
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
					<p>{uniList[info.code][value]}</p>
				) : (
					<button onClick={localReveal} className="revealButton">
						Reveal <span className="cost">-{cost}</span>
					</button>
				)}
			</div>
		);
	}

	function RevealAll({}: {}) {
		const [revealed, setRevealed] = useState(info.score === 0);

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
						<span className="cost">Reveal all -{info.score}</span>
					</button>
				)}
			</div>
		);
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
				<div className="HintRow">
					<Reveal value="continent" cost={40}>
						Continent
					</Reveal>
					<Reveal value="government" cost={40}>
						Government
					</Reveal>
					<RevealAll />
				</div>
				<div className="HintRow">
					<Reveal value="coastal" cost={50}>
						Coastal
					</Reveal>
					<Reveal value="borderCount" cost={70}>
						Border count
					</Reveal>
					<Reveal value="borders" cost={200}>
						Bordering countries
					</Reveal>
				</div>
			</div>
		</div>
	);
}
