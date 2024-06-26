import { useQueries } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const About = () => {
  const [state, setState] = useState(0)
  const queryKey = new Array(5).fill('render').map((el, i) => [el, String(i)])
  const queryFn = async () => {
    try {
      const res = await axios('https://jsonplaceholder.typicode.com/todos/1')

      return res.data
    } catch (err) {
      err
    }
  }
  const queries = useQueries({
    queries: queryKey.map((key) => ({
      queryKey: key,
      queryFn,
    })),
    combine(result) {
      return {
        data: result.map((s) => s.data),
        isPending: result.map((s) => s.isPending),
        isError: result.map((s) => s.isError),
        isSuccess: result.map((s) => s.isSuccess),
      }
    },
  })
  console.log(queries)

  return <form>asdff</form>
}

export default About
