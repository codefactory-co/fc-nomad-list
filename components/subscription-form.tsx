"use client"

import { Button } from "@/components/ui/button"
import { Mail, ArrowRight, Star, Zap, Globe } from "lucide-react"

export function SubscriptionForm() {
    const handleSubscribe = () => {
        window.open("https://page.stibee.com/subscriptions/437629", "_blank")
    }

    return (
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg">
                        <Mail className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        유료 메일링 리스트 구독하기
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
                        디지털 노마드 라이프스타일에 최적화된 프리미엄 콘텐츠와
                        <br className="hidden sm:block" />
                        최신 개발 트렌드를 받아보세요
                    </p>

                    {/* Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                <Star className="w-6 h-6 text-blue-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">프리미엄 콘텐츠</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                <Zap className="w-6 h-6 text-indigo-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">실시간 업데이트</span>
                        </div>
                        <div className="flex flex-col items-center space-y-2">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                <Globe className="w-6 h-6 text-purple-600" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">글로벌 인사이트</span>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Button
                        onClick={handleSubscribe}
                        size="lg"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                        구독하기
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <p className="text-sm text-gray-500 mt-4">
                        구독 신청 시 개인정보 처리방침에 동의한 것으로 간주됩니다.
                    </p>
                </div>
            </div>
        </section>
    )
}
