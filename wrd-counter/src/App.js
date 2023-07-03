import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="app">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="file-area">
                <p>
                    <label>Drag and drop or select the .txt file you wish to count</label>
                    <p>(Maximum file size is 100MB)</p>
                </p>
                <div id="file-drop-area">
                    <p>Drag and drop your file here or...</p>
                </div>
                <input className="hidden" id="file-input" type="file" multiple={false} accept=".txt"/>

                <label id="file-input-label" for="file-input"
                    >Select a File...
                </label>
            </div>
        </div>
    );
}

//function DragAndDrop() {
//    const [dragActive, setDragActive] = React.useState(false);
//
//    const handleDrag = function(e) {
//        e.preventDefault();
//        e.stopPropagation();
//        if (e.type === "dragenter" || e.type === "dragover") {
//            setDragActive(true);
//        } else if (e.type === "dragleave") {
//            setDragActive(false);
//        }
//    };
//
//    return (
//        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
//            <input type="file" id="input-file-upload" multiple={true} />
//            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
//                <div>
//                    <p>Drag and drop your file here or</p>
//                    <button className="upload-button">Upload a file</button>
//                </div>
//            </label>
//        </form>
//    );
//}

export default App;
