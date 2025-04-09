# 애플 스토어 관리자 페이지 및 스토어

## 프로젝트 소개
애플 스토어와 스토어가 연동되는 관리자 페이지를 제작하였음.

### 제작자
- 정영일

## 기술 스택

프레임워크
- React, NodeJS

라이브러리
- axios
- typescript
- react-router-dom
- styled-components
- ag-grid-react
- cross-env
- react-beautiful-dnd
- react-cookie
- framer-motion

서버
- bcrypt
- mongoose
- nodemailer

데이터베이스
- MongoDB

배포
- 노트북 (AWS 비용으로 인해 전환)
- 새벽 시간 및 주말에는 접속이 안될수 있음.

주소
- http://del2f.sytes.net:20001/smartstore/shop
- http://del2f.sytes.net:20001/smartstore

## 개발 과정

### 애플 스토어 관리자 페이지

- http://del2f.sytes.net:20001/smartstore

관리자 계정
- ID: thanks6
- PW: 123456789a!

1) 관리자 회원가입

사용한 라이브러리
- nodemailer
- bcrypt

모든 Input을 정상적으로 입력했을때 유효성 검사에서 true를 반환한다.
이메일 입력시 해당 메일로 인증번호가 전송되며 일치하는 경우 true를 반환한다.
모든 유효성 검사 통과시 가입이 가능함.
추후 관리자 권한 기능을 도입하여 접근 할 수 있는 영역을 나눌 예정.


2) 로그인 및 로그아웃

![login](https://github.com/Del2f/smartstore/assets/92422357/685c1252-3b8e-4ad5-b267-2fd14732566e)

페이지 이동시 토큰을 확인하는 미들웨어가 실행되며 항시 토큰을 확인한다.
로그아웃시 토큰이 제거되며 뒤로가기 및 관리자 페이지 URL을 입력하여도 접속이 되지 않음.


3) 상품 등록

사용한 라이브러리 (ag-grid-react)

![product-add](https://github.com/Del2f/smartstore/assets/92422357/2aa1cd65-e06a-45a0-86a1-b5f1ab600a8a)

기본적으로 전체상품 카테고리가 추가됨. 처음엔 네이버 스마트 스토어를 목표로 제작했기 때문에 판매자가
회원가입을 하면 카테고리_id를 하나 만들어서 할당되는 방식이었는데 이제는 딱히 의미는 없음.

일단 그래도 모든 상품은 전체상품 카테고리가 등록된다.
옵션은 5종류까지 추가 가능. (처음엔 1개 였는데 늘림)
옵션명을 Input에 입력하고, 옵션값은 split 메소드로 나눠지게 작성했다.

옵션값 우측에 + 버튼은 해당하는 옵션값 마다 다른 이미지를 등록 할 수 있는 기능이다.
원래는 전혀 계획에 없었으나 애플 스토어는 색상 옵션별로 메인 이미지가 바뀌길래 급하게 만들었다.

ag-grid 라이브러리에 웬만한 기능을 지원해서 딱히 만든건 없지만 큰 문제가 있었다.

- 2023-01-10 드디어 해결한 문제.
선택된 옵션만 데이터를 수정하는 코드. 벌써 10개월이 지났다. 기본 지식이 없어 많이 헤메다가 겨우 만들었었다.
map 메소드 요소에 ...을 붙이고, 해당하는 object를 원하는 값으로 수정하는 방법, 그리고 삼항 연산자를
사용한다면 또 다르게 바꿀 수 있다는걸 처음 알았다.

````
    const onUpdateBtn = () => {
        const result = copy.map((list: any, index: any) => {
        --------생략---------
            return { 
            ...list,
            optionStatus: updatedOptionStock > 0 ? "판매" : "품절",
            optionUse: updatedOptionUse,
            };
        })
        props.setOptionResult(result);
    };
````

그리고 ag-grid에서 체크된 옵션에 number를 더하거나, 빼거나, 원하는 수치로 바꾸는 기능을 추가했다.
혹시나 수정을 원하지 않는 옵션은 boolean을 추가해 값이 true인 경우 제외 해준다.
이미지는 노트북에 업로드되며 URL을 받아 MongoDB에 저장.

상품과 실제 구매 페이지의 연결도 큰 고민이었는데
처음 제작은 상품을 등록하면서 일반 쇼핑몰처럼 다수의 이미지를 AWS S3에 업로드해
URL을 불러와 페이지에 출력하는 방법이었으나 그냥 일반 쇼핑몰 이었다면
이 방법이 옳겠지만 애플 스토어는 단순 이미지 출력이 아니라 애니메이션이 들어간 형태이다.

그래서 다른 방법을 고안했다.
두번째 방법은 에디터 라이브러리를 사용해 비슷하게 만들어보는것.
color picker 라이브러리를 합쳐 에디터에서 텍스트를 그라데이션으로 바꾸는 기능을 만들어 유사하게 만드려 했으나
애니메이션이나 다른 여러 기능을 에디터로 관리 한다는것이 말이 안되는거 같아 실패했다.   

최종적으로 결정한 방법은 상품에 URL 주소를 미리 등록 하는것 이다.
애플 스토어는 세부 카테고리가 곧 제품 페이지이다. 아래에서 작성 하겠지만, 카테고리를 등록할때
작성한 url을 useParams를 사용해 서버로 전송하고, 서버에서는 해당 url로 상품 url을 검색해서 전송.

- useParams를 사용하고 서버로 전송.
/smartstore/shop/products/${requrl};

- 서버로 전송된 코드.
const product = await Product.findOne({ url: requrl }); 

안타깝게도 가장 마지막은 하드코딩으로 처리했다.(..)
제품의 컴포넌트를 import 하고, componentMap 변수에 모아준다.

접속한 URL을 componentMap의 key로 사용해서 출력 할 수 있게 작성하면 끝.
이렇게 되면 URL이 상품페이지를 정하게 된다.
아직은 이렇게 밖에 못하겠다.

````
    import MacBookAirM2 from "../adminPage/Product/Mac/macbook-air-m2";

    const componentMap = {
        "macbook-air-m2": MacBookAirM2,
    };

    const selectProduct = () => {
        const SelectedComponent = componentMap[URL];
        if (SelectedComponent) {
            return <SelectedComponent />;
        } else {
            return null;
        }
    };
````

모든 Input을 정상적으로 입력 했을때 유효성 검사에서 true를 반환하며 상품 등록이 된다.


4) 상품 목록 및 삭제

사용한 라이브러리 (ag-grid-react)

MongoDB에 업로드된 상품 목록을 가져온다. 그리드가 필요한 구조에서는 ag-grid 라이브러리를 그대로 사용했다.
상품 특성상 이미지가 있어야 구분이 쉬울것 같아, 목록에 이미지를 같이 출력하도록 했다.

ag-grid는 입력한 배열을 쉽고 간단하게 출력 할 수 있어 매우 편리한 라이브러리다.
원하는 셀에서 img html을 출력하도록 수정했다. class는 초기 네이버 스마트 스토어를 흉내낼때 따라 했던 방법이다.
아직도 어떤 방법이 가장 편리한지 잘 모르겠다. 한참전에 입력했던 class는 갑자기 나중에 꼬이질 않나 조금 번거롭다.
현재는 scss와 styled-components를 같이 사용 하고 있다.

````
    {
        headerName: "메인사진",
            cellRendererFramework: (params: any) => {
            return (
                <div className="edit flex flex-ju-center flex-align-center">
                <img src={params.data.mainImage[0]} style={{ width: "50px" }}></img>
                </div>
            );
        },
    },
````

아무래도 상품인지라 수정이 불가피하다. 수정 버튼을 추가해주고,
react-router-dom의 Link를 사용해 상품의 _id를 기반으로 다시 상품 등록 페이지로 이동해준다.

````
    <Link to={params.data._id} style={{ display: "flex", alignItems: "center" }}>
        <button className="editBtn" data-action="edit">
            <span>수정</span>
        </button>
    </Link>
````

상품 등록은 잘 만들었지만, 수정은 어떻게 해야할까 고민을 많이했다.
실제로 등록과 수정은 거의 차이가 없다. 다만, Input에 값을 새로 넣는것이 등록이고, 이미 작성이 되어 있다면 수정 일것이다.
먼저 useParams를 사용하여 상품 등록 페이지에 진입 했다면 값이 감지 된다. 첫 상품 등록 이라면 당연히 없다.

````
    const { id } = useParams();
````

그리고 useEffect를 사용해 매개변수로 id를 작성해, id가 확인될때만 코드가 실행되게 한다.

````
    const { id } = req.params; // 서버에서 받아온 req.params.

    const dataList = await Product.findById(id); // 모든 상품이 담겨있는 Product 모델에서 findById로 id를 검색한다.
    res.send({ productEdit: dataList }); // 상품의 정보를 다시 클라이언트로 보낸다.
````

상품명, 상품 가격등 해당하는 state에 값을 전부 setState로 입력해주면 수정도 완성된다.
모든 boolean도 미리 true로 만들어주고, 상품 수정시 true가 되는 [edit, setEdit] 같은 boolean을
만들어 true 인 경우 상품 등록 버튼을 상품 수정 버튼으로 바뀌게끔 한다.


5) 스토어 카테고리 관리

![apple-menu16](https://github.com/user-attachments/assets/c2a8e77a-d76a-4f39-b3a8-8fdfe5087802)

사용한 라이브러리 (react-beautiful-dnd)

애플 스토어의 카테고리를 관리자 페이지에서 직접 등록하여 연동되도록 만들었다.

가장 큰 카테고리는 Column 이다.
스토어, Mac, iPad, iPhone 등 대표적인 큰 상품이 메인이 된다.

그리고 Column안에 Task가 들어간다.
Mac 이라면 MacBook Air, MacBook Pro가 있겠다.

라이브러리에서는 기본적으로 Column과 Task만 지원했는데, 실제 스토어는 Task 안에도
세부 카테고리가 하나 더 존재했다. 나는 SubTask 라고 명명했다.

MacBook Pro 기준 MacBook Pro 13, MacBook Pro 14 및 16 이라는 세부 기종을 나타내는 카테고리인데
이걸 어떻게 만들어야 할지 많은 고민이 생겼다.

처음에는 상품으로 등록을 한 다음, Task에 포함된 상품으로 출력할 생각이었는데
Task 카테고리에는 상품 말고도 비교하기, 디스플레이, 액세서리 등 상품과는 관계 없는 카테고리가 있었다.
그래서 어쩔수 없이 Column안에 Task 안에 SubTask 구조를 만들게 되었다.

Column 안에서 Task가 map 메소드로 생성 되고 있으니 똑같은 원리로 Task에서는 SubTask를 map으로 생성 했다.
결과적으로는 성공했지만 제일 힘들었던건 새로운 라이브러리를 기본 틀로 사용하는건 괜찮아도
이걸 내가 원하는 형태로 바꿔서 사용하는게 제일 힘들었던것 같다.

카테고리 목록은 좌측에 세로로 출력 된다.
순서는 같은 타입에서만 드래그를 통해 바꿀수 있고, 드래그를 할때마다 순서는 실시간으로 저장된다.

아무것도 클릭 하지 않았을때 카테고리를 추가하면 Column이 최하단에 추가 되며
특정 Column을 선택시 Task가 최하단에 추가 된다.
마찬가지로 특정 Task를 선택시 SubTask가 최하단에 추가 된다.

카테고리 이름과 URL 주소는 Input에 데이터를 입력 할 수 있다.
상품 등록에서 작성한 URL 주소와 현재 소개한 URL 주소가 같으면 해당 주소에서
상품 정보를 불러올 수 있다.

- 추가된 기능 2024-09-07
접기 기능 

![apple-menu13](https://github.com/user-attachments/assets/5c3477c6-2ead-49bd-938e-325221c0ff87)

카테고리가 길어지면 스크롤 및 드래그에 편의성이 떨어져 카테고리를 접는 기능을 추가 하였습니다.
column, task 우측 상단 화살표를 누르면 카테고리를 접거나 펼수 있습니다.

- 드래그시 잘못된 위치로 이동하는 버그 발생

첫번째 column 내부 task를 드래그 할때는 큰 이상이 없었으나
두번째 column 내부 task를 드래그 할때 문제가 발생했다.

두번째 task를 드래그 하는 도중 숨겨진 첫 column이 인식 되어 잘못된 위치로 task가 옮겨지는것 이었다.

첫번째 시도. 카테고리 폴딩시 opacity 와 visibility를 함께 사용하는것 이었는데,
겉모습으로는 정상작동 하지만 잘못된 위치를 인식 하는것에는 변함이 없었다.

두번째 시도는 display: none;에 setTimeout을 합쳐서 애니메이션은 유지하되, style 적용에 지연을 시켜
효과를 보려고 했다. 결과적으로는 성공했지만 애니메이션이 부드럽지 못하고 빠르게 폴딩 버튼을 누르면 출력이
이상하게 되는 버그가 발생했다.

세번째 시도는 task를 드래그 할때, 인식되는 범위 자체의 height를 조작 하면 어떨까 하는 생각이 떠올랐다.
처음 폴딩 기능을 만들때, 카테고리의 가장 외곽 div의 height를 조작해서 구현 하였고 overflow: hidden;을 사용하면
아무 간섭도 없겠다고 생각 하였지만 아니었다.
내부 Droppable의 height가 존재하는 한 첫번째 column을 접더라도
두번째 column task가 첫번째 column을 인식하게 되는것 이었다.
결국 폴딩을 Droppable의 height를 조작하여 만들었고, 결과적으로는 성공 했다.


- 접힌 column과 펼쳐진 column이 있을때, 펼쳐진 column의 task를 이동 시키고 싶을때 어떻게 해야할까?

첫번째 column이 접혀있고, 두번째 column이 펼쳐져 있을때, 유저가 두번째 column의 task를
첫번째 column으로 드래그하여 옮긴다고 예를 들어보자.

가장 단순한 방법으로는 드래그 하여 옮겼을때 맞닿는 순간 약간의 상호작용과 함께 최상단, 혹은 최하단으로 이동하게 하는것.
그러나 폴딩 구조 자체를 Droppable의 height를 바꾸어 만들었기 때문에 더 큰 문제가 생길것 같았다.

그래서 생각해낸 방법은, 드래그 하여 옮겼을때 맞닿는 순간 다시 펼쳐지게 만든다.

````
    isPold={column.pold || snapshot.isDraggingOver}
````

기본적으로 유저가 폴딩 버튼을 눌렀을때 작동하고, 그 외에는 드래깅하여 접촉했을때 펼쳐지게 된다.

카테고리 인덱스 기반으로 추가

![apple-menu14](https://github.com/user-attachments/assets/f8a47388-d8eb-4bdb-a47f-591f646b433f)

기존에는 카테고리를 클릭하고 추가 버튼을 누르면 최하단에 추가 되었으나,
선택된 카테고리 내부 및 하단에 + 버튼을 출력해 클릭시 해당 index + 1에
새 카테고리가 추가되도록 변경 했다.


6) 광고 목록 및 등록

![apple-menu15](https://github.com/user-attachments/assets/beea9b65-dbfb-406f-89bb-6561f97da093)

애플 스토어에서 카테고리 중간에 끼워넣은 광고를 관리자 페이지에서 등록 및 관리 할 수 있도록 했다.
먼저 카테고리에 등록된 광고 목록을 볼 수 있다. 그리고 새로운 광고를 등록 할 수 있다.
광고 타입은 총 3가지. number로 저장되며 값에 따라 광고를 다르게 출력 해준다.
원하는 텍스트를 입력와 이미지를 등록 할 수 있다. 가로, 세로 길이에 제한을 두어
스토어에서 정해진 규격만을 출력 할 수 있게끔 설정.

배경 색상 선택 기능은 광고의 백그라운드 컬러와 등록된 이미지를 위해 만든 기능이다.
color picker 라이브러리 같은 기능인데, 조금 다르다. 준비된 파레트를 클릭 하는것이 아닌,

URL을 불러와 canvas로 만든다.
그리고 클릭한 부위의 x좌표, y좌표에 해당하는 픽셀 데이터를 사용해 변수로 만든다.

````
    const color = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;
````

광고에 백그라운드 컬러로 사용되어 이미지의 배경과 광고의 배경이 어색하지 않게 해준다.
실은 이미지가 광고 사이즈 만큼 큰 해상도로 작업이 되어있다면 크게 필요한 기능은 아니지만..

만들면서 생겼던 문제는 처음 이미지를 등록후 픽셀을 클릭하면 정상적으로 작동.
그런데 광고를 수정하면서 불러와진 이미지의 픽셀을 클릭하면 오류가 발생하는것 이었다.

처음엔 S3에서 CORS 설정을 하면 된다는 이야기가 많아 아래와 같이 작성을 했는데 전혀 작동 하지 않았다.

````
    [
        {
        "AllowedHeaders": [
        "*"
        ],
        "AllowedMethods": [
        "GET",
        "HEAD"
        ],
        "AllowedOrigins": [
        "*"
        ],
        "ExposeHeaders": [
        "x-amz-server-side-encryption",
        "x-amz-request-id",
        "x-amz-id-2"
        ],
        "MaxAgeSeconds": 3000
        }
    ]
````

구글링을 통해서 찾은 방법은, AWS S3에서 CORS를 설정해도 해결이 안된다는것 이었다.
해결 방법은

````
    image.crossOrigin = "Anonymous"; 
````

위 코드를 canvas로 만들기 전에 넣어주면 된다.
찜찜한 방법인데 일단 작동은 된다. (..)
cloudfront를 중간에 추가하는 방법도 있었지만 실패. (현재 코드가 남아있긴함)
괜한 검수 기능만 사용해서 4,000원이 부과됐다.

상품 연결은 해당 광고에서 구매 버튼을 눌렀을때 상품으로 이동 하기 위한 기능이다.
상품의 URL을 갖고 오려고 만들었다.

아이콘
스토어에서 카테고리에 등록된 아이콘을 볼 수 있습니다.

다크 모드
해당 카테고리는 어두운 화면으로 볼 수 있습니다.

메인 메뉴 숨김
카테고리가 스토어에서 감춰집니다. 메인 카테고리 (Column)에서만 적용이 가능합니다. 

챕터 메뉴 숨김
서브 카테고리가 스토어에서 감춰집니다.
스토어에서 메인 카테고리 (Column)에 진입후 보여지는 서브 카테고리 (Task)에서만 적용이 가능합니다.

라이브러리 기본 구조 Column, Task에서 SubTask를 추가하여 애플 스토어의 구조와 동일하게 하였습니다.

- 추가된 기능 2024-09-07

텍스트 색상 변경
react-color 라이브러리를 추가하여 광고 텍스트 및 배경의 색상을 변경 할수 있습니다.
기존의 스포이드 배경 색상 기능 뿐만 아니라 컬러 픽커를 사용한 배경 색상 변경도 가능합니다.


7) 유저 주문 상태 변경
![apple-menu10](https://github.com/user-attachments/assets/61588d84-e356-4f3b-9f40-cefa25069e17)

유저가 구매한 상품의 주문 내역을 확인 할수 있습니다.
주문 접수 -> 처리중 -> 출고 준비중 -> 출고됨 -> 배송중 순서로 진행 됩니다.

![apple-menu12](https://github.com/user-attachments/assets/91174f95-ab68-4a6b-8dab-d64ef859b967)

변경된 주문 상태를 볼수 있습니다.


### 애플 스토어

- PC
![apple-menu](https://github.com/Del2f/smartstore/assets/92422357/b7a3d0b3-99ba-471e-a3ec-012538f52132)

- 모바일
![apple-menu](https://github.com/Del2f/smartstore/assets/92422357/ba50c9f6-bbe6-432c-905d-51afec09ebc5)

- http://del2f.sytes.net/smartstore/shop

테스트 유저 계정
- ID: thanks6@naver.com
- PW: 45124512a

모든 카테고리는 관리자 페이지에 연동 되어 작동합니다.
- 유저 회원가입(이메일 인증 가능) 및 토큰 인증하는 로그인 및 로그아웃


1) 회원 가입
![스크린샷 2024-08-07 012813](https://github.com/user-attachments/assets/02758434-fedc-48c1-8e47-51c23005c66c)

이름, 이메일, 암호, 암호 확인, 전화 번호, 동의 체크가 확인 되면 회원 가입이 가능합니다.
이메일은 작성된 값이 서버로 전송되어 중복을 확인 합니다.


2) 로그인
![apple-menu4](https://github.com/user-attachments/assets/efabd1ce-9999-4f77-aad2-c394b5765758)

공식 홈페이지처럼 로그인 전 회전하는 톱니바퀴 애니메이션이 있으며
아이디를 입력하면 패스워드 input이 나타나고, 로그인이 가능합니다.


3) 상품 구매
![apple-menu5](https://github.com/user-attachments/assets/124b1405-6171-464f-babf-46a1a50f733f)

관리자 페이지에서 등록된 상품을 유저 계정으로 구매 할수 있습니다.
모든 옵션을 선택하면 장바구니로 상품이 추가됩니다.


4) 장바구니
![image](https://github.com/user-attachments/assets/c19b0088-983c-4086-9b4e-167b071171f6)

장바구니에서 상품 구매 개수를 수정 할수 있습니다.
결제 버튼을 누르면 결제창으로 이동합니다.


5) 배송 방법 선택
![image](https://github.com/user-attachments/assets/f383c681-828e-49ce-a0ec-9f543136c00f)

제품의 배송 방법을 선택하는 페이지 입니다. 현재 직접 픽업이 선택 되지 않으며 배송만 선택이 가능합니다.


6) 배송 주소지 선택
![apple-menu6](https://github.com/user-attachments/assets/5b5c882d-8164-474a-9d4c-99c973ab92ce)

처음 계정을 만들면 주소가 없습니다.
바로 상품 주문을 하면 새로운 주소를 입력해야 하며 건물 출입 코드를 제외한 나머지 input에서 유효성 검사를
진행합니다. 연락처 정보는 가입시 입력했던 이메일과 연락처를 사용합니다.
주소록 저장 체크박스를 선택하지 않으면 주소가 서브 주소로 저장되어 결제시 사라지게 됩니다.


7) 배송 주소지 수정 및 삭제
![apple-menu7](https://github.com/user-attachments/assets/cfd62f37-56d8-472b-81db-5d679cddb860)

등록된 주소를 수정 및 삭제가 가능합니다.


8) 주문서 확인
![image](https://github.com/user-attachments/assets/854ee3d9-097e-4835-9ea1-f7c04e4833a6)

상품과 주문 내역을 마지막으로 확인 할수 있습니다.
결제는 구현 되어 있지 않으므로 바로 주문번호가 생성되며 끝이 납니다.

![image](https://github.com/user-attachments/assets/44a90eab-57ad-4932-b60b-33d3f1348058)

![apple-menu8](https://github.com/user-attachments/assets/08cbdce1-6c8b-4606-9d51-f0ebe2318127)

주문내역을 확인 할수 있습니다.


9) 유저 계정 페이지
![apple-menu9](https://github.com/user-attachments/assets/e229012c-75b4-4644-922d-57711e476f39)

주소 및 연락처 변경을 계정 페이지에서도 할수 있습니다.


### 이슈

1) AWS 배포 (현재 노트북 배포중이며 해당하지 않음)

AWS에서 배포를 할때 생겼던 문제인데, 평소에는 로컬에서만 테스트를 하다보니
node.js는 당연히 기본포트인 8080으로 열게 되었다.

그런데 어느날 갑자기 작동이 안되서 뭐가 문젠지 한참 고민했다.

일단 리눅스의 root 용량이 문제였다. (용량확인 df -h)
용량이 부족하니 MongoDB가 먹통이 되었다. AWS는 16기가까지 무료라 용량을 늘려 일단 해결.

그런데 고치려고 이것저것 건든게 문제가 되어 해결이 안됨.

일단 해결하기 위해 리버스 프록시를 해제. 헷갈리게 한다.
sudo vi /etc/nginx/sites-enabled/smartstore.conf에서 Proxy_pass를 제거.

먼저 우분투의 node.js의 포트번호를 바꿔준다. 
어느 부분에서 어떻게 적용 되는지 잘모를땐 독립적인 값으로 바꿔주는게 좋다. 5800으로 변경.

로컬은 8080, 우분투의 환경변수를 PORT=5800;으로 입력해 PORT가 감지 되면 5800으로 켜지게 한다.
(현재 로컬은 환경변수를 입력하지 않았고 우분투에만 업로드 했다.)

````
    app.set('port', process.env.PORT || 8080);

    app.listen(app.get('port'), function () {
    console.log(`listening on ${app.get('port')}`);
    });
````

수정 후 nginx 재시작. (sudo systemctl restart nginx)

pm2는 헷갈리니 사용하지 않고, server 폴더로 들어가 (cd server)
node server.js 명령어로 직접 켜 로그를 확인한다.

로컬은 listening on 8080으로 확인되며
우분투는 listening on 5800으로 확인된다.

그러면 우분투는 정상적으로 5800 포트를 사용해 서버를 켠것이다.

이제 http://AWS아이피:5800/ 을 입력하면 정상적으로 웹페이지가 나타나는데,
이상한점은 웹페이지는 나타나지만 서버와 연동이 안된다. 서버 요청 IP가 틀린것처럼 뜬다.

일단 axios가 문제다.
평소 개발 환경에서는 http://localhost:8080/ 으로 요청 해야하고
실제 웹페이지 운영은 http://AWS아이피:5800/ 으로 요청 해야하기 때문에

axios 요청 주소를 개발, 배포로 나눠 놓아야 하는데, 이럴때 환경 변수를 쓴다.
이걸 처음 알았을땐 정말 감탄했다.

````
    import axios from 'axios';

    const BASE_URL = process.env.REACT_APP_HOST;

    export default axios.create({
        baseURL: BASE_URL
    });

    export const axiosPrivate = axios.create({
        baseURL: BASE_URL,
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
    });
````

.env.development, .env.production 이런식으로 나눠서 작성하면 git에 업로드 할땐 (npm run build)
.env.production가 적용된다. .env.production엔 당연히 AWS의 외부아이피가 들어있다.

그러면 빌드될때 모든 코드의 axios들이 http://AWS아이피:5800/ 로 전환되어 입력이 된다. 아주 편리하다.
ubuntu에는 빌드된 코드가 실행이 되기 때문에 항상 최신화를 하면서 git pull 해야 반영이 되니 주의.

또 다른 문제는 AWS 아이피 뒤에 포트번호가 숨겨지지 않는것이었다.
해결 방법은, sudo iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 5800을 입력하자.

80 포트로 들어오는 트래픽을 5800 포트로 리다이렉트 시켜준다.

이렇게 하니 http://AWS아이피/ 를 입력해도 정상적으로 사이트에 들어갈수 있었다.

그런데, 다시 서버 요청이 안되는것이었다. 이제 80포트를 받을수 있기 때문에
.env.production 파일에 입력한 http://AWS아이피:5800/ 가 잘못된 코드가 된것이다.

포트번호를 80으로 수정한 다음, npm run build를 해서 다시 git에 업로드후, git pull을 하자.
그러면 서버가 정상적으로 구동된다.

2) 모바일 메뉴

모바일 메뉴를 만들때 생겼던 문제이다.
모바일 해상도를 PC 크롬이나 모바일 크롬으로 테스트 할때는 아무 이상이 없지만,
iOS 사파리를 사용할때는 생기는 문제였다. 

````
    document.body.style.overflow = "hidden";
````

위 코드가 PC에서는 정상 작동하지만, 사파리에서는 작동 하지 않는다.

![apple-menu2](https://github.com/Del2f/smartstore/assets/92422357/1933b90f-6b3e-45c9-a37c-19317ab59f37)

사파리의 하단 주소창을 드래그할때 body의 스크롤이 작동 하게된다.
의도한것은, 모바일 메뉴가 나타나면 body의 스크롤이 어떠한 경우에도 작동하면 안된다.

````
    document.body.style.position = "fixed";
    document.body.style.top = "0px";
    document.body.style.left = "0px";
    document.body.style.right = "0px";
````

![apple-menu3](https://github.com/Del2f/smartstore/assets/92422357/7edb865b-8863-41f3-83a0-045975380a96)

body의 position을 fixed로 고정시켜 스크롤의 작동을 막을수 있었다.

### 제작 예정 기능

- 홈 직접 꾸미기 기능
- 실시간 상담
- 상품 관심 목록 추가
- 추가 상품 구매 (현재 등록까지만 가능)
- 유저 아이디, 비밀번호 찾기
- 검색 탭 구현
- 쇼핑하기, 관련 항목 구현
- 카테고리 task chapter 네비게이션 버그 수정 (가로 길이 측정이 느려 작동 안되는것을 setTimeout을 걸어 지연 시키고 계산 시간 확보 했던걸로 기억함)
- 동영상 광고 기능 (예전엔 없었는데 최근 애플 공홈에서 업데이트됨)
- 전체적인 코드 간략하게 수정
- 상품 페이지 몇개 추가 