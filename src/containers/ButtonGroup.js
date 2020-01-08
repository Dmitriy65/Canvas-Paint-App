import { connect } from "react-redux";
import ButtonGroup from "../components/ButtonGroup/ButtonGroup.js";
import { handleInputFile } from '../actions/fileActions';

const mapDispatchToProps = dispatch => ({
  handleInputFile: file => dispatch(handleInputFile(file))
});

const mapStateToProps = ({ file }) => ({
  link: file.outputLink,
})

export default connect(mapStateToProps, mapDispatchToProps)(ButtonGroup);
