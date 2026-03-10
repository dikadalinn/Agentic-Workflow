'use client'

import { useState, useRef } from 'react'
import { Upload, Camera, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AvatarUploadProps {
  value?: string
  onChange: (url: string | undefined) => void
  className?: string
}

export function AvatarUpload({ value, onChange, className }: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | undefined>(value)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File | null) => {
    if (!file) {
      setPreview(undefined)
      onChange(undefined)
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
      onChange(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemove = () => {
    setPreview(undefined)
    onChange(undefined)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      {/* Avatar upload area */}
      <div
        onClick={preview ? undefined : handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative group flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-all',
          isDragging
            ? 'border-[#FF6B35] bg-[#FF6B35]/10'
            : 'border-white/20 hover:border-[#FF6B35]/50 hover:bg-white/5',
          preview && 'border-solid border-[#FF6B35]'
        )}
      >
        {preview ? (
          <>
            {/* Preview image */}
            <img
              src={preview}
              alt="Avatar preview"
              className="h-full w-full rounded-full object-cover"
            />

            {/* Remove button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleRemove()
              }}
              className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Change button */}
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
              <Camera className="h-6 w-6 text-white" />
            </div>
          </>
        ) : (
          <>
            {/* Upload placeholder */}
            <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-gray-300">
              <Upload className="h-8 w-8" />
              <span className="text-xs">Upload photo</span>
            </div>
          </>
        )}

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
          className="hidden"
        />
      </div>

      {/* Helper text */}
      <p className="text-xs text-gray-500">JPG, PNG or WebP (max 5MB)</p>
    </div>
  )
}
