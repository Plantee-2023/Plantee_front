import Menu from './component/Menu';
import RouterPage from './component/RouterPage';
import Footer from './component/Footer';
import './App.css';
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { BoxContext } from './component/common/BoxContext'
import BoxModal from './component/common/BoxModal'

function App() {

	const [box, setBox] = useState({
		show: false,
		message: "",
		action: null
	});

	return (
		<BoxContext.Provider value={{ box, setBox }}>
			<Container>
				<div className='main_wrap'>
					<Menu />
					<RouterPage />
					{box.show && <BoxModal />}
				</div>
				<Footer />
			</Container>
		</BoxContext.Provider>
	);
}

export default App;