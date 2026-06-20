import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env.local
config({ path: path.resolve(__dirname, '../.env.local') });

const LEONARDO_API_KEY = process.env.LEONARDO_API_KEY;
const LEONARDO_IMAGE_URL = process.env.LEONARDO_IMAGE_URL;

const assetsDir = path.resolve(__dirname, '../src/assets');

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
}

async function generateLeonardoImage() {
  if (!LEONARDO_API_KEY || LEONARDO_API_KEY === 'YOUR_API_KEY') {
    console.error("❌ LEONARDO_API_KEY is missing in .env.local");
    process.exit(1);
  }
  
  if (!LEONARDO_IMAGE_URL || LEONARDO_IMAGE_URL === '<YOUR_VALUE>') {
    console.error("❌ LEONARDO_IMAGE_URL is missing in .env.local");
    process.exit(1);
  }

  console.log("🚀 Triggering Leonardo AI Blueprint Execution...");

  const options = {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'authorization': `Bearer ${LEONARDO_API_KEY}`,
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      blueprintVersionId: "53a62d61-d93e-41c2-8445-cb13d2991067",
      input: {
        nodeInputs: [
          {
            nodeId: "1f42d8a7-6c31-4b8e-9f02-3e7d1a5c9b40",
            value: LEONARDO_IMAGE_URL,
            settingName: "imageUrl"
          }
        ],
        public: true
      }
    })
  };

  const res = await fetch('https://cloud.leonardo.ai/api/rest/v1/blueprint-executions', options);
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Leonardo API Error: ${res.status} ${errText}`);
  }
  
  const data = await res.json();
  const executionId = data.blueprintExecution?.id || data.id; // API structure varies slightly
  
  if (!executionId) {
    throw new Error("Failed to get execution ID from Leonardo API.");
  }

  console.log(`✅ Execution triggered. ID: ${executionId}`);
  console.log("⏳ Polling for completion... (This usually takes 10-30 seconds)");

  // Poll for completion
  let completed = false;
  let finalImageUrl = null;
  
  while (!completed) {
    await new Promise(r => setTimeout(r, 3000)); // wait 3 seconds
    
    const pollRes = await fetch(`https://cloud.leonardo.ai/api/rest/v1/blueprint-executions/${executionId}`, {
      headers: {
        'accept': 'application/json',
        'authorization': `Bearer ${LEONARDO_API_KEY}`
      }
    });
    
    if (!pollRes.ok) {
        throw new Error(`Polling failed: ${pollRes.status}`);
    }
    
    const pollData = await pollRes.json();
    // Depends on exactly how Leonardo structures blueprint execution responses
    // Usually state is inside generation or blueprintExecution object
    const status = pollData.blueprintExecution?.status || pollData.status;
    
    if (status === 'COMPLETED' || status === 'DONE') {
      completed = true;
      // Extract output image
      // Node outputs array usually contains the generated URL
      const outputs = pollData.blueprintExecution?.nodeOutputs || pollData.nodeOutputs || [];
      const imageOutput = outputs.find(o => o.value && typeof o.value === 'string' && o.value.startsWith('http'));
      
      if (imageOutput) {
          finalImageUrl = imageOutput.value;
      } else {
          // If the image url is nested in a JSON string value
          try {
             const valObj = JSON.parse(outputs[0].value);
             finalImageUrl = valObj.url || valObj.imageUrl;
          } catch(e) {}
      }
    } else if (status === 'FAILED') {
      throw new Error("Leonardo execution FAILED.");
    }
  }

  if (!finalImageUrl) {
      throw new Error("Execution completed but couldn't find image URL in response.");
  }

  console.log(`🖼️ Image generated successfully! URL: ${finalImageUrl}`);
  console.log("⬇️ Downloading image to local assets...");
  
  const dest = path.join(assetsDir, 'leonardo_generated.png');
  await downloadImage(finalImageUrl, dest);
  console.log(`✅ Image saved to src/assets/leonardo_generated.png!`);
}

generateLeonardoImage().catch(console.error);
