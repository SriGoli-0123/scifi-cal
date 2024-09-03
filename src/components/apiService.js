import axios from 'axios';

const WOLFRAM_ALPHA_APP_ID = 'XEYRWL-2ARKLTGU8G';  // Replace with your actual API key

export const getDifferentiation = async (expression, variable = 'x') => {
  const url = `https://api.wolframalpha.com/v2/query?input=differentiate+${expression}+with+respect+to+${variable}&appid=${WOLFRAM_ALPHA_APP_ID}&output=JSON`;
  try {
    const response = await axios.get(url);
    // Parsing the response might be complex depending on the service
    return parseWolframAlphaResponse(response.data);
  } catch (error) {
    console.error("Differentiation API Error:", error);
    return "Error in differentiation";
  }
};

export const getIntegration = async (expression, variable = 'x') => {
  const url = `https://api.wolframalpha.com/v2/query?input=integrate+${expression}+with+respect+to+${variable}&appid=${WOLFRAM_ALPHA_APP_ID}&output=JSON`;
  try {
    const response = await axios.get(url);
    return parseWolframAlphaResponse(response.data);
  } catch (error) {
    console.error("Integration API Error:", error);
    return "Error in integration";
  }
};

const parseWolframAlphaResponse = (data) => {
  // This function will need to extract the relevant result from the API response
  if (data.queryresult && data.queryresult.pods) {
    const pod = data.queryresult.pods.find(p => p.title === "Result");
    if (pod && pod.subpods && pod.subpods[0]) {
      return pod.subpods[0].plaintext;
    }
  }
  return "Result not found";
};
