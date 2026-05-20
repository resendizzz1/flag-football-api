import { useState } from 'react';

function UploadReel() {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('video', file);

    // Aquí llamarás a tu API de AWS/Flask
    const response = await fetch('http://32.192.210.196/api/videos/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (response.ok) alert('¡Video subido con éxito!');
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-900 text-white rounded-lg">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit" className="bg-blue-600 px-4 py-2 rounded">Subir Reel</button>
    </form>
  );
}

export default UploadReel;