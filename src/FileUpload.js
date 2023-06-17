import React, { useState } from 'react';
// import axios from 'axios';

const FileUpload = ({ onRenderFile }) => {
  const [file, setFile] = useState();
  const [imageURL, setImageURL] = useState('');

  const handleFile = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setImageURL(url);
  };
 
  const handleRender = (event) => {
    event.preventDefault();
    if (imageURL) {
      onRenderFile(imageURL);
    } else {
      console.error('No file selected');
    }
  };

  const handleApi = () => {
     /*
      const formData = new FormData();
      formData.append('size', 'auto');
      formData.append('image_url', 'htps://images.unsplash.com/photo-1685714630051-9d231fb96992?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1937&q=80');

      axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          
          'X-Api-Key': 'wYj4CmzTa1CJX2YVsCZdnsZq',
        },
        encoding: null,
      })
        .then((response) => {
          if (response.status !== 200) {
            console.error('Error:', response.status, response.statusText);
            return;
          }
          console.log(response)
          const imageUrl = URL.createObjectURL(new Blob([response.data]));
          onRenderFile(imageUrl);
        })
        .catch((error) => {
          console.error('Request failed:', error);
        });
        */
        const formData = new FormData();
        formData.append('image_file', file);
        formData.append('size', 'auto');
        const apikey='MHrc5yA7LXhirFnEzhMZwxLE'
        fetch('https://api.remove.bg/v1.0/removebg',{
          method:'POST',
          headers:{
            'X-Api-Key': apikey,
          },
          body:formData
        })
        .then(function(response){
          return response.blob();
        })
        .then(function(blob){
          console.log(blob)  
          const img_url=URL.createObjectURL(blob);
          const img=document.createElement('img')
          img.src=img_url;
          document.body.appendChild(img);


        })
        .catch(function (error) {
          console.error('Request failed:', error);
        });
       
  };
  return (
    <div>
      <h2>Choose file</h2>
      <form onSubmit={handleRender} action="">
        <input type="file" name="file" onChange={handleFile} />
        <button>Render</button>
      </form>
      <button onClick={handleApi}>Remove Background</button>
    </div>
  );
};

export default FileUpload;
