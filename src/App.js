import Menu from './Menu';
import Foot from './Foot';
import Header from './Header';
import RouterPage from './RouterPage';
import './App.css';

function App() {
	return (
		<div className="App">
			<Header/>
			<Menu/>
			<RouterPage/>
			<Foot/>
		</div>
	);
}

export default App;
