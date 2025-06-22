import PictureDisplay from "./PictureDisplay.jsx"
import { useEffect, useState } from 'react';
import imageList from '../public/images/imageList.json' with { type: 'json' };
import { folders as folderOptions } from "../generateImageList.cjs";
import Background from "./Background.jsx";

const sessionOptions = [
  { label: '30s', value: 5000 },
  { label: '1m', value: 60000 },
  { label: '1m', value: 120000 },
  { label: '5m', value: 300000 },
  { label: '30m', value: 1800000 },
];

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min); // Ensures min is an integer
  max = Math.floor(max); // Ensures max is an integer
  return Math.floor(Math.random() * (max - min)) + min;
}

let prevPictures = []
let startingImage = imageList['Photos'].at(getRandomIntInclusive(0, imageList['Photos'].length))
prevPictures.push(startingImage)
function App() {
  const [time, setTime] = useState(5000);     // Selected session duration in ms


  const [selectedFolder, setSelectedFolder] = useState('Photos')
  
  const [randomImage, setRandomImage] = useState(startingImage) //imageList[selectedFolder].at(getRandomIntInclusive(0, imageList[selectedFolder].length))

  const [modalOpened, setModalOpened] = useState(false)


  function getLastImage(){
    if (prevPictures.at(prevPictures.length - 2)){
      setRandomImage(prevPictures.at(prevPictures.length - 2))
      if (prevPictures.length > 1){
        prevPictures.pop()
      }
    } else {
      setRandomImage(prevPictures.at(0))
    }
    
  }

  function nextPicture(){
    let image = imageList[selectedFolder].at(getRandomIntInclusive(0, imageList[selectedFolder].length))
    
    setRandomImage(image)
    prevPictures.push(image)
  }
  function nextButtonClick(){
    nextPicture()
  }

  function selectChange(e){
    setSelectedFolder(e.target.value)
    let image = imageList[e.target.value].at(getRandomIntInclusive(0, imageList[e.target.value].length))
    setRandomImage(image) //returns a string
    prevPictures.length = 0
    prevPictures.push(image)
    const frame = document.querySelector('.picture-frame')
    if(e.target.value === 'Scenes'){
      frame.style.aspectRatio = "1/1";
    }else{
      frame.style.aspectRatio = "3/4";
    }
  }

  function pictureClicked(){
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

  const handleRadioChange = (e) => {
    setTime(Number(e.target.value)); // Convert value to number (it's a string by default)
  };

  
  return (
    <>
    <Background img={`public/images/${selectedFolder}/${randomImage}`}/>
      <div className="app-container"> {/*Container for App Elements*/}
        <div className="picture-display-container" onClick={pictureClicked}>
          <PictureDisplay 
          img={`public/images/${selectedFolder}/${randomImage}`}/>
        </div>
        <div className="controls">
          <h2>Drawing References</h2>
          <p>Choose a theme and find inspirations. <br /> Fuel your art. Find the perfect pose, scene, or mood. </p>
          <div className="time-select">
            <p className="mt-2">Select session time</p>
            <div className="flex flex-wrap gap-4">
              {sessionOptions.map((option) => (
                <label key={option.value} className="block">
                <input
                  type="radio"
                  name="time-select"
                  value={option.value}
                  checked={time === option.value}
                  onChange={handleRadioChange}
                  className="mr-2"
                />
                {option.label}
                </label>
              ))}
            </div>
            <p className="mt-2">You selected <strong>{time / 1000}s</strong> per session</p>
          </div>
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
          }}>
            <span>Next picture</span>
          </button>
        </div>
      </div>
      {modalOpened ? <div className="modal" id='modal' style={{display: `${modalOpened ? 'flex ' : 'none'}`}}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img src={`public/images/${selectedFolder}/${randomImage}`} alt="Image" />
      </div> : <></>}
    </>
  );
};

export default App
