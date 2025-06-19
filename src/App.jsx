import PictureDisplay from "./PictureDisplay.jsx"
import Modal from "./Modal.jsx"
import Controls from "./controls/Controls.jsx"

function App() {

  return (

    <>
      <div className="app-container"> {/*Container for App Elements*/}
        <PictureDisplay img="src/assets/images/Einstein.jpg"/>
        <Controls/>
      </div>
      <Modal img="src/assets/images/Einstein.jpg"/>
    </>
  )
}

export default App
