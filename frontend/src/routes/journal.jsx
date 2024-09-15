import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Collapse, Typography } from 'antd';
import "../styles/Journal.css"

const BACKEND_URL = "http://127.0.0.1:8000/";

export default function Journal() {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        getNotes();
    }, []);
    
    const getNotes = async () => {
        const response = await axios.get(BACKEND_URL + "notes");
        console.log(response.data);
        setNotes(response.data);
    };

    const [expandedNote, setExpandedNote] = useState(null);

    const handleCardClick = (noteId) => {
        setExpandedNote((prev) => (prev === noteId ? null : noteId));
    };

    const renderSnippet = (text) => {
        if (text.length > 180) {
            return (
                <span className="journal-snippet">
                    {text.substring(0, 180)}...
                </span>
            );
        }
        return text;
    };

    const title = (
        <div className="journal-card-title">
            <h2>Title</h2>
            <p className="journal-card-date">date 202424</p>
        </div>
    );


    return (
        <div className="main-container">
            <h1>Your Journal Entries</h1>
            {notes.map((note) => (
                <Card
                    key={note.id}
                    size="small"
                    title={<div className="journal-card-title">
                            <h2>{note.title}</h2>
                            <p className="journal-card-date">{note.date_posted.substring(0, 10)}</p>
                            </div>
                            }
                    bordered={false}
                    className="journal-card"
                    onClick={() => handleCardClick(note.id)}
                    style={{ cursor: "pointer" }}
                >
                    <p>{expandedNote === note.id ? note.text : renderSnippet(note.text)}</p>
                </Card>
            ))}
        </div>
    );
}