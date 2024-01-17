import RouterPage from './component/RouterPage';
import FooterPage from './component/FooterPage';
import './App.css';
import { useState } from 'react';
import { BoxContext } from './component/common/BoxContext'
import BoxModal from './component/common/BoxModal'
import HeaderPage from './component/HeaderPage';
import { Container } from 'react-bootstrap';
import MainBannerPage from './component/MainBannerPage';

function App() {

  const [box, setBox] = useState({
    show: false,
    message: "",
    action: null
  });

  return (
    <BoxContext.Provider value={{ box, setBox }}>
      <Container>
        <HeaderPage />
        <RouterPage />
        {box.show && <BoxModal />}
      </Container>
      <FooterPage />
    </BoxContext.Provider>
  );
}

export default App;