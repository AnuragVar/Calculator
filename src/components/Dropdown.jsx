import Dropdown from "react-bootstrap/Dropdown";

function Drop({ Responses }) {
  return (
    <Dropdown className="drop-down">
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        History
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {Responses.map((r, i) => (
          <Dropdown.Item key={i}>
            {r.expression} =>
            {r.result}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Drop;
