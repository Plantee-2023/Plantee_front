import Menu from './component/common/Menu';
import Foot from './component/common/Foot';
import RouterPage from './component/common/RouterPage';
import './App.css';

function App() {
	return (
		<div className="App">
			<Menu/>
			<RouterPage/>
			<Foot/>
		</div>
	);
}

export default App;
