// ... 기존 코드 ...
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { CONTAINER_STYLE, MAP_CENTER, MAP_STYLE, getAnimalData } from '../const/const'
import proj4 from 'proj4'
proj4.defs('EPSG:2097', '+proj=tmerc +lat_0=38 +lon_0=127 +k=1 +x_0=200000 +y_0=500000 +ellps=GRS80 +units=m +no_defs')
proj4.defs('EPSG:4326', '+proj=longlat +datum=WGS84 +no_defs')
proj4.defs('EPSG:3857', '+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs')
proj4.defs(
  'EPSG:5174',
  '+proj=tmerc +lat_0=38 +lon_0=127.0028902777778 +k=1 +x_0=200000 +y_0=500000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43',
)

const convertGRStoWGS84 = (x: string, y: string) => {
  // 입력 좌표값 공백 제거 및 숫자로 변환
  const cleanX = parseFloat(x.trim())
  const cleanY = parseFloat(y.trim())

  // EPSG:5174에서 EPSG:3857로 좌표 변환
  const coords3857 = proj4('EPSG:5174', 'EPSG:3857', [cleanX, cleanY])
  // console.log('EPSG:3857 좌표:', coords3857)

  // EPSG:3857에서 WGS84로 좌표 변환
  const wgs84Coords = proj4('EPSG:3857', 'EPSG:4326', coords3857)
  // console.log('WGS84 좌표:', wgs84Coords)

  const convertedCoords = { lat: wgs84Coords[1], lng: wgs84Coords[0] }
  return convertedCoords
}

const KakaoPro4 = ({ query }: { query: string }) => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>()
  const [db, setDB] = useState<string | null>(null)
  const { data } = useQuery({
    queryKey: ['pro4'],
    queryFn: () => getAnimalData(query),
    // enabled: !!db,
    select(data) {
      return data.LOCALDATA_020301_DB.row
    },
  })
  const handleKakaoMap = (map: kakao.maps.Map) => setKakaoMap(map)

  const proj42Result = () => {
    if (!kakaoMap) return
    const bounds = new kakao.maps.LatLngBounds()
    console.time('proj42Result')
    data.forEach((item: any, index: number) => {
      const wgs84Coords = convertGRStoWGS84(item.X, item.Y)
      const coords = new kakao.maps.LatLng(wgs84Coords.lat, wgs84Coords.lng)

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
    })
    console.timeEnd('proj42Result')
  }
  useEffect(() => {
    if (!data) return
    proj42Result()
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

export default KakaoPro4
// ... 기존 코드 ...
