* 사용 기술 (버전은 모두 latest)
- express

* 오픈 API 사용
- http://openAPI.seoul.go.kr:8088
- http://swopenAPI.seoul.go.kr/api/subway

* router 룰
- request path가 `/openAPI`로 시작 할 경우 `http://openAPI.seoul.go.kr:8088`로 axios 통신
- request path가 `/swopenAPI`로 시작 할 경우 `http://swopenAPI.seoul.go.kr/api/subway`로 axios 통신

* 처리 로직
- 요청을 그대로 router룰에 따라 외부 API 호출하여 받아온 데이터를 그대로 클라이언트에게 응답

* 서비스 흐름 개요
클라이언트 요청 > nginx reverse proxy container(https) > express container(http) > 외부 API > express container(http) > nginx reverse proxy container(https) > 클라이언트