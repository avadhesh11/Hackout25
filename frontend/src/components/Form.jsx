import React, { useState } from "react";
import exifr from "exifr";

export default function Form() {
  async function startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = document.getElementById("camera");
        videoElement.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied:", err);
      }
    }
    startCamera();
     function toggleInvert() {
    const video = document.getElementById("camera");
    if (video.style.filter === "invert(1)") {
      video.style.filter = "none"; 
    } else {
      video.style.filter = "invert(1)"; 
    }
  }
  const [formData, setFormData] = useState({
    place: "",
    incident: "",
    area: "",
    picture: null,
    latitude: null,
    longitude: null,
  });

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "picture") {
      const file = files[0];
      setFormData((prev) => ({ ...prev, picture: file }));

      if (file) {
        try {
          // Try to extract GPS from EXIF
          const { latitude, longitude } = await exifr.gps(file);

          if (latitude && longitude) {
            setFormData((prev) => ({ ...prev, latitude, longitude }));
            console.log("Extracted GPS:", latitude, longitude);
          } else {
            console.log("No GPS data in photo. Using browser location...");
            // fallback: browser geolocation
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                setFormData((prev) => ({
                  ...prev,
                  latitude: pos.coords.latitude,
                  longitude: pos.coords.longitude,
                }));
                console.log("Fallback GPS:", pos.coords.latitude, pos.coords.longitude);
              });
            }
          }
        } catch (err) {
          console.error("EXIF parsing failed:", err);
        }
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // send formData to backend here
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Report an Incident
        </h1>
        <form action={"/mark"} method="post" className="space-y-4">
          {/* Place */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter place"
              required
            />
          </div>

          {/* Incident */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Incident</label>
            <textarea
              name="incident"
              value={formData.incident}
              onChange={handleChange}
              className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Describe the incident"
              rows="3"
              required
            />
          </div>

          {/* Area */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Area</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full border rounded-xl p-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter area"
              required
            />
          </div>
          
          {/* <div style="display: flex; justify-content: center; align-items: center; gap: 5px;">
            <video id="camera" style={"video { border: 2px solid #333; border-radius: 12px; }"} autoplay playsinline width="100px"></video>
            <button onclick={toggleInvert} style="width: fit-content;"> <img href="../../frontend/public/flip.png" alt="invert" /></button>
          </div> */}

          {/* Show extracted location if available */}
          {formData.latitude && formData.longitude && (
            <div className="text-sm text-green-700 font-medium">
              📍 Location detected: {formData.latitude.toFixed(6)},{" "}
              {formData.longitude.toFixed(6)}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-xl hover:bg-blue-600 transition"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}
