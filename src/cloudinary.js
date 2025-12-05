export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "blog-images"); // your preset

  const res = await fetch(`https://api.cloudinary.com/v1_1/dxs587j8z/image/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  if(res.ok) {
      return data.secure_url;
  }
  else {
    return "Error Occured"
  }
}
