import { useParams } from 'react-router-dom';
import useFetch from './useFetch';
import { useNavigate } from 'react-router-dom';

const BlogDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: blog, isPending, error } = useFetch(`http://localhost:8000/blogs/${id}`);
    const handleDelete = () => {
        fetch('http://localhost:8000/blogs/'+ blog.id ,{
            method:'DELETE'
        }).then(()=> {
            navigate('/')
        });
    }
    return ( <div className="blog-details">
        { isPending && <div>Loading...</div> }
        { blog && <article>
            <h2>{blog.title}</h2>
            <p>Written by {blog.author}</p>
            <div>{blog.body}</div>
            </article> }
        { error && <div>{error}</div> }
        <button onClick={handleDelete}>delete</button>
    </div> );
}
 
export default BlogDetails;