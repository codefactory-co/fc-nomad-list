"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"
import { Heart, Star, DollarSign, Wifi, Shield, Thermometer, ArrowUpDown } from "lucide-react"
import { Footer } from "@/components/footer"
import { BackgroundPaths } from "@/components/ui/background-paths"
import { SubscriptionForm } from "@/components/subscription-form"
import { sampleCities, continents, sortOptions, type City } from "@/lib/data"

export default function HomePage() {
  const [selectedContinent, setSelectedContinent] = useState<string>("all")
  const [selectedSort, setSelectedSort] = useState<string>("recommended")
  const [cities, setCities] = useState<City[]>(sampleCities)

  const scrollToExplore = () => {
    const exploreSection = document.getElementById("explore-section")
    exploreSection?.scrollIntoView({ behavior: "smooth" })
  }

  const handleContinentChange = (continentId: string) => {
    setSelectedContinent(continentId)
    // Update URL parameter for bookmarking
    const url = new URL(window.location.href)
    if (continentId === "all") {
      url.searchParams.delete("continent")
    } else {
      url.searchParams.set("continent", continentId)
    }
    window.history.replaceState({}, "", url.toString())
  }

  const toggleFavorite = (cityId: string) => {
    setCities(cities.map((city) => (city.id === cityId ? { ...city, isFavorite: !city.isFavorite } : city)))
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return "☀️"
      case "partly-cloudy":
        return "⛅"
      case "cloudy":
        return "☁️"
      case "rainy":
        return "🌧️"
      default:
        return "🌤️"
    }
  }

  const getSafetyColor = (level: string) => {
    switch (level) {
      case "Excellent":
        return "text-green-600 bg-green-50"
      case "Good":
        return "text-blue-600 bg-blue-50"
      case "Fair":
        return "text-yellow-600 bg-yellow-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  // Added comprehensive sorting and filtering logic
  const filteredAndSortedCities = useMemo(() => {
    // First filter by continent
    const filtered =
      selectedContinent === "all" ? cities : cities.filter((city) => city.continent === selectedContinent)

    // Then sort based on selected option
    const sortOption = sortOptions.find((option) => option.id === selectedSort)
    if (!sortOption) return filtered

    return filtered.sort((a, b) => {
      let aValue: number
      let bValue: number

      if (sortOption.key === "recommended") {
        // Recommended sorting uses a combination of overall score and popularity rank
        aValue = a.overallScore * 10 - a.popularityRank
        bValue = b.overallScore * 10 - b.popularityRank
      } else {
        aValue = a[sortOption.key] as number
        bValue = b[sortOption.key] as number
      }

      if (sortOption.order === "asc") {
        return aValue - bValue
      } else {
        return bValue - aValue
      }
    })
  }, [cities, selectedContinent, selectedSort])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <BackgroundPaths title="노마드 리스트" onButtonClick={scrollToExplore} />

      {/* First Subscription Form Section */}
      <SubscriptionForm />

      <section id="explore-section" className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">대륙별 도시 탐색</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              원하는 대륙을 선택하여 최적의 디지털 노마드 도시를 찾아보세요
            </p>
          </div>

          {/* Continent Filter Tabs */}
          <div className="mb-12">
            <div className="flex overflow-x-auto scrollbar-hide pb-4 gap-2 sm:gap-4">
              <div className="flex space-x-2 sm:space-x-4 min-w-max mx-auto">
                {continents.map((continent) => (
                  <button
                    key={continent.id}
                    onClick={() => handleContinentChange(continent.id)}
                    className={`
                      flex items-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap
                      ${selectedContinent === continent.id
                        ? "bg-blue-600 text-white shadow-lg transform scale-105"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-102"
                      }
                    `}
                  >
                    <span className="text-lg">{continent.emoji}</span>
                    <span className="text-sm sm:text-base">{continent.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Added sorting controls and results summary */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="inline-flex items-center space-x-3 bg-blue-50 px-6 py-3 rounded-full">
              <span className="text-2xl">{continents.find((c) => c.id === selectedContinent)?.emoji}</span>
              <span className="text-lg font-semibold text-blue-800">
                {continents.find((c) => c.id === selectedContinent)?.name} 도시들
              </span>
              <span className="text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                {filteredAndSortedCities.length}개 도시
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <ArrowUpDown className="w-4 h-4 text-gray-500" />
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="정렬 방식 선택" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Updated to use filtered and sorted cities */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAndSortedCities.map((city) => (
              <Card
                key={city.id}
                className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-0 shadow-md"
              >
                <div className="relative">
                  <img
                    src={city.image || "/placeholder.svg"}
                    alt={`${city.name}, ${city.country}`}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(city.id)
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${city.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                  </button>
                </div>

                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900">
                      {city.name}, {city.country}
                    </h3>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700">{city.overallScore}/5.0</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">월 생활비</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">
                        ${city.monthlyCostUsd.toLocaleString()}/월
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wifi className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-600">인터넷</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{city.internetSpeedMbps} Mbps</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-600">안전도</span>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getSafetyColor(city.safetyLevel)}`}
                      >
                        {city.safetyLevel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-orange-600" />
                        <span className="text-sm text-gray-600">현재 날씨</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm">{getWeatherIcon(city.currentWeather.condition)}</span>
                        <span className="text-sm font-semibold text-gray-900">{city.currentWeather.temperature}°C</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAndSortedCities.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏙️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">도시를 찾을 수 없습니다</h3>
              <p className="text-gray-600">
                선택하신 {continents.find((c) => c.id === selectedContinent)?.name} 지역에는 아직 등록된 도시가 없습니다
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Second Subscription Form Section */}
      <SubscriptionForm />

      {/* Footer */}
      <Footer />
    </div>
  )
}
