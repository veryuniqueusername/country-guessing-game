import { useState } from 'preact/hooks';
import { lczList } from './countryLocalization';
import ChevronUp from 'mdi-preact/ChevronUpIcon';
import ChevronDown from 'mdi-preact/ChevronDownIcon';
import { Code } from './codeType';

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

	const name = lczList[info.code];

	function expand() {
		setExpanded(!expanded);
	}

	return (
		<div
			className="Country"
			style={{ height: `${expanded ? '640px' : '50px'}` }}
		>
			<div className="HeaderDiv">
				<span onClick={expand}>
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
			<button onClick={() => removeCountryScore(info.index, 50)}>
				Remove score
			</button>
		</div>
	);
}
