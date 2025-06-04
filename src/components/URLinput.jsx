import PropTypes from "prop-types";


function URLinput({ page_url, setValue }) {
    return (
        <div className="mb-5 d-flex flex-column">
            <label
                htmlFor="input"
                className="form-label text-white fw-medium text-uppercase"
            >Paste URL
            </label>
            <input
                required
                id="input"
                type="text"
                value={page_url}
                onChange={setValue}
                pattern="https://.*"
                className="form-control"
                placeholder="https://example.com"
            />
        </div>
    )
}

export default URLinput;

URLinput.propTypes = {
    page_url: PropTypes.string,
    setValue: PropTypes.func
}

