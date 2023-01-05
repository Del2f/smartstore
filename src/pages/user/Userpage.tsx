import { Routes, Route } from "react-router-dom";
import Usersign from "./Usersign";
import Login from "./Login";
import Notfound from "../Notfound";
import "./Userpage.scss";

function Userpage() {
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="usersign" element={<Usersign />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <div className="footer">
        <div className="footer-top flex flex-ju-center">
          <ul>
            <li>
              <span>이용약관</span>
            </li>
            <li>
              <strong>개인정보처리방침</strong>
            </li>
            <li>
              <span>책임의 한계와 법적고지</span>
            </li>
            <li>
              <span>회원정보 고객센터</span>
            </li>
          </ul>
        </div>
        <div className="footer-bottom flex flex-ju-center flex-align-center">
          <a href="{() => false}" className="naver-logo"></a>
          <span className="text">Copyright</span>
          <span className="corp">© NAVER Corp.</span>
          <span className="text">All Rights Reserved.</span>
        </div>
      </div>
    </>
  );
}

export default Userpage;
