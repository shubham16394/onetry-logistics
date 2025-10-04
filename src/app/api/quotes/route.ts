import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    // Get total count
    const { count } = await supabase
      .from('quotes')
      .select('*', { count: 'exact', head: true });

    // Get paginated quotes
    const { data: quotes, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { success: false, message: 'Failed to fetch quotes' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      quotes: (quotes || []).map(quote => ({
        id: quote.id,
        companyName: quote.company_name,
        contactPersonName: quote.contact_person,
        emailAddress: quote.email,
        contactNumber: quote.phone,
        pickupLocation: quote.pickup_location,
        dropLocation: quote.drop_location,
        natureOfGoods: quote.goods_description,
        weight: quote.weight,
        typeOfPacking: quote.packing_type,
        typeOfLoad: quote.load_type,
        dimensions: [quote.length, quote.width, quote.height].filter(Boolean).join(' x ') || 'Not specified',
        submittedAt: new Date(quote.created_at).toLocaleString()
      })),
      pagination: {
        page,
        limit,
        total: count || 0,
        totalPages: Math.ceil((count || 0) / limit)
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