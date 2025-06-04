import axios from "axios";
import { alertMessage, API_URL } from "./utils";


export const SendFileReq = async (temp_file) => {

    const form_data = new FormData();
    form_data.append("file", temp_file);

    const req = await axios.post(`${API_URL}/api/upload_html`, form_data,
        { headers: { "Content-Type": "multipart/form-data" } },
    );

    return req?.data
}

export const SendUrlReq = async (page_url) => {
    const payload = { "pageUrl": page_url };

    const req = await axios.post(
        `${API_URL}/api/paste_url`, payload,
        { headers: { "Content-Type": "application/json" } }
    );

    return { data: req?.data, status: req?.status };
}

export const pdfDownload = async (filename) => {
    const file_url = `${API_URL}/pdfs/${filename}`;

    try {
        const response = await axios.get(file_url, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
    } catch (error) {
        alertMessage(error.response?.data, "error");
    }
}
