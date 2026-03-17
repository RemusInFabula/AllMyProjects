import { useState } from "react";
import {useNavigate} from 'react-router-dom';

const Create = () => {
  const [title,setTitle] = useState();
  const [body,setBody] = useState();
  const [author,setAuthor] = useState('mario');
  const [isPending,setIsPending] = useState(false);
  const history = useNavigate();
  const handleSubmit = (e) => {
    setIsPending(true);
    e.preventDefault();
    const blog = {title,body,author};
    fetch ('http://localhost:8000/blogs',{
      method:'POST',
      headers:{"Content-Type": "application/json"},
      body:JSON.stringify(blog)
    }).then(()=> {
      console.log('new blog added');
      setIsPending(false);
      history('/');
    })
  }
  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form>
        <label>Blog Title:</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}/>
        <label>Blog Body:</label>
        <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
        <label>Author:</label>
        <select value={author} onChange={(e)=>setAuthor(e.target.value)}>
          <option value='mario'>mario</option>
          <option value='yoshi'>yoshi</option>
        </select>
        <p>{title}</p>
        <p>{body}</p>
        <p>{author}</p>
        {!isPending && <button onClick={handleSubmit}>Add Blog</button>}
        {isPending && <button disabled onClick={handleSubmit}>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
