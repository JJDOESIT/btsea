import getCSRF from "../functions/getCSRF";

const CSRFToken = () => {
    const csrftoken=getCSRF('csrftoken')
    return (
        <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
    );
};
export default CSRFToken;