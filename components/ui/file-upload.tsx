"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, File, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  accept?: string
  maxSize?: number
  label: string
  description: string
  required?: boolean
}

export default function FileUpload({
  onFileSelect,
  accept = "*",
  maxSize = 10 * 1024 * 1024, // 10MB
  label,
  description,
  required = false,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>("")

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError("")

      if (rejectedFiles.length > 0) {
        setError("File type not supported or file too large")
        return
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setSelectedFile(file)
        onFileSelect(file)
      }
    },
    [onFileSelect],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept === "*" ? undefined : { [accept]: [] },
    maxSize,
    multiple: false,
  })

  const removeFile = () => {
    setSelectedFile(null)
    onFileSelect(null)
    setError("")
  }

  return (
    <div className="space-y-3">
      <label className="block text-white font-semibold text-lg">
        {label} {required && <span className="text-red-400">*</span>}
      </label>

      <motion.div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-3xl p-8 cursor-pointer transition-all duration-300 backdrop-blur-md
          ${
            isDragActive
              ? "border-blue-400/60 bg-blue-500/10 shadow-lg shadow-blue-500/20"
              : "border-white/20 hover:border-white/40 bg-slate-800/30 hover:bg-slate-700/40"
          }
          ${error ? "border-red-400/60 bg-red-500/10" : ""}
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {selectedFile ? (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <File className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">{selectedFile.name}</p>
                  <p className="text-slate-400">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
              </div>
              <motion.button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile()
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 bg-red-500/20 hover:bg-red-500/30 rounded-2xl flex items-center justify-center transition-colors backdrop-blur-sm border border-red-500/20"
              >
                <X className="w-5 h-5 text-red-400" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="file-upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <p className="text-white font-semibold text-lg mb-2">
                {isDragActive ? "Drop your file here" : "Click to upload or drag and drop"}
              </p>
              <p className="text-slate-400">{description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {error && (
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 text-sm ml-1">
          {error}
        </motion.p>
      )}
    </div>
  )
}
