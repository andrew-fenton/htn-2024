import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'antd/dist/reset.css';

import Recorder from './routes/recorder';
import Root from './routes/root';
import Summary from './routes/summary';
import Navbar from './widgets/Navbar';

function App() {
    const [notes, setNotes] = useState([
        {
            title: "HTN Day 1",
            date: "09.13.24",
            description: "sfkjsdklfsdf",
        },
        {
            title: "HTN Day 1",
            date: "09.13.24",
            description: "sfkjsdklfsdf",
        },
        {
            title: "HTN Day 1",
            date: "09.13.24",
            description: "sfkjsdklfsdf",
        },
    ]);

    const [transcript, setTranscript] = useState("");

  return (
        <Router>
            <Navbar />
            <div id="app">
                <Routes>
                    <Route path="/" element={<Root notes={notes}/>} />
                    <Route path="record" element={<Recorder transcript={transcript} setTranscript={setTranscript}/>} />
                    <Route path="summary" element={<Summary transcript={transcript}/>} />
                </Routes>
            </div>
        </Router>
    )
}

export default App
