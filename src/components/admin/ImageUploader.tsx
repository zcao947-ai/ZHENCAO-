"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

interface ImageUploaderProps {
  value?: string;
  onChange: (url: string) => void;
  onLoadingChange?: (loading: boolean) => void;
  bucket?: string;
}

export default function ImageUploader({ value, onChange, onLoadingChange, bucket = "portfolio" }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    onLoadingChange?.(true);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        alert(`Upload thất bại: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      setPreview(data.publicUrl);
      onChange(data.publicUrl);
    } catch (err) {
      alert(`Upload thất bại: ${err}`);
    } finally {
      setUploading(false);
      onLoadingChange?.(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      handleUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      handleUpload(file);
    }
  };

  return (
    <div>
      <div
        onClick={() => fileRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-[#C9A96E] transition-colors"
      >
        {preview ? (
          <div className="relative w-full aspect-video">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
              unoptimized={preview.startsWith("data:")}
            />
            {uploading && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-lg">
                <div className="text-[#C9A96E]">Đang tải lên...</div>
              </div>
            )}
          </div>
        ) : (
          <div className="py-8">
            <svg className="w-12 h-12 mx-auto text-gray-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-gray-500 text-sm">
              {uploading ? "Đang tải lên..." : "Kéo thả hoặc click để chọn ảnh"}
            </p>
          </div>
        )}
      </div>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
