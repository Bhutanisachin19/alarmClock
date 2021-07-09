import React, { useEffect, useState } from "react";
// import Sound from "react-sound";
import naruto from "./naruto-blue-bird.mp3";
import { Button, Form, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Clock = () => {
  let time = new Date().toLocaleTimeString();

  const [cTime, setCTime] = useState(time);
  const [check, setCheck] = useState(true);
  const [showAlarm, setShowAlarm] = useState(false);
  const [selectedTime, setSelectedTime] = useState();
  const [playing, setPlaying] = useState(false);
  const [flag, setFlag] = useState(true);
  const [counter, setCounter] = useState(0);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setInterval(() => {
      setCTime(new Date().toLocaleTimeString());
      setCheck(!check);

      console.log("Counter ", counter);
      //to check alarm time
      if (
        counter == 0 &&
        new Date()
          .toLocaleTimeString("en-US", { hour12: false })
          .substring(0, 5) == selectedTime
      ) {
        // console.log("Calling play function");
        // setFlag(false);
        playAudio();
      }
    }, 1000);
  }, [cTime, check]);

  const playAudio = () => {
    // console.log("Playing song....");
    setSelectedTime();
    setFlag(false);

    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();

    setCounter(1);
  };

  const timerHandler = (e) => {
    // console.log("Current timr is ", cTime);
    setSelectedTime(e.target.value);
    setCounter(0);
    console.log("Selected Time is ", e.target.value);
  };

  return (
    <>
      <div>
        <h1 className="clock-div">{time}</h1>

        <audio className="audio-element">
          <source src={naruto}></source>
        </audio>

        {/* <Button
          onClick={playAudio} 
          variant="secondary"
        >
          {" "}
          Play
        </Button>
        <br></br>
        <br></br> */}

        {/* 
        <Button variant="secondary" onClick={() => setShowAlarm(!showAlarm)}>
          {" "}
          Set Alarm
        </Button>


        {showAlarm ? (
          <Form>
            <Form.Group controlId="formGroupEmail">
              <Form.Label>Select Time</Form.Label>
              <Form.Control
                type="time"
                placeholder="Select Time"
                onChange={timerHandler}
              />
            </Form.Group>
          </Form>
        ) : null} */}

        <Button variant="secondary" onClick={handleShow}>
          Set Alarm
        </Button>

        <Modal className="MyModal" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select Time To Wake Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formGroupEmail">
                <Form.Label>Select Time</Form.Label>
                <Form.Control
                  type="time"
                  placeholder="Select Time"
                  onChange={timerHandler}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="info" onClick={handleClose}>
              Set
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Clock;
