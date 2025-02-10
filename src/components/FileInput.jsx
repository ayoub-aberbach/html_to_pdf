import PropTypes from "prop-types";


function FileInput({ setValue }) {
    return (
        <input
            type="file"
            id="input"
            onChange={setValue}
            className="form-control"
        />
    )
}

export default FileInput;


FileInput.propTypes = {
    setValue: PropTypes.func
}
