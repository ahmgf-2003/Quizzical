/* eslint-disable jsx-a11y/heading-has-content */
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";

const Question = ({ ele, name: n, done, answer, setAnswer }) => {
    const headeing = useRef(null);
    const [id, setId] = useState(() => null);
    const [multiple, setMultiple] = useState(() => []);

    useEffect(() => {
        setId(radnomId(4));
        setMultiple(
            randomMultipleChoice([...ele.incorrect_answers, ele.correct_answer])
        );

        headeing.current.innerHTML = ele.question;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="qa-box">
            <h2 ref={headeing}></h2>
            <div className={`answers ${done ? "unactive" : ""}`}>
                {multiple.map((ans, i) => (
                    <div key={id[i]}>
                        <input
                            className={answer.ans === ans ? `select` : ""}
                            type="radio"
                            name={n}
                            id={id[i]}
                            value={ans}
                            checked={answer.ans === ans}
                            onChange={setAnswer}
                        />
                        <label
                            htmlFor={id[i]}
                            dangerouslySetInnerHTML={{ __html: ans }}
                        ></label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Question;

function randomMultipleChoice(answers) {
    let randomAns = [];

    let num = answers.length;

    for (let i = 0, n = num; i < n; i++) {
        randomAns.push(answers.splice(Math.floor(Math.random() * num--), 1)[0]);
    }

    return randomAns;
}

function radnomId(n) {
    let arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(nanoid());
    }

    return arr;
}
