import "./Notfound.scss";

    function Notfound() {
    return (
        <>
        <div className="not-found-wrap flex flex-align-center flex-ju-center">
            <div className="not-found-inner">
                <div className="notfound">
                    <h1>구현되지 않은 페이지에 <br></br>입장하셨습니다.</h1>
                    <div className="desc-wrap">
                        <div>정영일의 네이버 스마트스토어 포트폴리오는 현재 제작중 입니다.</div>
                        <div>잘못된 페이지 이므로 뒤로가기를 해주세요. </div>
                        <div className="desc-end">감사합니다.</div>
                    </div>
                </div>
            </div>
        </div>
        </>
        )
    }

export default Notfound;
