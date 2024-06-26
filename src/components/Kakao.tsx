import useKakaoLoader from '@/hooks/useKakaoLoader'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { CSSProperties, useEffect, useState } from 'react'
import { Map, MapMarker, MapMarkerProps } from 'react-kakao-maps-sdk'
import { CONTAINER_STYLE, I_CustomMarkerProps } from './const/const'

const getAnimalHospitalData = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_HOSPITAL}`,
})
const MAP_STYLE: CSSProperties = {
  width: '100%',
  height: '600px',
  position: 'relative',
  overflow: 'hidden',
}
const MAP_CENTER = { lat: 37.5616381543437, lng: 126.996862574927 }
const getAnimalData = async () => {
  const { data } = await getAnimalHospitalData('LOCALDATA_020301_DB/1/10/01')
  return data
}

const Kakao = () => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>()
  const [markers, setMarkers] = useState<I_CustomMarkerProps[]>([])
  const [db, setDB] = useState<string | null>(null)
  const { addressSearch } = new kakao.maps.services.Geocoder()
  const { data } = useQuery({
    queryKey: ['animal_hospital'],
    queryFn: getAnimalData,
    enabled: !!db,
    select(data) {
      return data.LOCALDATA_020301_DB.row
    },
  })

  const handleKakaoMap = (map: kakao.maps.Map) => setKakaoMap(map)

  const address2Result = () => {
    if (!kakaoMap) return
    const bounds = new kakao.maps.LatLngBounds()

    data.forEach((item: any, index: number) => {
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

          // 모든 주소에 대해 검색이 완료된 후에 지도의 경계를 설정합니다
          if (index === data.length - 1) {
            kakaoMap.setBounds(bounds)
          }
        }
      })
    })
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

export default Kakao

// function pro42WGS() {
//   if (!kakaoMap) return;
//   console.log('???');
//   const bounds = new kakao.maps.LatLngBounds();
//   data.forEach((item, index) => {
//     const WGS84s = convertGRStoWGS84(item.X, item.Y);
//     const coords = new kakao.maps.LatLng(WGS84s.lat, WGS84s.lng);
//     const marker = new kakao.maps.Marker({
//       map: kakaoMap,
//       position: coords,
//     });
//     // 경계 영역을 확장합니다
//     bounds.extend(coords);

//     // 모든 주소에 대해 검색이 완료된 후에 지도의 경계를 설정합니다
//     if (index === data.length - 1) {
//       kakaoMap.setBounds(bounds);
//     }
//   });
// }

// function querySearchPlaces(map: kakao.maps.Map | null, resMarkers: I_CustomMarkerProps[]) {
//   if (!map) return []
//   if (!resMarkers) return []
//   const bounds = new kakao.maps.LatLngBounds()
//   resMarkers.forEach((marker) => {
//     bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng))
//   })
//   setMarkers(resMarkers)
// }
