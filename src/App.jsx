import PictureDisplay from "./PictureDisplay.jsx"
import Modal from "./Modal.jsx"
import { useEffect, useState } from 'react';
import imageList from '../public/images/imageList.json' with { type: 'json' };
import { folders as folderOptions } from "../generateImageList.cjs";

/*const folderOptions = [
  'Photos',
  'Traditional Art',
  'Digital Art',
  'Scenes',
];*/

//const imageList = JSON.parse('')

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min); // Ensures min is an integer
  max = Math.floor(max); // Ensures max is an integer
  return Math.floor(Math.random() * (max - min)) + min;
}



function App() {
  const [selectedFolder, setSelectedFolder] = useState('Photos')
  const [randomImage, setRandomImage] = useState(imageList[selectedFolder].at(getRandomIntInclusive(0, imageList[selectedFolder].length)))
  function nextButtonClick(){
    setRandomImage(imageList[selectedFolder].at(getRandomIntInclusive(0, imageList[selectedFolder].length)))
    console.log(randomImage)
  }

  function selectChange(e){
    console.log('Select Target value: ', e.target.value)
    setSelectedFolder(e.target.value)
    setRandomImage(imageList[e.target.value].at(getRandomIntInclusive(0, imageList[e.target.value].length)))
  }

  return (

    <>
      <div className="app-container"> {/*Container for App Elements*/}
        <div className="picture-display-container">
          <PictureDisplay img={`public/images/${selectedFolder}/${randomImage}`}/>
        </div>
        <div className="controls">
          <h2>Drawing References</h2>
          <p>Choose a theme and find inspirations.</p>
          <select
        id="selector"
        value={selectedFolder}
        onChange={(e) => {
          selectChange(e)
        }}
      >
        {folderOptions.map((folder) => (
          <option key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </select>
          <button className="next-btn" onClick={() => {
            nextButtonClick()
          }}><span>Next picture</span></button>
        </div>
      </div>
      <Modal img={`public/images/${selectedFolder}/${randomImage}`}/>
    </>
  )
}

export default App
