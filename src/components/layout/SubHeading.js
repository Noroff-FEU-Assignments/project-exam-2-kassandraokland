import PropTypes from "prop-types";

function SubHeading({ content }) {
	return <h4>{content}</h4>;
}

SubHeading.propTypes = {
	content: PropTypes.string.isRequired,
};

export default SubHeading;