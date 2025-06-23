import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import TreesPage from '../main/components/TreesPage'
import Gallery from "../main/components/Gallery"
import trees from '../data';


function Main() { 
  return ( 
    <div> 
      <Navbar />
       <Gallery images={trees.map(tree => tree.image)} visible={3} />
      <TreesPage />
      <Footer />
    </div> 
  ); 
} 
 
export default Main; 