import { useState } from "react";

function Buttons({
  handleToggleSign,
  handleBackspace,
  handleClear,
  handleClick,
  handleEvaluation,
  handlePercentage,
}) {
  return (
    <div className="buttons">
      <button onClick={handleClear}>AC</button>
      <button onClick={handleBackspace} name="">
        C
      </button>
      <button onClick={handlePercentage} name="%">
        %
      </button>
      <button onClick={handleClick} name="÷" className="orange">
        ÷
      </button>
      <button onClick={handleClick} name="7">
        7
      </button>
      <button onClick={handleClick} name="8">
        8
      </button>
      <button onClick={handleClick} name="9">
        9
      </button>
      <button onClick={handleClick} name="x" className="orange">
        &times;
      </button>
      <button onClick={handleClick} name="4">
        4
      </button>
      <button onClick={handleClick} name="5">
        5
      </button>
      <button onClick={handleClick} name="6">
        6
      </button>
      <button onClick={handleClick} name="-" className="orange">
        -
      </button>
      <button onClick={handleClick} name="1">
        1
      </button>
      <button onClick={handleClick} name="2">
        2
      </button>
      <button onClick={handleClick} name="3">
        3
      </button>
      <button onClick={handleClick} name="+" className="orange">
        +
      </button>
      <button onClick={handleClick} name="0">
        0
      </button>
      <button onClick={handleToggleSign}>+/-</button>
      <button onClick={handleClick} name=".">
        .
      </button>
      <button onClick={handleEvaluation} className="orange">
        =
      </button>
    </div>
  );
}

export default Buttons;
