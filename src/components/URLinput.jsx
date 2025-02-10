import PropTypes from "prop-types";


function URLinput({ page_url, setValue }) {
    return (
        <input
            type="text"
            id="input"
            value={page_url}
            onChange={setValue}
            className="form-control"
            placeholder="Webpage URL here"
        />
    )
}

export default URLinput;

URLinput.propTypes = {
    page_url: PropTypes.string,
    setValue: PropTypes.func
}

