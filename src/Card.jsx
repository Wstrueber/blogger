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
        }
        this.handleTitle = this.handleTitle.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.handleBody = this.handleBody.bind(this);
        this.removeBlog = this.removeBlog.bind(this);
    }
    handleTitle(e) {
        this.setState({ title: e.target.value })
    }
    handleBody(e) {
        this.setState({ body: e.target.value })
    }
    handleForm(e) {
        e.preventDefault();
        localStorage.setItem(this.state.title, this.state.body);
        this.setState({ title: '', body: '', titleShow: true, bodyShow: true })
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
                    <span>Title: </span><input value={this.state.title}
                        onChange={this.handleTitle} type="text"></input>
                </div>
                <div>
                    <textarea value={this.state.body}
                        style={{ margin: '0px', height: '252px', width: '525px' }}
                        onChange={this.handleBody} type="text"></textarea>
                </div>
                <button style={{ marginLeft: '484px' }}
                    onClick={this.handleForm}>Submit</button>

                {this.state.bodyShow && this.state.titleShow ?
                    <div className="blog_container">
                        <div className="blog_body">
                            {displayLS().map(x =>
                                <Fragment key={uuid().slice(0, 8)}>
                                    <div className={x[0]} hidden={false} key={uuid().slice(0, 8)}>
                                        <h1 key={uuid().slice(0, 8)}>{x[0]}</h1>
                                        <p key={uuid().slice(0, 8)}>{x[1]}</p>
                                        {/* <div className="remove_btns" key={uuid().slice(0, 8)}> */}
                                        <button className="remove_btns" key={uuid().slice(0, 8)} onClick={this.removeBlog}>Remove</button>
                                        {/* </div> */}
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
    for (let i = 1; i < obj.length; i++) {
        arr.push([obj[i], localStorage.getItem(obj[i])]);
    }
    console.log(arr)
    return arr;
}

export default Card;