import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../lib/db';
import PropertyData from '../../models/PropertyData';
import { NextRequest, NextResponse } from 'next/server';
import { stat } from 'fs';

export async function GET(req: NextRequest) {
    try {
        await connect();

        const query = req.nextUrl.searchParams.get('q') || '' as string;

        if (typeof query !== 'string') {
            throw new Error('Invalid query');
        }

        const data = await PropertyData.find();
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {status: 500 });
    }
}