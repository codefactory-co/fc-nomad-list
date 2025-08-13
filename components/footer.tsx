import { Globe, Twitter, Instagram, Github, MapPin, Phone, Mail as MailIcon } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                                <Globe className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">노마드 리스트</h3>
                                <p className="text-blue-200 text-sm">세계 최고의 디지털 노마드 도시</p>
                            </div>
                        </div>
                        <p className="text-gray-300 mb-6 max-w-md">
                            전 세계 디지털 노마드들이 선택한 최고의 도시들을 소개합니다.
                            생활비, 인터넷 속도, 안전도를 한눈에 비교하여 당신에게 최적의
                            노마드 라이프스타일을 제안합니다.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">빠른 링크</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#explore-section" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                                    도시 탐색
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors duration-200">
                                    인기 도시
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">연락처 & 소셜</h4>
                        <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                                <MailIcon className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300 text-sm">jc@codefactory.ai</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300 text-sm">대한민국</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-4 h-4 text-blue-400" />
                                <span className="text-gray-300 text-sm">+82 10 1234 1234</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h5 className="text-sm font-medium text-gray-400 mb-3">소셜 미디어</h5>
                            <div className="flex space-x-3">
                                <a href="https://codefactory.ai" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="https://codefactory.ai" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="https://codefactory.ai" className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                                    <Github className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* Bottom Footer */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span>© {new Date().getFullYear()} 노마드 리스트. All rights reserved.</span>
                            <a href="#" className="hover:text-blue-400 transition-colors duration-200">개인정보처리방침</a>
                            <a href="#" className="hover:text-blue-400 transition-colors duration-200">이용약관</a>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                            <span>Made with</span>
                            <span className="text-red-500">❤️</span>
                            <span>for digital nomads</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
