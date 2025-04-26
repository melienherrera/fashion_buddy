import React, { useState, useRef } from 'react';
import { HiOutlinePencil } from 'react-icons/hi';
import { callFashionBuddyText } from '../api';

type Props = {
  setResults: (results: string | null) => void;
  setLoading: (loading: boolean) => void;
};

const TextInput: React.FC<Props> = ({ setResults, setLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await callFashionBuddyText({ text });
      console.log('Text API Response: ', data.outputs[0].outputs[0].outputs.message.message);
      const response = data.outputs[0].outputs[0].outputs.message.message;
      // Adjust this line based on your API's response structure
      setResults(response);
    } catch (err) {
      setResults('');
      alert('Error fetching suggestions');
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface p-8 rounded-xl shadow-soft flex flex-col items-center space-y-6 border border-taupe"
    >
      <div className="w-full flex items-center space-x-3">
        <HiOutlinePencil className="text-2xl text-brown" />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder="Describe the clothing item..."
          rows={2}
          style={{ resize: 'none', maxHeight: '200px' }}
          className="flex-1 bg-nude border-none rounded-2xl px-5 py-4 text-lg focus:ring-2 focus:ring-peach transition-all placeholder-taupe text-brown min-h-[48px]"
        />
      </div>
      <button
        type="submit"
        className="bg-brown text-offwhite px-8 py-3 rounded-full text-lg font-semibold shadow-soft transition-all hover:bg-accent disabled:opacity-50"
        disabled={!text.trim()}
      >
        Get Suggestions
      </button>
    </form>
  );
};

export default TextInput; 