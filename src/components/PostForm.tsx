import React, { useState, ChangeEvent } from "react";
import Request from "../requests/request";
import IPostData from "../types/type";

function PostForm() {
    const initialPostState = {
        userId: null,
        id: null,
        title: "",
        body: "",
        };
        const [tutorial, setTutorial] = useState<IPostData>(initialPostState);
        const [submitted, setSubmitted] = useState<boolean>(false);
    
        const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });
        };
    
        const saveTutorial = () => {
        var data = {
            title: tutorial.title,
            body: tutorial.body,
        };
    
        Request.create(data)
            .then((response: any) => {
            setTutorial({
                id: response.data.id,
                title: response.data.title,
                body: response.data.body,
            });
            setSubmitted(true);
            console.log(response.data);
            })
            .catch((e: Error) => {
            console.log(e);
            });
        };
    
        const newTutorial = () => {
        setTutorial(initialPostState);
        setSubmitted(false);
        };
    
        return (
        <div className="submit-form">
            {submitted ? (
            <div>
                <h4>You submitted successfully!</h4>
                <button className="btn btn-success" onClick={newTutorial}>
                Add
                </button>
            </div>
            ) : (
            <div>
                <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    required
                    value={tutorial.title}
                    onChange={handleInputChange}
                    name="title"
                />
                </div>
    
                <div className="form-group">
                <label htmlFor="body">body</label>
                <input
                    type="text"
                    className="form-control"
                    id="body"
                    required
                    value={tutorial.body}
                    onChange={handleInputChange}
                    name="body"
                />
                </div>
    
                <button onClick={saveTutorial} className="btn btn-success">
                Submit
                </button>
            </div>
            )}
        </div>
        );
}

export default PostForm