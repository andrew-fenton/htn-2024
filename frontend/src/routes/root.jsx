import '../App.css';
import LandingMic from '../widgets/LandingMic';
import { Divider } from "antd";
import { Input, Button, Card } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { useState } from 'react';
import axios from 'axios';

const QUERY_URL = "http://127.0.0.1:8000/query_journal";

function Root() {
    const [response, setResponse] = useState("");

    const queryJournal = async (queryText) => {
        try {
            if (queryText.length > 0) {
                setResponse("Loading...");
                const response = await axios.post(QUERY_URL, {
                    text: queryText
                });
                setResponse(response.data);
            };
        } catch (err) {
            console.error(err);
        }
    };
    
    return (
        <>
            <h2 style={{ fontWeight: 800 }}>
                Welcome back, <span style={{ color: '#14b8a6' }}>Janet</span>
            </h2>
            <div style={{ display: "flex", flexDirection: "row" }}>
                <h3>Total Entries</h3><br/>
                <h1>9</h1>
                <Divider type="vertical" style={{borderTop: '2px solid #f0f0f0'}}/>
                <h3>Entries this week</h3><br/>
                <h1>3</h1>
            </div>
            <Divider style={{borderTop: '2px solid #f0f0f0'}}/>
            <div>
                <Input.Search
                    placeholder="Search your memories"
                    enterButton={
                        <Button type="primary" icon={<StarOutlined/>} style={{ backgroundColor: '#bfdbfe' }}/>
                    }
                    size="large"
                    onSearch={value => queryJournal(value)}
                />
                
                <Card style={{ 
                    borderRadius: '15px', 
                    padding: '0', 
                    margin: '20px', 
                    marginBottom: '40px',
                    textAlign: "left", 
                    border: "2px solid #000",
                    fontSize: "12px"
                }}>
                    { response === "" ? 
                        (<div>
                            Example searches:                   <br/>
                            - Am I improving at collaboration?  <br/>
                            - What are my best qualities?       <br/>
                            - Do I overwork myself?
                        </div>) 
                        :
                        response
                    }
                </Card>
            </div>
            <Divider style={{borderTop: '2px solid #f0f0f0'}}/>
            <div>
                <h2>Record a memory</h2>
                <LandingMic/>
            </div>
        </>
    )
}

export default Root