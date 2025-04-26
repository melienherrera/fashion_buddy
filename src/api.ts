/// <reference types="vite/client" />

// API utility for calling the fashion_buddy_main_agent

//  Handles text input
export async function callFashionBuddyText({ text }: { text: string}) {
    const apiUrl = import.meta.env.VITE_FASHION_BUDDY_TEXT_API_URL;
    if (!apiUrl) throw new Error('VITE_FASHION_BUDDY_TEXT_API_URL is not defined');
    const response = await fetch(
      apiUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_value: text,
          output_type: 'chat',
          input_type: 'chat',
        }),
      }
    );
    if (!response.ok) throw new Error('API error');
    return await response.json();
}

//  Handles image input
export async function callFashionBuddyImages(filePath: string) {
  console.log('File path: ', filePath);
  const payload = {
    output_type: 'chat',
    input_type: 'chat',
    tweaks: {
      "ChatInput-iAfd7": {
        "files": filePath
      }
    },
    // session_id: "user_2",
  };
  const apiUrl = import.meta.env.VITE_FASHION_BUDDY_IMAGE_API_URL;
  if (!apiUrl) throw new Error('VITE_FASHION_BUDDY_IMAGE_API_URL is not defined');
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!response.ok) throw new Error('Run API failed');
  return await response.json();
}


