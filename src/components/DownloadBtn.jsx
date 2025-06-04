import PropTypes from 'prop-types';


export default function DownloadBtn({ downloadFile, filename }) {
    return (
        <button
            onClick={downloadFile}
            className='btn btn-dark mt-3 py-2 text-uppercase fw-bold'
            style={{
                transition: 'all 1s linear ease-in-out',
                opacity: filename === '' ? 0 : 1
            }}
        >Download</button>
    )
}


DownloadBtn.propTypes = {
    downloadFile: PropTypes.func,
    filename: PropTypes.string
}
