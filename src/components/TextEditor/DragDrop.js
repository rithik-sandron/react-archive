import React, { Component } from 'react';
import './DragDrop.css';
import axios from 'axios';
import { encrypt } from '../AES/aesUtils';

class DragDrop extends Component {

    constructor(props) {
        super();
        this.dropRef = React.createRef();
        this.encrypt = encrypt.bind(this);
    }

    state = {
        files: [],
        fileUploadIteration: 0,
        invalid: false
    }

    handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragIn = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDragOut = (e) => {
        e.preventDefault()
        e.stopPropagation()
    }

    handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(this.state.fileUploadIteration > 0)
            return;
        let files = e.dataTransfer.files;
        console.log(e);
        let allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        for (let i = 0; i < files.length; i++) {
            if (!allowedExtensions.exec(files[i].name)) {
                this.setState({ invalid: true });
                return;
            }
        }

        if (this.state.invalid)
            this.setState({ invalid: false });
        if (files && files.length > 0) {

            let fileList = this.state.files;
            for (let i = 0; i < files.length; i++)
                fileList.push(files[i]);
            this.setState({ files: fileList })
            let formData = new FormData();
            this.state.files.map(file => formData.append('file', file));
            axios({
                method: 'post',
                url: '/upload',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then(res => {
                let count = this.state.fileUploadIteration;
                this.setState({fileUploadIteration: count + 1})
                console.log(res.data);
            });
        }
    }

    componentDidMount() {
        let div = this.dropRef.current
        div.addEventListener('dragenter', this.handleDragIn)
        div.addEventListener('dragleave', this.handleDragOut)
        div.addEventListener('dragover', this.handleDrag)
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current
        div.removeEventListener('dragenter', this.handleDragIn)
        div.removeEventListener('dragleave', this.handleDragOut)
        div.removeEventListener('dragover', this.handleDrag)
        div.removeEventListener('drop', this.handleDrop)
    }

    handleClick = () => {

    }

    render() {
        return (
            <div className="drag" ref={this.dropRef}>
                {console.log(this.state.invalid)}
                <div className="drop">
                    {this.state.files.map(file =>
                        <div key={file.name.toString()}>{file.name}</div>
                    )}
                    {this.state.invalid ? <div style={{ color: "red" }}>
                        <h2>Invalid file type</h2>
                        <span>accepts only images and gifs</span></div> : null}
                </div>
            </div>
        )
    }
}

export default DragDrop


