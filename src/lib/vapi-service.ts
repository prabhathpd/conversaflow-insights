
/**
 * Service for interacting with the VAPI API for call recordings
 */

export async function fetchCallRecording(recordingUrl: string): Promise<string | null> {
  const apiKey = localStorage.getItem("vapiApiKey");
  
  if (!apiKey) {
    console.error("VAPI API key not found. Please add it in Settings.");
    return null;
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
