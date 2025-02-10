import axios from 'axios';
import { useState } from "react";
import { ToastContainer } from 'react-toastify';

import Tabs from './components/Tabs';
import { API_URL } from './helpers/api_url';
import TabContent from './components/TabContent';
import { alertMessage } from './helpers/toastMsgs';


const config = [
    { headers: { "Content-Type": "application/json" } },
    { headers: { "Content-Type": "multipart/form-data" } },
];


export default function App() {

    const [page_url, setUrl] = useState("");
    const [filename, setDndFile] = useState("");
    const [loader, setLoader] = useState(false);
    const [temp_file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("file");

    const handleSendFile = async (e) => {
        e.preventDefault();
        const form_data = new FormData();

        try {
            if (temp_file === null) {
                alertMessage("Please add a file", "warning");
                return;
            }

            setLoader(true);
            form_data.append("file", temp_file);

            const req = await axios.post(`${API_URL}/api/upload_html`, form_data, config[1]);
            const res = req.data;

            setLoader(false);
            setDndFile(res.filename);
            alertMessage(res.message, "success");
            setFile(null);
        } catch (error) {
            setLoader(false);

            if (error.response?.status === 403) {
                alertMessage(error.response?.data.message, "warning");
                setFile(null);
                return;
            }

            alertMessage(error.response?.data.message, "error");
            setFile(null);
        }
    }

    const handleSendUrl = async (e) => {
        e.preventDefault();

        try {
            setLoader(true);

            const payload = { "pageUrl": page_url };

            const req = await axios.post(`${API_URL}/api/paste_url`, payload, config[0]);
            const res = req?.data;

            setLoader(false);
            setDndFile(res.filename);
            alertMessage(res.message, "success");
            setUrl("");

        } catch (error) {
            setLoader(false);

            if (error.response?.status === 403) {
                alertMessage(error.response?.data.message, "warning");
                setUrl("");
                return;
            }

            alertMessage(error.response?.data.message, "error");
            setUrl("");
            return;
        }
    }

    const downloadFile = async () => {
        const file_url = `${API_URL}/invoices/${filename}`;

        try {
            const response = await axios.get(file_url, { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.download = filename;

            document.body.appendChild(link);
            link.click();

            setDndFile("");
            document.body.removeChild(link);
        } catch (error) {
            alertMessage(error.response?.data, "error");
        }
    }

    return (
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div
                className="card shadow py-4 px-4 d-flex justify-between"
                style={{ backgroundColor: '#9681EB', maxWidth: '500px', width: '100%', transition: 'all 0.3s ease-in-out' }}
            >
                <h2 className="text-center mb-5 mt-0 p-0 text-white">Generate Content</h2>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {activeTab === 'file' ?
                    <TabContent
                        loader={loader}
                        page_url={page_url}
                        filename={filename}
                        activeTab={activeTab}
                        handleFunc={handleSendFile}
                        setValue={(e) => setFile(e.target.files[0])}
                    /> :
                    <TabContent
                        loader={loader}
                        page_url={page_url}
                        filename={filename}
                        activeTab={activeTab}
                        handleFunc={handleSendUrl}
                        setValue={(e) => setUrl(e.target.value)}
                    />
                }

                {
                    filename !== "" && <>
                        <button
                            onClick={downloadFile}
                            className='btn btn-dark mt-3 py-2 text-uppercase fw-bold'
                            style={{ transition: 'all 1s linear ease-in-out', opacity: filename === '' ? 0 : 1 }}
                        >Download</button>
                    </>
                }
            </div>

            <span className='text-info-emphasis'>* All files are set to be deleted every 10 minutes *</span>
            <ToastContainer />
        </div>
    )
}
