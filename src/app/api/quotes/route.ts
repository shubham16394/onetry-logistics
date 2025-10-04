import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    const quotesFilePath = path.join(process.cwd(), 'data', 'quotes.json');
    
    if (!existsSync(quotesFilePath)) {
      return NextResponse.json({ 
        quotes: [], 
        total: 0, 
        page: 1, 
        totalPages: 0 
      });
    }

    const fileContent = await readFile(quotesFilePath, 'utf-8');
    const allQuotes = JSON.parse(fileContent);
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const quotes = allQuotes.slice(startIndex, endIndex);
    
    const totalPages = Math.ceil(allQuotes.length / limit);

    return NextResponse.json({
      quotes,
      total: allQuotes.length,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    });

  } catch (error) {
    console.error('Error reading quotes:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to load quotes' },
      { status: 500 }
    );
  }
}
