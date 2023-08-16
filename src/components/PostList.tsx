import React, { useState, useEffect, ChangeEvent } from "react";
import Request from "../requests/request";
import { Link } from "react-router-dom";
import IPostData from '../types/type';

function PostList() {
    const [posts, setPosts] = useState<Array<IPostData>>([]);
    const [currentPost, setCurrentPost] = useState<IPostData | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [searchTitle, setSearchTitle] = useState<string>("");

    useEffect(() => {
        retrieveposts();
    }, []);

    const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const retrieveposts = () => {
        Request.getAll()
        .then((response: any) => {
            setPosts(response.data);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    const refreshList = () => {
        retrieveposts();
        setCurrentPost(null);
        setCurrentIndex(-1);
    };

    const setActivePost = (tutorial: IPostData, index: number) => {
        setCurrentPost(tutorial);
        setCurrentIndex(index);
    };

    const removeAllposts = () => {
        Request.removeAll()
        .then((response: any) => {
            console.log(response.data);
            refreshList();
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    const findByTitle = () => {
        Request.findByTitle(searchTitle)
        .then((response: any) => {
            setPosts(response.data);
            setCurrentPost(null);
            setCurrentIndex(-1);
            console.log(response.data);
        })
        .catch((e: Error) => {
            console.log(e);
        });
    };

    return (
        <div className="list row">
        <div className="col-md-8">
            <div className="input-group mb-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
                <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}
                >
                Search
                </button>
            </div>
            </div>
        </div>
        <div className="col-md-6">
            <h4>Posts List</h4>

            <ul className="list-group">
            {posts &&
                posts.map((tutorial, index) => (
                <li
                    className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActivePost(tutorial, index)}
                    key={index}
                >
                    {tutorial.title}
                </li>
                ))}
            </ul>

            <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllposts}
            >
            Remove All
            </button>
        </div>
        <div className="col-md-6">
            {currentPost ? (
            <div>
                <h4>Post</h4>
                <div>
                <label>
                    <strong>Title:</strong>
                </label>{" "}
                {currentPost.title}
                </div>
                <div>
                <label>
                    <strong>Body:</strong>
                </label>{" "}
                {currentPost.body}
                </div>
                <Link
                to={"/posts/" + currentPost.id}
                className="m-3 btn btn-sm btn-warning"
                >
                Edit
                </Link>
            </div>
            ) : (
            <div>
                <br />
                <p>Please click on a Post...</p>
            </div>
            )}
        </div>
        </div>
    );
}

export default PostList;
