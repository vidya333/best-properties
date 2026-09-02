import React, { useEffect, useState } from "react";
import api from "../api"; 
import { API } from '../config';
import Gallery from "../components/Gallery";
import OurPromise from "../components/OurPromise";

function GalleryPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await api.get("/media");
      
      // Smart Path Helper: Fixes old local paths but keeps Cloudinary URLs
      const processedItems = res.data.map((item) => {
        let finalSrc = item.src;

        // If the path DOES NOT start with http, it's an old local path
        if (item.src && !item.src.startsWith("http")) {
          // Point to your local backend (or live Render backend) for the file
          const backendUrl = `${API}`; 
          finalSrc = `${backendUrl}${item.src}`;
        }

        return { ...item, src: finalSrc };
      });

      setItems(processedItems);
    } catch (error) {
      console.error("Error fetching gallery media:", error);
    }
  };

  return (
    <div className="">
      {/* Items now have correct full URLs regardless of where they are stored */}
      <Gallery items={items} />
      <OurPromise />
    </div>
  );
}

export default GalleryPage;
