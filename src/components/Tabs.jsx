import PropTypes from "prop-types";


function Tabs({ activeTab, setActiveTab }) {
    return (
        <ul className="nav nav-tabs mb-5 d-flex w-100">
            <li className="nav-item w-50">
                <button
                    onClick={() => setActiveTab('file')}
                    className={`nav-link text-white fw-bold w-100 text-uppercase ${activeTab === 'file' ? 'active bg-black' : ''}`}
                >FILE
                </button>
            </li>
            <li className="nav-item w-50">
                <button
                    onClick={() => setActiveTab('url')}
                    className={`nav-link text-white fw-bold w-100 text-uppercase ${activeTab === 'url' ? 'active bg-black' : ''}`}
                >URL
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
