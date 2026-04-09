import { useState } from "react";
import { Link } from "react-router";
import { Download, Copy, Check, Archive, Loader2, Lock, Eye, EyeOff } from "lucide-react";
import JSZip from "jszip";
import { illustrationData } from "../data/illustration-data";
import { photographyData } from "../data/photography-data";
import { brandIdentityData } from "../data/brand-identity-data";

// Import portrait for About page
import portraitImage from "figma:asset/e2ba8a312a67517ad80ca9c56c5f2bec09bcc98c.png";

const CORRECT_PASSWORD = "ALLMINE1989!";

export default function DownloadAssets() {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState({ current: 0, total: 0 });
  
  // Password protection
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("downloadAssetsAuth") === "true";
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("downloadAssetsAuth", "true");
      setPasswordError(false);
    } else {
      setPasswordError(true);
      setPassword("");
    }
  };

  // If not authenticated, show password form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-[2%]">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <Lock className="size-10 text-gray-600" />
            </div>
            <h1 className="text-[48px] font-semibold mb-2">Protected Area</h1>
            <p className="text-[16px] text-gray-600">
              Enter password to access asset downloads
            </p>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-[16px] font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(false);
                  }}
                  className={`w-full px-4 py-3 pr-12 text-[16px] border rounded-lg focus:outline-none focus:ring-2 ${
                    passwordError
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-black"
                  }`}
                  placeholder="Enter password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-gray-600" />
                  ) : (
                    <Eye className="size-5 text-gray-600" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-[14px] text-red-600 mt-2">
                  Incorrect password. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-black text-white text-[16px] font-medium hover:bg-gray-800 transition-colors rounded-lg"
            >
              Unlock
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link 
              to="/" 
              className="text-[16px] text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Collect all assets
  const allAssets: Array<{ src: string; category: string; title: string }> = [];

  // Add portrait
  allAssets.push({
    src: portraitImage,
    category: "About",
    title: "Portrait Image",
  });

  // Add illustration assets
  Object.entries(illustrationData).forEach(([key, folder]) => {
    if (folder.illustrations) {
      folder.illustrations.forEach((item: any, index: number) => {
        allAssets.push({
          src: item.src,
          category: `Illustration - ${folder.title}`,
          title: item.title || `Image ${index + 1}`,
        });
      });
    }
    if (folder.projects) {
      folder.projects.forEach((item: any, index: number) => {
        allAssets.push({
          src: item.image,
          category: `Illustration - ${folder.title}`,
          title: item.title || `Image ${index + 1}`,
        });
      });
    }
  });

  // Add photography assets
  Object.entries(photographyData).forEach(([key, folder]) => {
    if (folder.photos) {
      folder.photos.forEach((photo: any, index: number) => {
        allAssets.push({
          src: photo.src,
          category: `Photography - ${folder.title}`,
          title: photo.title || `Photo ${index + 1}`,
        });
      });
    }
  });

  // Add brand identity assets
  Object.entries(brandIdentityData).forEach(([key, folder]) => {
    if (folder.images) {
      folder.images.forEach((image: any, index: number) => {
        allAssets.push({
          src: image.src,
          category: `Brand Identity - ${folder.title}`,
          title: image.title || `Image ${index + 1}`,
        });
      });
    }
  });

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownload = (src: string, filename: string) => {
    // For figma:asset URLs, they will be resolved by the browser
    // For external URLs, this will trigger download
    const link = document.createElement("a");
    link.href = src;
    link.download = filename;
    link.click();
  };

  const exportAsJSON = () => {
    const data = {
      total: allAssets.length,
      assets: allAssets,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-assets-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportAsCSV = () => {
    const csvContent = [
      ["Category", "Title", "URL"].join(","),
      ...allAssets.map(asset => 
        [asset.category, asset.title, asset.src].map(field => `"${field}"`).join(",")
      ),
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolio-assets-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadAllAssets = async () => {
    setIsDownloading(true);
    setDownloadProgress({ current: 0, total: allAssets.length });
    
    const zip = new JSZip();
    const promises: Promise<void>[] = [];

    allAssets.forEach((asset, index) => {
      // Clean the URL - remove query params for cleaner processing
      const cleanUrl = asset.src.split('?')[0];
      
      const promise = fetch(asset.src)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.blob();
        })
        .then(blob => {
          // Sanitize filename by removing special characters
          const sanitizedCategory = asset.category.replace(/[^a-z0-9]/gi, '_');
          const sanitizedTitle = asset.title.replace(/[^a-z0-9]/gi, '_');
          
          // Detect extension from URL or blob type
          let extension = 'png';
          if (cleanUrl.includes('.jpg') || cleanUrl.includes('.jpeg')) {
            extension = 'jpg';
          } else if (cleanUrl.includes('.webp')) {
            extension = 'webp';
          } else if (blob.type.includes('jpeg')) {
            extension = 'jpg';
          } else if (blob.type.includes('webp')) {
            extension = 'webp';
          }
          
          // Create folder structure in ZIP
          zip.file(`${sanitizedCategory}/${sanitizedTitle}.${extension}`, blob);
          setDownloadProgress(prev => ({ ...prev, current: index + 1 }));
        })
        .catch(err => {
          console.error(`Failed to fetch ${asset.title} (${asset.src}):`, err);
          // Continue even if one asset fails
          setDownloadProgress(prev => ({ ...prev, current: index + 1 }));
        });
      promises.push(promise);
    });

    try {
      await Promise.all(promises);
      const content = await zip.generateAsync({ 
        type: "blob",
        compression: "DEFLATE",
        compressionOptions: { level: 6 }
      });
      const url = URL.createObjectURL(content);
      const link = document.createElement("a");
      link.href = url;
      link.download = `portfolio-assets-${Date.now()}.zip`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Failed to create ZIP:", err);
      alert("Failed to create ZIP file. Please try again or download individually.");
    } finally {
      setIsDownloading(false);
      setDownloadProgress({ current: 0, total: 0 });
    }
  };

  // Group by category
  const groupedAssets = allAssets.reduce((acc, asset) => {
    if (!acc[asset.category]) {
      acc[asset.category] = [];
    }
    acc[asset.category].push(asset);
    return acc;
  }, {} as Record<string, typeof allAssets>);

  return (
    <div className="min-h-screen bg-white py-12 px-[2%]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            to="/" 
            className="inline-block mb-6 text-[20px] hover:text-gray-600 transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <h1 className="text-[64px] font-semibold mb-4">Download Assets</h1>
          <p className="text-[20px] text-gray-600 mb-8">
            Total assets: {allAssets.length}
          </p>

          {/* Export Buttons */}
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={exportAsJSON}
              disabled={isDownloading}
              className="px-6 py-3 bg-black text-white text-[16px] hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="size-5" />
              Export as JSON
            </button>
            <button
              onClick={exportAsCSV}
              disabled={isDownloading}
              className="px-6 py-3 bg-black text-white text-[16px] hover:bg-gray-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="size-5" />
              Export as CSV
            </button>
            <button
              onClick={downloadAllAssets}
              disabled={isDownloading}
              className="px-6 py-3 bg-green-600 text-white text-[16px] hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <Loader2 className="size-5 animate-spin" />
              ) : (
                <Archive className="size-5" />
              )}
              {isDownloading 
                ? `Downloading ${downloadProgress.current}/${downloadProgress.total}...` 
                : "Download All as ZIP"}
            </button>
          </div>

          {/* Progress Bar */}
          {isDownloading && (
            <div className="mt-6">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-green-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${(downloadProgress.current / downloadProgress.total) * 100}%` }}
                />
              </div>
              <p className="text-[14px] text-gray-600 mt-2 text-center">
                Downloading {downloadProgress.current} of {downloadProgress.total} assets... Please wait.
              </p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mb-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-[20px] font-semibold mb-3">How to Download:</h2>
          <ul className="text-[16px] text-gray-700 space-y-2">
            <li>• <strong>Individual files:</strong> Right-click on any asset and select "Save image as..."</li>
            <li>• <strong>Figma Assets:</strong> These are internal Figma assets - they work in the app but may need special handling to download</li>
            <li>• <strong>External URLs:</strong> Can be downloaded directly</li>
            <li>• <strong>Export list:</strong> Use JSON or CSV export to get all URLs for batch downloading</li>
          </ul>
        </div>

        {/* Assets Grid */}
        {Object.entries(groupedAssets).map(([category, assets]) => (
          <div key={category} className="mb-12">
            <h2 className="text-[32px] font-semibold mb-6 border-b pb-2">
              {category} ({assets.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assets.map((asset, index) => (
                <div
                  key={`${category}-${index}`}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image Preview */}
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={asset.src}
                      alt={asset.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>

                  {/* Asset Info */}
                  <div className="p-4">
                    <p className="text-[16px] font-medium mb-2 truncate" title={asset.title}>
                      {asset.title}
                    </p>
                    
                    {/* URL Display */}
                    <div className="flex items-center gap-2 mb-3">
                      <code className="text-[12px] bg-gray-100 px-2 py-1 rounded flex-1 truncate" title={asset.src}>
                        {asset.src.length > 40 ? `${asset.src.substring(0, 40)}...` : asset.src}
                      </code>
                      <button
                        onClick={() => handleCopyUrl(asset.src)}
                        className="p-2 hover:bg-gray-100 rounded transition-colors"
                        title="Copy URL"
                      >
                        {copiedUrl === asset.src ? (
                          <Check className="size-4 text-green-600" />
                        ) : (
                          <Copy className="size-4" />
                        )}
                      </button>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <a
                        href={asset.src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-3 py-2 text-center text-[14px] border border-gray-300 hover:bg-gray-50 transition-colors rounded"
                      >
                        Open
                      </a>
                      <button
                        onClick={() => handleDownload(asset.src, `${asset.title}.png`)}
                        className="flex-1 px-3 py-2 text-center text-[14px] bg-black text-white hover:bg-gray-800 transition-colors rounded flex items-center justify-center gap-2"
                      >
                        <Download className="size-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-[16px] font-semibold mb-2">Note about Figma Assets:</h3>
          <p className="text-[14px] text-gray-700">
            Assets with <code className="bg-yellow-100 px-1 rounded">figma:asset</code> URLs are virtual module paths 
            used internally by Figma. To download these, you may need to:
          </p>
          <ol className="text-[14px] text-gray-700 mt-2 ml-4 list-decimal space-y-1">
            <li>Right-click on the image preview and "Save image as..."</li>
            <li>Or open the image in a new tab and download from there</li>
            <li>For batch downloading, consider using the exported JSON/CSV with a download manager</li>
          </ol>
        </div>
      </div>
    </div>
  );
}