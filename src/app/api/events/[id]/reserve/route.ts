export async function POST(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001') + `/events/${params.id}/reserve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}


