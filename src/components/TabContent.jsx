import PropTypes from "prop-types";

import URLinput from "./URLinput";
import FileInput from "./FileInput";


function TabContent({ activeTab, setValue, filename, handleFunc, loader, page_url }) {
    return (
        <div>
            <div className="mb-5 d-flex flex-column">
                {activeTab === "file" ?
                    <>
                        <label
                            htmlFor="input"
                            className="form-label text-black fw-bold text-uppercase"
                        >
                            Upload HTML Template
                        </label>
                        <FileInput setValue={setValue} />
                    </> :
                    <>
                        <label
                            htmlFor="input"
                            className="form-label text-black fw-bold text-uppercase"
                        >
                            Paste URL
                        </label>
                        <URLinput setValue={setValue} page_url={page_url} />
                    </>
                }
            </div>
            {filename === "" &&
                <button
                    type="button"
                    className="btn btn-light w-100 py-3"
                    onClick={handleFunc}
                    style={{ transition: 'transform 0.2s', hover: { transform: 'scale(1.05)' } }}
                >
                    {
                        loader ? <>
                            <span className="spinner-grow spinner-grow-sm me-1" aria-hidden="true"></span>
                            <span role="status">Processing...</span>
                        </> : <span className='text-uppercase fw-bold fs-3'>Generate</span>
                    }
                </button>
            }
        </div>
    )
}

export default TabContent;


TabContent.propTypes = {
    loader: PropTypes.bool,
    page_url: PropTypes.string,
    filename: PropTypes.string,
    activeTab: PropTypes.string,
    setValue: PropTypes.func,
    handleFunc: PropTypes.func,
}
