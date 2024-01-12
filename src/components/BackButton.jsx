function BackButton({ isOpen, setIsOpen }) {
  return <div className="line" onClick={() => setIsOpen(!isOpen)}></div>;
}

export default BackButton;
