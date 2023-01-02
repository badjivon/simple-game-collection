import React from "react";
import PropTypes from "prop-types";

function HelloWorld(props) {
  return <React.Fragment>{props.greeting}</React.Fragment>;
}

HelloWorld.propTypes = {
  greeting: PropTypes.string,
};

export default HelloWorld;
