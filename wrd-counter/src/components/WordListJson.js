import React from 'react';

function WordListJson(props) {
    return (
        <>
            {props.wordsPopulated ? <pre>{JSON.stringify(props.words, null, 2)}</pre> : <></>}
        </>
    );
}

export default WordListJson;