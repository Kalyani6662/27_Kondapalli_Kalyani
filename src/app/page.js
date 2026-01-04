"use client";
import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 border-b shadow-sm">
        <div className="text-2xl font-bold text-blue-700">SEC-AI Analyzer</div>
        <div className="space-x-8 font-semibold">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/analyze" className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">Analyze Now</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-24 px-4">
        <h1 className="text-5xl font-extrabold mb-6">Financial Research at <span className="text-blue-600">AI Speed</span></h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Extract deep insights from SEC 10-K and 10-Q filings. Ask questions, detect risks, and summarize financial health instantly.
        </p>
        <Link href="/analyze" className="bg-blue-600 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-blue-700 transition">
          Launch Dashboard
        </Link>
      </header>

      {/* Info Section */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-20 px-6">
        <div className="p-6 border rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg mb-2">Smart Retrieval</h3>
          <p className="text-gray-500">Finds specific data across hundreds of pages using RAG technology.</p>
        </div>
        <div className="p-6 border rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg mb-2">Accurate Answers</h3>
          <p className="text-gray-500">AI answers are grounded specifically in the uploaded document text.</p>
        </div>
        <div className="p-6 border rounded-2xl shadow-sm">
          <h3 className="font-bold text-lg mb-2">Secure Processing</h3>
          <p className="text-gray-500">Your filings are processed locally in the RAG engine for privacy.</p>
        </div>
      </section>
    </div>
  );
}