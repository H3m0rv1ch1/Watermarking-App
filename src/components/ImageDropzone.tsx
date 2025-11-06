import React from 'react';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { cn } from '../lib/utils';
import { useLanguageStore } from '../store';

interface ImageDropzoneProps {
  onDrop: (files: FileList) => void;
  className?: string;
  accept?: string;
  multiple?: boolean;
}

export function ImageDropzone({
  onDrop,
  className,
  accept = "image/*",
  multiple = true,
}: ImageDropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const { t } = useLanguageStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      onDrop(e.dataTransfer.files);
    }
  };

  return (
    <label
      className={cn(
        "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-all",
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : "border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        {isDragging ? (
          <Upload className="w-12 h-12 text-blue-500 mb-3" />
        ) : (
          <ImageIcon className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-3" />
        )}
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">{t('clickToUpload')}</span> {t('dragAndDrop')}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {multiple ? t('images') : t('image')} (PNG, JPG, WEBP)
        </p>
      </div>
      <input
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => e.target.files && onDrop(e.target.files)}
      />
    </label>
  );
}