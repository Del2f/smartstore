import { useEffect, useState, useRef, useMemo } from "react";
import styled from "styled-components";
import memory from "@img/shop/products/Mac/macbook-air-m2/mx_memory__en6zfomlyjyq_large.jpg";
import power from "@img/shop/products/Mac/macbook-air-m2/mx_power_vector__9roj6jw8ck2a_large.svg";

interface Animation {
  number: number;
  modalSelector: number;
  isVisible: boolean;
}

interface Width {
  number: number;
  number2: number;
  modalSelector: number;
  isVisible: boolean;
  value: string;
  isStartHeight: boolean;
}

interface Opacity {
  number: number;
  number2: number;
  modalSelector: number;
  isVisible: boolean;
  value: string;
}

const Disclaimer = styled.a<Animation>`
  ${(props) =>
    props.isVisible && props.modalSelector === props.number
      ? `
      opacity: 1 !important;
      transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1) 0.1s;

      `
      : `
      opacity: 0 !important;
  `};
`;

const Barcaption = styled.span<Animation>`
  ${(props) =>
    props.isVisible && props.modalSelector === props.number
      ? `
      opacity: 1 !important;
      transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1) 0.1s;

      `
      : `
      opacity: 0 !important;
  `};
`;

const Barwrap = styled.div<Width>`
  --hr-number: ${(props) => props.number2};
  --hr-width: ${(props) => props.value};
  transform: matrix(1, 0, 0, 1, 0, 0);

  ${(props) =>
    props.isStartHeight && props.isVisible && props.modalSelector === props.number
      ? `
      width: var(--hr-width);
      opacity: 1 !important;
      transition: opacity 100ms cubic-bezier(0.4, 0, 0.6, 1), width 1000ms cubic-bezier(0.25, 0.1, 0.1, 1.0);
      transition-delay: calc(var(--hr-number) * 80ms + 300ms);
      `
      : `
      width: 0px;
      opacity: 0 !important;

  `};
`;

const Bar = styled.hr<Opacity>`
  --hr-number: ${(props) => props.number2};

  ${(props) =>
    props.isVisible && props.modalSelector === props.number
      ? `
      opacity: 1 !important;
      transition: opacity 400ms cubic-bezier(0.4, 0, 0.6, 1);
      transform: matrix(1, 0, 0, 1, 0, 0);
      transition-delay: calc(var(--hr-number) * 120ms + 300ms);
      `
      : `
      opacity: 0 !important;

  `};
`;

interface TabNavLink {
  number: number;
  modalSelector: number;
}

const TabNavLink = styled.a<TabNavLink>`
  ${(props) =>
    props.modalSelector === props.number
      ? `
      color: #1d1d1f !important;
      text-decoration: underline;
      text-decoration-thickness: 3px;
      text-decoration-color: #1d1d1f;
      `
      : `

  `};
`;

function Modal({ setShowModal }) {
  const [modalSelector, setModalSelector] = useState<number>(0);
  const [modalSelector2, setModalSelector2] = useState<number>(0);

  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isVisible2, setIsVisible2] = useState<boolean>(true);

  const [isStartHeight, setIsStartHeight] = useState<boolean>(false);
  const [isStartHeight2, setIsStartHeight2] = useState<boolean>(false);

  const modalRef = useRef(null);
  const modalRef2 = useRef(null);

  const closeModal = () => {
    setShowModal(false);
  };

  const ModalChange = (newSelector: number) => {
    setIsVisible(false); // 텍스트 먼저 제거
    setModalSelector(newSelector);

    setTimeout(() => {
      setIsVisible(true);
    }, 20);
  };

  const ModalChange2 = (newSelector: number) => {
    setIsVisible2(false); // 텍스트 먼저 제거
    setModalSelector2(newSelector);

    setTimeout(() => {
      setIsVisible2(true);
    }, 20);
  };

  const width = [
    {
      text: "더 빠른 동영상 편집 성능",
      footnote: "8",
      multiply: "15",
      m2: "100%",
      m1: "72.6667%",
      intel: "6.66667%",
    },
    {
      text: "더 빠른 이미지 필터 및 효과 성능",
      footnote: "9",
      multiply: "5",
      m2: "100%",
      m1: "82%",
      intel: "20%",
    },
    {
      text: "더 빠른 게임 성능",
      footnote: "10",
      multiply: "3.2",
      m2: "100%",
      m1: "75%",
      intel: "31.25%",
    },
    {
      text: "더 빠른 동영상 트랜스코딩 성능",
      footnote: "11",
      multiply: "24",
      m2: "100%",
      m1: "32.9167%",
      intel: "4.16667%",
    },
    {
      text: "더 빠른 이미지 업스케일링 성능",
      footnote: "12",
      multiply: "25",
      m2: "100%",
      m1: "80.8%",
      intel: "4%",
    },
  ];

  const width2 = [
    {
      text: "더 빠른 동영상 트랜스코딩 성능",
      footnote: "13",
      multiply: "2",
      m2: "100%",
      intel: "50%",
    },
    {
      text: "더 빠른 이미지 필터 및 효과 성능",
      footnote: "14",
      multiply: "2",
      m2: "100%",
      intel: "50%",
    },
    {
      text: "더 빠른 웹 애플리케이션 반응 속도",
      footnote: "15",
      multiply: "1.5",
      m2: "100%",
      intel: "66.6667%",
    },
    {
      text: "화상 화의 시 더 긴 배터리 사용 시간",
      footnote: "16",
      multiply: "2.3",
      m2: "100%",
      intel: "43.4783%",
    },
    {
      text: "더 빠른 프로젝트 빌드 성능",
      footnote: "17",
      multiply: "2.2",
      m2: "100%",
      intel: "45.4545%",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsStartHeight(true);
          // 여기서 다른 로직을 수행하거나 다른 상태를 변경할 수 있습니다.
        }
      });
    });

    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsStartHeight2(true);
          // 여기서 다른 로직을 수행하거나 다른 상태를 변경할 수 있습니다.
        }
      });
    });

    if (modalRef.current) {
      observer.observe(modalRef.current);
    }
    if (modalRef2.current) {
      observer2.observe(modalRef2.current);
    }

    return () => {
      if (modalRef.current) {
        observer.unobserve(modalRef.current);
      }
      if (modalRef2.current) {
        observer2.unobserve(modalRef2.current);
      }
    };
  }, []);

  return (
    <>
      <div className="modal">
        <div className="modal-overlay-wrap">
          <div className="modal-overlay">
            <div className="modal-contents">
              <div className="performance-modal-content">
                <div className="content">
                  <div className="mx-chips">
                    <h2 className="typography-modal-headline">비상하게 비상하다.</h2>
                    <div style={{ margin: "28px 0 100px", maxWidth: "75%" }}>
                      <span className="typography-text" style={{ fontSize: "22px" }}>
                        막강한 성능과 전력 효율성으로 Mac 라인업에 일대 변화를 가져온 Apple Silicon. CPU, GPU, 메모리, 그 밖의 구성 요소들을 칩 하나에
                        통합한 혁신적인 시스템 온 칩(SoC, System on Chip) 아키텍처는 <span className="black">무엇을 하든 훨씬 더 빠르게</span>{" "}
                        처리하면서도 전력은 훨씬 적게 소모하죠.
                      </span>
                      <span className="typography-text" style={{ fontSize: "22px", marginTop: "15px" }}>
                        M2 칩은 전보다 개선된 2세대 5나노미터 기술로 설계되었습니다. M1 칩보다 25% 더 많은, 무려 200억 개의 트랜지스터가 집적되어
                        있죠. 여기에 16코어 Neural Engine은 초당 최대 15조 8천억 회의 연산을 통해 머신 러닝 작업을 더 빠르게 수행합니다. 그리고 최대
                        24GB의 고성능 통합 메모리는 CPU와 GPU가 더 커진 메모리 풀을 공유할 수 있게 해줍니다. 또한, M1 칩보다 50% 더 큰 100GB/s 메모리
                        대역폭 덕분에 <span className="black">멀티태스킹을 수행하거나 여러 앱을 실행할 때에도 엄청난 속도를 경험할 수 있죠</span>.
                      </span>
                    </div>
                    <div className="chip-content chip-content-memory">
                      <h3 className="typography-modal-eyebrow chip-content-headline">M2&nbsp;칩</h3>
                      <div className="badge-lockup" style={{ margin: "30px 0 100px" }}>
                        <div className="memory-wrap">
                          <img src={memory} />
                        </div>
                        <div className="stats stats-memory" style={{}}>
                          <div className="badge">
                            <div className="badge-content">
                              <span className="badge-caption">최대</span>
                              <span className="badge-value">24GB</span>
                              <span className="badge-caption">통합 메모리</span>
                            </div>
                          </div>
                          <div className="badge">
                            <div className="badge-content">
                              <span className="badge-value">100GB/s</span>
                              <span className="badge-caption"> 메모리 대역폭</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="chip-content chip-content-power">
                      <div className="badge-lockup">
                        <div className="chip-gradient-container gradient picture-mx-power" role="img"></div>
                        <div className="stats stats-power">
                          <figure className="badge">
                            <div className="badge-content">
                              <span className="badge-value">8코어 CPU</span>
                            </div>
                          </figure>
                          <figure className="badge">
                            <div className="badge-content">
                              <span className="badge-value">최대 10코어 GPU</span>
                            </div>
                          </figure>
                          <figure className="badge">
                            <div className="badge-content">
                              <span className="badge-value">
                                16코어
                                <br /> Neural Engine
                              </span>
                            </div>
                          </figure>
                          <figure className="badge">
                            <div className="badge-content">
                              <span className="badge-value">고성능 미디어 엔진</span>
                            </div>
                          </figure>
                          <figure className="badge">
                            <div className="badge-content">
                              <span className="badge-value">
                                ProRes 동영상
                                <br /> 인코딩 및 디코딩
                              </span>
                            </div>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="chip-speed chip-speed-cpu">
                      <h3 className="typography-modal-eyebrow chip-eyebrow">CPU</h3>
                      <p className="typography-modal-chip-title chip-title">한번 달려볼까?</p>
                      <div className="badge-lockup chip-speed-subsection">
                        <p className="typography-modal-subsection-copy article-copy medium-7 small-12">
                          M2&nbsp;칩의 8코어 CPU는 M1&nbsp;칩의 CPU보다 최대 18% 더&nbsp;빠릅니다.
                          <sup className="footnote footnote-number">
                            <a href="#footnote-7" className="footnote-number">
                              7
                            </a>
                          </sup>{" "}
                          문서나 프레젠테이션 작성 같은 <em>일상적인 일들을 순식간에 처리</em>하는 건 물론, Xcode를 이용한 앱&nbsp;개발이나
                          Logic&nbsp;Pro로 공간 음향 채널까지 들어있는 트랙을 믹싱하는 작업처럼 고사양이 요구되는 워크플로도 너끈히 해내죠.
                        </p>
                        <div className="stats stats-cpu">
                          <figure className="badge">
                            <div className="badge-content">
                              <span className="badge-caption">최대</span>
                              <span className="badge-value">18%</span>
                              <span className="badge-caption">
                                더&nbsp;빠른 속도
                                <sup className="footnote footnote-number">
                                  <a href="#footnote-7" className="footnote-number">
                                    7
                                  </a>
                                </sup>
                              </span>
                            </div>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <div className="chip-speed chip-speed-gpu">
                      <h3 className="typography-modal-eyebrow chip-eyebrow">GPU</h3>
                      <p className="typography-modal-chip-title chip-title">화려한 속도의 미학.</p>
                      <div className="badge-lockup chip-speed-subsection">
                        <p className="typography-modal-subsection-copy article-copy medium-7 small-12">
                          최대 10코어 GPU로 구성할 수 있는 M2&nbsp;칩은 <em>그래픽 성능 면에서 엄청난 도약</em>을 이뤘습니다. M1&nbsp;칩보다
                          <sup className="footnote footnote-number">
                            <a href="#footnote-7" className="footnote-number">
                              7
                            </a>
                          </sup>{" "}
                          최대 35% 더&nbsp;빠른 속도로 사진 색상 보정부터 4K&nbsp;및 8K 동영상 편집까지 어떤 일에도 거침이 없죠.
                        </p>
                        <div className="stats stats-gpu">
                          <figure className="badge">
                            <div className="badge-content">
                              <span className="badge-caption">최대</span>
                              <span className="badge-value">35%</span>
                              <span className="badge-caption">
                                더&nbsp;빠른 속도
                                <sup className="footnote footnote-number">
                                  <a href="#footnote-7" className="footnote-number">
                                    7
                                  </a>
                                </sup>
                              </span>
                            </div>
                          </figure>
                        </div>
                      </div>
                    </div>
                    <h3 className="typography-modal-headline graph-galleries-headline">과연 M2가 얼마나 빠른지 살펴볼까요?</h3>
                    <div className="subsection-gallery">
                      <div className="gallery-container">
                        <h4 className="graph-headline typography-eyebrow-super">
                          M1&nbsp;칩 탑재 MacBook&nbsp;Air&nbsp;및 Intel 기반 MacBook&nbsp;Air와 비교
                        </h4>
                        <div className="versus-m1-intel-gallery graph-gallery">
                          <div className="tablist-wrapper ">
                            <div className="tabnav">
                              <ul role="tablist" className="tabnav-items">
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={0}
                                    modalSelector={modalSelector}
                                    onClick={() => ModalChange(0)}
                                  >
                                    동영상 편집
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={1}
                                    modalSelector={modalSelector}
                                    onClick={() => ModalChange(1)}
                                  >
                                    이미지 필터 및 효과
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={2}
                                    modalSelector={modalSelector}
                                    onClick={() => ModalChange(2)}
                                  >
                                    게임
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={3}
                                    modalSelector={modalSelector}
                                    onClick={() => ModalChange(3)}
                                  >
                                    ProRes 동영상 트랜스코딩
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={4}
                                    modalSelector={modalSelector}
                                    onClick={() => ModalChange(4)}
                                  >
                                    이미지 업스케일링
                                  </TabNavLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="item-container">
                            <div className="gallery-item current" style={{ zIndex: "2", opacity: "1", transform: "translate(0px, 0px)" }}>
                              {width.map((list: any, index: number) => {
                                return modalSelector === index ? (
                                  <div key={index}>
                                    <Disclaimer className="disclaimer" number={index} isVisible={isVisible} modalSelector={modalSelector}>
                                      {list.text}
                                      <sup className="footnote footnote-number">
                                        <a href={`#footnote-${list.footnote}`} className="footnote-number">
                                          {list.footnote}
                                        </a>
                                      </sup>
                                    </Disclaimer>
                                    <div className="group total-column-1">
                                      <div className="bars-container">
                                        <div className="bar-content-container bar-mba">
                                          <Barwrap
                                            className="bar-mask"
                                            number={index}
                                            number2={0}
                                            isVisible={isVisible}
                                            modalSelector={modalSelector}
                                            value={list.m2}
                                            isStartHeight={isStartHeight}
                                            ref={modalRef}
                                          >
                                            <Bar
                                              className="bar bar-1"
                                              number={index}
                                              number2={0}
                                              isVisible={isVisible}
                                              modalSelector={modalSelector}
                                              value={list.m2}
                                            />
                                          </Barwrap>
                                          <Barcaption className="bar-caption" number={index} isVisible={isVisible} modalSelector={modalSelector}>
                                            M2 칩 탑재 MacBook Air
                                          </Barcaption>
                                        </div>
                                        <figure className="badge bar-mba">
                                          <div className="badge-content">
                                            <div className="badge-value-container">
                                              <span className="badge-value">{list.multiply}</span>
                                              <span className="badge-unit">배</span>
                                            </div>
                                            <span className="badge-caption"></span>
                                          </div>
                                        </figure>
                                        <div className="bar-content-container bar-mba-m1 no-badge">
                                          <Barwrap
                                            className="bar-mask"
                                            number={index}
                                            number2={1}
                                            isVisible={isVisible}
                                            modalSelector={modalSelector}
                                            value={list.m1}
                                            isStartHeight={isStartHeight}
                                          >
                                            <Bar
                                              className="bar bar-2"
                                              number={index}
                                              number2={1}
                                              isVisible={isVisible}
                                              modalSelector={modalSelector}
                                              value={list.m1}
                                            />
                                          </Barwrap>
                                          <Barcaption className="bar-caption" number={index} isVisible={isVisible} modalSelector={modalSelector}>
                                            M1&nbsp;칩 탑재 MacBook&nbsp;Air
                                          </Barcaption>
                                        </div>
                                        <div className="bar-content-container bar-baseline no-badge">
                                          <Barwrap
                                            className="bar-mask"
                                            number={index}
                                            number2={2}
                                            isVisible={isVisible}
                                            modalSelector={modalSelector}
                                            value={list.intel}
                                            isStartHeight={isStartHeight}
                                          >
                                            <Bar
                                              className="bar bar-3"
                                              number={index}
                                              number2={2}
                                              isVisible={isVisible}
                                              modalSelector={modalSelector}
                                              value={list.intel}
                                            />
                                          </Barwrap>
                                          <Barcaption className="bar-caption" number={index} isVisible={isVisible} modalSelector={modalSelector}>
                                            듀얼 코어 Intel&nbsp;Core&nbsp;i5 탑재 <br />
                                            MacBook&nbsp;Air(기준치)
                                          </Barcaption>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                        <h4 className="graph-headline typography-eyebrow-super">Intel Core i7 탑재 PC 노트북과 비교</h4>
                        <div className="versus-m1-pc-gallery graph-gallery">
                          <div className="tablist-wrapper ">
                            <div className="tabnav">
                              <ul role="tablist" className="tabnav-items">
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={0}
                                    modalSelector={modalSelector2}
                                    onClick={() => ModalChange2(0)}
                                  >
                                    동영상 편집
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={1}
                                    modalSelector={modalSelector2}
                                    onClick={() => ModalChange2(1)}
                                  >
                                    이미지 필터 및 효과
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={2}
                                    modalSelector={modalSelector2}
                                    onClick={() => ModalChange2(2)}
                                  >
                                    웹 브라우징
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={3}
                                    modalSelector={modalSelector2}
                                    onClick={() => ModalChange2(3)}
                                  >
                                    화상 회의
                                  </TabNavLink>
                                </li>
                                <span className="separator" aria-hidden="true">
                                  /
                                </span>
                                <li role="presentation" className="tabnav-item">
                                  <TabNavLink
                                    role="tab"
                                    className="tabnav-link"
                                    number={4}
                                    modalSelector={modalSelector2}
                                    onClick={() => ModalChange2(4)}
                                  >
                                    코드 컴파일링
                                  </TabNavLink>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="item-container">
                            <div className="gallery-item current" style={{ zIndex: "2", opacity: "1", transform: "translate(0px, 0px)" }}>
                              {width2.map((list: any, index: number) => {
                                return modalSelector2 === index ? (
                                  <div key={index}>
                                    <Disclaimer className="disclaimer" number={index} isVisible={isVisible2} modalSelector={modalSelector2}>
                                      {list.text}
                                      <sup className="footnote footnote-number">
                                        <a href={`#footnote-${list.footnote}`} className="footnote-number">
                                          {list.footnote}
                                        </a>
                                      </sup>
                                    </Disclaimer>
                                    <div className="group total-column-1">
                                      <div className="bars-container">
                                        <div className="bar-content-container bar-mba">
                                          <Barwrap
                                            className="bar-mask"
                                            number={index}
                                            number2={0}
                                            isVisible={isVisible2}
                                            modalSelector={modalSelector2}
                                            value={list.m2}
                                            isStartHeight={isStartHeight2}
                                            ref={modalRef2}
                                          >
                                            <Bar
                                              className="bar bar-1"
                                              number={index}
                                              number2={0}
                                              isVisible={isVisible2}
                                              modalSelector={modalSelector2}
                                              value={list.m2}
                                            />
                                          </Barwrap>
                                          <Barcaption className="bar-caption" number={index} isVisible={isVisible2} modalSelector={modalSelector2}>
                                            M2 칩 탑재 MacBook Air
                                          </Barcaption>
                                        </div>
                                        <figure className="badge bar-mba">
                                          <div className="badge-content">
                                            <div className="badge-value-container">
                                              <span className="badge-value">{list.multiply}</span>
                                              <span className="badge-unit">배</span>
                                            </div>
                                            <span className="badge-caption"></span>
                                          </div>
                                        </figure>
                                        <div className="bar-content-container bar-baseline no-badge">
                                          <Barwrap
                                            className="bar-mask"
                                            number={index}
                                            number2={1}
                                            isVisible={isVisible2}
                                            modalSelector={modalSelector2}
                                            value={list.intel}
                                            isStartHeight={isStartHeight2}
                                          >
                                            <Bar
                                              className="bar bar-3"
                                              number={index}
                                              number2={1}
                                              isVisible={isVisible2}
                                              modalSelector={modalSelector2}
                                              value={list.intel}
                                            />
                                          </Barwrap>
                                          <Barcaption className="bar-caption" number={index} isVisible={isVisible2} modalSelector={modalSelector2}>
                                            Intel Core i7 탑재 PC 노트북(기준치)
                                          </Barcaption>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ) : null;
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button className="modal-close-button" onClick={closeModal}>
              <span className="modal-close-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M12.12,10l4.07-4.06a1.5,1.5,0,1,0-2.11-2.12L10,7.88,5.94,3.81A1.5,1.5,0,1,0,3.82,5.93L7.88,10,3.81,14.06a1.5,1.5,0,0,0,0,2.12,1.51,1.51,0,0,0,2.13,0L10,12.12l4.06,4.07a1.45,1.45,0,0,0,1.06.44,1.5,1.5,0,0,0,1.06-2.56Z"></path>
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
