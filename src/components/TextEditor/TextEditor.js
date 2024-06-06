import React, { Component } from 'react';
import './TextEditor.css'
// import axios from 'axios';
import Markdown from 'react-markdown';
import gfm from 'remark-gfm';
import DragDrop from './DragDrop'

class TextEditor extends Component {

    state = {
        title: '',
        post: '',
        height: '',
    }

    onChange = (event) => {
        let data = this.state.post;
        data = event.target.value;
        // let allowedExtensions = /(#)$/i;
        // if (allowedExtensions.exec(data))
        //     data = '<h1>' + data + '</h1>';
        this.setState({ post: data });
    }

    onChangeTitle = (event) => {
        let data = this.state.title;
        data = event.target.value;
        this.setState({ title: data });
        let height = document.getElementById('textarea').scrollHeight - 35 + 'px';
        document.getElementById('textarea').style.height = height;
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log('hello');
    }

    onKeyUp = (event) => {
        var element = typeof event === 'object' ? event.target : document.getElementById(event);
        var scrollHeight = element.scrollHeight - 50;
        element.style.height = scrollHeight + "px";
    }

    // keyPress = (e) => {
    //     let data = this.state.post;
    //     var key = window.event.keyCode;
    //      // If the user has pressed enter
    //      if (key === 13) {
    //         data = data + '<br/>';
    //     }
    //     this.setState({post: data})
    // };

    render() {
        return (
            localStorage.length > 1 ?


                (<div className="textEditor container">
                    <DragDrop />
                    <form onSubmit={this.onSubmit}>
                        <button type="submit" onSubmit={this.handleSubmit} className="button">Post</button>
                        <label>Actual text</label>
                        <textarea className='editor' value={this.state.post} id='textarea'
                            onKeyPress={this.keyPress}
                            onKeyUp={(event) => this.onKeyUp(event)}
                            rows={this.state.height}
                            onChange={this.onChange} />
                        <br />
                        <label>Preview</label>
                        {/* <div dangerouslySetInnerHTML={{ __html: this.state.post }} /> */}
                        <Markdown className="editor markdown" plugins={[gfm]} children={this.state.post} />
                    </form>

                    <div>
                        <img alt="" src="D:\uploads\kratos-god-of-war-5k-ks.jpg" />
                    </div>
                </div>)
                : null
        );
    }
}

export default TextEditor;