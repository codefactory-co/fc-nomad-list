#!/bin/bash

# 🌍 디지털 노마드 라이프스타일 이미지 다운로드 스크립트
# Hero 섹션용 고품질 이미지들

echo "🚀 디지털 노마드 라이프스타일 이미지 다운로드 시작!"
echo "================================================"
echo ""

# hero 이미지 폴더 생성
mkdir -p public/hero

# 디지털 노마드 라이프스타일 이미지 다운로드
echo "📥 이미지 다운로드 중..."

# 1. 노트북과 카페에서 작업하는 모습 (도시 풍경)
echo "💻 노트북 + 카페 이미지 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&h=1080&fit=crop&crop=center" -o "public/hero/digital-nomad-cafe.jpg"

# 2. 해변에서 노트북으로 작업하는 모습
echo "🏖️  해변 작업 이미지 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1506905925346-21bda4d75df4?w=1920&h=1080&fit=crop&crop=center" -o "public/hero/beach-working.jpg"

# 3. 산맥 배경에서 원격 작업하는 모습
echo "🏔️  산맥 배경 작업 이미지 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center" -o "public/hero/mountain-working.jpg"

# 4. 현대적인 도시에서 작업하는 모습
echo "🏙️  도시 작업 이미지 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1920&h=1080&fit=crop&crop=center" -o "public/hero/city-working.jpg"

# 5. 자연 속에서 디지털 작업하는 모습
echo "🌿 자연 속 작업 이미지 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1920&h=1080&fit=crop&crop=center" -o "public/hero/nature-working.jpg"

# 6. 전 세계 여행과 작업을 상징하는 이미지
echo "✈️  여행 + 작업 이미지 다운로드 중..."
curl -L "https://images.unsplash.com/photo-1506905925346-21bda4d75df4?w=1920&h=1080&fit=crop&crop=center" -o "public/hero/travel-working.jpg"

echo ""
echo "✅ 모든 이미지 다운로드 완료!"
echo ""

# 다운로드된 파일 확인 및 크기 체크
echo "📁 다운로드된 파일 목록:"
for file in public/hero/*.jpg; do
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
echo "1. app/page.tsx의 Hero 섹션에서 이미지 경로를 업데이트하세요"
echo "2. 브라우저에서 확인하세요"
echo ""
echo "💡 이미지 경로 예시:"
echo "   '/hero/digital-nomad-cafe.jpg'"
echo "   '/hero/beach-working.jpg'"
echo "   '/hero/mountain-working.jpg'"
echo "   '/hero/city-working.jpg'"
echo "   '/hero/nature-working.jpg'"
echo "   '/hero/travel-working.jpg'"
echo ""
echo "🎯 추천 Hero 이미지:"
echo "   - digital-nomad-cafe.jpg: 카페에서 작업하는 모습 (도시 풍경)"
echo "   - beach-working.jpg: 해변에서 작업하는 모습 (자연과 기술)"
echo "   - mountain-working.jpg: 산맥 배경에서 작업 (자연 속 디지털)"
echo ""
echo "🎉 완료!"
