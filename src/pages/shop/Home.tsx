import Swiper_Shop from "../../components/shop/Swiper_Shop";
import "./Home.scss";

function Home () {
    return (
        <>
        <div className="middle-wrap">
            <div className="middle-inner">
                <Swiper_Shop/>
            </div>
        </div>
        {/* <div className="middle-cover"></div> */}
        </>
    )
}

export default Home;
