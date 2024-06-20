import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
import { sleep } from '../../lib/utils';

export default async function Page () {
  await sleep(1000)
  return (
    <section>
      <h1>Dashboard</h1>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  );
}