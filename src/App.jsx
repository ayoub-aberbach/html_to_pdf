import { useState } from "react";
import { ToastContainer } from 'react-toastify';

import Tabs from './components/Tabs';
import TabContent from './components/TabContent';
import DownloadBtn from './components/DownloadBtn';

import { alertMessage } from './helpers/utils';
import { pdfDownload, SendFileReq, SendUrlReq } from './helpers/api';


export default function App() {

    const [page_url, setUrl] = useState("");
    const [filename, setDndFile] = useState("");
    const [loader, setLoader] = useState(false);
    const [temp_file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("file");

    const handleSendFile = async () => {
        if (!temp_file) {
            alertMessage("Please add a file", "warning");
            return;
        }

        if (parseFloat(temp_file.size / 1024 ** 2).toFixed(2) > 5) {
            alertMessage("File size should be lower than 5MB.", "warning");
            return;
        }

        try {
            setLoader(true);
            const res = await SendFileReq(temp_file);

            setLoader(false);
            setDndFile(res.filename);
            alertMessage(res.message, "success");
            // setFile(null);
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
        if (!page_url.trim()) {
            setLoader(false);
            alertMessage("Paste a valid URL", "warning");
            return;
        }

        try {
            setLoader(true);
            const res = await SendUrlReq(page_url);

            if (res?.status === 200) {
                setUrl("");
                setLoader(false);
                setDndFile(res?.data.filename);
                alertMessage(res?.data.message, "success");
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

    const handlePdf = async () => {
        await pdfDownload(filename);
        setDndFile("");
    }

    return (
        <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
            <div
                className="card shadow py-4 px-4 d-flex justify-between"
                style={{ width: '100%', maxWidth: '500px', backgroundColor: '#9681EB', transition: 'all 0.3s ease-in-out' }}
            >
                <h2 className="text-center mb-5 mt-0 p-0 text-black fw-bold fs-1 fst-italic">HTML TO PDF</h2>
                <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {
                    activeTab === 'file' ?
                        <TabContent loader={loader}
                            page_url={page_url}
                            filename={filename}
                            activeTab={activeTab}
                            handleFunc={handleSendFile}
                            setValue={(e) => setFile(e.target.files[0])}
                        /> :
                        <TabContent loader={loader}
                            page_url={page_url}
                            filename={filename}
                            activeTab={activeTab}
                            handleFunc={handleSendUrl}
                            setValue={(e) => setUrl(e.target.value)}
                        />
                }

                {filename !== "" && <DownloadBtn filename={filename} downloadFile={handlePdf} />}
            </div>

            <span className='text-center text-white mt-2'>* All files are set to be deleted every 10 minutes *</span>
            <ToastContainer />
        </div>
    )
}
