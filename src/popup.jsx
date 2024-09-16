import { useState } from 'react';

function Popup() {
  const [keywords, setKeywords] = useState("");

  const handleSave = () => {
    chrome.storage.sync.set({ blurKeywords: keywords.split(",") }, () => {
      console.log("Keywords saved");
    });
  };

  return (
    <div>
      <input 
        type="text" 
        value={keywords} 
        onChange={(e) => setKeywords(e.target.value)} 
        placeholder="Enter keywords separated by commas" 
      />
      <button onClick={handleSave}>Save Keywords</button>
    </div>
  );
}

export default Popup;