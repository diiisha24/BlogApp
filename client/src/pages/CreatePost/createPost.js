import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './createPost.css'

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
  return (
    <div className='form_wrapper'>
    <form className='create_form form' action="">
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
          <input type="file" name="file" id="file" class="inputfile" />
        </div>
      </div>
      <button><span>Create Post</span></button>
    </form>
  </div>
  )
}

export default CreatePost
