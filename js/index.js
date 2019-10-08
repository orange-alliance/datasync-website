const { platform } = navigator;
const downloadButton = document.querySelector('#download');
const downloadText = document.querySelector('#download-text');
const buttonIcon = document.querySelector('#download-icon');

if (platform === 'Win32') {
  downloadText.textContent += ' for Windows';
  buttonIcon.classList.add('icon-windows');
} else if (navigator.userAgent.match(/linux/i)) {
  downloadText.textContent += ' for Linux';
  buttonIcon.classList.add('icon-linux');
} else if (platform.startsWith('Mac')) {
  downloadText.textContent += ' for macOS';
  buttonIcon.classList.add('icon-apple');
} else {
  downloadButton.style.display = 'none';
}

const callback = data => {
  let link;

  if (platform === 'Win32') {
    link = data[0].assets.find(x => x.name.endsWith('.exe'))
      .browser_download_url;
  } else if (platform.startsWith('Linux')) {
    link = data[0].assets.find(x => x.name.endsWith('.deb'))
      .browser_download_url;
  } else if (platform.startsWith('Mac')) {
    link = data[0].assets.find(x => x.name.endsWith('.dmg'))
      .browser_download_url;
  }

  downloadButton.setAttribute('href', link);
};

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    const res = JSON.parse(this.responseText);
    callback(res);
  }
};
xhr.open('GET', 'https://api.github.com/repos/orange-alliance/TOA-DataSync/releases', true);
xhr.send();

