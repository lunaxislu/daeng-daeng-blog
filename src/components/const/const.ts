import axios from 'axios'
import { CSSProperties } from 'react'
import { MapMarkerProps } from 'react-kakao-maps-sdk'
export interface I_CustomMarkerProps extends MapMarkerProps {
  id: string
  position: { lng: number; lat: number } //  marker를 배열 돌릴 때 key값을 넣으려면 type custom 해야함
  address: string
}
export const CONTAINER_STYLE: CSSProperties = {
  width: '80%',
  margin: '0 auto',
  height: '100vh',
  display: 'flex',
  placeContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}

export const MAP_STYLE: CSSProperties = {
  width: '100%',
  height: '600px',
  position: 'relative',
  overflow: 'hidden',
}

export const MAP_CENTER = { lat: 37.5616381543437, lng: 126.996862574927 }
const getAnimalHospitalData = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_ANIMAL_HOSPITAL}`,
})
export const getAnimalData = async (query: string) => {
  const { data } = await getAnimalHospitalData(`LOCALDATA_020301_DB/1/${query}/01`)
  return data
}
