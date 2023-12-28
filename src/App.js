import Menu from './Main/Menu';
import Main from './Main/Main';
import './App.css';
import Foot from './Main/Foot';
import Header from './Main/Header';
import RouterPage from './Main/RouterPage';

function App() {
	return (
		<div className="App">
			<Header/>
			<Menu/>
			<Foot/>
		</div>
	);
}

export default App;
