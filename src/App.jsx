import { useState } from "react";
import "./App.css";
import Calculator from "./components/Calculator.jsx";
import Buttons from "./components/Buttons.jsx";
import IphoneDisplay from "./components/IphoneDisplay.jsx";
import Display from "./components/Display.jsx";
import BackButton from "./components/BackButton.jsx";

function App() {
  const [res, setRes] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const displayValue = res.slice(-8);
  return (
    <div>
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
