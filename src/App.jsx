import { useState } from "react";

import Phone from "./components/Phone.jsx";
import Calculator from "./components/Calculator.jsx";
import IphoneDisplay from "./components/IphoneDisplay.jsx";
import Modall from "./components/Modal.jsx";
import { MyContext } from "./contexts/MyContext.jsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MyContext.Provider value={{ isOpen, setIsOpen }}>
      <div>
        <Modall />
        <Phone>
          {!isOpen && <IphoneDisplay />}
          {isOpen && <Calculator />}
        </Phone>
      </div>
    </MyContext.Provider>
  );
}

export default App;
