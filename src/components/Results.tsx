import React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  results: string | null;
  loading: boolean;
};

const Results: React.FC<Props> = ({ results, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brown"></div>
        <span className="ml-4 text-brown">Loading suggestions...</span>
      </div>
    );
  }
  if (!results) {
    return <div className="text-taupe text-center">No suggestions yet.</div>;
  }
  return (
    <div className="bg-nude rounded-xl shadow-soft p-8 border border-peach text-brown prose prose-brown max-w-none prose-a:hover:text-brown prose-a:transition-colors">
      <ReactMarkdown
        components={{
          a: ({node, ...props}) => (
            <a
              {...props}
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-beige underline font-bold hover:text-brown transition-colors"
            />
          ),
        }}
      >
        {results}
      </ReactMarkdown>
    </div>
  );
};

export default Results; 