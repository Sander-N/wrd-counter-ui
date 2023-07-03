import React from 'react';

function FileManager() {
    const [dragActive, setDragActive] = React.useState(false);
    const [fileAdded, setFileAdded] = React.useState(false);
    const [fileName, setFileName] = React.useState("");

    const inputRef = React.useRef(null);

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
            //handleFiles
            if(e.target.files[0] > 1) {
                console.log("Tried to add more than one file");
                setFileAdded(false);
            } else {
                var file = e.target.files[0];
                if (file.type === "text/plain") {
                    setFileName(file.name);
                    setFileAdded(true);
                }
            }
        }
    }

    //Handle click event to add file
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form id="file-upload-form" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={fileAdded ? "file-added" : (dragActive ? "drag-active" : "file-not-added")}>
            <input ref={inputRef} className="hidden" id="file-input" type="file" onChange={handleChange} multiple={false} accept=".txt"/>
            <label id="file-input-label" htmlFor="file-input">
                <div>
                    {fileAdded ? (<p>{fileName}</p>) : (<p>Drag and drop your file here or click to add</p>)}
                    <button className="hidden" onClick={onButtonClick}>Upload File</button>
                </div>
            </label>
        </form>
    );
}

export default FileManager;