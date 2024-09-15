import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from 'antd';

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

    return (
        <div style={{overflow: "scroll"}}>
            {notes.map((note) => (
                <Card size="small" title="Card title" bordered={false} style={{ width: 1000, marginTop: "20px" }}>
                    <p>{note.posted_date}</p>
                    <p>{note.text}</p>
                </Card>
            ))}
        </div>
    );
}