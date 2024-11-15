import React, { useEffect } from "react";
import axios from "axios";
import checkAuthStatus from "@/hooks/userSession";
import { useNavigate } from "react-router-dom";

function FloorForm() {
  const [file, setFile] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState("");
  const formData = new FormData();
  const isAuthenticated = checkAuthStatus();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  // const handleFileChange = (event) => {
  //   setFile(event.target.files[0]);
  // };
  const projectName = localStorage.getItem("projectName");
  const username = localStorage.getItem("username");
  const handleUpload = async (e) => {
    e.preventDefault();
    formData.append("userName", username);
    formData.append("projectName", projectName);
    formData.append("image", file);
    console.log(file);
    console.log(formData);

    try {
      // const response = await fetch(
      //   "http://localhost:3000/api/v1/floorplan/image-upload",
      //   {
      //     method: "POST",

      //     body: formData,
      //   }
      // );
      const response = await axios.post(
        "http://localhost:3000/api/v1/floorplan/image-upload",
        formData
      );
      const data = await response.data;
      if (response.ok) {
        console.log(data);
        setImageUrl(data.imageUrl);
      } else {
        console.log("upload failed", data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form action="#" onSubmit={handleUpload}>
        <h1>Upload an Image</h1>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        <button type="submit">Upload</button>
      </form>

      {imageUrl && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageUrl} alt="Uploaded" style={{ width: "300px" }} />
        </div>
      )}
    </div>
  );
}

export default FloorForm;

//{file:form data , username, project name, floorNum}
