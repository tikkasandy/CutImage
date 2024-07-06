import { AppContextProvider } from './context';
import Header from './components/Header';
import Footer from './components/Footer';
import OriginalImg from './components/OriginalImg/OriginalImg';
import ShuffledPieces from './components/ShuffledPieces';
import s from './App.module.scss';

function App() {
  return (
    <AppContextProvider>
      <Header />
      <main className={s.Main}>
        <OriginalImg />
        <ShuffledPieces />
        <div className={s.Line}></div>
      </main>
      <Footer />
    </AppContextProvider>
  );
}

export default App;
