import PictureDisplay from "./PictureDisplay.jsx"
import Modal from "./Modal.jsx"
import { useEffect, useState } from 'react';


const folderOptions = [
  'Photos',
  'Traditional Art',
  'Digital Art',
  'Scenes',
];

function App() {


  

  return (

    <>
      <div className="app-container"> {/*Container for App Elements*/}
        <PictureDisplay img={`public/images/${selectedFolder}/${randomImage}.jpg`}/>
        <div className="controls">
          <h2>Drawing References</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ullamcorper, ipsum sit amet pretium consectetur, enim lacus pharetra nulla, et gravida ligula tellus egestas est. Sed id pharetra augue, et hendrerit sapien. Nulla a lorem suscipit, eleifend augue ut, pharetra leo.</p>
          <select
        id="selector"
        value={selectedFolder}
        onChange={(e) => setSelectedFolder(e.target.value)}
      >
        {folderOptions.map((folder) => (
          <option key={folder} value={folder}>
            {folder}
          </option>
        ))}
      </select>
          <button className="next-btn"><span>Next picture</span></button>
        </div>
      </div>
      <Modal img="src/assets/images/Einstein.jpg"/>
    </>
  )
}

export default App
