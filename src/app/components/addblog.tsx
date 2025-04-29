'use client'; // app router mein jab form ka direct frontend action ho

import { useState } from 'react';

export default function AddPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          authorId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Post Created Successfully!');
        console.log(data);
        // Reset the form
        setTitle('');
        setContent('');
        setAuthorId('');
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Author ID"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
