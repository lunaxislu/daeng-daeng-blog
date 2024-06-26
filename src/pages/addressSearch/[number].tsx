import KakaoAddress from '@/components/address/KakaoAddress'
import useKakaoLoader from '@/hooks/useKakaoLoader'
import { useRouter } from 'next/router'
import React from 'react'

const KakaoPageAPI = () => {
  const { query } = useRouter()
  const [loading, error] = useKakaoLoader()

  const number = query.number as string
  if (loading) return <div>로딩중</div>
  return <KakaoAddress query={number} />
}

export default KakaoPageAPI
