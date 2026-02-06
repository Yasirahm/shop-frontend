import React from 'react';

export default function DownloadApp() {
  return (
    <div className="text-center p-8 bg-white min-h-200px">
      <h1 className="text-3xl font-bold text-black mb-4"> Download Our App</h1>
      <p className="text-lg text-black mb-6">
        Experience NewAge Versatile Studio on your Android device.
      </p>
      <a
        href="/newageversatilestudio.apk"
        download
        className="inline-block mt-4 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg shadow hover:bg-yellow-300 transition"
      >
        Download 
      </a>
    </div>
  );
}
