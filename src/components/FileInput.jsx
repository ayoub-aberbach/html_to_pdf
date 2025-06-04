import PropTypes from "prop-types";


function FileInput({ setValue }) {
    return (
        <div className="mb-5 d-flex flex-column">
            <label
                htmlFor="input"
                className="form-label text-white fw-medium text-uppercase"
            >Upload HTML Template
            </label>
            <input
                type="file"
                id="input"
                onChange={setValue}
                className="form-control"
            />
        </div>
    )
}

export default FileInput;


FileInput.propTypes = {
    setValue: PropTypes.func
}
