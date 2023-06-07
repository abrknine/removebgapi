import React, { useState } from 'react'
import axios from 'axios';

// wYj4CmzTa1CJX2YVsCZdnsZq

const FileUpload = ({ onRenderFile }) => {
    const [file,setFile]=useState();
    const [imageURL, setImageURL] = useState('');

    const handleFile = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        const url = URL.createObjectURL(selectedFile);
        setImageURL(url);
      };
      
  /*  const handleupload=()=>{
        const formData=new formData()
        formData.append('file',file)
        fetch('url',{
            method:"POST",
            body:formData
        }).then((response)=>response.json()).then((result)=>{console.log('success',result)}
        ).catch(error=>{
            console.error("Error",error)
        })
    }*/

    const handlerender=(event)=>{
        event.preventDefault();
        if (imageURL) {
            onRenderFile(imageURL);
          } else {
            console.error('No file selected');
          }
    }
    const handleApi = () => {
      if (file) {
        const formData = new FormData();
        formData.append('size', 'auto');
        formData.append('image', file);
  
        axios({
          method: 'post',
          url: 'https://api.remove.bg/v1.0/removebg',
          data: formData,
          responseType: 'arraybuffer',
          headers: {
            'X-Api-Key': 'wYj4CmzTa1CJX2YVsCZdnsZq',
            // ...formData.getHeaders(),
          },
          encoding: null,
        })
          .then((response) => {
            if (response.status !== 200) {
              console.error('Error:', response.status, response.statusText);
              return;
            }
            const imageUrl = URL.createObjectURL(new Blob([response.data]));
            onRenderFile(imageUrl);
          })
          .catch((error) => {
            console.error('Request failed:', error);
          });
      } else {
        console.error('No file selected');
      }
    };

  return (
    <div>
       <h2>Choose file</h2>
       <form onSubmit={handlerender}  action="">
        <input type="file" name="file" onChange={handleFile} />
        <button>render</button>
       </form>
       <button onClick={handleApi}>remove background</button>
    </div>
  )
}

export default FileUpload
