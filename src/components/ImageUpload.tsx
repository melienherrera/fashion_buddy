import React, { useState, useEffect } from 'react';
import { HiOutlineUpload } from 'react-icons/hi';
import { callFashionBuddyImages } from '../api';
import toast from 'react-hot-toast';

// Loading messages sequence
const LOADING_MESSAGES = [
  { message: "👀 Taking a good look at that style...", duration: 4000 },
  { message: "🔍 Searching the fashion universe for matches...", duration: 4000 },
  { message: "✨ Sprinkling some fashion magic...", duration: 4000 },
  { message: "👕 Handpicking the perfect pieces...", duration: 4000 },
  { message: "🎨 Adding the finishing touches...", duration: 4000 }
];

type Props = {
  setResults: (results: string | null) => void;
  setLoading: (loading: boolean) => void;
};

type Gender = 'Men' | 'Women' | 'All';

const ImageUpload: React.FC<Props> = ({ setResults, setLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<Gender>('All');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith('image/')) {
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        toast.success('Image uploaded successfully! 📸');
      } else {
        toast.error('Please upload an image file');
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith('image/')) {
        setFile(droppedFile);
        setPreview(URL.createObjectURL(droppedFile));
        toast.success('Image uploaded successfully! 📸');
      } else {
        toast.error('Please upload an image file');
      }
    }
  };

  const handleGenderChange = (gender: Gender) => {
    setSelectedGender(gender);
    toast.success(`Selected ${gender}'s fashion`);
  };

  // Function to show loading messages in sequence
  const showLoadingSequence = () => {
    LOADING_MESSAGES.forEach(({ message, duration }, index) => {
      setTimeout(() => {
        toast(message, {
          duration: duration,
          icon: '⏳',
          style: {
            background: '#F7F6F3',
            color: '#4B2E2B',
            border: '1px solid #F8E1D9',
          },
        });
      }, index * duration);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    if (!file) {
      setLoading(false);
      return;
    }
  
    // Start the loading message sequence
    showLoadingSequence();
    
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
  
      const filePath = uploadData.file_path || uploadData.path || uploadData.filename;
      if (!filePath) throw new Error('No file path returned from upload API');
  
      const data = await callFashionBuddyImages(filePath, selectedGender);
      const response = data.outputs[0].outputs[0].outputs.message.message;
      setResults(response);
      toast.success('✨ Your personalized fashion suggestions are ready!', {
        duration: 4000,
        style: {
          background: '#F7F6F3',
          color: '#4B2E2B',
          border: '1px solid #F8E1D9',
        },
      });
    } catch (err) {
      setResults('');
      toast.error(`Error: ${(err as Error).message}`, {
        duration: 4000,
        style: {
          background: '#F7F6F3',
          color: '#4B2E2B',
          border: '1px solid #F8E1D9',
        },
      });
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface p-8 rounded-xl shadow-soft flex flex-col items-center space-y-6 border border-taupe"
    >
      <label 
        className="w-full flex flex-col items-center cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        htmlFor="file-upload"
      >
        <div className={`flex flex-col items-center justify-center w-full h-32 bg-nude rounded-xl border-2 border-dashed transition-all duration-300 ${
          isDragging 
            ? 'border-brown scale-105 bg-peach/20' 
            : 'border-taupe hover:border-brown hover:bg-peach/10'
        }`}>
          <HiOutlineUpload className={`text-3xl mb-2 transition-transform duration-300 ${isDragging ? 'scale-110 text-brown' : 'text-taupe'}`} />
          <span className={`font-medium transition-colors duration-300 ${isDragging ? 'text-brown' : 'text-taupe'}`}>
            {isDragging ? 'Drop your image here!' : 'Click to upload or drag an image'}
          </span>
          <input 
            id="file-upload"
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
          />
        </div>
      </label>

      {/* Gender Selection */}
      <div className="flex flex-col items-center w-full space-y-2">
        <span className="text-brown font-bold">Select Gender</span>
        <div className="flex space-x-4">
          {(['Men', 'Women', 'All'] as Gender[]).map((gender) => (
            <label
              key={gender}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <input
                type="radio"
                name="gender"
                checked={selectedGender === gender}
                onChange={() => handleGenderChange(gender)}
                className="form-radio text-brown focus:ring-brown h-4 w-4"
              />
              <span className={`text-brown capitalize transition-all duration-300 group-hover:text-accent ${
                selectedGender === gender ? 'font-semibold scale-105' : ''
              }`}>
                {gender}
              </span>
            </label>
          ))}
        </div>
      </div>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-xl shadow-soft border-2 border-peach animate-fadein hover:scale-105 transition-transform duration-300"
        />
      )}
      <button
        type="submit"
        className="bg-brown text-offwhite px-8 py-3 rounded-full text-lg font-semibold shadow-soft transition-all duration-300 hover:bg-accent hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:bg-brown"
        disabled={!file}
      >
        Get Suggestions
      </button>
    </form>
  );
};

export default ImageUpload; 