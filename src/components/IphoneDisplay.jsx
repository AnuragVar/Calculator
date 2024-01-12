function IphoneDisplay({ isOpen, setIsOpen }) {
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
