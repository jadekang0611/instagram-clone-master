async function handleImageUpload(image) {
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'instagram-clone');
  data.append('cloud_name', 'dkn08dypf');
  const response = await fetch(
    'https://api.cloudinary.com/v1_1/dkn08dypf/image/upload',
    {
      method: 'POST',
      accept: 'application/json',
      body: data,
    }
  );
  const jsonResponse = await response.json();
  return jsonResponse.url;
}

export default handleImageUpload;
