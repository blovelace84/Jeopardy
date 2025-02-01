import React, { useState } from 'react';
import ShowAnswerButton from './ShowAnswerButton';

const QuestionDisplay = ({ questionData }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return(
        <div className='question-display'>
            <h2>Question: {questionData.question}</h2>
            <ShowAnswerButton onClick={() => setShowAnswer(true)} />
                {showAnswer && <p>Answer: {questionData.answer}</p>}
        </div>
    );
}

export default QuestionDisplay;