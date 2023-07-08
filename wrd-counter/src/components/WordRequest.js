import React from 'react';

function WordRequest(props) {
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

    return (
        <div>
            <button onClick={handleRequest}>Get Results</button>
        </div>
    );
}

export default WordRequest;