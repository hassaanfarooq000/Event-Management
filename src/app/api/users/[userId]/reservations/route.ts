export async function GET(_req: Request, { params }: { params: { userId: string } }) {
    const res = await fetch((process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:3001') + `/events/user/${params.userId}/reservations`, {
        next: { revalidate: 30 }
    });
    const data = await res.json();
    return new Response(JSON.stringify(data), { status: res.status, headers: { 'Content-Type': 'application/json' } });
}
