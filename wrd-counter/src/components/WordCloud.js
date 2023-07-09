import React from 'react';
import ReactWordcloud from 'react-wordcloud'

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

function WordCloud(props) {
    const callbacks = {
        getWordColor: word => { 
           return word.value % 2 == 0 ? "#309eff" : "#99d6ff";
        },
    }

    const options = {
        fontSizes: [20, 30, 60, 80]
    }

    return (
        <>
            {props.wordsPopulated ? <><ReactWordcloud callbacks={callbacks} options={options} words={props.cloudWords}/></> : <></>}
        </>
    );
}

export default WordCloud;