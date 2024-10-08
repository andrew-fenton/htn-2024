import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'antd/dist/reset.css';

import Recorder from './routes/recorder';
import Root from './routes/root';
import Summary from './routes/summary';
import Navbar from './widgets/Navbar';
import Journal from './routes/journal';

function App() {
    const [transcript, setTranscript] = useState("");

  return (
        <Router>
            <Navbar />
            <div id="app">
                <Routes>
                    <Route path="/" element={<Root/>} />
                    <Route path="record" element={<Recorder transcript={transcript} setTranscript={setTranscript}/>} />
                    <Route path="summary" element={<Summary transcript={transcript}/>} />
                    <Route path="journal" element={<Journal />} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
