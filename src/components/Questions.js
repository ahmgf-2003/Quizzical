import { useState, useEffect } from "react";
import Question from "./Question";

const Questions = () => {
    let names = ["First", "Second", "Third", "Fourth", "Fifth"];
    const [QA, setQA] = useState(() => []);
    const [r, setR] = useState(false);
    const [done, setDone] = useState(() => false);
    const [answer, setAnswer] = useState(() => []);
    const [degree, setDegree] = useState(0);

    useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
            .then((res) => res.json())
            .then((data) => {
                let result = data.results;
                setQA(result);
                let correctAnswers = result.map((ans) => ({
                    correctAnswer: ans.correct_answer,
                    ans: "",
                }));
                setAnswer(correctAnswers);
            })
            .catch((err) => {
                throw new Error(err);
            });
    }, [r]);

    useEffect(() => {
        let selectedInputs = document.querySelectorAll("input.select");

        if (done && selectedInputs) {
            answer.forEach((ele) => {
                document
                    .querySelector(`input[value="${ele.correctAnswer}"]`)
                    .classList.add("right");
            });

            selectedInputs.forEach((ele, i) => {
                if (ele.value === answer[i].correctAnswer) {
                    setDegree((prev) => ++prev);
                } else {
                    ele.classList.add("wrong");
                }
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [done]);

    let changeAnswer = (e, id) => {
        setAnswer((prev) =>
            prev.map((ele, i) => {
                if (i === id) return { ...ele, ans: e.target.value };
                return ele;
            })
        );
    };

    let handleSubmit = () => {
        if (document.querySelectorAll("input.select").length === 5 && !done) {
            setDone((prev) => !prev);
        }
    };

    let handleRexam = () => {
        setAnswer([]);
        setDone(false);
        setDegree(0);
        setQA([]);
        setR((prev) => !prev);
    };

    return (
        <div className="questions">
            {QA.length === 0 && <div className="loading"></div>}
            {QA.map((q, index) => (
                <Question
                    ele={q}
                    name={names[index]}
                    done={done}
                    answer={answer[index]}
                    setAnswer={(e) => changeAnswer(e, index)}
                    key={index}
                />
            ))}
            {!done && (
                <button
                    className="check-btn"
                    style={{ display: answer.length > 0 ? "" : "none" }}
                    onClick={handleSubmit}
                >
                    Check Answers
                </button>
            )}
            {done && (
                <div className="result">
                    <h3>
                        Your result is {degree}/{answer.length}{" "}
                    </h3>
                    <button className="restart-btn" onClick={handleRexam}>
                        Try Again
                    </button>
                </div>
            )}
        </div>
    );
};

export default Questions;
