import { useState } from "react";
import "./App.css";
import Letter from "./assets/letter.png";
import Valentine from "./assets/valentine.png";
import YesImage from "./assets/yes.png";

function App() {
  const [stage, setStage] = useState("letter");
  const [yesScale, setYesScale] = useState(1); // Scale for "Yes" button
  const [valentineScale, setValentineScale] = useState(1); // Scale for Valentine.png
  const [noPosition, setNoPosition] = useState({ top: "auto", left: "auto" }); // Default position

  const handleLetterClick = () => {
    setStage("valentine");
  };

  const handleYesClick = () => {
    setStage("yes");
  };

  const handleNoClick = () => {
    setYesScale((prevScale) => prevScale + 0.2); // Increase "Yes" button size
    setValentineScale((prevScale) => prevScale + 0.05); // Increase Valentine.png size

    // Ensure "No" button stays within the screen (safe for iPhone 11)
    const maxWidth = window.innerWidth - 120; // Button width + padding
    const maxHeight = window.innerHeight - 150; // Avoid going too high/low

    const randomX = Math.floor(Math.random() * maxWidth);
    const randomY = Math.floor(Math.random() * maxHeight);

    setNoPosition({
      top: `${randomY}px`,
      left: `${randomX}px`,
      position: "absolute",
    });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-pink-200 p-4 relative">
      {stage === "letter" && (
        <img
          src={Letter}
          alt="Letter"
          className="cursor-pointer max-w-full h-auto"
          onClick={handleLetterClick}
        />
      )}

      {stage === "valentine" && (
        <div className="text-center flex flex-col items-center w-full">
          <img
            src={Valentine}
            alt="Valentine"
            className="transition-all duration-300"
            style={{ transform: `scale(${valentineScale})` }}
          />
          <div className="flex gap-6 justify-center mt-4 relative w-full">
            <button
              className="heart-button bg-pink-500 text-white font-bold"
              style={{ transform: `scale(${yesScale})` }}
              onClick={handleYesClick}
            >
              Yes
            </button>
            <button
              className="heart-button bg-red-500 text-white font-bold transition-all duration-300"
              style={noPosition}
              onClick={handleNoClick}
            >
              No
            </button>
          </div>
        </div>
      )}

      {stage === "yes" && (
        <img src={YesImage} alt="Yes" className="max-w-full h-auto" />
      )}
    </div>
  );
}

export default App;
