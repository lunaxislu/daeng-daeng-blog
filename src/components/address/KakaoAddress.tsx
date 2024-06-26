import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { CONTAINER_STYLE, MAP_CENTER, MAP_STYLE, getAnimalData } from '../const/const'

const KakaoAddress = ({ query }: { query: string }) => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>()
  const [db, setDB] = useState<string | null>(null)
  const { addressSearch } = new kakao.maps.services.Geocoder()
  const { data } = useQuery({
    queryKey: ['addressSearch'],
    queryFn: () => getAnimalData(query),
    // enabled: !!db,
    select(data) {
      return data.LOCALDATA_020301_DB.row
    },
  })

  const handleKakaoMap = (map: kakao.maps.Map) => setKakaoMap(map)

  const address2Result = () => {
    if (!kakaoMap) return
    const bounds = new kakao.maps.LatLngBounds()
    console.time('addressSearch')

    const promises = data.map((item: any) => {
      return new Promise<void>((resolve) => {
        addressSearch(item.RDNWHLADDR, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y as any, result[0].x as any)

            // 결과값으로 받은 위치를 마커로 표시합니다
            const marker = new kakao.maps.Marker({
              map: kakaoMap,
              position: coords,
            })
            // 경계 영역을 확장합니다
            bounds.extend(coords)
          }
          resolve()
        })
      })
    })
    Promise.all(promises).then(() => {
      // 모든 주소에 대해 검색이 완료된 후에 지도의 경계를 설정합니다
      kakaoMap.setBounds(bounds)
      console.timeEnd('addressSearch')
    })
    // data.forEach((item: any, index: number) => {
    //   addressSearch(item.RDNWHLADDR, (result, status) => {
    //     if (status === kakao.maps.services.Status.OK) {
    //       const coords = new kakao.maps.LatLng(result[0].y as any, result[0].x as any)

    //       // 결과값으로 받은 위치를 마커로 표시합니다
    //       const marker = new kakao.maps.Marker({
    //         map: kakaoMap,
    //         position: coords,
    //       })
    //       // 경계 영역을 확장합니다
    //       bounds.extend(coords)

    //       // 모든 주소에 대해 검색이 완료된 후에 지도의 경계를 설정합니다
    //       if (index === data.length - 1) {
    //         kakaoMap.setBounds(bounds)
    //       }
    //     }
    //   })
    // })
    // console.timeEnd('addressSearch')
  }
  useEffect(() => {
    if (!data) return
    address2Result()
  }, [db, data])

  return (
    <div style={CONTAINER_STYLE}>
      <span
        onClick={() => setDB('DB')}
        style={{ width: '120px', backgroundColor: 'wheat', color: 'black', height: '80px', textAlign: 'center' }}
      >
        도봉구
      </span>
      <Map center={MAP_CENTER} style={MAP_STYLE} onCreate={handleKakaoMap}></Map>
    </div>
  )
}

export default KakaoAddress
