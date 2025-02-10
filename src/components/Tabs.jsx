import PropTypes from "prop-types";


function Tabs({ activeTab, setActiveTab }) {
    return (
        <ul className="nav nav-tabs mb-5 d-flex w-100">
            <li className="nav-item w-50">
                <button
                    onClick={() => setActiveTab('file')}
                    style={{ transition: 'background-color 0.3s' }}
                    className={`nav-link text-black w-100 text-uppercase ${activeTab === 'file' ? 'active' : ''}`}
                >
                    Upload File
                </button>
            </li>
            <li className="nav-item w-50">
                <button
                    onClick={() => setActiveTab('url')}
                    style={{ transition: 'background-color 0.3s' }}
                    className={`nav-link text-black w-100 text-uppercase ${activeTab === 'url' ? 'active' : ''}`}
                >
                    Enter URL
                </button>
            </li>
        </ul>
    )
}

export default Tabs;


Tabs.propTypes = {
    activeTab: PropTypes.string,
    setActiveTab: PropTypes.func
}
