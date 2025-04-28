import React, { useState } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { callFashionBuddyImages } from '../api';

type Props = {
  setResults: (results: string | null) => void;
  setLoading: (loading: boolean) => void;
};

const ImageUpload: React.FC<Props> = ({ setResults, setLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };


const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    if (!file) {
      setLoading(false);
      return;
    }
  
    try {
      const uploadForm = new FormData();
      uploadForm.append('file', file);
  
      const uploadRes = await fetch('/api/v1/files/upload/d733f395-0619-4c6c-8d6f-8a18e550ef32?stream=false', {
        method: 'POST',
        headers: {
          "x-api-key": import.meta.env.VITE_LANGFLOW_API_KEY
        },
        body: uploadForm,
      });
      if (!uploadRes.ok) throw new Error('File upload failed');
      const uploadData = await uploadRes.json();
  
      // Adjust this based on your API's response structure
      const filePath = uploadData.file_path || uploadData.path || uploadData.filename;
      if (!filePath) throw new Error('No file path returned from upload API');
  
      const data = await callFashionBuddyImages(filePath);
      console.log('Image API Response: ', data.outputs[0].outputs[0].outputs.message.message);
      const response = data.outputs[0].outputs[0].outputs.message.message;
      setResults(response);
    } catch (err) {
      setResults('');
      alert('Error: ' + (err as Error).message);
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface p-8 rounded-xl shadow-soft flex flex-col items-center space-y-6 border border-taupe"
    >
      <label className="w-full flex flex-col items-center cursor-pointer">
        <div className="flex flex-col items-center justify-center w-full h-32 bg-nude rounded-xl border-2 border-dashed border-taupe hover:border-brown transition-all">
          <HiOutlineUpload className="text-3xl text-brown mb-2" />
          <span className="text-brown font-medium">Click to upload or drag an image</span>
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </div>
      </label>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-xl shadow-soft border-2 border-peach animate-fadein"
          style={{ animation: 'fadein 0.5s' }}
        />
      )}
      <button
        type="submit"
        className="bg-brown text-offwhite px-8 py-3 rounded-full text-lg font-semibold shadow-soft transition-all hover:bg-accent disabled:opacity-50"
        disabled={!file}
      >
        Get Suggestions
      </button>
    </form>
  );
};

export default ImageUpload; 