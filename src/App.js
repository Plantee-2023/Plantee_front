import Foot from './component/Foot';
import Menu from './component/Menu';
import './App.css';
import RouterPage from './component/RouterPage';

function App() {
	return (
		<div className='display'>
			<Menu/>
			<RouterPage/>
			<Foot/>
		</div>
	);
}

export default App;
