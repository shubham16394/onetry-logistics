'use client';

import { useState, useEffect } from 'react';

interface Quote {
  id: string;
  timestamp: string;
  submittedAt: string;
  companyName: string;
  contactPersonName: string;
  contactNumber: string;
  emailAddress: string;
  pickupLocation: string;
  dropLocation: string;
  natureOfGoods: string;
  weight: string;
  typeOfPacking: string;
  typeOfLoad: string;
  dimensions: string;
}

interface QuotesResponse {
  quotes: Quote[];
  total: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export default function QuotesAdmin() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  const fetchQuotes = async (page: number = 1) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/quotes?page=${page}&limit=10`);
      const data: QuotesResponse = await response.json();
      
      setQuotes(data.quotes || []);
      setTotalPages(data.totalPages || 0);
      setTotal(data.total || 0);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const exportToCSV = () => {
    const headers = [
      'Date', 'Company Name', 'Contact Person', 'Phone', 'Email', 
      'Pickup Location', 'Drop Location', 'Nature of Goods', 'Weight', 
      'Packing Type', 'Load Type', 'Dimensions'
    ];
    
    const csvContent = [
      headers.join(','),
      ...quotes.map(quote => [
        quote.submittedAt,
        quote.companyName,
        quote.contactPersonName,
        quote.contactNumber,
        quote.emailAddress,
        quote.pickupLocation,
        quote.dropLocation,
        quote.natureOfGoods,
        quote.weight,
        quote.typeOfPacking,
        quote.typeOfLoad,
        quote.dimensions
      ].map(field => `"${field}"`).join(','))
    ].join('\\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quotes-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Quote Requests</h1>
              <p className="text-gray-700 mt-2 font-medium">Manage and view all quote requests for OneTry Logistics</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => fetchQuotes(currentPage)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Refresh
              </button>
              {quotes.length > 0 && (
                <button
                  onClick={exportToCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Export CSV
                </button>
              )}
            </div>
          </div>
          
          <div className="mt-4 text-sm text-gray-700 font-medium">
            Total Quotes: {total} | Page {currentPage} of {totalPages}
          </div>
        </div>

        {/* Quotes List */}
        {quotes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No quotes yet</h3>
            <p className="text-gray-600 font-medium">Quote requests will appear here when submitted</p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div key={quote.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h3 className="text-xl font-semibold text-blue-600">{quote.companyName}</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
                        ID: {quote.id}
                      </span>
                    </div>
                    
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-800">Contact:</span> <span className="text-gray-900">{quote.contactPersonName}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Phone:</span> <span className="text-gray-900">{quote.contactNumber}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Email:</span> <span className="text-gray-900">{quote.emailAddress}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Route:</span> <span className="text-gray-900">{quote.pickupLocation} → {quote.dropLocation}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Goods:</span> <span className="text-gray-900">{quote.natureOfGoods}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-800">Weight:</span> <span className="text-gray-900">{quote.weight}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-700 mb-2 font-medium">{quote.submittedAt}</div>
                    <button
                      onClick={() => setSelectedQuote(quote)}
                      className="bg-gray-100 text-gray-800 px-3 py-1 rounded hover:bg-gray-200 transition font-medium"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => fetchQuotes(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => fetchQuotes(page)}
                className={`px-4 py-2 border rounded-lg ${
                  currentPage === page 
                    ? 'bg-blue-600 text-white border-blue-600' 
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => fetchQuotes(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Quote Details</h2>
                <button
                  onClick={() => setSelectedQuote(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Company Information</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium text-gray-800">Company:</span> <span className="text-gray-900">{selectedQuote.companyName}</span></div>
                      <div><span className="font-medium text-gray-800">Contact Person:</span> <span className="text-gray-900">{selectedQuote.contactPersonName}</span></div>
                      <div><span className="font-medium text-gray-800">Phone:</span> <span className="text-gray-900">{selectedQuote.contactNumber}</span></div>
                      <div><span className="font-medium text-gray-800">Email:</span> <span className="text-gray-900">{selectedQuote.emailAddress}</span></div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Shipment Details</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium text-gray-800">Pickup:</span> <span className="text-gray-900">{selectedQuote.pickupLocation}</span></div>
                      <div><span className="font-medium text-gray-800">Drop:</span> <span className="text-gray-900">{selectedQuote.dropLocation}</span></div>
                      <div><span className="font-medium text-gray-800">Goods:</span> <span className="text-gray-900">{selectedQuote.natureOfGoods}</span></div>
                      <div><span className="font-medium text-gray-800">Weight:</span> <span className="text-gray-900">{selectedQuote.weight}</span></div>
                      <div><span className="font-medium text-gray-800">Packing:</span> <span className="text-gray-900">{selectedQuote.typeOfPacking}</span></div>
                      <div><span className="font-medium text-gray-800">Load Type:</span> <span className="text-gray-900">{selectedQuote.typeOfLoad}</span></div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Dimensions</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded text-gray-900 font-medium">{selectedQuote.dimensions}</p>
                </div>

                <div className="text-sm text-gray-700 border-t pt-4">
                  <div className="font-medium text-gray-800">Quote ID: <span className="text-gray-900">{selectedQuote.id}</span></div>
                  <div className="font-medium text-gray-800">Submitted: <span className="text-gray-900">{selectedQuote.submittedAt}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
