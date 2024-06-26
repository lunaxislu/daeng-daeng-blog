import Image from 'next/image'
import { Inter } from 'next/font/google'
import { FormEvent, useState } from 'react'
import axios from 'axios'
import { headers } from 'next/headers'
import { checkPrimeSync } from 'crypto'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [state, setState] = useState<{
    name: string
    file: null | File
  }>({
    name: '',
    file: null,
  })
  console.log(state)
  const handler = async (e: FormEvent) => {
    const header = {}
    e.preventDefault()
    const formData = new FormData()
    formData.append('file', state.file as File)

    try {
      const res = await axios.post('api/hello', formData, {
        headers: {
          'Accept-Encoding': 'deflate, br',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      })
      // console.log('🚀 ~ handler ~ res:', res)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={handler}>
      <input
        onChange={(e) => {
          setState((pre) => ({
            ...pre,
            name: e.target.value,
          }))
        }}
      />
      <input
        type="file"
        onChange={(e) => {
          setState((pre) => ({
            ...pre,
            file: e.target.files && e.target.files[0],
          }))
        }}
      />
      <button type="submit">버튼</button>
    </form>
  )
}

function fileToArrayBuffer(file: Blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (event) {
      const arrayBuffer = event.target!.result
      resolve(arrayBuffer)
    }

    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsDataURL(file)
  })
}
