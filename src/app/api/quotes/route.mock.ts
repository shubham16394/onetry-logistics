// Mock API for quotes without database
const mockQuotes = [
  {
    id: "1",
    company_name: "ABC Logistics",
    contact_person: "John Doe",
    email: "john@abclogistics.com",
    phone: "+91 9876543210",
    pickup_location: "Mumbai, Maharashtra",
    drop_location: "Delhi, Delhi",
    goods_description: "Electronics and gadgets",
    weight: "500 kg",
    packing_type: "Cardboard boxes",
    load_type: "Full truck load",
    length: "10",
    width: "8",
    height: "6",
    created_at: "2024-10-04T10:30:00.000Z"
  },
  {
    id: "2",
    company_name: "XYZ Traders",
    contact_person: "Jane Smith",
    email: "jane@xyztraders.com",
    phone: "+91 8765432109",
    pickup_location: "Bangalore, Karnataka",
    drop_location: "Chennai, Tamil Nadu",
    goods_description: "Textile materials",
    weight: "1200 kg",
    packing_type: "Plastic wrapping",
    load_type: "Part truck load",
    length: "15",
    width: "12",
    height: "8",
    created_at: "2024-10-04T09:15:00.000Z"
  },
  {
    id: "3",
    company_name: "PQR Industries",
    contact_person: "Mike Johnson",
    email: "mike@pqrindustries.com",
    phone: "+91 7654321098",
    pickup_location: "Pune, Maharashtra",
    drop_location: "Hyderabad, Telangana",
    goods_description: "Automotive parts",
    weight: "800 kg",
    packing_type: "Wooden crates",
    load_type: "Part truck load",
    length: "12",
    width: "10",
    height: "7",
    created_at: "2024-10-04T08:45:00.000Z"
  }
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Sort by created_at (newest first)
    const sortedQuotes = [...mockQuotes].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    
    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const quotes = sortedQuotes.slice(startIndex, endIndex);
    
    return Response.json({
      success: true,
      quotes,
      pagination: {
        page,
        limit,
        total: mockQuotes.length,
        totalPages: Math.ceil(mockQuotes.length / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return Response.json(
      { success: false, message: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}
