import { useEffect, useRef, useState } from 'preact/hooks';
import Country from './Country';
import { getCode, getName, Code } from './util';
import names from './json/names.json';

export default function App() {
	const [countries, setCountries] = useState<Code[]>([
		Object.keys(names)[
			Math.floor(Math.random() * Object.keys(names).length)
		] as Code,
		Object.keys(names)[
			Math.floor(Math.random() * Object.keys(names).length)
		] as Code,
		Object.keys(names)[
			Math.floor(Math.random() * Object.keys(names).length)
		] as Code,
		Object.keys(names)[
			Math.floor(Math.random() * Object.keys(names).length)
		] as Code,
		Object.keys(names)[
			Math.floor(Math.random() * Object.keys(names).length)
		] as Code,
	]);
	const [foundCountries, setFoundCountries] = useState<boolean[]>([
		false,
		false,
		false,
		false,
		false,
	]);
	const [countryScores, setCountryScores] = useState<number[]>([
		1000, 1000, 1000, 1000, 1000,
	]);
	const [countryInfos, setCountryInfos] = useState<
		{ readonly index: number; code: Code; found: boolean; score: number }[]
	>([
		{ index: 0, code: 'se', found: false, score: 250 },
		{ index: 1, code: 'se', found: false, score: 250 },
		{ index: 2, code: 'se', found: false, score: 250 },
		{ index: 3, code: 'se', found: false, score: 250 },
		{ index: 4, code: 'se', found: false, score: 250 },
	]);
	const [wrongCountries, setWrongCountries] = useState<Code[]>([]);
	const [score, setScore] = useState(200);
	const [newScore, setNewScore] = useState(200);
	const totalScoreIntervalRef = useRef(0);
	const totalScoreRef = useRef(score);

	const [popUpClasses, setPopUpClasses] = useState('');

	// POP UP
	useEffect(() => {
		if (popUpClasses.split(' ').includes('visible')) {
			setTimeout(() => {
				setPopUpClasses(popUpClasses.split(' ').pop() || '');
			}, 3000);
		} else if (popUpClasses.split(' ').length == 1) {
			setTimeout(() => {
				setPopUpClasses('');
			}, 450);
		}
	}, [popUpClasses]);

	function popUp(text: string, type: string) {
		let popup = document.getElementById('PopUp');
		popup!.innerHTML = text;
		setPopUpClasses(`visible ${type}`);
	}

	// SCORE ANIMATION
	useEffect(() => {
		if (newScore !== totalScoreRef.current) {
			totalScoreIntervalRef.current = window.setInterval(() => {
				if (newScore < totalScoreRef.current) {
					setScore((score) => score - 5);
					totalScoreRef.current -= 5;
				} else if (newScore > totalScoreRef.current) {
					setScore((score) => score + 120);
					totalScoreRef.current += 120;
				} else {
					window.clearInterval(totalScoreIntervalRef.current);
				}
			}, 10);
		} else {
			return () => {
				window.clearInterval(totalScoreIntervalRef.current);
			};
		}
	}, [newScore]);

	// UPDATE COUNTRY INFO
	useEffect(() => {
		const newCountryInfos = countryInfos.map((countryInfo) => {
			const newCountryInfo = { ...countryInfo };
			newCountryInfo.code = countries[countryInfo.index];
			newCountryInfo.found = foundCountries[countryInfo.index];
			newCountryInfo.score = countryScores[countryInfo.index];
			return newCountryInfo;
		});
		setCountryInfos(newCountryInfos);
	}, [countries, foundCountries, countryScores]);

	function removeCountryScore(index: number, score: number) {
		setCountryScores((countryScores) => {
			const newCountryScores = [...countryScores];
			newCountryScores[index] = countryScores[index] - score;
			return newCountryScores;
		});
	}

	function handleGuess(event: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			let target = (event.target as HTMLInputElement)!;
			if (getCode(target.value) === undefined) {
				popUp(`${target.value} is not a country`, 'wrong');
				return;
			}
			let code: Code = getCode(target.value)!;
			target.value = '';
			const name = getName(code);
			if (countries.includes(code)) {
				const index = countries.indexOf(code);
				if (foundCountries[index] === true) {
					popUp(`${name} is already found`, 'alreadyFound');
					return;
				}
				popUp(`${name} is correct!`, 'correct');
				window.clearInterval(totalScoreIntervalRef.current);
				setNewScore((newScore) => newScore + countryScores[index]);
				let newFoundCountries = [...foundCountries];
				newFoundCountries[index] = true;
				setFoundCountries(newFoundCountries);
			} else if (wrongCountries.indexOf(code) !== -1) {
				popUp(`${name} already guessed`, 'alreadyGuessed');
				return;
			} else {
				popUp(`${name} is wrong`, 'wrong');
				window.clearInterval(totalScoreIntervalRef.current);
				setNewScore((newScore) => newScore - 20);
				setWrongCountries([...wrongCountries, code]);
			}
		}
	}

	function setFound(index: number) {
		setFoundCountries((foundCountries) => {
			const newFoundCountries = [...foundCountries];
			newFoundCountries[index] = true;
			return newFoundCountries;
		});
	}

	return (
		<>
			<span className={`popUp ${popUpClasses}`} id="PopUp"></span>
			<div className="Container">
				<h1>Country Guessing Game</h1>
				<SearchBar handleGuess={handleGuess} />
				<Country
					info={countryInfos[0]}
					removeCountryScore={removeCountryScore}
					setFound={setFound}
				/>
				<Country
					info={countryInfos[1]}
					removeCountryScore={removeCountryScore}
					setFound={setFound}
				/>
				<Country
					info={countryInfos[2]}
					removeCountryScore={removeCountryScore}
					setFound={setFound}
				/>
				<Country
					info={countryInfos[3]}
					removeCountryScore={removeCountryScore}
					setFound={setFound}
				/>
				<Country
					info={countryInfos[4]}
					removeCountryScore={removeCountryScore}
					setFound={setFound}
				/>
				<div className="Summary">
					<WrongCountries list={wrongCountries} />
					<h2>
						Current Score: <span className="score">{score}</span>
					</h2>
				</div>
			</div>
		</>
	);
}

function SearchBar({
	handleGuess,
}: {
	handleGuess: (event: JSX.TargetedKeyboardEvent<HTMLInputElement>) => void;
}) {
	function handleKeyUp(event: JSX.TargetedKeyboardEvent<HTMLInputElement>) {
		handleGuess(event);
	}

	return (
		<input
			type="text"
			placeholder="Guess a country"
			onKeyUp={handleKeyUp}
			className="SearchBar"
		/>
	);
}

function WrongCountries({ list }: { list: Code[] }) {
	let elements = list.map((country) => {
		return <p>{getName(country)}</p>;
	});

	return (
		<div className="WrongCountries">
			<h2>Wrong Guesses:</h2>
			{elements}
		</div>
	);
}
