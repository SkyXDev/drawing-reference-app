import PictureDisplay from "./PictureDisplay.jsx"
//import Modal from "./Modal.jsx"
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

let prevPictures = []
let startingImage = imageList['Photos'].at(getRandomIntInclusive(0, imageList['Photos'].length))
prevPictures.push(startingImage)
function App() {
  
  
  const [selectedFolder, setSelectedFolder] = useState('Photos')
  
  const [randomImage, setRandomImage] = useState(startingImage) //imageList[selectedFolder].at(getRandomIntInclusive(0, imageList[selectedFolder].length))

  const [modalOpened, setModalOpened] = useState(false)


  function getLastImage(){
    if ((prevPictures.length - 2) > 0){
      console.log(prevPictures.at(prevPictures.length - 2)) 
      setRandomImage(prevPictures.at(prevPictures.length - 2))
      prevPictures.pop()
    } else {
      setRandomImage(prevPictures.at(0))
    }
    
  }

  function nextPicture(){
    let image = imageList[selectedFolder].at(getRandomIntInclusive(0, imageList[selectedFolder].length))
    
    setRandomImage(image)
    prevPictures.push(image)
    console.log('prevPictures: ', prevPictures)
  }
  function nextButtonClick(){
    nextPicture()
  }

  function selectChange(e){
    setSelectedFolder(e.target.value)
    setRandomImage(imageList[e.target.value].at(getRandomIntInclusive(0, imageList[e.target.value].length))) //returns a string
    
  }

  function pictureClicked(){
    console.log('hello')
    setModalOpened(true)
    document.addEventListener('keydown', modalHandleKeyDown);
  }
  function closeModal(){
    setModalOpened(false)
    document.removeEventListener('keydown', modalHandleKeyDown);
  }

  const modalHandleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
      if (event.key === 'ArrowRight') {
        nextPicture()
      }
      if (event.key === 'ArrowLeft') {
        getLastImage()
      }
    };
  return (

    <>
      <div className="app-container"> {/*Container for App Elements*/}
        <div className="picture-display-container" onClick={pictureClicked}>
          <PictureDisplay 
          img={`public/images/${selectedFolder}/${randomImage}`}/>
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
      {/*<Modal img={`public/images/${selectedFolder}/${randomImage}`} opened={modalOpened}/>*/}
      <div className="modal" id='modal' style={{display: `${modalOpened ? 'flex ' : 'none'}`}}>  <span className="close" onClick={closeModal}>&times;</span>
          <img src={`public/images/${selectedFolder}/${randomImage}`} alt="Image" />
      </div>
    </>
  )
}

export default App
