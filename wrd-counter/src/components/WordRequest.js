import React from 'react';
import { v4 as uuidv4 } from 'uuid';


function WordRequest(props) {
    const [validUuid, setValidUuid] = React.useState(true);

    //Class for converting word objects into objects suitable for the wordcloud
    class CloudWord {
        constructor(text, value) {
            this.text = text;
            this.value = value;
        }
    }

    //Request words from DB based on UUID given by user. Auto generated UUID is used by default
    const handleRequest = async function(e) {
        //Get words
        fetch("http://localhost:9000/getWords/" + props.uuid)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data != null) {
                //Check if there are words in received data
                if (data.words != null) {
                    //Convert word objects to objects suitable for the wordcloud and create array
                    let cloudWordArray = [];
                    data.words.forEach(wordObj => {
                        cloudWordArray.push(new CloudWord(wordObj.word, wordObj.count));
                    });

                    //Set states
                    props.setWords(data.words);
                    props.setWordsPopulated(true);
                    props.setCloudWords(cloudWordArray);
                }
            }
        })
        .catch((err) => {
            console.error(err);
        });
    }

    const handleUuidChange = function(e) {
        console.log(e.target.value);
        //Validate uuid
        let regex = new RegExp('^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$')
        if(regex.test(e.target.value)) {
            setValidUuid(true);
            props.setUuid(e.target.value);
        } else setValidUuid(false);
    }

    const handleGenerateUuid = function(e) {
        console.log("Old uuid: " + props.uuid);
        let uuidField = document.getElementById("uuid-field");
        let newUuid = uuidv4();
        uuidField.value = newUuid;
        props.setUuid(newUuid);
        console.log("New uuid: " + newUuid);
        setValidUuid(true);
    }

    return (
        <>
            <div id="existing-uuid-check">
                <p className="description">Save this user token to access the results later or enter your existing user token</p>
                <button id="generate-uuid-button" className="hidden"></button>
                <label htmlFor="generate-uuid-button" className="pointer-active" onClick={handleGenerateUuid}>⟳ </label>
                <input id="uuid-field" className={validUuid ? "text-field" : " text-field text-field-false-input"} type="text" onInput={handleUuidChange} defaultValue={props.uuid}></input>
                {validUuid ? <label> ✔</label> : <label> ✖</label>}
            </div>
            <button id="get-results-button" className="hidden">Get Results</button>
            <label id="get-results-label" className={validUuid ? "regular-button" : "regular-button disabled-button"} onClick={handleRequest} htmlFor="get-results-button">Get Results</label>
        </>
    );
}

export default WordRequest;