// import logo from './logo.svg';
import './App.css';
import FileUpload from './FileUpload';
// import { useState } from 'react';

const handleRenderFile = (url) => {
  const imageElement = document.querySelector('.image');
  const img = document.createElement('img');
  img.src = url;
  imageElement.appendChild(img);
};


function App() {
  // const [renderedFile, setRenderedFile] = useState(null);
  return (
    <div className="App">
    
      <FileUpload onRenderFile={handleRenderFile} />
      {/* {renderedFile && <div>Rendered File: {renderedFile.name}</div>} */}
      <div className='image'>
        
      </div>
  

    </div>
  );
}

export default App;
