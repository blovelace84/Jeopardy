import React, { useState } from "react";
import QuestionDisplay from "./QuestionDisplay";

const categories = ['science', 'history', 'literature', 'geography', 'math'];

const GameTable = () => {
    const [questionData, setQuestionData] = useState(null);

    const fetchQuestion = async (category) => {
        try{
            const response = await fetch(`https://jservice.io/api/random?count=1&category=${category}`);
            const data = await response.json();
            setQuestionData(data[0]);
        }catch(error){
            console.error('Error fetching question:', error);
        }
    };

    return(
        <div>
            <table className="game-table">
                <thead>
                    <tr>
                        {categories.map((category) =>(
                            <th key={category}>{category.toLocaleUpperCase()}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {categories.map((category) =>(
                            <td key={category}>
                                <button onClick={() => fetchQuestion(category)}>Get Question</button>
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            {questionData && <QuestionDisplay questionData={questionData} />}
        </div>
    );
}

export default GameTable;