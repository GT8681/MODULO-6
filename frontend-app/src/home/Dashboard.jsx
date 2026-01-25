import { Form, useNavigate } from "react-router-dom";
import './Dashboard.css'
import React, {useState,useEffect} from 'react'
import { Link } from "react-router-dom";

const Home = () =>{
    const [posts,setPosts] = useState([]);
    const [loading,setLosding] = useState(true);

    useEffect(() => {
        const fetchPosts = async () =>{
            try {
                const response = await fetch('http://localhost:4545/blogPost')
                const data =n await response.json();
                setPosts(data)
                setLosding(false)

            } catch (error) {
                console.log('errore nel caricamento dei post',error);
               
                
            }
        }
        fetchPosts();
    },[]);
if(loading) return <div className="loading"> Caricamento Dati....... </div>

return (
    <div className="home-container">
        <header className="home-header">
            <h1>I migliori ristorant</h1>
            <p>scopri e recensisci i sapori della citta'</p>
        </header>
        <div className="posts-grid">
             {
                posts.map((post) => (
                    <div key={post._id} className="resturant-card">
                        <img src={post.cover} alt={post.title} className="card-image"/>
                        <div className="card-body">
                            <span className="category">{post.category}</span>
                            <h3>{post.title}</h3>
                            <p>{post.content.substring(0,100)}....</p>
                            <div className="card-footer">
                                <span>tempo di lettura: {post.readTime.valie}
                                    {post.readTime.unit}
                                </span>
                                <Link to={`/blogPost/${post._id}`} className="read-more">Vedi dettagli
                                </Link>

                            </div>

                        </div>

                    </div>

                ))
             }
        </div>

    </div>
)
}
export default Home