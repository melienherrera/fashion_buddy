/// <reference types="vite/client" />
import { getSessionId } from './components/utils';

//  Handles text input
export async function callFashionBuddyText({ text }: { text: string}) {
    const apiUrl = import.meta.env.VITE_FASHION_BUDDY_TEXT_API_URL;
    console.log('API URL: ', apiUrl);
    if (!apiUrl) throw new Error('VITE_FASHION_BUDDY_TEXT_API_URL is not defined');
    if (!import.meta.env.VITE_LANGFLOW_API_KEY) throw new Error('VITE_LANGFLOW_API_KEY environment variable not found. Please set your API key in the environment variables.');
    const text_payload = {
      input_value: text,
      output_type: 'chat',
      input_type: 'chat',
      // session_id: getSessionId(),
    };
    const response = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "x-api-key": import.meta.env.VITE_LANGFLOW_API_KEY
        },
        body: JSON.stringify(text_payload),
      }
    );
    if (!response.ok) throw new Error('API error');
    return await response.json();
}

//  Handles image input
export async function callFashionBuddyImages(filePath: string, gender: 'Men' | 'Women' | 'All' = 'All') {
  console.log('File path: ', filePath);
  console.log('Selected gender: ', gender);
  const image_payload = {
    output_type: 'chat',
    input_type: 'chat',
    input_value: gender,
    // session_id: getSessionId(),
    tweaks: {
      "ChatInput-cHdFx": {
        "files": filePath
      },
    },
  };
  const apiUrl = import.meta.env.VITE_FASHION_BUDDY_IMAGE_API_URL;
  if (!apiUrl) throw new Error('VITE_FASHION_BUDDY_IMAGE_API_URL is not defined');
  if (!import.meta.env.VITE_LANGFLOW_API_KEY) throw new Error('VITE_LANGFLOW_API_KEY environment variable not found. Please set your API key in the environment variables.');
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      "x-api-key": import.meta.env.VITE_LANGFLOW_API_KEY
    },
    body: JSON.stringify(image_payload)
  });
  if (!response.ok) throw new Error('Run API failed');
  return await response.json();
}


