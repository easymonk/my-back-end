'use client'
import './blog.css'
export default function Page ({ params }) {
  console.log(params)
  function toBaidu () {
    window.location.href = 'https://www.baidu.com'
  }
  return <div className='blog' onClick={toBaidu}>My Post: {params.slug}</div>
}