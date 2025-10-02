import { useState } from "react";
import Main from "./Main";
import Questions from "./Questions";

const Quiz = () => {
    const [start, setStart] = useState(() => false);
    return (
        <>
            {start && <Questions />}
            {!start && (
                <main>
                    <Main handleClick={setStart} />
                </main>
            )}
        </>
    );
};

export default Quiz;
