// ... 기존 코드 ...
import { useQuery } from '@tanstack/react-query'
import React, { Profiler, useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { CONTAINER_STYLE, MAP_CENTER, MAP_STYLE, getAnimalData } from '../const/const'
import proj4 from 'proj4/'

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

  // EPSG:3857에서 WGS84로 좌표 변환
  const wgs84Coords = proj4('EPSG:5174', 'EPSG:4326', [cleanX, cleanY])
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
    enabled: !!db,
  })
  const handleKakaoMap = (map: kakao.maps.Map) => {
    if (kakaoMap) return
    setKakaoMap(map)
  }

  console.log('🚀 ~ KakaoPro4 ~ data:', data)
  const proj42Result = () => {
    if (!kakaoMap) return
    if (!data) return
    const bounds = new kakao.maps.LatLngBounds()
    console.time('proj42Result')
    data.forEach((item: any, index: number) => {
      if (!item.X || !item.Y) return
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
    <Profiler id="proj4" onRender={onRenderCallback as any}>
      <div style={CONTAINER_STYLE}>
        <span
          onClick={() => setDB('DB')}
          style={{ width: '120px', backgroundColor: 'wheat', color: 'black', height: '80px', textAlign: 'center' }}
        >
          도봉구
        </span>
        <Map center={MAP_CENTER} style={MAP_STYLE} onCreate={handleKakaoMap}></Map>
      </div>
    </Profiler>
  )
}

export default KakaoPro4
// ... 기존 코드 ...
function onRenderCallback(
  id: string, // "id" prop의 값
  phase: 'mount' | 'update' | 'nested-update', // "mount" 또는 "update"
  actualDuration: number, // 커밋된 업데이트의 지속 시간
  baseDuration: number, // 메모이제이션 없이 하위 트리를 렌더링하는 데 걸리는 예상 시간
  startTime: number, // React가 측정을 시작한 시간
  commitTime: number, // React가 커밋한 시간
  interactions: Set<string>, // 이 업데이트와 관련된 상호작용의 집합
) {
  // 프로파일링 데이터를 처리하는 로직
  console.log({
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
    interactions,
  })
}
