import { useState, useEffect } from "react";
import { useSelector } from "react-redux"

// import styled from "styled-components";
// import { Link, useNavigate } from "react-router-dom";
// import $ from "jquery";

import Swiper from "../components/Swiper";
import Swiper2 from "../components/Swiper2";
import Swiper_large from "../components/Swiper_large";
import Chart from "../components/Chart";
import StoreChart from "../components/StoreChart";
import Btn from "../components/Btn";
import QAtabs from "../components/QAtabs";

import "bootstrap/dist/css/bootstrap.min.css";
import "../components/flex.css";
import "./Home.scss";

import { Gift, ArrowClockwise, Truck, ExclamationCircle } from "react-bootstrap-icons";
import { selectShowMenu } from '../store/menuSlice';
import { selectCurrentUser } from '../store/userSlice';

type Props = {
  Showmainmenu?: boolean;
};

function Home(props : Props) {

  const menu = useSelector(selectShowMenu);
  const user = useSelector(selectCurrentUser);

  console.log(user.id)
  console.log(menu)

  const [order, setOrder] = useState([3,0,0,1,0,0,0,1,0,1,0,0,0,0,1,2,0,0,0,0,0,0,1,0,0,0,1,1,0,0]);
  const [customerstatus, setCustomerstatus] = useState([0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,2,0,0,0,0,0,0,1,0]);

  return (
    <>
    <div className={ menu.isShowMenu == true ? "seller-content seller-content-hide" : "seller-content" }>
      <div className="Notice">
        <div className="NoticeWrapper">
          <a className="text-wrap">
            <span className="round-icon-area">
              <i className="fn fn-alert2" aria-hidden="true"></i>
            </span>
            <span className="notice-title">
              [일반] 럭키투데이 서비스 종료 안내
            </span>
            <span className="notice-date">
              2022.11.10.
            </span>

          </a>
        </div>
      </div>
      <div className="SellerSubframe">
        <div className="Sellerdashboard">
          <div className="SellerSubcontents">
            <div className="flex flex-wrap flex-panel-wrap">
              {/* 01 좌측 배너 */}
              <div className="Topbanner panel-wrap flex-col-6 flex-col-xs-12 flex-order-md-1 flex-order-xs-3">
                <div className="panel panel-dashboard panel-top-banner">
                  <div className="swiper">
                    <Swiper />
                  </div>
                </div>
              </div>
              {/* 02 우측 배너 */}
              <div className="Topbanner panel-wrap flex-col-6 flex-col-xs-12 flex-order-md-2 flex-order-xs-4">
                <div className="panel panel-dashboard panel-top-banner">
                  <div className="swiper">
                    <Swiper2 />
                  </div>
                </div>
              </div>
              {/* 03 주문/배송 박스 */}
              <div className="salesinfo panel-wrap flex-col-6 flex-col-xs-12 flex-order-md-3 flex-order-xs-1">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                      <h3 className="panel-title">주문/배송</h3>
                    </div>
                    <div className="pull-right">
                      <span className="sub-text">최근 20:51</span>
                      <span className="refresh_Btn">
                        <ArrowClockwise className="pull-right-icon"/>
                      </span>
                    </div>
                  </div>
                  <div className="panel-body column flex">
                    <div className="list-wrap deposit-list flex-col-6 flex-col-md-12">
                      <div className="salestats">
                        <div className="panel-icon-area">
                          <Gift className="panel-icon-area-gifticon" />
                        </div>
                        <ul className="panel-list">
                          <li className="text-box">
                            <span className="info-title">결제대기</span>
                            <li className="number-area">
                              <a className="number">0</a>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <li className="panel-sub-info">
                              <span className="info-title">신규주문</span>
                              <i className="fn fn-info1"></i>
                              <li className="number-area">
                                <span className="number">0</span>
                                <span>건</span>
                              </li>
                            </li>
                            <li className="panel-sub-info">
                              <span className="info-title">
                                <span className="info-title-sub-icon">⌞</span>
                                <span className="info-title-sub"> 오늘출발</span>
                                <i className="fn fn-info1"></i>
                              </span>
                              <span className="number-area">
                                <span className="number-sub">0</span>
                                <span>건</span>
                              </span>
                            </li>
                            <li className="panel-sub-info">
                              <span className="info-title-sub-icon">⌞</span>
                              <span className="info-title-sub"> 예약구매</span>
                              <span className="number-area">
                                <span className="number-sub">0</span>
                                <span>건</span>
                              </span>
                            </li>
                            <li className="panel-sub-info">
                              <span className="info-title-sub-icon">⌞</span>
                              <span className="info-title-sub"> 정기구독</span>
                              <span className="number-area">
                                <span className="number-sub">0</span>
                                <span>건</span>
                              </span>
                            </li>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="list-wrap delivery-list flex-col-6 flex-col-md-12">
                      <div className="salestats">
                        <div className="panel-icon-area">
                          <Gift className="panel-icon-area-gifticon"/>
                        </div>
                        <ul className="panel-list">
                          <li className="text-box">
                            <span className="info-title">배송준비</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">배송중</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">배송완료</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 04 클레임/정산 박스 */}
              <div className="salesinfo panel-wrap flex-col-6 flex-col-xs-12 flex-order-md-4 flex-order-xs-2">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                      <h3 className="panel-title">클레임/정산</h3>
                    </div>
                    <div className="pull-right">
                      <span className="sub-text">최근 20:51</span>
                      <span className="refresh_Btn">
                        <ArrowClockwise className="pull-right-icon" />
                      </span>
                    </div>
                  </div>
                  <div className="panel-body column flex">
                    <div className="list-wrap return-list flex-col-6 flex-col-md-12">
                      <div className="salestats">
                        <div className="panel-icon-area">
                          <Gift className="panel-icon-area-gifticon" />
                        </div>
                        <ul className="panel-list">
                          <li className="text-box">
                            <span className="info-title">취소요청</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">반품요청</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">반품수거완료</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">교환요청</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">교환수거완료</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="list-wrap settlement-list flex-col-6 flex-col-md-12">
                      <div className="salestats">
                        <div className="panel-icon-area">
                          <Gift className="panel-icon-area-gifticon" />
                        </div>
                        <ul className="panel-list">
                          <li className="text-box">
                            <span className="info-title">구매확정</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>건</span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">오늘정산</span>
                            <i className="fn fn-info1"></i>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>원</span>
                            </li>
                            <li className="panel-sub-info">
                              <span className="info-title-sub-icon">⌞</span>
                              <span className="info-title-sub"> 빠른정산</span>
                              <li className="number-area">
                                <span className="number-sub">0</span>
                                <span>원</span>
                              </li>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">정산예정</span>
                            <i className="fn fn-info1"></i>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>원</span>
                            </li>
                            <li className="panel-sub-info">
                              <span className="info-title-sub-icon">⌞</span>
                              <span className="info-title-sub"> 빠른정산</span>
                              <span className="number-area">
                                <span className="number-sub">0</span>
                                <span>원</span>
                              </span>
                            </li>
                          </li>
                          <li className="text-box">
                            <span className="info-title">충전금</span>
                            <li className="number-area">
                              <span className="number">0</span>
                              <span>원</span>
                            </li>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 차트 */}
              <div className="panel-wrap flex-col-6 flex-col-md-12 flex-order-md-5 flex-order-xs-5">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                        <h3 className="panel-title">스토어 매출 통계
                          <span className="sub-text">오전 8시 업데이트</span>
                        </h3>
                      </div>
                      <div className="pull-right">
                        <span className="sub-text">최근 20:51</span>
                        <span className="refresh_Btn">
                          <ArrowClockwise className="pull-right-icon" />
                        </span>
                      </div>
                  </div>
                    <div className="panel-body">
                      <div className="text-center">
                        <Btn/>
                      </div>
                      <div className="stats-area">
                        <Chart data={order}/>
                      </div>
                    </div>
                </div>
              </div>
              {/* 미답변문의 */}
              <div className="panel-wrap flex-col-3 flex-col-md-6 flex-col-xs-12 flex-order-md-6 flex-order-xs-6">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                          <h3 className="panel-title">미답변 문의</h3>
                    </div>
                        <div className="pull-right">
                          <span className="sub-text">최근 20:51</span>
                            <span className="refresh_Btn">
                            <ArrowClockwise className="pull-right-icon" />
                          </span>
                        </div>
                  </div>
                  <QAtabs/>

                </div>
              </div>
              {/* 공지사항 */}
              <div className="panel-wrap flex-col-3 flex-col-md-6 flex-col-xs-12 flex-order-md-7 flex-order-xs-7">
                <div className="panel panel-dashboard">
                    <div className="panel-heading">
                        <div className="pull-left">
                          <h3 className="panel-title">공지사항</h3>
                        </div>
                        <div className="pull-right">
                          <span className="sub-text">최근 20:51</span>
                          <span className="refresh_Btn">
                            <ArrowClockwise className="pull-right-icon" />
                          </span>
                        </div>
                    </div>
                    <div className="panel-body panel-notice">
                      <ul className="list-wrap panel-list">
                        <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-danger">중요</span>
                                <span>[일반] 자동차판 광고 CAR&LIFE 추가 노출 및 판매일정 변경 안내</span>
                              </p>
                              <span className="label-small">N</span>
                            </div>
                            <div className="flex date">
                              10.26.
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-danger">중요</span>
                                <span>[일반] 스토어찜 소식받기 통합 관련 재개편 적용안내 (2022.10.22)</span>
                              </p>
                              <span className="label-small">N</span>
                            </div>
                            <div className="flex date">
                              10.21.
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-success">D-커머스</span>
                                <span>[D-커머스] 네이버 파트너를 위한 새로운 공간, '파트너스 스페이스' 신규 오픈 안내(네이버 스퀘어 종로)</span>
                              </p>
                              <span className="label-small">N</span>
                            </div>
                            <div className="flex date">
                              10.26.
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">일반</span>
                                <span>[일반] '네이버 스퀘어 홍대 스튜디오'를 사업자 여러분께 오픈합니다.</span>
                              </p>
                              <span className="label-small">N</span>
                            </div>
                            <div className="flex date">
                              10.26.
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">일반</span>
                                <span>[일반] [쇼핑라이브] 숏클립 데일리 핫딜 프로그램 개시 안내</span>
                              </p>
                              <span className="label-small">N</span>
                            </div>
                            <div className="flex date">
                              10.25.
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">일반</span>
                                <span>[일반] 매출을 높이는 가장 확실한 방법을 알려드립니다.[무료교육]</span>
                              </p>
                              <span className="label-small">N</span>
                            </div>
                            <div className="flex date">
                              10.24.
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">일반</span>
                                <span>[일반] 엑스퍼트 상세페이지 디자인 클리닉 후기를 지금 확인해보세요!</span>
                              </p>
                              <span className="label-small">N</span>
                            </div>
                            <div className="flex date">
                              10.24.
                            </div>
                          </div>
                        </li>

                      </ul>
                      <hr></hr>
                      <h4>스마트스토어 활용 TIP</h4>
                      <ul className="list-wrap panel-list">
                      <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">판매 TIP</span>
                                <span>스마트스토어 3분기 개편 소식! 주요 변화와 활용 꿀팁을 놓치지 마세요!</span>
                              </p>
                              {/* <span className="label-small">N</span> */}
                            </div>
                            <div className="flex date">
                              10.11.
                            </div>
                          </div>
                        </li>
                      <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">메뉴얼</span>
                                <span>커머스API센터 베타 메뉴얼</span>
                              </p>
                              {/* <span className="label-small">N</span> */}
                            </div>
                            <div className="flex date">
                              08.22.
                            </div>
                          </div>
                        </li>
                      <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">판매 TIP</span>
                                <span>[판매 TIP] 스마트스토어 2분기 변화 소개! 활용</span>
                              </p>
                              {/* <span className="label-small">N</span> */}
                            </div>
                            <div className="flex date">
                              07.08.
                            </div>
                          </div>
                        </li>
                      <li>
                          <div className="flex">
                            <div className="flex panel-notice-title align-items-center">
                              <p className="text-overflow">
                                <span className="label label-default">판매 TIP</span>
                                <span>[일반] 앱 위젯을 한 번에 모아보는 방법!</span>
                              </p>
                              {/* <span className="label-small">N</span> */}
                            </div>
                            <div className="flex date">
                              06.09.
                            </div>
                          </div>
                        </li>
                        
                      </ul>
                    </div>
                </div>
                
              </div>
              {/* 판매 지연 */}
              <div className="panel-wrap flex-col-6 flex-col-md-12 flex-order-md-8 flex-order-xs-8">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                        <h3 className="panel-title">판매지연
                          <span className="sub-text"></span>
                        </h3>
                      </div>
                      <div className="pull-right">
                        <span className="sub-text">최근 20:51</span>
                        <span className="refresh_Btn">
                          <ArrowClockwise className="pull-right-icon" />
                        </span>
                      </div>
                  </div>
                    <div className="panel-body" id="panel-delay">
                      <ul className="panel-list clearfix">
                        <li>
                          <span className="icon-wrap">
                            <span className="icon-seller icon-new-order"></span>
                          </span>
                          <p className="info-title">신규주문 지연</p>
                          <a className="text-number">0</a>
                        </li>
                        <li>
                          <span className="icon-wrap">
                            <span className="icon-seller icon-shipping-delay"></span>
                          </span>
                          <p className="info-title">오늘출발 지연</p>
                          <a className="text-number">0</a>
                        </li>
                        <li>
                          <span className="icon-wrap">
                            <span>
                              <Truck className="icon-delivery-delay"/>
                            </span>
                          </span>
                          <p className="info-title">배송준비 지연</p>
                          <a className="text-number">0</a>
                        </li>
                        <li>
                          <span className="icon-wrap">
                            <span className="icon-seller icon-cancle"></span>
                          </span>
                          <p className="info-title">취소 지연</p>
                          <a className="text-number">0</a>
                        </li>
                        <li>
                          <span className="icon-wrap">
                            <span className="icon-seller icon-return"></span>
                          </span>
                          <p className="info-title">반품 지연</p>
                          <a className="text-number">0</a>
                        </li>
                        <li>
                          <span className="icon-wrap">
                            <span className="icon-seller icon-exchange"></span>
                          </span>
                          <p className="info-title">교환 지연</p>
                          <a className="text-number">0</a>
                        </li>
                      </ul>
                    </div>
                </div>
              </div>

              {/* 상품 */}
              <div className="panel-wrap flex-col-6 flex-col-md-12 flex-order-md-10 flex-order-xs-10">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                        <h3 className="panel-title">상품
                          {/* <span className="sub-text">오전 8시 업데이트</span> */}
                        </h3>
                      </div>
                      <div className="pull-right">
                        <span className="sub-text">최근 20:51</span>
                        <span className="refresh_Btn">
                          <ArrowClockwise className="pull-right-icon" />
                        </span>
                      </div>
                  </div>
                    <div className="panel-body flex flex-wrap no-padding">
                      <div className="border-list-wrap flex-col-6 flex-col-sm-6 flex-col-xs-12">
                        <ul className="panel-border-list">
                          <li className="clearfix">
                            <span className="info-title">판매중 상품</span>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <span className="info-title">품절 상품</span>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <span className="info-title">수정요청 상품</span>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="border-list-wrap flex-col-6 flex-col-sm-6 flex-col-xs-12">
                        <ul className="panel-border-list ">
                          <li className="clearfix">
                            <span className="info-title">카탈로그 가격관리 상품</span>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <span className="info-title">카탈로그 인기상품</span>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <span className="info-title">최저가 달성 가능 상품</span>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
              </div>

               {/* 스토어고객 현황 */}
              <div className="panel-wrap flex-col-6 flex-col-md-12 flex-order-md-9 flex-order-xs-9">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                        <h3 className="panel-title">스토어 고객 현황
                          <span className="sub-text">오전 8시 업데이트</span>
                        </h3>
                      </div>
                      <div className="pull-right">
                        <span className="sub-text">최근 20:51</span>
                        <span className="refresh_Btn">
                          <ArrowClockwise className="pull-right-icon" />
                        </span>
                      </div>
                  </div>
                    <div className="panel-body flex flex-wrap no-padding">
                      <div className="border-list-wrap flex-col-5 flex-col-xs-12">
                        <ul className="panel-border-list">
                          <li className="info-primary clearfix">
                            <a className="info-title">유입수 (어제 시간별)</a>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>회</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <a className="info-title">알림받기 (어제 누적)</a>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>명</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="border-list-wrap flex-col-7 flex-col-xs-12">
                        <StoreChart data={customerstatus}/>
                      </div>
                    </div>
                </div>
              </div>


              {/* 리뷰 */}
              <div className="panel-wrap flex-col-6 flex-col-md-12 flex-order-md-11 flex-order-xs-11">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                        <h3 className="panel-title">리뷰
                          <span className="sub-text">최근 1주일 기준</span>
                        </h3>
                      </div>
                      <div className="pull-right">
                        <span className="sub-text">최근 20:51</span>
                        <span className="refresh_Btn">
                          <ArrowClockwise className="pull-right-icon"/>
                        </span>
                      </div>
                  </div>
                    <div className="panel-body flex flex-wrap no-padding" id="panel-review">
                      <div className="border-list-wrap flex-col-5 flex-col-xs-12">
                        <ul className="panel-border-list">
                          <li className="info-primary clearfix">
                            <a className="info-title">새로 작성된 리뷰</a>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <a className="info-title">평점 낮은 리뷰</a>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <a className="info-title">리뷰 이벤트</a>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="border-list-wrap flex-col-7 flex-col-xs-12">
                        <div className="list-inner">
                          <div className="result-info">
                            <ExclamationCircle className="tab-caution-icon"/>
                            <p className="text-sub">등록된 리뷰가 없습니다.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
              </div>

              {/* 판매자 등급 */}
              <div className="panel-wrap flex-col-6 flex-col-md-12 flex-order-md-12 flex-order-xs-12">
                <div className="panel panel-dashboard">
                  <div className="panel-heading">
                    <div className="pull-left">
                        <h3 className="panel-title">판매자 등급</h3>
                      </div>
                      <div className="pull-right">
                        <span className="sub-text">최근 20:51</span>
                        <span className="refresh_Btn">
                          <ArrowClockwise className="pull-right-icon"/>
                        </span>
                      </div>
                  </div>
                    <div className="panel-body flex flex-wrap no-padding" id="seller-grade">
                    <div className="border-list-wrap flex-col-6 flex-col-sm-6 flex-col-xs-12">
                        <ul className="panel-border-list">
                          <li className="clearfix">
                            <span className="info-title">이번달 등급<i className="fn fn-info1"></i>
                            </span>
                            <span className="number-area">
                              <a className="text">씨앗</a>
                            </span>
                          </li>
                          <li className="clearfix">
                            <span className="info-title">굿 서비스 기준<i className="fn fn-info1"></i>
                            </span>
                            <span className="number-area">
                              <a className="text">불충족</a>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="border-list-wrap flex-col-6 flex-col-sm-6 flex-col-xs-12">
                      <ul className="panel-border-list">
                          <li className="clearfix">
                            <span className="info-title">판매 페널티<i className="fn fn-info1"></i>
                            </span>
                            <span className="number-area">
                              <a className="text-number">4</a>
                              <span>점 / </span>
                              <a className="text-number">44</a>
                              <span>%</span>
                            </span>
                          </li>
                          <li className="clearfix">
                            <span className="info-title">제재 단계<i className="fn fn-info1"></i>
                            </span>
                            <span className="number-area">
                              <a className="text-number">-</a>
                              {/* <span>건</span> */}
                            </span>
                          </li>
                          <li className="clearfix">
                            <span className="info-title">지재권침해신고</span>
                            <span className="number-area">
                              <a className="text-number">0</a>
                              <span>건</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                </div>
              </div>
              {/* 하단 긴 배너 */}
              <div className="panel-wrap flex-col-6 flex-col-md-12 flex-order-md-13 flex-order-xs-13">
                <div className="panel panel-dashboard swiper_large">
                  <Swiper_large/>
                </div>
              </div>
              {/* 퀵 메뉴 */}
              <div className="panel-wrap flex-col-12 flex-col-md-12 flex-order-md-14 flex-order-xs-14">
                <div className="panel panel-dashboard">
                  <div className="panel-body" id="panel-quick-menu">
                    <ul className="panel-list flex flex-ju-center">
                      <li>
                        <a>
                          <span className="icon-wrap">
                            <span className="icon-seller2 manual-icon"></span>
                          </span>
                          <span className="text">스마트스토어센터<br className="br-md"></br> 매뉴얼</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="icon-wrap">
                            <span className="icon-seller2 partner-icon"></span>
                          </span>
                          <span className="text">쇼핑<br className="br-md"></br> 파트너센터</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="icon-wrap">
                            <span className="icon-seller2 talktalk-icon"></span>
                          </span>
                          <span className="text">톡톡<br className="br-md"></br> 파트너센터</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="icon-wrap">
                            <span className="icon-seller2 commerce-icon"></span>
                          </span>
                          <span className="text">D-커머스<br className="br-md"></br> 프로그램</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="icon-wrap">
                            <span className="icon-seller2 analytics-icon"></span>
                          </span>
                          <span className="text">네이버<br className="br-md"></br> 애널리틱스</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span className="icon-wrap">
                            <span className="icon-seller2 fullcare-icon"></span>
                          </span>
                          <span className="text">SME 풀케어<br className="br-md"></br> 시스템</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
