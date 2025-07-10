
import React, { useRef, useState } from 'react';
import { Camera, Upload } from 'lucide-react';

interface ImageUploadProps {
  currentImage: string;
  onImageChange: (imageUrl: string) => void;
  isEditing: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ currentImage, onImageChange, isEditing }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsUploading(true);
      
      // Create a preview URL for the uploaded image
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageChange(result);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative">
      <div 
        className={`w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 ${
          isEditing ? 'cursor-pointer hover:border-primary/40 transition-colors' : ''
        }`}
        onClick={handleImageClick}
      >
        <img
          src={currentImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
        
        {isEditing && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-full">
            {isUploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            ) : (
              <Camera className="h-8 w-8 text-white" />
            )}
          </div>
        )}
      </div>

      {isEditing && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <button
            onClick={handleImageClick}
            className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors shadow-lg"
            disabled={isUploading}
          >
            <Upload className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageUpload;
