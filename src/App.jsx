import PictureDisplay from "./PictureDisplay.jsx"
import { useEffect, useState } from 'react';
import imageList from '../public/images/imageList.json' with { type: 'json' };
import { folders as folderOptions } from "../generateImageList.cjs";
import Background from "./Background.jsx";
import { Play, Pause, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCountdownTimer } from 'use-countdown-timer';
import { span } from "motion/react-client";

const sessionOptions = [
  { label: '30s', value: 30000 },
  { label: '60s', value: 60000 },
  { label: '2m', value: 120000 },
  { label: '10m', value: 300000 },
  { label: '30m', value: 1800000 },
];


function useScreenWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}


function getRandomIntInclusive(min, max) {
  min = Math.ceil(min); // Ensures min is an integer
  max = Math.floor(max); // Ensures max is an integer
  return Math.floor(Math.random() * (max - min)) + min;
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const paddedMins = String(mins).padStart(2, '0');
  const paddedSecs = String(secs).padStart(2, '0');

  if (hrs > 0) {
    const paddedHrs = String(hrs).padStart(2, '0');
    return `${paddedHrs}:${paddedMins}:${paddedSecs}`;
  } else {
    return `${paddedMins}:${paddedSecs}`;
  }
}


//let imageArray = []

function shuffleArray(array) {
  const newArray = [...array]; // copy to avoid modifying original
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // swap
  }
  return newArray;
}

/*
for (let i = 0; i < 512; i++) {
  // Code to be executed 512 times
  imageArray.push(imageList['Photos'].at(getRandomIntInclusive(0, imageList['Photos'].length)))
}*/


function App() {
  const [arrayPos, setArrayPos] = useState(0)
  const [time, setTime] = useState(30000);   
  const [useTimer, setUseTimer] = useState(false);
  
  const [selectedFolder, setSelectedFolder] = useState('Photos')
  const [imageArray, setImageArray] = useState(shuffleArray(imageList[selectedFolder]));
  const [randomImage, setRandomImage] = useState(imageArray.at(arrayPos)) 

  const [modalOpened, setModalOpened] = useState(false)

  const screenWidth = useScreenWidth()
  const {
    countdown,
    start,
    pause,
    reset,
    isRunning
  } = useCountdownTimer({
    timer: time, 
    autostart: false,
    onExpire: () => {nextPicture()}
  });

  
  function nextPicture() {
    tapSound()
    if(modalOpened && useTimer){
      reset()
      start()
    }
    
    setArrayPos(pos => {
      const newPos = pos + 1;
      setRandomImage(imageArray.at(newPos));
      return newPos;
    });
  }
  function lastPicture() {
    tapSound()
    setArrayPos(pos => {
      const newPos = pos - 1;
      setRandomImage(imageArray.at(newPos));
      return newPos;
    });
  }
  

  function nextButtonClick(){
    nextPicture()
  }
  

  function selectChange(e){
    setSelectedFolder(e.target.value)
    const newShuffledArray = shuffleArray(imageList[e.target.value]);
    setImageArray(newShuffledArray);
    setArrayPos(0)
    setRandomImage(newShuffledArray.at(0))
    
    const frame = document.querySelector('.picture-frame')
    if(screenWidth >= 1080)
      {if(e.target.value === 'Scenes'){
        frame.style.aspectRatio = "1/1";
      }else{
        frame.style.aspectRatio = "3/4";
      }
    }else{
      frame.style.aspectRatio = "3/4";
    }
  }
  //Kinda works as people usually dont resize pages like maniacs




  function openModal(){
    setModalOpened(true)
    document.addEventListener('keydown', modalHandleKeyDown);
    if(useTimer){
      reset()
      start()
    }
  }
  function closeModal(){
    setModalOpened(false)
    document.removeEventListener('keydown', modalHandleKeyDown);
    if(useTimer){
      reset()
      pause()
    }
  }

  const modalHandleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeModal()
      }
      if (event.key === 'ArrowRight') {
        nextPicture()
      }
      if (event.key === 'ArrowLeft') {     
        lastPicture()
      }
      if (event.key === 'd' || event.key === 'D') {
        nextPicture()
      }
      if (event.key === 'a' || event.key === 'A') {     
        lastPicture()
      }
    };

  const handleRadioChange = (e) => {
    setTime(Number(e.target.value)); // Convert value to number (it's a string by default)
    tapSound()
  };



  const tapSound = () => {
    const audio = new Audio('../public/mixkit-on-or-off-light-switch-tap-2585.wav'); 
    audio.play();
  };
/*
  const debug = {
    printImageArray: () => console.log("imageArray: ", imageArray),
    printArrayPos: () => console.log("arrayPos: ", arrayPos),
    printTimerIsRunning: () => console.log("isRunning: ", isRunning)
  };*/
  return (
    <>
    <Background img={`public/images/${selectedFolder}/${randomImage}`}/>
      <div className="app-container"> {/*Container for App Elements*/}
        <div className="picture-display-container" onClick={openModal}>
          <PictureDisplay 
          img={`public/images/${selectedFolder}/${randomImage}`}/>
        </div>
        <div className="controls">
          <h2>Visual Library</h2>
          {useTimer ? <></> : <p>Choose a theme and find inspirations. <br /> {(screenWidth > 860) ? <span>Fuel your art. Find the perfect pose, scene, or mood.</span> : <></>} </p>}
          <div className="time-select">
            <label>
              <input
                type="checkbox"
                checked={useTimer}
                onChange={(e) => {
                  setUseTimer(e.target.checked)
                  tapSound()
                }}
                className="mr-2 scale-125 accent-green-900"
              />
              Use timer
            </label>

            {useTimer && (
              <>
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
                        className="mr-2 accent-green-700 scale-125"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
                <p className="mt-2">You selected <strong>{formatTime(time / 1000)}</strong> per session</p>
              </>
            )}
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
          <div className="button-container">
            <button className="next-btn" onClick={() => {
              nextButtonClick()
            }}>
              <span>Next picture</span>
            </button>
            <button className="session-btn" onClick={() => {
              openModal()
            }}>
              <span>Start Session</span>
            </button>
          </div>
        </div>
      </div>
      {modalOpened ? <div className="modal" id='modal' style={{display: `${modalOpened ? 'flex ' : 'none'}`}}>
        <span className="close" onClick={closeModal}>&times;</span>
        <img src={`public/images/${selectedFolder}/${randomImage}`} alt="Image" />
        <div className="modal-controls">
          <button className="hover:bg-white/20 rounded-full p-2 transition cursor-pointer" onClick={lastPicture}>
            <ChevronLeft className="w-10 h-10" color="#f6f9e3b3"/>
          </button>
          <button className="hover:bg-white/20 rounded-full p-2 transition cursor-pointer">
            {isRunning && useTimer ? <Pause className="w-10 h-10" color="#f6f9e3b3" onClick={pause}/> : <Play className="w-10 h-10" color="#f6f9e3b3" onClick={start}/>}
          </button>
          <button className="hover:bg-white/20 rounded-full p-2 transition cursor-pointer" onClick={nextPicture}>
            <ChevronRight className="w-10 h-10" color="#f6f9e3b3"/>
          </button>
        </div>
        {useTimer ? <div className="stopwatch">
          {formatTime(countdown / 1000)}
        </div> : <></>}
      </div> : <></>}
    </>
  );
};

export default App


