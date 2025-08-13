#!/usr/bin/env python3
"""
도시 이미지 자동 다운로드 스크립트
Unsplash에서 모든 도시의 이미지를 자동으로 다운로드합니다.
"""

import os
import requests
import time
from pathlib import Path
import json

# 도시 목록 (app/page.tsx에서 추출)
CITIES = [
    {"id": "bangkok", "name": "방콕", "search": "bangkok thailand city"},
    {"id": "lisbon", "name": "리스본", "search": "lisbon portugal city"},
    {"id": "mexico-city", "name": "멕시코시티", "search": "mexico city architecture"},
    {"id": "cape-town", "name": "케이프타운", "search": "cape town south africa city"},
    {"id": "buenos-aires", "name": "부에노스아이레스", "search": "buenos aires argentina city"},
    {"id": "dubai", "name": "두바이", "search": "dubai uae city skyline"},
    {"id": "sydney", "name": "시드니", "search": "sydney australia city harbor"},
    {"id": "bali", "name": "발리", "search": "bali indonesia landscape"},
    {"id": "berlin", "name": "베를린", "search": "berlin germany city architecture"},
    {"id": "tokyo", "name": "도쿄", "search": "tokyo japan city skyline"}
]

# Unsplash API 설정
UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY"  # 여기에 실제 API 키를 입력하세요
UNSPLASH_API_URL = "https://api.unsplash.com/search/photos"

# 이미지 저장 경로
CITY_IMAGES_DIR = Path("public/city")
CITY_IMAGES_DIR.mkdir(parents=True, exist_ok=True)

def download_image(url, filepath):
    """이미지를 다운로드하고 저장합니다."""
    try:
        response = requests.get(url, stream=True)
        response.raise_for_status()
        
        with open(filepath, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        print(f"✅ 다운로드 완료: {filepath}")
        return True
    except Exception as e:
        print(f"❌ 다운로드 실패: {filepath} - {e}")
        return False

def get_unsplash_image(search_query):
    """Unsplash API에서 이미지 URL을 가져옵니다."""
    if not UNSPLASH_ACCESS_KEY or UNSPLASH_ACCESS_KEY == "YOUR_UNSPLASH_ACCESS_KEY":
        print("⚠️  Unsplash API 키가 설정되지 않았습니다.")
        print("   https://unsplash.com/developers 에서 API 키를 발급받아 스크립트를 수정하세요.")
        return None
    
    try:
        params = {
            'query': search_query,
            'orientation': 'landscape',
            'per_page': 1,
            'order_by': 'relevant'
        }
        
        headers = {
            'Authorization': f'Client-ID {UNSPLASH_ACCESS_KEY}'
        }
        
        response = requests.get(UNSPLASH_API_URL, params=params, headers=headers)
        response.raise_for_status()
        
        data = response.json()
        if data['results']:
            return data['results'][0]['urls']['regular']
        else:
            print(f"⚠️  검색 결과 없음: {search_query}")
            return None
            
    except Exception as e:
        print(f"❌ API 호출 실패: {e}")
        return None

def download_all_city_images():
    """모든 도시 이미지를 다운로드합니다."""
    print("🌍 도시 이미지 자동 다운로드를 시작합니다...")
    print(f"📁 저장 경로: {CITY_IMAGES_DIR.absolute()}")
    print()
    
    success_count = 0
    total_count = len(CITIES)
    
    for i, city in enumerate(CITIES, 1):
        print(f"[{i}/{total_count}] {city['name']} ({city['id']}) 처리 중...")
        
        # 이미지 파일 경로
        image_path = CITY_IMAGES_DIR / f"{city['id']}.jpg"
        
        # 이미 파일이 존재하는지 확인
        if image_path.exists():
            print(f"   ⏭️  이미 존재함: {image_path}")
            success_count += 1
            continue
        
        # Unsplash에서 이미지 URL 가져오기
        image_url = get_unsplash_image(city['search'])
        
        if image_url:
            # 이미지 다운로드
            if download_image(image_url, image_path):
                success_count += 1
            
            # API 제한을 피하기 위한 지연
            time.sleep(1)
        else:
            print(f"   ❌ 이미지 URL을 가져올 수 없음")
        
        print()
    
    # 결과 요약
    print("=" * 50)
    print(f"🎉 다운로드 완료!")
    print(f"✅ 성공: {success_count}/{total_count}")
    print(f"❌ 실패: {total_count - success_count}/{total_count}")
    print()
    
    if success_count > 0:
        print("📝 다음 단계:")
        print("1. app/page.tsx에서 이미지 경로를 업데이트하세요")
        print("2. 브라우저에서 확인하세요")
        print()
        print("💡 이미지 경로 예시:")
        for city in CITIES:
            if (CITY_IMAGES_DIR / f"{city['id']}.jpg").exists():
                print(f"   {city['id']}: '/city/{city['id']}.jpg'")

def create_manual_download_script():
    """수동 다운로드를 위한 스크립트를 생성합니다."""
    script_content = """#!/bin/bash
# 수동 이미지 다운로드 스크립트
# 이 스크립트는 Unsplash API 키가 없을 때 사용합니다

echo "🌍 도시 이미지 수동 다운로드 가이드"
echo "=================================="
echo ""

# city 폴더 생성
mkdir -p public/city

echo "📥 다음 도시들의 이미지를 수동으로 다운로드하세요:"
echo ""

"""
    
    for city in CITIES:
        script_content += f"""echo "🏙️  {city['name']} ({city['id']})"
echo "   검색어: {city['search']}"
echo "   저장할 파일명: public/city/{city['id']}.jpg"
echo "   권장 크기: 300x200 픽셀"
echo ""
"""
    
    script_content += """echo "📝 다운로드 후 app/page.tsx에서 이미지 경로를 업데이트하세요:"
echo "   image: '/city/도시id.jpg'"
echo ""
echo "✅ 완료!"
"""
    
    with open("download_city_images_manual.sh", "w", encoding="utf-8") as f:
        f.write(script_content)
    
    os.chmod("download_city_images_manual.sh", 0o755)
    print("📝 수동 다운로드 스크립트가 생성되었습니다: download_city_images_manual.sh")

if __name__ == "__main__":
    print("🚀 도시 이미지 다운로더")
    print("=" * 30)
    print()
    
    # Unsplash API 키 확인
    if UNSPLASH_ACCESS_KEY == "YOUR_UNSPLASH_ACCESS_KEY":
        print("⚠️  Unsplash API 키가 설정되지 않았습니다.")
        print()
        print("📋 옵션:")
        print("1. 수동 다운로드 스크립트 생성")
        print("2. API 키 설정 후 자동 다운로드")
        print()
        
        choice = input("선택하세요 (1 또는 2): ").strip()
        
        if choice == "1":
            create_manual_download_script()
        elif choice == "2":
            print()
            print("🔑 Unsplash API 키를 설정하세요:")
            print("1. https://unsplash.com/developers 에서 API 키 발급")
            print("2. 스크립트의 UNSPLASH_ACCESS_KEY 변수 수정")
            print("3. 스크립트 재실행")
        else:
            print("❌ 잘못된 선택입니다.")
    else:
        # API 키가 설정된 경우 자동 다운로드
        download_all_city_images()
