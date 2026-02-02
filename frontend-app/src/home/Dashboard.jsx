import { Form, useNavigate } from "react-router-dom";
import './Dashboard.css'
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchBlog, setSearchBlog] = useState('');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:4545/blogPost/blogPost')
                const data = await response.json();
                if (data && data.blogPosts) {
                    setPosts(data.blogPosts)

                } else {
                    setPosts([]);
                }

                setLoading(false)

            } catch (error) {
                console.log('errore nel caricamento dei post', error);
                setPosts([]);
                setLoading(false);


            }
        }
        fetchPosts();
    }, []);
    if (loading) return <div className="loading"> Caricamento Dati.......
    </div>


    const DeletePost = async (blogId) => {
        const conferm = confirm('sei sicuro di volerlo eliminare????')

        if (conferm) {
            try {
                const response = await fetch(`http://localhost:4545/blogPost/${blogId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem('token')
                    }
                })
                if (response.ok) {
                    setPosts(posts => posts.filter(post => post._id !== id));
                       alert('Post elimiatocon successo')
                       window.location.reload();
                         
                } else {
                    alert('Errore durante leliminazione')
                }
            } catch (error) {
                console.log('errore', error.message)
            }

        }


    }

    const filteredBlog = posts.filter(post =>
        post.title.toLowerCase().includes(searchBlog.toLowerCase())
    );

    const handleCommentSubmit = async (postId, text, rate) => {

        try {
            const response = await fetch(`http://localhost:4545/blogPost/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('token')

                },
                body: JSON.stringify({
                    content: text,
                    rating: Number(rate)
                })

            })

            if (response.ok) {
                const result = await response.json();
                setPosts(prev => prev.map(p => p._id === postId ?
                    { ...p, comments: [...(p.comments || []), result.newComment] } : p
                ));
                const input = document.getElementById(`input-${postId}`);
                if (input) {
                    input.value = "";
                }
                alert('commento aggiunto');
            }
        } catch (error) {
            console.log('error');
        }
    }

    const handleDeleteComment = async (postId, commentId) => {
        try {
            const response = await fetch(`http://localhost:4545/blogPost/${postId}/comments/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer' + localStorage.getItem('token')
                }
            })
            if (response.ok) {
                setPosts(prevPosts => prevPosts.map(post => {
                    if (post._id === postId) {
                        return {
                            ...post,
                            comments: post.comments.filter(c => c._id !== commentId)

                        }
                    }
                    return post;
                }))

            }
        } catch (error) {
            console.error('errore', error)

        }

    }

    const handleCreatePost = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData();


        formData.append('title', form.title.value);
        formData.append('category', form.category.value);
        formData.append('content', form.content.value);
        formData.append('author', localStorage.getItem('userId'));

        if (form.cover.files[0]) {
            formData.append('cover', form.cover.files[0]);


        }

        try {
            const response = await fetch('http://localhost:4545/blogPost', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer' + localStorage.getItem('token')

                },
                body: formData

            });

            if (response.ok) {
                const newPost = await response.json()
                setPosts((prev) => [newPost, ...prev])
                window.location.reload();
                alert('post creato con successo');

            } else {
                const error = await response.json();
                console.error('errore del server', error);
            }
        } catch (error) {
            console.error('errore durante la creazione', error)
            alert('ilserver dice ' + error.message);
        }
    }



    return (
        <div className="container-wrapper ">
            <div className="searchContainer">
                <input
                    placeholder="Cerca un Blog"
                    type="text"
                    onChange={(e) => setSearchBlog(e.target.value)} />
            </div>

            <div className="container mt-4 mb-4">
                <button type='button'
                    className="btn btn-success"
                    data-bs-toggle='modal'
                    data-bs-target='#createPostModal'>
                    CREA NUOVO POST

                </button>

            </div>
            <header className="home-header">
                <h1>I migliori Blog di sempre</h1>
                <p>Scopri e recensisci i sapori della citta'</p>
            </header>
            <div className="posts-grid">
                {filteredBlog.map((post) => (
                    <div key={post._id} className="resturant-card  border border-4 ">
                        <img src={post.cover} alt={post.title} className="card-image w-100 " />
                        <div className="card-body p-3">
                            <span className="category ">{post.category}</span>
                            <h3 className=" text-center ">{post.title}</h3>
                            <p>{post.content.substring(0, 50)}....</p>
                            <div className="card-footer ">
                                <span>tempo di lettura: {post.readTime?.value}
                                    {post.readTime.unit}
                                </span>
                                <div className="comments-display-section">
                                    <h6 className="mt-3">Commenti ({post.comments?.length || 0})</h6>
                                    <div className="comments-list-container">
                                        {post.comments && post.comments.map((comment, index) => (
                                            <div key={index} className="comment-bubble" >
                                                <div className="comment-header d-flex justify-content-between">
                                                    <small className="user-name">Utente :</small>
                                                    <small className="text-warnig">
                                                        {"★".repeat(Number(comment.rating) || 0)}
                                                        {"☆".repeat(5 - (Number(comment.rating) || 0))}
                                                    </small>
                                                </div>
                                                <p className="comment-text">{comment.content}</p>
                                                <button
                                                    className="btn btn-sm text-danger"
                                                    onClick={() => handleDeleteComment(post._id, comment._id)}
                                                >
                                                    CANCELLA

                                                </button>

                                            </div>

                                        ))}

                                    </div>

                                </div>


                                <hr />

                                <div className="add-comment-section mt-3">
                                    <select
                                        name=""
                                        id={`rate-${post._id}`}
                                        className="form-select form-select-sm mb-2"
                                        defaultValue='5'
                                    >
                                        <option value="1"> ★</option>
                                        <option value="2"> ★★</option>
                                        <option value="3"> ★★★</option>
                                        <option value="4"> ★★★★</option>
                                        <option value="5"> ★★★★★</option>

                                    </select>
                                    <input
                                        type="text"
                                        placeholder="aggiungi commento"
                                        className="form-control form-control-sm"
                                        id={`input-${post._id}`}
                                    />
                                    <button
                                        className="btn btn-primary btn-sm mt-2 w-100"
                                        onClick={() => {
                                            const commentText = document.getElementById(`input-${post._id}`).value;
                                            const votoVal = document.getElementById(`rate-${post._id}`).value;
                                            handleCommentSubmit(post._id, commentText, votoVal);

                                        }}
                                    >
                                        COMMENTA
                                    </button>
                                </div>

                                <button className="btn btn-button-delete btn-danger d-flex align-items-center justify-content-center mt-3" onClick={() => DeletePost(post._id)}>CANCELLA POST</button>

                            </div>

                        </div>

                    </div>

                ))
                }
            </div>
            <div className="modal fade" id="createPostModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-dark text-white border-secondary">
                        <div className="modal-header border-secondary">
                            <h5 className="modal-title">Pubblica un nuovo BLOG</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <form onSubmit={handleCreatePost}>
                            <div className="modal-body">
                                <input name="title" className="form-control mb-3" placeholder="Titolo" required />
                                <input name="category" className="form-control mb-3" placeholder="Categoria" required />
                                <textarea name="content" className="form-control mb-3" placeholder="Contenuto del post" rows="4" required></textarea>

                                <label className="form-label small">Immagine di copertina (Cloudinary)</label>
                                <input name="cover" type="file" className="form-control mb-3" required />
                            </div>
                            <div className="modal-footer border-secondary">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annulla</button>
                                <button type="submit" className="btn btn-primary">Pubblica ora</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home

