import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MyContext } from "../contexts/MyContext";

function Modall() {
  const { isOpen } = useContext(MyContext);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(
    function () {
      handleShow();
    },
    [isOpen]
  );

  return (
    <>
      <span className="material-symbols-outlined" onClick={handleShow}>
        help
      </span>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Calculator Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isOpen
            ? "To go back, You can click on the line at the bottom"
            : "To access the calculator click on the first icon on the display"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modall;
