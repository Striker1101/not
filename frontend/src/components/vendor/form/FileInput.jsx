import React, { useState, useEffect } from "react";
import classNames from "classnames";

const FileInput = ({
  placeholder,
  handleChange,
  name,
  value,
  bg = "blue",
  required = true,
  refInput,
  multiple = false,
  files = [],
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [previews, setPreviews] = useState([]);

  // Generate previews when files change
  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    const objectUrls = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        url: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));

    setPreviews(objectUrls);

    // Cleanup object URLs to avoid memory leaks
    return () => {
      objectUrls.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [files]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (refInput.current) {
        refInput.current.files = e.dataTransfer.files;
        // Create and dispatch standard change event
        const event = new Event("change", { bubbles: true });
        refInput.current.dispatchEvent(event);
        if (handleChange) {
          handleChange(event);
        }
      }
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (refInput.current) {
      refInput.current.value = "";
      // Create and dispatch standard change event
      const event = new Event("change", { bubbles: true });
      refInput.current.dispatchEvent(event);
      if (handleChange) {
        handleChange(event);
      }
    }
  };

  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const hasFiles = files && files.length > 0;

  return (
    <div className="w-full mb-6">
      {placeholder && (
        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 px-2">
          {placeholder} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => refInput.current && refInput.current.click()}
        className={classNames(
          "relative min-h-[180px] w-full rounded-[2rem] border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 overflow-hidden",
          dragActive
            ? "border-blue-500 bg-blue-600/10 shadow-lg shadow-blue-500/10 scale-[1.01]"
            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]",
          hasFiles ? "border-solid border-emerald-500/30 bg-emerald-500/[0.02]" : ""
        )}
      >
        {/* Hidden native input */}
        <input
          type="file"
          ref={refInput}
          name={name}
          multiple={multiple}
          required={required}
          onChange={handleChange}
          className="hidden"
          accept="image/*"
        />

        {hasFiles ? (
          <div className="w-full space-y-4 animate-fade-in relative z-20">
            <div className="flex flex-col items-center justify-center space-y-3">
              {previews.map((preview, i) => (
                <div key={i} className="flex flex-col items-center space-y-2">
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="w-full h-full object-cover animate-zoom-in"
                    />
                  </div>
                  <div className="max-w-xs text-center">
                    <p className="text-xs font-semibold text-white truncate px-2">
                      {preview.name}
                    </p>
                    <p className="text-[10px] font-black text-gray-500 uppercase mt-0.5">
                      {formatBytes(preview.size)}
                    </p>
                  </div>
                </div>
              ))}
              
              {!previews.length && Array.from(files).map((file, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-xs font-semibold text-white">{file.name}</span>
                </div>
              ))}

              <button
                type="button"
                onClick={handleRemove}
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-red-500/20 hover:scale-105"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Remove File
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4 relative z-20">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 shadow-inner group-hover:scale-110 transition-transform duration-300">
              <svg className="w-7 h-7 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white tracking-wide">
                Drag & drop your proof here
              </p>
              <p className="text-xs text-gray-500 mt-1 font-medium">
                or click to browse from files
              </p>
            </div>
            <span className="inline-block text-[9px] font-black uppercase tracking-widest text-gray-600 bg-white/[0.02] border border-white/5 px-3 py-1 rounded-full">
              PNG, JPG, JPEG up to 10MB
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileInput;

