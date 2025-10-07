# AI Social Media Video Generator (React)

A modern web app to generate social media videos using AI, built with React, TypeScript, and the Google Gemini API. This application allows users to sign in, enter a text prompt, and generate a short video powered by Google's `veo-2.0-generate-001` model.

This project uses React, TypeScript, and Tailwind CSS (via CDN) for a modern, build-free development experience that runs directly in the browser.

## Features

- **AI Video Generation**: Utilizes the Google Gemini API to create videos from text prompts.
- **Mock Authentication**: A simple, client-side authentication flow to simulate user login.
- **Modern UI/UX**: Sleek, responsive, and dark-themed interface built with React and Tailwind CSS.
- **No Build Step**: Leverages ES Modules and an `importmap` to run a React and TypeScript project directly in the browser without any bundlers.

## Tech Stack

- **Frontend**: React, TypeScript, React Router, Tailwind CSS (CDN)
- **AI**: Google Gemini API (`@google/genai`)

## How It Works

This project is a set of static files that can be served by any simple static file server.

1.  `index.html` sets up the environment, including the Tailwind CSS configuration and an `importmap`.
2.  The `importmap` tells the browser how to resolve module imports (e.g., `react`, `@google/genai`) to CDN URLs.
3.  The main script, `index.tsx`, mounts the React application to the DOM.
4.  React components handle the UI, state management, and user interactions.
5.  The `geminiService.ts` module communicates with the Google Gemini API to handle video generation.
