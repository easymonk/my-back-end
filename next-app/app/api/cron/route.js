import { NextResponse } from 'next/server';

const cron_url = process.env.CRON_URL
export async function GET () {
  console.log('hello cron');
  const res = await fetch(`${cron_url}/api/question?s=${+new Date()}`, {
    headers: {
      // 'Content-Type': 'application/json',
    },
  })
  const data = await res.json()
  console.log('data', data)
  return NextResponse.json(data);
  // return NextResponse.json({ ok: true });
}