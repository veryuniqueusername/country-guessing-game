import Router, { Route } from 'preact-router';
import NavBar from './NavBar';
import Stopwatch from './Stopwatch';
import Timer from './Timer';

export default function App() {
	return (
		<>
			<NavBar />
			<Router>
				<Route path="/timer" component={Timer} />
				<Route path="/stopwatch" component={Stopwatch} />
			</Router>
		</>
	);
}
