<script setup lang="ts">
import { CityInfo } from '@/type'

const config = useRuntimeConfig()

const cookie = useCookie("city")
if(!cookie.value) cookie.value = "Toronto"

const searchedCity = ref(cookie.value)
const inputCity = ref('')

// const { data: city, error } = useFetch<CityInfo>(
//   () => `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=metric&appid=25f29d06be691dfe5f771f4a7022ff24`
// )

const bgImage = ref('')

const { data: city, error, refresh } = useAsyncData("cityWeather", async () => {
  let response : CityInfo
  try {
    response = await $fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}`, {
      params: {
        units: "metric",
        appid : config.public.WEATHER_APP_KEY // process.env.WEATHER_APP_KEY
      }
    })
    cookie.value = searchedCity.value

    const temp = response.main.temp
    if (temp <= 0) bgImage.value = "snowy.avif"
    else if (temp > 0 && temp <= 10) bgImage.value = "fall.avif"
    else if (temp > 10 && temp <= 25) bgImage.value = "spring.avif"
    else bgImage.value = "summer.jpg"
  }
  catch (e) {
    console.log("error accured")
  }

  return response
}, {
  watch : [searchedCity]
})

let today : string | Date = new Date()
today = today.toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
})


const searchCity = () => {
  const formattedSearch = inputCity.value.trim().split(' ').join('+')
  searchedCity.value = formattedSearch
  inputCity.value = ''
  // refresh()
}
</script>

<template>
  <div v-if="city" class="h-screen relative overflow-hidden">
    <img :src="`assets/images/${bgImage}`" />
    <div class="absolute w-full h-full top-0 overlay" />
    <div class="absolute w-full h-full top-0 p-48">
      <div class="flex justify-between">
        <div>
          <h1 class="text-7xl text-white">
          {{ city.name }}
          </h1>
          <p class="font-extralight text-2xl mt-2 text-white">
            {{ today }}
          </p>
          <img
            :src="`https://openweathermap.org/img/wn/${city.weather[0].icon}@4x.png`"
            class="w-56 icon"
          />
        </div>
        <div>
          <p class="text-9xl text-white font-extralight">
            {{city.main.temp.toFixed(0)}}°
          </p>
        </div>
      </div>
      <div class="mt-20">
        <input
          type="text"
          class="w-1/2 h-10"
          placeholder="Search a city..."
          v-model="inputCity"
          @change="searchCity"
        />
        <button class="bg-sky-400 w-20 text-white h-[38px]" @click="searchCity">
          Search
        </button>
      </div>
    </div>
  </div>
  <div v-else class="p-10">
    <h1 class="text-7xl">Oops, we can't find that city</h1>
    <button class="mt-5 bg-sky-400 px-10 w-50 text-white h-10" @click="searchedCity = cookie">
      Go Back
    </button>
  </div>
</template>

<style scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
.icon {
  margin-left: -2.75rem;
  margin-top: -2.75rem;
}
</style>