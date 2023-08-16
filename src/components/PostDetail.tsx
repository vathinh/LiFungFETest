import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import Request from "../requests/request";
import IPostData from "../types/type";

function PostDetail() {
    const { id }= useParams();
    let navigate = useNavigate();

    const initialPostState = {
        userId: null,
        id: null,
        title: "",
        body: ""
    };
    const [currentPost, setCurrentPost] = useState<IPostData>(initialPostState);
    const [message, setMessage] = useState<string>("");

    const getTutorial = (id: string) => {
        Request.get(id)
        .then((response: any) => {
            setCurrentPost(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    useEffect(() => {
        if (id)
        getTutorial(id);
    }, [id]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setCurrentPost({ ...currentPost, [name]: value });
    };

    const updatePublished = () => {
        var data = {
        id: currentPost.id,
        title: currentPost.title,
        body: currentPost.body,
        };

        Request.update(currentPost.id, data)
        .then((response: any) => {
            console.log(response.data);
            setCurrentPost({ ...currentPost });
            setMessage("The status was updated successfully!");
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    const updateTutorial = () => {
        Request.update(currentPost.id, currentPost)
        .then((response: any) => {
            console.log(response.data);
            setMessage("The tutorial was updated successfully!");
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    const deleteTutorial = () => {
        Request.remove(currentPost.id)
        .then((response: any) => {
            console.log(response.data);
            navigate("/tutorials");
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    return (
        <div>
        {currentPost ? (
            <div className="edit-form">
            <h4>Tutorial</h4>
            <form>
                <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={currentPost.title}
                    onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                <label htmlFor="body">Body</label>
                <input
                    type="text"
                    className="form-control"
                    id="body"
                    name="body"
                    value={currentPost.body}
                    onChange={handleInputChange}
                />
                </div>
            </form>

            {currentPost.body ? (
                <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished()}
                >
                UnPublish
                </button>
            ) : (
                <button
                className="badge badge-primary mr-2"
                onClick={() => updatePublished()}
                >
                Publish
                </button>
            )}

            <button className="badge badge-danger mr-2" onClick={deleteTutorial}>
                Delete
            </button>

            <button
                type="submit"
                className="badge badge-success"
                onClick={updateTutorial}
            >
                Update
            </button>
            <p>{message}</p>
            </div>
        ) : (
            <div>
            <br />
            <p>Please click on a Tutorial...</p>
            </div>
        )}
        </div>
    )
}

export default PostDetail