
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
    // This is a simplified example - in a real implementation, 
    // you'd make an actual API call to VAPI using the recording URL
    // For now, we'll just return the recording URL if the API key exists
    
    // In a real implementation, this might look like:
    // const response = await fetch(`https://api.vapi.com/recordings/${recordingId}`, {
    //   headers: {
    //     'Authorization': `Bearer ${apiKey}`,
    //     'Content-Type': 'application/json',
    //   }
    // });
    // const data = await response.json();
    // return data.audioUrl;
    
    console.log(`Fetching recording with VAPI key: ${apiKey.substring(0, 4)}...`);
    
    // For demo purposes, we'll just add a query param to show we're using the API key
    return `${recordingUrl}?api_key=valid`;
  } catch (error) {
    console.error("Error fetching call recording:", error);
    return null;
  }
}
