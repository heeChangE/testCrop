import logo from './logo.svg';
import './App.css';
import EasyCrop from './EasyCrop';
import { useState } from 'react';

function App() {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (e) => {
    setImage(URL.createObjectURL(e.target.files[0]))
  };

  return (
    <div className="App">
      <header className='App-header'>
        <label className='_coverImage-holder'>
          Upload Image
          <input
            type='file'
            name='cover'
            onChange={handleImageUpload}
            accept='img/*'
            style={{ display: 'none' }}
          />
        </label>
        <EasyCrop image={image} />
      </header>
    </div>
  );
}

export default App;
