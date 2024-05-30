import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SizeForm from './components/SizeForm';
import Container from './components/Container';
import PictureField from './components/PictureField/PictureField';
import './App.css';


function App() {
  const [size, setSize] = useState(JSON.parse(window.localStorage.getItem('size')));

  const changeSize = newSize => {
    console.log(newSize);
    // window.localStorage.setItem('size', JSON.stringify(size));
    setSize(newSize);
  }
  useEffect(() => {
    window.localStorage.setItem('size', JSON.stringify(size));
  }, [size]);
  return (
    <>
      <Header />
      <main>
        <Container>
          <SizeForm changeSize={changeSize} />
          <PictureField state={size} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
