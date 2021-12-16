import "./LoseModal.css";

const LoseModal = (props) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <h1 className="modal-title">You Lost</h1>
        <p>{props.score}</p>
        <button
          onClick={() => window.location.reload(false)}
          className="play-again"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default LoseModal;
