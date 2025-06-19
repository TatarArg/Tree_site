import React from 'react';
import logo from './images/logo.svg';
import './styles/App.css';

import Navbar from './components/Navbar'
import Footer from './components/Footer';
import TreesPage from './components/TreesPage'
import Gallery from "./components/Gallery"
import trees from './data';



function App() {
  return (
    <div>
      <Navbar />
       <Gallery images={trees.map(tree => tree.image)} visible={3} />
      <TreesPage />
      <Footer />
    </div>
  );
}

export default App;
