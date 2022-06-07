import { useState } from 'preact/hooks';
import ChevronUp from 'mdi-preact/ChevronUpIcon';
import ChevronDown from 'mdi-preact/ChevronDownIcon';
import uniList from './json/all.json';
import names from './json/names.json';
import { Code, CountryType } from './util';

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

	const name = uniList[info.code].names[0];

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
			areaRank: true,
			population: true,
			populationRank: true,
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
		value: string;
		cost: number;
		children: string;
	}) {
		function localReveal() {
			if (info.score < cost) {
				return;
			}
			setRevealedHints({ ...revealedHints, [value]: true });
			removeScore(cost);
		}

		function fixUp(value: string | number | boolean | string[]): string {
			if (typeof value === 'object') {
				for (let i = 0; i < value.length; i++) {
					value[i] = fixUp(value[i]);
				}
				return value.join(', ');
			}

			if (typeof value === 'string') {
				if (Object.keys(names).includes(value)) {
					value = names[value as Code][0];
				}
				value = value.charAt(0).toUpperCase() + value.slice(1);
			}

			if (typeof value === 'number') {
				if (value >= 1000000) {
					value = (value / 1000000).toFixed(1) + 'M';
				} else if (value >= 1000) {
					value = (value / 1000).toFixed(1) + 'K';
				}
				value = value.toString();
			}

			if (typeof value === 'boolean') {
				value = value.toString();
				value = value.charAt(0).toUpperCase() + value.slice(1);
			}

			return value;
		}

		return (
			<div className="Reveal">
				<p className="infoDesc">{children}</p>
				{revealedHints[value] ? (
					<p>{fixUp(uniList[info.code][value as keyof CountryType])}</p>
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
			<div className="Reveal RevealAll">
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
					<Reveal value="continent" cost={100}>
						Continent
					</Reveal>
					<Reveal value="coastal" cost={40}>
						Coastal
					</Reveal>
					<RevealAll />
				</div>
				<div className="HintRow">
					<Reveal value="borderCount" cost={70}>
						Border count
					</Reveal>
					<Reveal value="borders" cost={900}>
						Bordering countries
					</Reveal>
				</div>
				<div className="HintRow">
					<Reveal value="government" cost={50}>
						Government
					</Reveal>
					<Reveal value="headOfState" cost={200}>
						Head of State
					</Reveal>
					<Reveal value="capital" cost={300}>
						Capital
					</Reveal>
				</div>
				<div className="HintRow">
					<Reveal value="areaRank" cost={100}>
						Area Ranking
					</Reveal>
					<Reveal value="populationRank" cost={100}>
						Population Ranking
					</Reveal>
					<Reveal value="population" cost={100}>
						Population
					</Reveal>
				</div>
			</div>
		</div>
	);
}
