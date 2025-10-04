// Mock data for production deployment without database
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
  }
];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Log the received data for debugging (optional)
    console.log('Received quote data:', {
      companyName: data.companyName,
      contactPersonName: data.contactPersonName,
      emailAddress: data.emailAddress,
      contactNumber: data.contactNumber,
      pickupLocation: data.pickupLocation,
      dropLocation: data.dropLocation,
      natureOfGoods: data.natureOfGoods,
      weight: data.weight,
      typeOfPacking: data.typeOfPacking,
      typeOfLoad: data.typeOfLoad,
      dimensions: data.dimensions
    });
    
    // Simulate successful save
    const quoteId = Date.now().toString();
    
    return Response.json({ 
      success: true, 
      message: 'Quote request received successfully! We will contact you soon.',
      id: quoteId 
    });
  } catch (error) {
    console.error('Error processing quote:', error);
    return Response.json(
      { success: false, message: 'Failed to process quote request' },
      { status: 500 }
    );
  }
}
