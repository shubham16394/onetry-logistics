import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Insert quote into Supabase
    const { data: quote, error } = await supabase
      .from('quotes')
      .insert([{
        company_name: data.companyName,
        contact_person: data.contactPerson,
        email: data.email,
        phone: data.phone,
        pickup_location: data.pickupLocation,
        drop_location: data.dropLocation,
        goods_description: data.goodsDescription,
        weight: data.weight,
        packing_type: data.packingType,
        load_type: data.loadType,
        length: data.length || null,
        width: data.width || null,
        height: data.height || null,
      }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return Response.json(
        { success: false, message: 'Failed to save quote to database' },
        { status: 500 }
      );
    }
    
    return Response.json({ 
      success: true, 
      message: 'Quote saved successfully',
      id: quote.id 
    });
  } catch (error) {
    console.error('Error saving quote:', error);
    return Response.json(
      { success: false, message: 'Failed to save quote' },
      { status: 500 }
    );
  }
}
