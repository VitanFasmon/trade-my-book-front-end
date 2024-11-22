import { useState } from "react";
import Typography from "../Typography";
import Button from "../buttons/Button";

import { useErrorToast, useSuccessToast } from "../Toast";
import { uploadImage } from "../../data/apiService";
import LoadingSpinner from "../LoadingSpinner";
interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ onUpload }: ImageUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { showSuccessToast } = useSuccessToast();
  const { showErrorToast } = useErrorToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleUpload = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsUploading(true);
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const imageUrl = await uploadImage(selectedFile);
      console.log("imageUrl from ImageUpload", imageUrl);
      if (!imageUrl) return;
      onUpload(imageUrl);
      showSuccessToast("Image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      showErrorToast("Error! Unable to upload image.");
    } finally {
      setIsUploading(false);
      setPreviewUrl(null);
    }
  };
  const handleCancelUpload = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="image/*"
        id="custom-input"
        onChange={handleFileChange}
        hidden
      />
      <label
        htmlFor="custom-input"
        className="block  text-primary mr-4 py-2 px-4
            rounded-md font-semibold bg-lightGray
            border border-secondary cursor-pointer"
      >
        {previewUrl ? "Choose a different image" : "Choose an image"}
      </label>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-auto h-32 object-cover rounded"
        />
      )}
      {selectedFile && (
        <div className="flex flex-row ">
          <Button
            type="secondary"
            onClick={(e) => handleUpload(e)}
            disabled={!selectedFile || isUploading}
            className="rounded-r-none"
          >
            {isUploading ? <LoadingSpinner /> : "Upload image"}
          </Button>
          <Button
            type="primary"
            onClick={(e) => handleCancelUpload(e)}
            disabled={!selectedFile || isUploading}
            className="rounded-l-none"
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
