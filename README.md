# 상태창

## 🎯 프로젝트 소개

Status는 자기계발 목표를 **RPG 게임의 퀘스트 시스템**처럼 관리할 수 있는 웹 애플리케이션입니다. 
사용자의 목표를 메인 퀘스트와 서브 퀘스트로 세분화하고, 6가지 능력치(속성)를 레이더 차트로 시각화하여 
균형 있는 성장을 도모합니다.

### ✔️ Commit Convention

- ✅ `[chore]` : 동작에 영향 없는 코드 or 변경 없는 변경사항(주석 추가 등)
- ✨ `[feat]` : 새로운 기능 구현
- ➕ `[add]` : Feat 이외의 부수적인 코드, 라이브러리, 새로운 파일 생성
- 🖼️ `[asset]` : asset (이미지, 아이콘 등) 추가 혹은 수정
- 🔨 `[fix]` : 버그, 오류 해결
- ⚰️ `[del]` : 쓸모없는 코드 삭제
- 📝 `[docs]` : README나 WIKI 등의 문서 수정
- 🎨 `[style]` : CSS 등 사용자 UI 디자인 변경
- ✏️ `[correct]` : 주로 문법의 오류나 타입의 변경, 이름 변경시
- 💯 `[test]` : 테스트 코드, 리팩토링 테스트 코드 추가
- ⏪️ `[rename]` : 파일 이름 변경시
- ♻️ `[refactor]` : 전면 수정
- 🔀 `[merge]`: 다른 브랜치와 병합

ex) `commit -m "{#issue number} [feat] user API 구현”`

### ✔️ Branch Convention

- `[feat]` : 기능 추가
- `[fix]` : 에러 수정, 버그 수정
- `[docs]` : README, 문서
- `[refactor]` : 코드 리펙토링 (기능 변경 없이 코드만 수정할 때)
- `[modify]` : 코드 수정 (기능의 변화가 있을 때)
- `[chore]` : gradle 세팅, 위의 것 이외에 거의 모든 것

ex) `feat/#1-user-api`
