import { useState } from "react";

import "./QAtabs.scss";
import { ExclamationCircle, ChevronRight } from "react-bootstrap-icons";

function QAtabs() {
  const data = [
    {
      id: 0,
      class: "first",
      title: "상품문의",
      description: "등록된 상품문의가 없습니다.",
      alarm: 2,
      btn: "문의 관리 ",
    },
    {
      id: 1,
      class: "second",
      title: "고객문의",
      description: "등록된 고객문의가 없습니다.",
      alarm: 7,
      btn: "고객문의 관리 ",
    },
    {
      id: 2,
      class: "third",
      title: "문의",
      description: "미확인 문의가 없습니다.",
      alarm: 2,
      btn: "상담하기 ",
    },
  ];

  const [index, setIndex] = useState(0);

  return (
    <>
      <div id="inquiry" className="panel-body">
        <ul className="nav nav-tabs">
          {data.map((item) => (
            <li
              key={item.id}
              className={index === item.id ? "nav-item nav-item-active" : "nav-item"}
              onClick={() => setIndex(item.id)}
            >
              <div
                className={
                  index === item.id
                    ? "nav-link nav-link-active " + item.class + "click"
                    : "nav-link " + item.class
                }
              >
                <div>
                  <p
                    className={
                      index === item.id
                        ? "text-number text-number-active"
                        : "text-number"
                    }
                  >
                    {item.alarm}
                  </p>
                  <div className="text-service">
                    <a
                      className={
                        index === item.id ? "text-title-active" : "text-title"
                      }
                    >
                      {item.title}
                    </a>
                    <i className="text-icon"></i>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {data
          .filter((item) => index === item.id)
          .map((item) => (
            <div className="tab-pane qna-content">
              <div className="result-info">
                <div className="text-center">
                  <ExclamationCircle className="tab-caution-icon" />
                </div>
                <p className="text-sub title text-center">{item.description}</p>
              </div>
              <div className="qna-btn-wrap">
                <button className="qna-btn">
                  {item.btn}
                  <ChevronRight className="qna-btn-icon" />
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* <Tabs
      defaultActiveKey="home"
      transition={false}
      id="qna"
      className=""
      >
      <Tab eventKey="home" title="상품문의" tabClassName='first'>
      <div>등록된 상품문의가 없습니다.</div>
      </Tab>
      <Tab eventKey="profile" title="고객문의" tabClassName='second'>
      <div>등록된 고객문의가 없습니다.</div>
      </Tab>
      <Tab eventKey="contact" title="톡톡문의" tabClassName='third'>
      <div>미확인 톡톡이 없습니다.</div>
      </Tab>
    </Tabs> */}
    </>
  );
}

export default QAtabs;
