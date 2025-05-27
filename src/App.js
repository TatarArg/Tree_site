import logo from './images/logo.svg';
import './CSS/App.css';
import Gallery from './components/Gallery';
import images from './data';

function App() {
  return (
    <Gallery images={images} visible={3} />
  );
}


export default App;