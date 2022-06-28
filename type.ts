interface CroodObjType {
    lon: number
    lat: number
}

interface WeatherObjType {
    id: number
    main: string
    description: string
    icon: string
}

interface MainType {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
}

interface WindType{
    speed: number
    deg: number
}

interface CloudsType {
    all: number
}

interface SysType {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
}

export interface CityInfo {
    coord: CroodObjType
    weather: WeatherObjType[]
    base: string
    main: MainType
    visibility: number
    wind: WindType
    clouds: CloudsType
    dt: number
    sys: SysType
    timezone: number
    id: number
    name: string
    cod: number
}