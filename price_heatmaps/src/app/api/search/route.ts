import { Property } from '@/app/models/Property';
import { connectDB } from '../../lib/db';
import PropertySchema from '../../lib/PropertySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await connectDB();

        const query = req.nextUrl.searchParams.get('q') || '' as string;

        if (typeof query !== 'string') {
            throw new Error('Invalid query');
        }

        const data = await PropertySchema.find();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500 });
    }
}