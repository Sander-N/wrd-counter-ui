import logo from './logo.svg';
import './App.css';
import FileManager from "./components/FileManager";

function App() {
    return (
        <div className="app">
            <img src={logo} className="app-logo" alt="logo" />
            <div className="file-area">
                <div>
                    <label>Drag and drop or select the .txt file you wish to count</label>
                    <p className="description">(Maximum file size is 100MB)</p>
                </div>
                <FileManager />
            </div>
        </div>
    );
}

export default App;
