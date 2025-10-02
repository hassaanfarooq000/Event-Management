export async function GET() {
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001') + '/events', {
        next: { revalidate: 30 }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}


