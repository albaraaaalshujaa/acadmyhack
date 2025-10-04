const maxSizeMB = 50;

document.getElementById("uploadBtn").addEventListener("click", async () => {
  const file = document.getElementById("fileInput").files[0];
  const status = document.getElementById("status");
  const link = document.getElementById("link");

  if(!file) return status.textContent = "Please select a file";

  if(file.size / (1024*1024) > maxSizeMB) {
    return status.textContent = "File exceeds maximum size";
  }

  const reader = new FileReader();
  reader.onload = async () => {
    const base64 = reader.result.split(',')[1];
    const res = await fetch(`/.netlify/functions/upload?filename=${file.name}`, {
      method: 'POST',
      body: base64
    });
    const text = await res.text();
    status.textContent = text;
    if(res.status === 200){
      link.innerHTML = `Your file is uploaded: <a href="/uploads/${file.name}" target="_blank">${file.name}</a>`;
    }
  };
  reader.readAsDataURL(file);
});
