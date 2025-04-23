import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './createPost.css';
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function createNewPost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);

    if (files && files.length > 0) {
      data.set('file', files[0]);
    }

    try {
      // const response = await fetch('https://dee-blog-app-api.vercel.app/post', {
        const response = await fetch('http://localhost:4000/post', {
      // const response = await fetch(' https://blog-9m08rqmhi-disha-gargs-projects.vercel.app/post', {
        method: 'POST',
        body: data,
        credentials: 'include'
      });

      if (response.ok) {
        console.log('Post created successfully');
        alert('Post created successfully');
        setRedirect(true);
      } else {
        const errorText = await response.text();
        console.error('Error creating post:', errorText);
        alert('Error creating post: ' + errorText);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error: ' + error.message);
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className='form_wrapper'>
      <form className='create_form form' onSubmit={createNewPost}>
        <div className='create_form_input_wrapper'>
          <div>
            <div>
              <label>Title</label><br />
              <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            </div>
            <div>
              <label>Summary</label><br />
              <input className='summary' type="text" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />
            </div>
            <div>
              <label>Content</label><br />
              <ReactQuill value={content} onChange={setContent} formats={formats} modules={modules} />
            </div>
          </div>
          <div>
            <input type="file" name="file" id="file" className="inputfile" onChange={e => setFiles(e.target.files)} />
          </div>
        </div>
        <button className='button' type='submit'><span>Create Post</span></button>
      </form>
    </div>
  );
};

export default CreatePost;
