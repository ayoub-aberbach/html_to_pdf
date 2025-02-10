import PropTypes from "prop-types";

import URLinput from "./URLinput";
import FileInput from "./FileInput";


function TabContent({ activeTab, setValue, filename, handleFunc, loader, page_url }) {
    return (
        <div>
            <div className="mb-5 d-flex flex-column">
                <label
                    htmlFor="input"
                    className="form-label text-white fw-bold text-uppercase"
                >
                    Upload HTML Template
                </label>
                {activeTab === "file" ?
                    <FileInput setValue={setValue} />
                    :
                    <URLinput setValue={setValue} page_url={page_url} />
                }
            </div>
            {filename === "" &&
                <button
                    type="button"
                    className="btn btn-primary w-100 py-3"
                    onClick={handleFunc}
                    style={{ transition: 'transform 0.2s', hover: { transform: 'scale(1.05)' } }}
                >
                    {
                        loader ? <>
                            <span className="spinner-grow spinner-grow-sm me-1" aria-hidden="true"></span>
                            <span role="status">Processing...</span>
                        </> : <span className='text-uppercase fw-medium'>Generate from Template</span>
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
