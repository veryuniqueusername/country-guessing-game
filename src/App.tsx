import { useEffect, useState } from 'preact/hooks';
import list from './countryLocalization.json';

export default function App() {
	const [countries, setCountries] = useState<string[]>([
		'se',
		'ru',
		'va',
		'ir',
		'de',
	]);

	return (
		<>
			<h1>Country Guessing Game</h1>
			<div className="Container">
				<Country code={countries[0]} />
				<Country code={countries[1]} />
				<Country code={countries[2]} />
				<Country code={countries[3]} />
				<Country code={countries[4]} />
			</div>
		</>
	);
}

type T = keyof typeof list;

function Country({ code }: { code: string }) {
	// @ts-ignore
	const name = list[code];

	return (
		<div className="Country">
			<p>{name}</p>
		</div>
	);
}
