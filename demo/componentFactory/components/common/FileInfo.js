import React, { Component, PropTypes } from 'react';
import { Col, Glyphicon, Modal, Button } from 'react-bootstrap';
import filesize from 'filesize';

export default class FileUploadItem extends Component {
	static propTypes = {
		onClick: PropTypes.func,
		file: PropTypes.object.isRequired,
		height: PropTypes.string,
		width: PropTypes.string
	};

	static defaultProps = {
		height: "150px",
		width: "150px"
	};

	state = {
		show: false
	};

	showModal = (show) => {
		this.setState({ show: show });
	};

	render() {
		let { file, height, width, onClick } = this.props;
		let { show } = this.state;

		const containerStyle = {
			margin: "auto",
			padding: "0px",
			backgroundColor: "#eeeeee",
			borderColor: '#757575',
			borderStyle: 'solid',
			borderWidth: 2,
			borderRadius: 6,
			marginBottom: "10px"
		};

		const fileNameStyle = {
			textAlign: 'center'
		};

		const trashContainerStyle = {
			display: "inline-block",
			textAlign: "left",
			paddingLeft: "10px",
			paddingBottom: "10px"
		};

		const fileSizeContainerStyle = {
			display: "inline-block",
			float: "right",
			paddingRight: "10px",
			paddingBottom: "10px"
		};

		const imgStyle = {
			marginTop: "10px",
			display: 'block',
			marginLeft: 'auto',
			marginRight: 'auto'
		};

		const textContainerStyle = {
			marginTop: "10px",
			color: "#212121"
		};

		let image = (file.type.match(/image/))? file.preview : "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/file-text-icon.png";
		let filename = (file.name.length <= 21)? file.name : file.name.substring(0, 20);

		return (
			<Col xs={4} md={4}>
				<Modal show={show}>
					<Modal.Header>
						<Modal.Title>Delete</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Are you sure that you want to delete this file: <b>{file.name}</b>?</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={() => this.showModal(false)}>
							Close
						</Button>
						<Button bsStyle="primary" onClick={() => { onClick(); this.showModal(false)}}>
							Delete
						</Button>
					</Modal.Footer>
				</Modal>
				<div style={containerStyle}>
					<img height={height} width={width} src={image} style={imgStyle}/>
					<div style={textContainerStyle}>
						<p style={fileNameStyle}>{filename}</p>
						<div>
							<div onClick={() => this.showModal(true)} style={trashContainerStyle}>
								<Glyphicon glyph="trash"/>
							</div>
							<div style={fileSizeContainerStyle}>
								<p>{filesize(file.size)}</p>
							</div>
						</div>
					</div>
				</div>
			</Col>
		);
	}
};