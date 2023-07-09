import React from 'react';
import '../styles/FileArea.css'

function FileManager(props) {
    const [dragActive, setDragActive] = React.useState(false);
    const [fileAdded, setFileAdded] = React.useState(false);
    const [fileName, setFileName] = React.useState("");
    const [file, setFile] = React.useState();
    const [fileSubmitted, setFileSubmitted] = React.useState(false);

    const inputRef = React.useRef(null);

    //Function for handling drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();

        //Check drag status and set state accordingly
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    //Function for handling file drop event
    const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        //Check if there are any files present after drop
        //If files are present then check that only one file was added and that it is a plain-text file
        if(e.dataTransfer.files && e.dataTransfer.files[0]) {
            if(e.dataTransfer.files.length > 1) {
                console.log("Tried to add more than one file");
                setFileAdded(false);
            } else {
                var file = e.dataTransfer.files[0];
                if (file.type === "text/plain") {
                    setFileName(file.name);
                    setFileAdded(true);
                    setFile(file);
                }
            }
        } else setFileAdded(false);
    }

    //Handle change for file input
    const handleChange = function(e) {
        e.preventDefault();

        //Check if there are any files present after drop
        //If files are present then check that only one file was added and that it is a plain-text file
        if(e.target.files && e.target.files[0]) {
            if(e.target.files[0] > 1) {
                console.log("Tried to add more than one file");
                setFileAdded(false);
            } else if(e.target.files[0].size > 10e7) {
                console.log("File too big");
            } else {
                let file = e.target.files[0];
                if (file.type === "text/plain") {
                    setFileName(file.name);
                    setFileAdded(true);
                    setFile(file);
                } else {
                    console.log("Did not add plain-text file.")
                }
            }
        }
    }

    //Handle click event to add file
    const onButtonClick = () => {
        inputRef.current.click();
    };

    const handleSubmit = async function(e) {
        //POST file if there is a file added
        if(fileAdded) {
            e.preventDefault();
            let formData = new FormData();
            formData.append("file", file);
            
            fetch("http://localhost:9000/upload/" + props.uuid, {
                method: "POST",
                body: formData,
            })
            .then((res) => console.log(res))
            .then((data) => console.log(data))
            .catch((err) => console.error(err));

            setFileSubmitted(true);
        }
    }

    return (
        <div id="file-upload-wrapper">
            <div>
                <div>Add the plain-text file you wish to process below</div>
            </div>

            <form id="file-upload-form" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={fileAdded ? "file-added" : (dragActive ? "drag-active" : "file-not-added")}>
                <input ref={inputRef} className="hidden" id="file-input" type="file" onChange={handleChange} multiple={false} accept=".txt"/>
                <label id="file-input-label" htmlFor="file-input">
                    <div>
                        {fileAdded ? 
                        (<p>{fileName}</p>) 
                        : 
                        (
                        <div>
                            <p>Drag and drop your file here or click to add</p>
                            <p className="description">(Maximum file size is 100MB)</p>
                        </div>
                        )}
                        <button className="hidden" onClick={onButtonClick}>Upload File</button>
                    </div>
                </label>
            </form>

            <button id="file-submit-button" className="hidden"></button>
            <label id="file-submit-label" className="regular-button" onClick={handleSubmit} htmlFor="file-submit-button">Submit File</label>

            {fileSubmitted ? 
            (
            <div>
                <p className="description">Your current user token is <b>{props.uuid}</b></p>
                <p className="description">Save this token to access the submitted word data later</p>
            </div>) : 
            (
                <div></div>
            )}
            
        </div>
    );
}

export default FileManager;