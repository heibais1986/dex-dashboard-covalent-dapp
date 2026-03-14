// Generic API utility for Covalent API calls
const APIKey = process.env.NEXT_PUBLIC_COVALENT_APIKEY;

export async function fetchCovalentData(endpoint, chainID, dexName) {
  if (!APIKey) {
    throw new Error('Covalent API key is not configured. Please set NEXT_PUBLIC_COVALENT_APIKEY environment variable.');
  }

  const url = `https://api.covalenthq.com/v1/${chainID}/xy=k/${dexName}/${endpoint}/?key=${APIKey}`;
  
  try {
    const res = await fetch(url);
    
    if (!res.ok) {
      let errorMessage = `API request failed: ${res.status} ${res.statusText}`;
      
      // Try to get more detailed error message
      try {
        const errorData = await res.text();
        if (errorData && errorData.includes('<html>')) {
          errorMessage = 'API returned HTML instead of JSON. This may indicate an authentication error or invalid endpoint.';
        } else if (errorData) {
          errorMessage = `API Error: ${errorData.substring(0, 200)}`;
        }
      } catch (e) {
        // If we can't parse error response, use basic message
      }
      
      throw new Error(errorMessage);
    }
    
    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await res.text();
      throw new Error(`Invalid response format: Expected JSON but got ${contentType || 'unknown'}. Response: ${text.substring(0, 100)}`);
    }
    
    const data = await res.json();
    
    // Validate response structure
    if (!data || typeof data !== 'object') {
      throw new Error('Invalid response: Expected JSON object');
    }
    
    if (data.error) {
      throw new Error(`API Error: ${data.error_message || JSON.stringify(data.error)}`);
    }
    
    return data;
    
  } catch (error) {
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to Covalent API. Please check your internet connection.');
    }
    throw error;
  }
}

export function getChainItems(data) {
  if (!data || !data.data || !data.data.items) {
    return [];
  }
  return data.data.items;
}