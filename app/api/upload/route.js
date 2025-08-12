import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get(`file`);
        
        if (!file) {
            return NextResponse.json({ error: `No file provided` }, {status: 400});
        }

        const blob = await put(file.name, file, {
            access: `public` 
        });

        return NextResponse.json(blob);
    } catch (e) {
        console.error(`Upload error:`, e);
        return NextResponse.json({ error: `Filed to upload file` }, { status: 500 });
    }
}

export async function GET() {
    try {
        const { list } = require('@vercel/blob')
        const { blobs } = await list();
        return NextResponse.json(blobs);
    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }