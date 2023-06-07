const PORT =8000;
const  express =require('express')
const  cors =require('cors')
const app =express();
app.use(express.json())
app.use(cors())
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');



app.get('/remove-background', async (req, res) => {
    try {
      const formData = new FormData();
      formData.append('size', 'auto');
      formData.append('image_url', 'https://www.remove.bg/example.jpg');
  
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        responseType: 'arraybuffer',
        headers: {
          ...formData.getHeaders(),
          'X-Api-Key': 'wYj4CmzTa1CJX2YVsCZdnsZq',
        },
        encoding: null,
      });
  
      if (response.status !== 200) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      fs.writeFileSync('no-bg.png', response.data);
  
      res.status(200).json({ message: 'Image background removed successfully' });
    }
    
    catch (error) {
      console.error('Request failed:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  });













app.listen(PORT,()=>console.log('Your server is running on PORT'+PORT))