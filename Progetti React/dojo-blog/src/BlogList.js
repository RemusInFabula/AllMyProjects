import { useState } from "react";
import { Link } from "react-router-dom";
const BlogList = (props) => {
    const blogs = props.blogs;
    const title = props.title;
    const handleDelete = props.handleDelete;
    const [name, setName] = useState('mario');
    return ( <div className="BlogList">
        {title && <h2>{title}</h2>}
        {blogs.map((blog) => (
                <div className="blog-preview" key={blog.id}>
                    <Link to={`/details/${blog.id}`}>
                        <h2>{blog.title}</h2>
                        <p>Written by {blog.author}</p>
                    </Link>
                </div>
            ))}
    </div> );
}
export default BlogList;