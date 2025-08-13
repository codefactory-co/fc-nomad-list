#!/bin/bash

# 🌍 도시 이미지 자동 다운로드 스크립트 (최종 버전)
# Unsplash 공개 이미지 사용

echo "🚀 도시 이미지 자동 다운로드 시작! (최종 버전)"
echo "=============================================="
echo ""

# city 폴더 생성
mkdir -p public/city

# 도시별 이미지 다운로드 (공개 Unsplash 이미지)
echo "📥 이미지 다운로드 중..."

# 방콕 - 태국 전통 건축
echo "🏙️  방콕 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=300&h=200&fit=crop&crop=center" -o "public/city/bangkok.jpg"

# 리스본 - 포르투갈 도시 풍경
echo "🏙️  리스본 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop&crop=center" -o "public/city/lisbon.jpg"

# 멕시코시티 - 멕시코 건축
echo "🏙️  멕시코시티 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1522083165195-3424ed129620?w=300&h=200&fit=crop&crop=center" -o "public/city/mexico-city.jpg"

# 케이프타운 - 남아프리카 도시
echo "🏙️  케이프타운 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1580060839134-75a5f9f4b8b0?w=300&h=200&fit=crop&crop=center" -o "public/city/cape-town.jpg"

# 부에노스아이레스 - 아르헨티나 도시
echo "🏙️  부에노스아이레스 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=300&h=200&fit=crop&crop=center" -o "public/city/buenos-aires.jpg"

# 두바이 - UAE 도시
echo "🏙️  두바이 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=300&h=200&fit=crop&crop=center" -o "public/city/dubai.jpg"

# 시드니 - 호주 도시
echo "🏙️  시드니 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=300&h=200&fit=crop&crop=center" -o "public/city/sydney.jpg"

# 발리 - 인도네시아 풍경
echo "🏙️  발리 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1537953773345-d172ccf13b5c?w=300&h=200&fit=crop&crop=center" -o "public/city/bali.jpg"

# 베를린 - 독일 도시
echo "🏙️  베를린 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=300&h=200&fit=crop&crop=center" -o "public/city/berlin.jpg"

# 도쿄 - 일본 도시
echo "🏙️  도쿄 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop&crop=center" -o "public/city/tokyo.jpg"

echo ""
echo "✅ 모든 이미지 다운로드 완료!"
echo ""

# 다운로드된 파일 확인 및 크기 체크
echo "📁 다운로드된 파일 목록:"
for file in public/city/*.jpg; do
    if [ -f "$file" ]; then
        size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo "unknown")
        if [ "$size" -lt 1000 ]; then
            echo "❌ $file (크기: ${size} bytes) - 다운로드 실패"
        else
            echo "✅ $file (크기: ${size} bytes)"
        fi
    fi
done

echo ""
echo "📝 다음 단계:"
echo "1. app/page.tsx에서 이미지 경로를 업데이트하세요"
echo "2. 브라우저에서 확인하세요"
echo ""
echo "💡 이미지 경로 예시:"
echo "   bangkok: '/city/bangkok.jpg'"
echo "   lisbon: '/city/lisbon.jpg'"
echo "   tokyo: '/city/tokyo.jpg'"
echo "   ... 기타 도시들"
echo ""
echo "🎉 완료!"
