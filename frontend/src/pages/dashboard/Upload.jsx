import { useState } from "react";
import Container from "../../components/Container";
import TextInput from "../../components/vendor/form/TextInput";
import TextArea from "../../components/vendor/form/TextArea";
import SelectInput from "../../components/vendor/form/SelectInput";
import Alert from "../../components/vendor/alert/Alert";
import SubmitButton from "../../components/vendor/button/SubmitButton";
import api from "../../api/config";
import { defaults } from "../../config/defaults";

export default function Upload() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState({ status: 0, message: null });
  const [gasFee, setGasFee] = useState(defaults.gasFee);
  const [previews, setPreviews] = useState([]);
  const [dragActive, setDragActive] = useState(false);

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

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  const [formData, setFormData] = useState({
    creator: "",
    collection_name: "",
    category: "",
    price: "",
    des: "",
    files: []
  });

  const categoryOptions = [
    { content: "Art", value: "art" },
    { content: "Music", value: "music" },
    { content: "Domain Names", value: "domain_names" },
    { content: "Sport", value: "sport" },
    { content: "Collectible", value: "collectible" },
    { content: "Photography", value: "photography" },
  ];

  const calculateGasFee = (files) => {
    const baseFee = files.length * defaults.gasFee
    let totalSizeMB = 0;
    Array.from(files).forEach(f => totalSizeMB += f.size / (1024 * 1024));
    const sizeFee = Math.max(0, totalSizeMB - 1) * 0.01;
    return parseFloat((baseFee + sizeFee).toFixed(4));
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Check size (10MB limit per file for now as a safety)
    const maxSize = 10000000;
    for (let file of files) {
      if (file.size > maxSize) {
        setResult({ status: 400, message: `File "${file.name}" exceeds 10MB limit.` });
        return;
      }
    }

    setFormData(prev => ({ ...prev, files: Array.from(files) }));
    setGasFee(calculateGasFee(files));

    // Generate previews
    const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.files.length !== 2) {
      setResult({ status: 400, message: "Dual-Mint Protocol requires exactly 2 images to initialize." });
      return;
    }

    setLoading(true);
    const data = new FormData();
    data.append("creator", formData.creator);
    data.append("collection_name", formData.collection_name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("des", formData.des);
    formData.files.forEach(file => data.append("file", file));

    try {
      const response = await api.post("/nfts/add", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setResult(response.data);
      if (response.data.status === 200) {
        // Reset form
        setFormData({ creator: "", collection_name: "", category: "", price: "", des: "", files: [] });
        setPreviews([]);
        setGasFee(0.40);
      }
    } catch (error) {
      setResult({ status: 400, message: error.response?.data?.message || "Upload failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container title="Mint New NFT">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form Side */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight gradient-text uppercase">Dual Minting Protocol</h1>
              <p className="text-gray-500 font-medium">Every initialization creates a twin-set of assets with a 50/50 price split.</p>
            </div>

            <form onSubmit={handleSubmit} className="glass-card rounded-[2.5rem] p-8 md:p-12 space-y-6 shadow-2xl border-white/10">
              <Alert result={result} setResult={setResult} timer={5000} />

              <div className="space-y-4">
                <TextInput 
                  placeholder="Creator Display Name" 
                  name="creator" 
                  value={formData.creator} 
                  handleChange={handleChange} 
                  required 
                />
                <TextInput 
                  placeholder="Asset Pair Title" 
                  name="collection_name" 
                  value={formData.collection_name} 
                  handleChange={handleChange} 
                  required 
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectInput 
                    placeholder="Category" 
                    name="category" 
                    value={formData.category} 
                    options={categoryOptions} 
                    handleChange={handleChange} 
                    required 
                  />
                  <TextInput 
                    placeholder="Floor Price (ETH)" 
                    name="price" 
                    type="number" 
                    value={formData.price} 
                    handleChange={handleChange} 
                    required 
                  />
                </div>

                <TextArea 
                  placeholder="Tell the story of your masterpiece..." 
                  name="des" 
                  value={formData.des} 
                  handleChange={handleChange} 
                  rows={4} 
                />
              </div>

              {/* Gas Fee Summary */}
              <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10 flex justify-between items-center group">
                 <div>
                    <span className="text-xs font-black uppercase tracking-widest text-blue-500">Estimated Gas Fee</span>
                    <p className="text-2xl font-black text-gray-900 dark:text-white mt-1 group-hover:scale-105 transition-transform origin-left">{gasFee} ETH</p>
                 </div>
                 <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Network status</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-500 text-xs font-black mt-1 uppercase">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                       Optimal
                    </span>
                 </div>
              </div>

              <SubmitButton 
                loading={loading} 
                text="INITIALIZE MINTING" 
                className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-[1.02] transition-all duration-300"
              />
            </form>
          </div>

          {/* Preview / Upload Side */}
          <div className="space-y-8">
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`glass-card rounded-[2.5rem] p-8 min-h-[400px] flex flex-col items-center justify-center border-dashed border-2 relative group overflow-hidden transition-all duration-300 ${
                dragActive
                  ? "border-blue-500 bg-blue-600/10 shadow-lg shadow-blue-500/10 scale-[1.01]"
                  : "border-white/20 hover:border-white/30"
              }`}
            >
                <input 
                  type="file" 
                  id="file-upload" 
                  multiple 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
                
                {previews.length > 0 ? (
                  <div className="w-full grid grid-cols-2 gap-4 relative z-20">
                     {previews.map((src, i) => (
                       <div key={i} className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                          <img src={src} alt="Preview" className="w-full h-full object-cover animate-zoom-in" />
                       </div>
                     ))}
                     {formData.files.length > 4 && (
                       <div className="aspect-square rounded-2xl bg-white/5 flex items-center justify-center">
                          <span className="text-2xl font-black">+{formData.files.length - 4}</span>
                       </div>
                     )}
                  </div>
                ) : (
                  <div className="text-center space-y-4 group-hover:scale-110 transition-transform duration-500 relative z-20">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mx-auto shadow-inner">
                       <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    </div>
                    <div>
                       <h3 className="text-xl font-bold">Drop your files here</h3>
                       <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 10MB each</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute top-4 right-4 z-20">
                   <div className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/5">
                      {formData.files.length} Files Selected
                   </div>
                </div>

                {previews.length > 0 && (
                  <div className="absolute top-4 left-4 z-20">
                     <button
                       type="button"
                       onClick={(e) => {
                         e.preventDefault();
                         e.stopPropagation();
                         setFormData(prev => ({ ...prev, files: [] }));
                         setPreviews([]);
                         setGasFee(0.40);
                         const fileInput = document.getElementById("file-upload");
                         if (fileInput) fileInput.value = "";
                       }}
                       className="px-3 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-full text-[10px] font-black tracking-widest uppercase border border-red-500/20 transition-all hover:scale-105"
                     >
                       Clear Files
                     </button>
                  </div>
                )}
            </div>

            {/* Hint Box */}
            <div className="p-8 bg-amber-500/5 rounded-[2.5rem] border border-amber-500/10 space-y-2">
               <h4 className="flex items-center gap-2 text-amber-500 font-black text-sm uppercase tracking-wider">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>
                  Minting Protocol
               </h4>
               <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                  Uploading files to the decentralized web incurs computational costs. Gas fees adjust dynamically based on inventory quantity and total data weight. Ensure your wallet balance is sufficient before initializing.
               </p>
            </div>
          </div>

        </div>
      </div>
    </Container>
  );
}
