import { useState } from "react";

import Calculator from "./components/Calculator.jsx";
import Buttons from "./components/Buttons.jsx";
import IphoneDisplay from "./components/IphoneDisplay.jsx";
import Display from "./components/Display.jsx";
import BackButton from "./components/BackButton.jsx";
import Modall from "./components/Modal.jsx";

function App() {
  const [res, setRes] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const isDigit = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(res); // Check if res is a digit

  let displayValue;
  if (isDigit && !res.includes("e")) {
    const floatValue = parseFloat(res);
    if (floatValue % 1 === 0) {
      displayValue = parseInt(res).toString(); // Remove decimal places for integers
    } else {
      displayValue = floatValue.toFixed(
        Math.min(9, res.split(".")[1]?.length || 0)
      );
    }
  } else {
    displayValue = res.slice(-9); // Show only last 7 characters for expressions
  }
  if (res === "") displayValue = "";
  return (
    <div>
      <Modall isOpen={isOpen} />
      <Calculator>
        {!isOpen && <IphoneDisplay setIsOpen={setIsOpen} isOpen={isOpen} />}
        {isOpen && (
          <div className="keypad">
            <Display displayValue={displayValue} />
            <Buttons res={res} setRes={setRes} />
            <BackButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        )}
      </Calculator>
    </div>
  );
}

export default App;
// setting res when you are writing new value after getting an answer
//using responses and displaying that
//2x10 then if we apply %
//we are not able to put . in 2.5*3. this dot done
// 8/9 it gives 88888e-1
