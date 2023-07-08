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

    return (
        <div>
            {props.wordsPopulated ? <div><ReactWordcloud callbacks={callbacks} words={props.cloudWords}/></div> : <div>No words</div>}
        </div>
    );
}

export default WordCloud;