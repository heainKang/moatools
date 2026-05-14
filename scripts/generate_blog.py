#!/usr/bin/env python3
"""
블로그 자동 생성 스크립트
Claude API로 SEO 최적화 블로그 글 생성 → content/blog/ 저장 → git push → Vercel 자동 배포
"""
import anthropic
import json
import os
import subprocess
from datetime import datetime

client = anthropic.Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY") or open(os.path.expanduser("~/project/moatools/.env.local")).read().split("=")[1].strip()
)

PROJECT_DIR = os.path.expanduser("~/project/moatools")
BLOG_DIR = os.path.join(PROJECT_DIR, "content/blog")

TOPICS = [
    { "slug": "salary-calculator-guide", "keyword": "연봉 실수령액 계산기", "title": "2024 연봉 실수령액 완벽 가이드 - 4대보험 소득세 총정리", "url": "/salary" },
    { "slug": "bmi-healthy-weight", "keyword": "BMI 정상범위 체중", "title": "BMI 정상범위와 건강한 체중 관리법 완벽 정리", "url": "/bmi" },
    { "slug": "hourly-wage-calculator", "keyword": "시급 주휴수당 계산", "title": "2024 시급 계산 완벽 가이드 - 주휴수당 포함 월급 계산법", "url": "/hourly" },
    { "slug": "loan-interest-types", "keyword": "대출 이자 계산 방법", "title": "원리금균등 vs 원금균등 상환 - 대출이자 계산 완벽 비교", "url": "/loan" },
    { "slug": "savings-calculator-guide", "keyword": "적금 이자 계산", "title": "적금 이자 계산법 완벽 정리 - 세후 실수령액까지", "url": "/savings" },
    { "slug": "calorie-tdee-guide", "keyword": "하루 칼로리 계산", "title": "하루 칼로리 계산 완벽 가이드 - TDEE와 다이어트 칼로리", "url": "/calorie" },
    { "slug": "mbti-compatibility-guide", "keyword": "MBTI 궁합", "title": "MBTI 궁합 완벽 정리 - 16가지 유형별 최고·최악 궁합", "url": "/mbti-match" },
    { "slug": "subscription-score-guide", "keyword": "청약 가점 계산", "title": "2024 청약 가점 계산 완벽 가이드 - 만점 84점 채우는 법", "url": "/subscription" },
    { "slug": "severance-pay-guide", "keyword": "퇴직금 계산", "title": "퇴직금 계산 완벽 가이드 - 실업급여까지 한번에 정리", "url": "/severance" },
    { "slug": "pet-food-amount-guide", "keyword": "강아지 사료량 계산", "title": "강아지 고양이 하루 사료량 계산법 - 건강한 급여 가이드", "url": "/pet-food" },
]

def generate_post(topic):
    print(f"생성 중: {topic['title']}")

    prompt = f"""당신은 한국의 SEO 전문 블로그 작가입니다.
다음 주제로 검색 상위 노출을 위한 블로그 글을 작성해주세요.

제목: {topic['title']}
핵심 키워드: {topic['keyword']}
관련 계산기 URL: https://moatools.vercel.app{topic['url']}

요구사항:
- 한국어로 작성
- 800-1200 자
- H2, H3 소제목 사용 (## , ### 마크다운)
- 핵심 키워드를 자연스럽게 5회 이상 포함
- 마지막에 "모아툴즈 {topic['keyword']} 계산기 바로가기" 링크 포함
- 실용적이고 정확한 정보 위주
- 글 시작은 바로 본문으로 (제목 반복 없이)
"""

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=2000,
        messages=[{"role": "user", "content": prompt}]
    )

    return message.content[0].text

def save_post(topic, content):
    post = {
        "slug": topic["slug"],
        "title": topic["title"],
        "keyword": topic["keyword"],
        "url": topic["url"],
        "content": content,
        "date": datetime.now().strftime("%Y-%m-%d"),
        "published": True
    }

    path = os.path.join(BLOG_DIR, f"{topic['slug']}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(post, f, ensure_ascii=False, indent=2)

    print(f"저장 완료: {path}")

def git_push():
    os.chdir(PROJECT_DIR)
    subprocess.run(["git", "add", "-A"])
    subprocess.run(["git", "commit", "-m", f"블로그 자동 생성 {datetime.now().strftime('%Y-%m-%d')}"])
    subprocess.run(["git", "push", "origin", "main"])
    print("GitHub 푸시 완료!")

def main():
    os.makedirs(BLOG_DIR, exist_ok=True)

    existing = {f.replace(".json", "") for f in os.listdir(BLOG_DIR) if f.endswith(".json")}
    new_topics = [t for t in TOPICS if t["slug"] not in existing]

    if not new_topics:
        print("새로 생성할 글이 없어요. 모든 글이 이미 있어요!")
        return

    # 한 번에 3개씩 생성
    batch = new_topics[:3]
    for topic in batch:
        content = generate_post(topic)
        save_post(topic, content)

    git_push()
    print(f"완료! {len(batch)}개 글 생성됨")

if __name__ == "__main__":
    main()
