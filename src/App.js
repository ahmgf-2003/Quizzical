import Quiz from "./components/Quiz";
import blueBlob from "./images/blobs-blue.png";
import YellowBlob from "./images/blobs-yellow.png";

const App = () => {
    return (
        <section className="quiz">
            <img src={YellowBlob} alt="yellow blob" />
            <div className="container">
                <Quiz />
            </div>
            <img src={blueBlob} alt="blue blob" />
        </section>
    );
};

export default App;
