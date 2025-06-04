import PropTypes from "prop-types";

import URLinput from "./URLinput";
import FileInput from "./FileInput";
import Loader from "./Loader";


function TabContent({ activeTab, setValue, filename, handleFunc, loader, page_url }) {
    return (
        <div>
            <div className="d-flex flex-column">
                {activeTab === "file" ?
                    <FileInput setValue={setValue} /> :
                    <URLinput setValue={setValue} page_url={page_url} />
                }
            </div>
            {filename === "" &&
                <button
                    type="button"
                    disabled={loader}
                    onClick={handleFunc}
                    className="btn btn-light d-flex justify-content-center pb-2 w-100 mainBtn"
                >
                    {loader && <Loader />}
                    {!loader && <span className='text-uppercase fw-bold fs-4'>Start</span>}
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
