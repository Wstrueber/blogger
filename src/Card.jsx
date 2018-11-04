import React, { Component, Fragment } from 'react';
import uuid from 'uuid/v4';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            titleShow: false,
            body: '',
            bodyShow: false,
            showBlogs: false,
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handleBody = this.handleBody.bind(this);
        this.removeBlog = this.removeBlog.bind(this);
        this.showBlogs = this.showBlogs.bind(this);
    }
    handleTitle(e) {
        this.setState({ title: e.target.value })
    }
    handleBody(e) {
        this.setState({ body: e.target.value })
    }
    handleForm(e) {
        if (this.state.title.length < 1) alert('Title: minimum 1 character required')
        else if (this.state.title.length > 40) alert('Title: 40 characters or less required')
        else if (this.state.body.length < 1) alert('Body: minimum 1 character required');
        else if (this.state.title && this.state.body) {
            localStorage.setItem(this.state.title, this.state.body);
            this.setState({ title: '', body: '' })
        } else {
            alert('Both are fields required!');
        }
        e.preventDefault();
    }
    showBlogs() {
        if (!this.state.showBlogs) {
            this.setState({ showBlogs: true, titleShow: true, bodyShow: true })
        } else {
            this.setState({ showBlogs: false, titleShow: false, bodyShow: false })
        }
    }
    removeBlog(e) {
        let targetClass = e.target.parentNode;
        if (localStorage.getItem(targetClass.className)) {
            localStorage.removeItem(targetClass.className);
        }
        targetClass.hidden = true;
    }

    render() {
        return (
            <div>
                <div>

                    <header>
                        <h1>Blogger</h1>
                    </header>
                </div>

                <span>Title: </span>
                <input value={this.state.title}
                    onChange={this.handleTitle} type="text"></input>

                <div className="text_area_div">
                    <textarea className="text_area" placeholder="Write your blog here" value={this.state.body}
                        style={{ margin: '0px', height: '252px', width: '525px' }}
                        onChange={this.handleBody} type="text"></textarea>
                    <button id="publish"
                        onClick={this.handleForm}>Publish</button>
                </div>
                <div>
                    {this.state.showBlogs ? <button id="blog_visibility" onClick={this.showBlogs}>Hide Blogs</button>
                        : <button id="blog_visibility" onClick={this.showBlogs}>Show Blogs</button>}
                </div>



                {this.state.bodyShow && this.state.titleShow ?
                    <div className="blog_container">
                        <div className="blog_body">
                            {displayLS().map(x =>
                                <Fragment key={uuid().slice(0, 8)}>
                                    <div className={x[0]} hidden={false} key={uuid().slice(0, 8)}>
                                        <h1 key={uuid().slice(0, 8)}>{x[0]}</h1>
                                        <p key={uuid().slice(0, 8)}>{x[1]}</p>
                                        <button className="remove_btns" key={uuid().slice(0, 8)} onClick={this.removeBlog}>Remove</button>
                                    </div>
                                </Fragment>
                            )}
                        </div>
                    </div> : null}

            </div>
        )
    }
}

const displayLS = () => {

    let obj = Object.keys(localStorage)
    let arr = [];
    for (let i = 0; i < obj.length; i++) {
        arr.push([obj[i], localStorage.getItem(obj[i])]);
    }
    console.log(arr)
    return arr;
}

export default Card;