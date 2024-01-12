function Display({ displayValue, input }) {
  return (
    <div className="display">
      <input className="input1" type="" value={input} readOnly></input>
      <input className="input2" type="" value={displayValue} readOnly></input>
    </div>
  );
}
export default Display;
