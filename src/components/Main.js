const Main = ({ start, handleClick }) => {
    return (
        <>
            <div className="text">
                <h1>Quizzical</h1>
                <p>Are you smart enough?</p>
            </div>
            <button className="start-btn" onClick={() => handleClick(true)}>
                Start quiz
            </button>
        </>
    );
};

export default Main;
