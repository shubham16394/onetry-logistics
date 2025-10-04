import { NextRequest, NextResponse } from 'next/server';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.json();
    
    // Add timestamp and unique ID
    const quoteData = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      ...formData
    };

    // Create data directory if it doesn't exist
    const dataDir = path.join(process.cwd(), 'data');
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Read existing quotes or create empty array
    const quotesFilePath = path.join(dataDir, 'quotes.json');
    let existingQuotes = [];
    
    try {
      if (existsSync(quotesFilePath)) {
        const fileContent = await readFile(quotesFilePath, 'utf-8');
        existingQuotes = JSON.parse(fileContent);
      }
    } catch (error) {
      console.log('No existing quotes file, creating new one');
      existingQuotes = [];
    }

    // Add new quote to the beginning of the array
    existingQuotes.unshift(quoteData);

    // Keep only the last 1000 quotes to prevent file from getting too large
    if (existingQuotes.length > 1000) {
      existingQuotes = existingQuotes.slice(0, 1000);
    }

    // Save updated quotes
    await writeFile(quotesFilePath, JSON.stringify(existingQuotes, null, 2));

    console.log(`New quote saved: ${quoteData.id} from ${quoteData.companyName}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Quote request saved successfully',
      quoteId: quoteData.id
    });

  } catch (error) {
    console.error('Error saving quote:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to save quote request' },
      { status: 500 }
    );
  }
}
