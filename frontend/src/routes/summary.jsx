import axios from "axios";
import { useState } from "react";
import { Button, Flex, Input } from "antd";
import { EditFilled } from "@ant-design/icons"
import "../styles/Summary.css"

const BACKEND_URL = "http://127.0.0.1:8000/create_note";

function Summary() {
    const { TextArea } = Input;

    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("I spent most of the afternoon working on the new prototypes, and it was one of those rare times where I lost track of time because I was so into it. The ideas were just flowing, and everything felt right. It’s such a rush when that happens, you know? When it's just me, the screen, and a cup of coffee, and things are working. It reminded me why I love this job in the first place.");

    const postNote = async (note) => {
        try {
            console.log(note)
            const response = await axios.post(BACKEND_URL, {
                text: note
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleSummaryEdit = (event) => {
        setSummary(event.target.value);
    };

    return (
        <div className="centered-container">
            <div className="content">
            <h1>Journal Summary</h1>
            
            <TextArea style={{resize: "none"}} rows={1} value={title} placeholder="Add summary title" onChange={(e) => setTitle(e.target.value)} className="summary-title-input" />
            <TextArea style={{marginTop: "15px", resize: "none"}} rows={6} value={summary} onChange={handleSummaryEdit} className="summary-input" />

            <div className="summary-buttons-container">
                <Flex className="summary-buttons" gap="middle" wrap>
                    {/* <Button><EditFilled/>Edit Summary</Button> */}
                    <Button style={{backgroundColor: "#0f172a"}} type="primary" onClick={() => postNote(summary)}>
                        <p style={{margin: "0"}}>Post Summary</p>
                    </Button>
                </Flex>
            </div>
            </div>
        </div>
    )
}

export default Summary