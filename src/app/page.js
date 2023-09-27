"use client";

import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const initialFormData = {
    subject: "",
    emotion: "",
    maxWords: "",
    location: "",
    authorName: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let text = `Please write a story about ${formData.subject} that is ${formData.emotion}. The story should be about ${formData.maxWords} words long and take place in ${formData.location}. The author of the story is ${formData.authorName}.`;
    prompt(text);
    setFormData(initialFormData);
  };

  const prompt = (msg) => {
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
    };

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ role: "user", content: msg }],
    };

    setIsLoading(true);

    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        console.log(response);

        setStories((stories) => [
          ...stories,
          { message: response.data.choices[0].message.content },
        ]);

        setIsLoading(false);
        console.log(stories);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  return (
    <div>
      <h1 className="top-header">Generate Story</h1>
      <form>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label
              for="subject"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Subject
            </label>
            <input
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Water Bottles"
              value={formData.subject}
              name="subject"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              for="emotion"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Emotion
            </label>
            <input
              type="text"
              name="emotion"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Happy"
              value={formData.emotion}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              for="maxWords"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Max # Words
            </label>
            <input
              type="text"
              name="maxWords"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="100"
              value={formData.maxWords}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              for="location"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Location
            </label>
            <input
              type="tel"
              name="location"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="New York City"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label
              for="authorName"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Character Name
            </label>
            <input
              type="url"
              name="authorName"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Jane Doe"
              value={formData.authorName}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div class="grid gap-6 mb-6 md:grid-cols-1">
          {" "}
          <button
            type="submit"
            onClick={handleSubmit}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Generate
          </button>
        </div>
      </form>
      <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <h1 className="bottom-header">Stories</h1>
      <div className="list-wrapper grid gap-6 mb-6 md:grid-cols-1">
        {stories.length > 0 && (
          <ul class="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            {stories.map((message, index) => (
              <li class="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                {message.message}
              </li>
            ))}
          </ul>
        )}
        {isLoading && (
          <div class="flex items-center justify-center">
            <div class="w-12 h-12 border-t-2 border-b-2 border-gray-900 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
