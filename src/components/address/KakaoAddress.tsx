import { useQuery } from '@tanstack/react-query'
import React, { Profiler, useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import { CONTAINER_STYLE, MAP_CENTER, MAP_STYLE, getAnimalData } from '../const/const'

const KakaoAddress = ({ query }: { query: string }) => {
  const [kakaoMap, setKakaoMap] = useState<kakao.maps.Map>()
  const [db, setDB] = useState<string | null>(null)
  const { addressSearch } = new kakao.maps.services.Geocoder()
  const { data } = useQuery({
    queryKey: ['addressSearch'],
    queryFn: () => getAnimalData(query),
    enabled: !!db,
  })

  const handleKakaoMap = (map: kakao.maps.Map) => setKakaoMap(map)

  const address2Result = () => {
    if (!kakaoMap) return
    if (!data) return
    const bounds = new kakao.maps.LatLngBounds()
    console.time('addressSearch')

    const promises = data.map((item: any) => {
      console.log('🚀 ~ KakaoAddress ~ data:', data)
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
  }

  useEffect(() => {
    if (!data) return
    address2Result()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [db, data])

  return (
    <Profiler id="addressSearch" onRender={onRenderCallback as any}>
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

export default KakaoAddress
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
