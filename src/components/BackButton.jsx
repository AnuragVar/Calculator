import { useContext } from "react";
import { MyContext } from "../contexts/MyContext";

function BackButton() {
  const { isOpen, setIsOpen } = useContext(MyContext);
  return <div className="line" onClick={() => setIsOpen(!isOpen)}></div>;
}

export default BackButton;
