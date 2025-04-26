import React, { useState } from 'react';
import { HiOutlineCamera, HiOutlinePencil } from 'react-icons/hi';
import ImageUpload from './components/ImageUpload';
import TextInput from './components/TextInput';
import Results from './components/Results';

const App: React.FC = () => {
  const [tab, setTab] = useState<'image' | 'text'>('image');
  const [results, setResults] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center bg-background">
      {/* Header */}
      <header className="w-full flex flex-col items-center py-10 mb-8 bg-offwhite shadow-soft rounded-b-xl border-b-4 border-peach">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-peach rounded-full p-3 shadow-soft border-2 border-brown">
            <span className="text-2xl font-bold text-brown">👗</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-brown">Fashion Buddy</h1>
        </div>
        <p className="text-taupe text-lg font-medium">Your fashion AI stylist</p>
      </header>

      {/* Tabs */}
      <div className="flex space-x-4 mb-10 bg-nude p-2 rounded-full shadow-soft border border-taupe">
        <button
          className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all font-semibold text-lg focus:outline-none ${
            tab === 'image'
              ? 'bg-peach text-brown shadow-soft border border-brown'
              : 'text-brown hover:bg-offwhite'
          }`}
          onClick={() => setTab('image')}
        >
          <HiOutlineCamera className="text-2xl" />
          <span>Upload Image</span>
        </button>
        <button
          className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all font-semibold text-lg focus:outline-none ${
            tab === 'text'
              ? 'bg-peach text-brown shadow-soft border border-brown'
              : 'text-brown hover:bg-offwhite'
          }`}
          onClick={() => setTab('text')}
        >
          <HiOutlinePencil className="text-2xl" />
          <span>Describe Item</span>
        </button>
      </div>

      {/* Form */}
      <div className="w-full max-w-lg">
        {tab === 'image' ? (
          <ImageUpload setResults={setResults} setLoading={setLoading} />
        ) : (
          <TextInput setResults={setResults} setLoading={setLoading} />
        )}
      </div>

      {/* Results */}
      <div className="w-full max-w-3xl mt-12 mb-8">
        <Results results={results} loading={loading} />
      </div>
      <footer className="w-full flex flex-col items-center py-6 mt-auto">
  <div className="flex items-center space-x-3">
    <span className="text-brown text-lg font-semibold">Powered by</span>
    <img src="public/langflow-logo-color-black-transparent (2).png" alt="Langflow logo" className="h-8" />
  </div>
</footer>
    </div>
  );
};

export default App; 