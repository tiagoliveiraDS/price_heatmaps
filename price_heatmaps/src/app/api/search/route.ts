import { getConnectionDB } from '../persistence/db';
import PropertySchema from '../persistence/PropertySchema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        await getConnectionDB();
    
        const query = req.nextUrl.searchParams.get('q') || '' as string;

        if (typeof query !== 'string') {
            throw new Error('Invalid query');
        }

        const data = await PropertySchema.find({
            $or: [
                { district: { $regex: query, $options: 'i' } },
                { county: { $regex: query, $options: 'i' } },
                { parish: { $regex: query, $options: 'i' } },
            ]
        });

        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500 });
    }
}