import Menu from './Main/Menu';
import Main from './Main/Main';
import Foot from './Main/Foot';
import Header from './Main/Header';
import './App.css';

function App() {
	return (
		<div className="App">
			<Header/>
			<Menu/>
			<Main/>
			<Foot/>
		</div>
	);
}

export default App;
