
/**
 * Service for interacting with the VAPI API for call recordings
 */

// Store the VAPI public key directly for demo purposes
const VAPI_PUBLIC_KEY = "5d11e062-e323-4f45-96e7-3d9035e41fa8";

export async function fetchCallRecording(recordingUrl: string): Promise<string | null> {
  // First try to get from localStorage, if not available, use the hardcoded public key
  const apiKey = localStorage.getItem("vapiApiKey") || VAPI_PUBLIC_KEY;
  
  // Store the key in localStorage if it's not already there
  if (!localStorage.getItem("vapiApiKey")) {
    localStorage.setItem("vapiApiKey", VAPI_PUBLIC_KEY);
    console.log("VAPI API key automatically set up for demo purposes");
  }
  
  try {
    // For demo purposes, let's make a more direct connection
    // In a real implementation, we'd make an actual API call to VAPI
    
    console.log(`Using VAPI key: ${apiKey.substring(0, 4)}... to fetch recording: ${recordingUrl}`);
    
    // Simulate a successful API call for the demo
    // The real implementation would call the VAPI API endpoints
    return recordingUrl;
  } catch (error) {
    console.error("Error fetching call recording:", error);
    return null;
  }
}
