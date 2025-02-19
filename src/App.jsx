import axios from 'axios';
import { useState } from "react";
import { ToastContainer } from 'react-toastify';

import Tabs from './components/Tabs';
import TabContent from './components/TabContent';
import DownloadBtn from './components/DownloadBtn';

import { alertMessage, API_URL } from './helpers/utils';


const config = [
    { headers: { "Content-Type": "application/json", "Accept": "application/json" } },
    { headers: { "Content-Type": "multipart/form-data" } },
];


export default function App() {

    const [page_url, setUrl] = useState("");
    const [filename, setDndFile] = useState("");
    const [loader, setLoader] = useState(false);
    const [temp_file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("file");

    const handleSendFile = async () => {
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

    const handleSendUrl = async () => {
        try {
            setLoader(true);

            if (page_url === "") {
                setLoader(false);
                alertMessage("Paste a valid URL", "warning");
                return;
            }

            const payload = { "pageUrl": page_url };

            const req = await axios.post(`${API_URL}/api/paste_url`, payload, config[0]);
            const res = req?.data;

            if (req?.status === 200) {
                setUrl("");
                setLoader(false);
                setDndFile(res.filename);
                alertMessage(res.message, "success");
                return;
            }

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

    const downloadPDF = async () => {
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
                style={{
                    backgroundColor: '#9681EB',
                    maxWidth: '500px',
                    width: '100%',
                    transition: 'all 0.3s ease-in-out'
                }}
            >
                <h2 className="text-center mb-5 mt-0 p-0 text-white">Generate Content</h2>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <>
                    {
                        activeTab === 'file' ? <TabContent
                            loader={loader}
                            page_url={page_url}
                            filename={filename}
                            activeTab={activeTab}
                            handleFunc={handleSendFile}
                            setValue={(e) => setFile(e.target.files[0])}
                        /> : <TabContent
                            loader={loader}
                            page_url={page_url}
                            filename={filename}
                            activeTab={activeTab}
                            handleFunc={handleSendUrl}
                            setValue={(e) => setUrl(e.target.value)}
                        />
                    }
                </>

                {filename !== "" &&
                    <DownloadBtn filename={filename} downloadFile={downloadPDF} />
                }
            </div>

            <span className='mt-3 text-center text-white'>* All files are set to be deleted every 10 minutes *</span>
            <ToastContainer />
        </div>
    )
}
