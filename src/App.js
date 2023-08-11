import logo from './logo.svg';
import './App.css';
import EasyCrop from './EasyCrop';
import { useState } from 'react';

function App() {
  const [video, setVideo] = useState(null);

  const handleVideoUpload = async (e) => {
    setVideo(URL.createObjectURL(e.target.files[0]))
  };
// function App() {
//   const [image, setImage] = useState(null);

//   const handleImageUpload = async (e) => {
//     setImage(URL.createObjectURL(e.target.files[0]))
//   };

  return (
    <div className="App">
      <header className='App-header'>
        <label className='_coverImage-holder'>
          {/* Upload Image */}
          Upload Video
          <input
            type='file'
            name='cover'
            onChange={handleVideoUpload}
            accept='video/*'
            style={{ display: 'none' }}
          />
        </label>
        {/* <EasyCrop image={image} /> */}
        <EasyCrop video={video} />
      </header>
    </div>
  );
}

export default App;
