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
      onUpload(imageUrl); // Pass the image URL to the parent component
      showSuccessToast("Image uploaded successfully.");
    } catch (error) {
      console.error("Error uploading image:", error);
      showErrorToast("Error! Unable to upload image.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Typography as="p" variant="p">
        Upload an image
      </Typography>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {previewUrl && (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-32 h-32 object-cover rounded"
        />
      )}
      <Button
        type="secondary"
        onClick={(e) => handleUpload(e)}
        disabled={!selectedFile || isUploading}
      >
        {isUploading ? <LoadingSpinner /> : "Upload Image"}
      </Button>
    </div>
  );
};

export default ImageUpload;
