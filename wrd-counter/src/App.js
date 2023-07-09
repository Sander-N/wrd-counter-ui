import logo from './logo.svg';
import React from 'react';

//Import styles
import './styles/App.css';
import './styles/SideMenu.css'

//Import components
import FileManager from "./components/FileManager";
import WordCloud from './components/WordCloud';
import WordRequest from './components/WordRequest';

//Import tools
import { v4 as uuidv4 } from 'uuid';
import WordListJson from './components/WordListJson';

function App() {
    const [uuid, setUuid] = React.useState(uuidv4());
    const [words, setWords] = React.useState();
    const [wordsPopulated, setWordsPopulated] = React.useState(false); //Boolean state for showing if we've received requested words
    const [cloudWords, setCloudWords] = React.useState(); //Array of words suitable for wordcloud

    return (
        <div className="app">
            <img src={logo} className="app-logo" alt="logo" />

            <div id="main-area">
                <div className={wordsPopulated ? "json-words side-menu side-menu--left" : "side-menu side-menu--left side-menu--closed"}>
                    <WordListJson words={words} wordsPopulated={wordsPopulated}/>
                </div>
                <div className="file-area">
                    <div>
                        <h1>Welcome to wrdᶜ text processor!</h1>
                    </div>
                    <FileManager uuid={uuid}/>
                    <WordRequest uuid={uuid} setWords={setWords} setWordsPopulated={setWordsPopulated} setCloudWords={setCloudWords} setUuid={setUuid}/>
                </div>
                <div className={wordsPopulated ? "side-menu side-menu--right" : "side-menu side-menu--right side-menu--closed"}>
                    <WordCloud uuid={uuid} cloudWords={cloudWords} wordsPopulated={wordsPopulated}/>
                </div>
            </div>
        </div>
    );
}

export default App;
