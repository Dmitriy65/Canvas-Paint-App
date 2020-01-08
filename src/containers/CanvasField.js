import { connect } from "react-redux";
import CanvasField from "../components/CanvasField/CanvasField.js";

const mapStateToProps = ({ file }) => ({
  canvas: file.canvas,
  errorMessage: file.errorMessage
})

export default connect(mapStateToProps, null)(CanvasField);
