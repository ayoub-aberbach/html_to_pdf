import PropTypes from "prop-types";


function URLinput({ page_url, setValue }) {
    return (
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
    )
}

export default URLinput;

URLinput.propTypes = {
    page_url: PropTypes.string,
    setValue: PropTypes.func
}

