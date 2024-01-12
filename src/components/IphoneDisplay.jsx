import { useContext } from "react";
import { MyContext } from "../contexts/MyContext";

function IphoneDisplay() {
  const { isOpen, setIsOpen } = useContext(MyContext);
  return (
    <>
      <div className="screen"></div>
      <div className="icons front">
        <div className="app" onClick={() => setIsOpen(!isOpen)}></div>
        <div className="app"></div>
        <div className="app"></div>
        <div className="app"></div>
      </div>
      <div className="icons">
        <div className="app_2_row"></div>
        <div className="app_2_row"></div>
        <div className="app_2_row"></div>
        <div className="app_2_row"></div>
      </div>
      <div className="icons">
        <div className="app_3_row"></div>
        <div className="app_3_row"></div>
        <div className="app_3_row"></div>
        <div className="app_3_row"></div>
      </div>
      <div className="icons">
        <div className="app_4_row"></div>
        <div className="app_4_row"></div>
        <div className="app_4_row"></div>
        <div className="app_4_row"></div>
      </div>
      <div className="notch">
        <div className="camera"></div>
        <div className="speaker"></div>
      </div>
    </>
  );
}

export default IphoneDisplay;
