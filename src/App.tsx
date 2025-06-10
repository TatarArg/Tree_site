import React from 'react';
import logo from './images/logo.svg';
import './styles/App.css';
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "./components/Footer";

import GalleryImage from "./components/GalleryImage"

import images from "./components/images"


function App() {
  return (
    <div>
      <GalleryImage images={images} visible={3} />
    </div>
  );
}

export default App;