import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './createPost.css'
import { Navigate } from 'react-router-dom';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

const CreatePost = () => {
    // const [username, setUsername] = useState('');
    const [Title, setTitle] = useState(''); 
    const [Summary, setSummary] = useState('');
    const [Description, setDescription] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);
    async function createNewPost(ev){
      const data = new FormData();
      data.set('Title', Title);
      data.set('Summary', Summary);
      data.set('Description', Description);
      data.set('file', files[0]);
      ev.preventDefault();
      const response = await fetch('http://localhost:4000/post', {
        method: 'POST',
        body: data,
      })
      if (response.ok){
        console.log('Post created successfully');
        setRedirect(true);
      }
      console.log(await response.json());
    }
    if(redirect){
      return <Navigate to='/'/>
    }
  return (
    <div className='form_wrapper'>
    <form className='create_form form' action=""  onSubmit={createNewPost}>
      <div className='create_form_input_wrapper'>
        <div>
          <div>
            <label>Title</label><br/>
            <input type="text" placeholder="Title" value={Title} onChange={e => setTitle(e.target.value)}/>
          </div>
          <div>
            <label>Summary</label><br/>
            <input className='summary' type="text" placeholder="Summary" value={Summary} onChange={e=> setSummary(e.target.value)}/>
          </div>
          <div>
            <label>Description</label><br/>
            <ReactQuill value={Description} onChange={setDescription} formats={formats} modules={modules}/>
          </div>
        </div>
        <div>
          <input type="file" name="file" id="file" class="inputfile" onChange={e => setFiles(e.target.files)} />
        </div>
      </div>
      <button type='submit'><span>Create Post</span></button>
    </form>
  </div>
  )
}

export default CreatePost
