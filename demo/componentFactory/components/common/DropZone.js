import accepts from 'attr-accept';
import React, { Component, PropTypes } from 'react';

export default class DropZone extends Component {
	static propTypes = {
		// Overriding drop behavior
		onDrop: PropTypes.func,
		onDropAccepted: PropTypes.func,
		onDropRejected: PropTypes.func,

		// Overriding drag behavior
		onDragStart: PropTypes.func,
		onDragEnter: PropTypes.func,
		onDragLeave: PropTypes.func,

		children: PropTypes.node, // Contents of the dropzone
		style: PropTypes.object, // CSS styles to apply
		activeStyle: PropTypes.object, // CSS styles to apply when drop will be accepted
		rejectStyle: PropTypes.object, // CSS styles to apply when drop will be rejected
		className: PropTypes.string, // Optional className
		activeClassName: PropTypes.string, // className for accepted state
		rejectClassName: PropTypes.string, // className for rejected state

		disablePreview: PropTypes.bool, // Enable/disable preview generation
		disableClick: PropTypes.bool, // Disallow clicking on the dropzone container to open file dialog

		inputProps: PropTypes.object, // Pass additional attributes to the <input type="file"/> tag
		multiple: PropTypes.bool, // Allow dropping multiple files
		accept: PropTypes.string, // Allow specific types of files. See https://github.com/okonet/attr-accept for more information
		name: PropTypes.string // name attribute for the input tag
	};


	static defaultProps = {
		disablePreview: false,
		disableClick: false,
		multiple: true
	};

	state = {
		isDragActive: false
	};

	componentDidMount() {
		this.enterCounter = 0;
	}

	onDragStart = (e) => {
		if (this.props.onDragStart) {
			this.props.onDragStart.call(this, e);
		}
	};

	onDragEnter = (e) => {
		const {onDragEnter} = this.props;

		e.preventDefault();

		// Count the dropzone and any children that are entered.
		++this.enterCounter;

		// This is tricky. During the drag even the dataTransfer.files is null
		// But Chrome implements some drag store, which is accesible via dataTransfer.items
		const dataTransferItems = e.dataTransfer && e.dataTransfer.items ? e.dataTransfer.items : [];

		// Now we need to convert the DataTransferList to Array
		const allFilesAccepted = this.allFilesAccepted(Array.prototype.slice.call(dataTransferItems));

		this.setState({
			isDragActive: allFilesAccepted,
			isDragReject: !allFilesAccepted
		});

		if (onDragEnter) {
			onDragEnter.call(this, e);
		}
	};

	onDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
		return false;
	};

	onDragLeave = (e) => {
		const {onDragLeave} = this.props;

		e.preventDefault();

		// Only deactivate once the dropzone and all children was left.
		if (--this.enterCounter > 0) {
			return;
		}

		this.setState({
			isDragActive: false,
			isDragReject: false
		});

		if (onDragLeave) {
			onDragLeave.call(this, e);
		}
	};

	onDrop = (e) => {
		const {onDrop, onDropAccepted, onDropRejected} = this.props;

		e.preventDefault();

		// Reset the counter along with the drag on a drop.
		this.enterCounter = 0;

		this.setState({
			isDragActive: false,
			isDragReject: false
		});

		const droppedFiles = e.dataTransfer ? e.dataTransfer.files : e.target.files;
		const max = this.props.multiple ? droppedFiles.length : Math.min(droppedFiles.length, 1);
		const files = [];

		for (let i = 0; i < max; i++) {
			const file = droppedFiles[i];
			// We might want to disable the preview creation to support big files
			if (!this.props.disablePreview) {
				file.preview = window.URL.createObjectURL(file);
			}

			files.push(file);
		}

		if (this.allFilesAccepted(files)) {
			if (onDrop) {
				onDrop.call(this, files, e);
			}

			if (onDropAccepted) {
				onDropAccepted.call(this, files, e);
			}
		} else {
			if (onDropRejected) {
				onDropRejected.call(this, files, e);
			}
		}
	};

	onClick = () => {
		if (!this.props.disableClick) {
			this.open();
		}
	};

	allFilesAccepted(files) {
		return files.every(file => accepts(file, this.props.accept));
	}

	open() {
		this.fileInputEl.value = null;
		this.fileInputEl.click();
	}

	render() {
		const {
			accept,
			activeClassName,
			inputProps,
			multiple,
			name,
			rejectClassName,
			...rest
		} = this.props;

		let {
			activeStyle,
			className,
			rejectStyle,
			style,
			...props // eslint-disable-line prefer-const
		} = rest;

		const {isDragActive, isDragReject} = this.state;

		className = className || '';

		if (isDragActive && activeClassName) {
			className += ' ' + activeClassName;
		}
		if (isDragReject && rejectClassName) {
			className += ' ' + rejectClassName;
		}

		if (!className && !style && !activeStyle && !rejectStyle) {
			style = {
				backgroundColor: "#fafafa",
				width: 'auto',
				borderWidth: 1,
				borderColor: '#757575',
				borderStyle: 'dashed',
				borderRadius: 2
			};
			activeStyle = {
				borderStyle: 'solid',
				backgroundColor: '#fafafa'
			};
			rejectStyle = {
				borderStyle: 'solid',
				backgroundColor: '#fafafa'
			};
		}

		let appliedStyle;
		if (activeStyle && isDragActive) {
			appliedStyle = {
				...style,
				...activeStyle
			};
		} else if (rejectStyle && isDragReject) {
			appliedStyle = {
				...style,
				...rejectStyle
			};
		} else {
			appliedStyle = {
				...style
			};
		}

		const inputAttributes = {
			accept,
			type: 'file',
			style: {display: 'none'},
			multiple: multiple,
			ref: el => this.fileInputEl = el, // eslint-disable-line
			onChange: this.onDrop
		};

		if (name && name.length) {
			inputAttributes.name = name;
		}

		// Remove custom properties before passing them to the wrapper div element
		const customProps = ['disablePreview', 'disableClick', 'onDropAccepted', 'onDropRejected'];
		const divProps = {...props};
		customProps.forEach(prop => delete divProps[prop]);

		return (
			<div
				className={className}
				style={appliedStyle}
				{...divProps/* expand user provided props first so event handlers are never overridden */}
				onClick={this.onClick}
				onDragStart={this.onDragStart}
				onDragEnter={this.onDragEnter}
				onDragOver={this.onDragOver}
				onDragLeave={this.onDragLeave}
				onDrop={this.onDrop}
			>
				{this.props.children}
				<input
					{...inputProps/* expand user provided inputProps first so inputAttributes override them */}
					{...inputAttributes}
					multiple/>
			</div>
		);
	}
}