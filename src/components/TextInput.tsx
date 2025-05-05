import React, { useState, useRef } from 'react';
import { HiOutlinePencil } from 'react-icons/hi';
import { callFashionBuddyText } from '../api';
import toast from 'react-hot-toast';

// Loading messages sequence for text input
const LOADING_MESSAGES = [
  { message: "📝 Analyzing your fashion preferences...", duration: 3000 },
  { message: "🎯 Finding the perfect matches...", duration: 3000 },
  { message: "✨ Preparing your style recommendations...", duration: 3000 }
];

type Props = {
  setResults: (results: string | null) => void;
  setLoading: (loading: boolean) => void;
};

const TextInput: React.FC<Props> = ({ setResults, setLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    
    // Start the loading message sequence
    showLoadingSequence();

    try {
      const data = await callFashionBuddyText({ text });
      const response = data.outputs[0].outputs[0].outputs.message.message;
      setResults(response);
      toast.success('✨ Your style matches are ready!', {
        duration: 4000,
        style: {
          background: '#F7F6F3',
          color: '#4B2E2B',
          border: '1px solid #F8E1D9',
        },
      });
    } catch (err) {
      setResults('');
      toast.error('Error finding suggestions', {
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