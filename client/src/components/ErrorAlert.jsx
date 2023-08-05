import PropTypes from "prop-types";

function ErrorMessage({ children, type }) {
  return (
    <div className={`alert alert-${type} mt-2`} role="alert">
      {children}
    </div>
  );
}

ErrorMessage.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
};

export default ErrorMessage;
