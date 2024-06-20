export async function PostFeed () {
  await sleep(1000)
  return (
    <div>
      <h1>Post Feed</h1>
    </div>
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export function Weather() {
  return (
    <div>
      <h1>Weather</h1>
    </div>
  );
}