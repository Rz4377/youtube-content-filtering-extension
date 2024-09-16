const blurKeywords = ["dsa", "web development", "harkirat singh","codehelp","love babbar","webdev","devops","projects","coding","dbms","education","computer","operating system"];

function blurVideos() {
  const videoElements = document.querySelectorAll('ytd-video-renderer, ytd-rich-item-renderer, ytd-compact-video-renderer');

  videoElements.forEach((videoElement) => {
    const titleElement = videoElement.querySelector('#video-title');
    const channelElement = videoElement.querySelector('ytd-channel-name');
    const hashtagsElement = videoElement.querySelectorAll('.yt-formatted-string a');

    const titleText = titleElement?.innerText.toLowerCase() || "";
    const channelText = channelElement?.innerText.toLowerCase() || "";
    let hashtagText = "";

    hashtagsElement.forEach((hashtag) => {
      hashtagText += hashtag.innerText.toLowerCase() + " ";
    });

    let matchesKeyword = blurKeywords.some((keyword) => {
      return (
        titleText.includes(keyword.toLowerCase()) ||
        channelText.includes(keyword.toLowerCase()) ||
        hashtagText.includes(keyword.toLowerCase())
      );
    });

    if (!matchesKeyword) {
      videoElement.style.position = 'relative';
      videoElement.style.filter = 'blur(15px)';
      videoElement.style.pointerEvents = 'none';
    
      let overlay = videoElement.querySelector('.blocked-overlay');
      if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'blocked-overlay';
        overlay.innerText = 'Blocked';
        overlay.style.position = 'absolute';
        overlay.style.top = '50%';
        overlay.style.left = '50%';
        overlay.style.transform = 'translate(-50%, -50%)';
        overlay.style.color = 'white';
        overlay.style.fontSize = '24px';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        overlay.style.padding = '10px';
        overlay.style.borderRadius = '5px';
        overlay.style.filter = 'none'; // Ensure the overlay itself is not blurred
        videoElement.appendChild(overlay);
      }
    } else {
      videoElement.style.filter = 'none';
      videoElement.style.pointerEvents = 'auto';

      const overlay = videoElement.querySelector('.blocked-overlay');
      if (overlay) {
        overlay.remove();
      }
    }
  });
}

const observer = new MutationObserver(() => {
  blurVideos();
});

observer.observe(document.body, { childList: true, subtree: true });

blurVideos();