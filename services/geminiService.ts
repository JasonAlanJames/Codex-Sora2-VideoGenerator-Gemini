import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateVideo = async (
  prompt: string,
  onProgress: (message: string) => void
): Promise<string> => {
  try {
    onProgress("Sending request to the AI model...");

    let operation = await ai.models.generateVideos({
      model: 'veo-2.0-generate-001',
      prompt: prompt,
      config: {
        numberOfVideos: 1
      }
    });

    onProgress("Video generation started. This can take a few minutes...");
    
    let pollCount = 0;
    const progressMessages = [
      "The AI is dreaming up your video...",
      "Gathering pixels and arranging them perfectly...",
      "Almost there, adding the final touches...",
      "Rendering the final frames...",
    ];

    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
      
      const messageIndex = pollCount % progressMessages.length;
      onProgress(progressMessages[messageIndex]);
      pollCount++;

      operation = await ai.operations.getVideosOperation({ operation: operation });
    }

    onProgress("Video processing complete! Fetching your file...");

    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

    if (!downloadLink) {
      throw new Error("Video URI not found in the API response.");
    }
    
    // The API key needs to be appended to the download link for access.
    const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;

    onProgress("Video ready!");
    return finalUrl;

  } catch (error) {
    console.error("Error generating video:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("An unknown error occurred during video generation.");
  }
};