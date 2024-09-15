import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Flex, Input } from "antd";
import { EditFilled } from "@ant-design/icons"
import { useNavigate } from "react-router-dom";
import { Spin } from 'antd';
import "../styles/Summary.css"

const BACKEND_URL = "http://127.0.0.1:8000/";

function Summary({transcript}) {
    const { TextArea } = Input;

    const [isLoading, setIsLoading] = useState(true);
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");

    const navigateTo = useNavigate();

    useEffect(() => {
        summarize();
    }, []);

    const summarize = async () => {
        try {
            if (transcript.length > 0) {
                const response = await axios.post(BACKEND_URL + "summarize", {
                    text: transcript
                });

                console.log(response.data);
                setSummary(response.data);
                setIsLoading(false);
            } else {
                navigateTo('/record');
            }
        } catch (err) {
            console.error(err);
        }
    }

    const postNote = async (note) => {
        try {
            console.log(note)
            const response = await axios.post(BACKEND_URL + "create_note", {
                title: title,
                text: note
            });

            console.log(response.data);

            navigateTo('/journal');
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
                
                {isLoading ? (
                        <Spin />
                    ) : (<>
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
                </>)}
            </div>
        </div>
    )
}

export default Summary