                  {/* PC 메뉴 */}
                  {/* {!isMobile && (
                    <NavTabMenuWrap className="NavTabMenuWrap" isNavFirstMenuShow={isNavFirstMenuShow}>
                      <NavTabMenu className="NavTab-Menu">
                        {categoryList.map((list: any, index: number) => {
                          if (list.navHide) return null; // 숨겨진 메뉴는 출력 하지 않음.
                          return (
                            <NavTabWrap className="NavTabWrap" key={index}>
                              <NavTab
                                className="NavTab NavTab-Menu-li"
                                name={list.name}
                                number={index + 1}
                                total={categoryList.length}
                                onClick={() => MouseClick(list.url)}
                                onMouseEnter={(e) => timerMouseEnter(e, list.name, index)}
                                onMouseLeave={(e) => timerMouseLeave(e)}
                              >
                                <NavTabText className="NavTabText" isSubCateShow={isSubCateShow} name={list.name} selectedCateName={selectedCateName}>
                                  {list.name}
                                </NavTabText>
                              </NavTab>
                              <SubMenu
                                className="SubMenu"
                                isSubCateShow={isSubCateShow}
                                isVisible={isSubCateShow && selectedCateName === list.name}
                                name={list.name}
                                selectedCateName={selectedCateName}
                                height={height}
                                isNavFirstMenuShow={isNavFirstMenuShow}
                                isNavSecondMenuShow={isNavSecondMenuShow}
                              >
                                <SubMenuHeight className="SubMenuHeight" height={height} isNavSecondMenuShow={isNavSecondMenuShow}>
                                  <SubMenuInner
                                    className="SubMenuInner"
                                    name={list.name}
                                    selectedCateName={selectedCateName}
                                    ref={(el) => (submenu.current[index] = el)}
                                  >
                                    <SubMenuList className="SubMenuList main" number={0} grouptotal={3}>
                                      <SubMenuText className="main" isSubCateShow={isSubCateShow} number={1} total={list.taskIds.length + 1}>
                                        {list.name}&nbsp;살펴보기
                                      </SubMenuText>
                                      <SubMenuListItem className="SubMenuListItem">
                                        {list.taskIds.map((taskId: any, index2: number) => {
                                          if (taskId.navHide) return null;
                                          return (
                                            <SubMenuLi
                                              key={taskId._id}
                                              className="SubMenuLi"
                                              name={list.name}
                                              selectedCateName={selectedCateName}
                                              number={index2 + 2}
                                              isSubCateShow={isSubCateShow}
                                              total={list.taskIds.length + 1}
                                              isNavSecondMenuShow={isNavSecondMenuShow}
                                            >
                                              <SubMenuLink
                                                to={
                                                  taskId.subTaskIds && taskId.subTaskIds.length > 0 ? `./${taskId.url}` : `./products/${taskId.url}`
                                                }
                                              >
                                                <SubMenuName className="SubMenuName main">{taskId.name}</SubMenuName>
                                              </SubMenuLink>
                                            </SubMenuLi>
                                          );
                                        })}
                                      </SubMenuListItem>
                                    </SubMenuList>
                                    {NavSubMenuList.map((sublist) => {
                                      if (list.name === sublist.title) {
                                        return renderSubMenu(list, sublist.sections);
                                      }
                                      return null;
                                    })}
                                  </SubMenuInner>
                                </SubMenuHeight>
                              </SubMenu>
                            </NavTabWrap>
                          );
                        })}
                      </NavTabMenu>
                    </NavTabMenuWrap>
                  )} */}

                                      {/* {isMobile && (
                      <>
                        <SubMenu
                          className="SubMenu-Mobile"
                          isSubCateShow={isSubCateShow}
                          name={"search"}
                          selectedCateName={selectedCateName}
                          height={height}
                          isVisible={isSubCateShow && selectedCateName === "search"}
                        >
                          <SubMenuHeight className="SubMenuHeight firstmenu" height={height} isSubCateShow={isSubCateShow}>
                            <SubMenuInner className="SubMenuInner" name={"search"} selectedCateName={selectedCateName}>
                              <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                                <SubMenuText isSubCateShow={isSubCateShow} number={0} total={9}>
                                  검색
                                </SubMenuText>
                                <SubMenuListItem className="SubMenuListItem">
                                  <SubMenuLi
                                    name={"search"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi"
                                    number={1}
                                    isSubCateShow={isSubCateShow}
                                    total={9}
                                  ></SubMenuLi>
                                </SubMenuListItem>
                              </SubMenuList>
                            </SubMenuInner>
                          </SubMenuHeight>
                        </SubMenu>
                        <SubMenu
                          className="SubMenu-Mobile"
                          isSubCateShow={isSubCateShow}
                          name={"cart"}
                          selectedCateName={selectedCateName}
                          height={height}
                          isVisible={isSubCateShow && selectedCateName === "cart"}
                        >
                          <SubMenuHeight className="SubMenuHeight firstmenu" height={height} isSubCateShow={isSubCateShow}>
                            <SubMenuInner className="SubMenuInner" name={"cart"} selectedCateName={selectedCateName}>
                              {navCart && navCart.length !== 0 ? (
                                <SubMenuList className="SubMenuList cart" number={0} grouptotal={3}>
                                  <div className="left">
                                    <SubMenuLi
                                      name={"cart"}
                                      selectedCateName={selectedCateName}
                                      className="SubMenuLi cart-h2"
                                      number={0}
                                      isSubCateShow={isSubCateShow}
                                      total={7}
                                    >
                                      <NavCart.H2 className="cart-main-h2">장바구니</NavCart.H2>
                                    </SubMenuLi>
                                    {navCart &&
                                      navCart.map((list, index) => {
                                        if (index < 3) {
                                          return (
                                            <SubMenuLi
                                              key={index}
                                              className="SubMenuLi cart"
                                              name={"cart"}
                                              selectedCateName={selectedCateName}
                                              number={index + 1}
                                              isSubCateShow={isSubCateShow}
                                              total={7}
                                            >
                                              <NavCart.Link to={""} className="NavCart.Link">
                                                <img src={list.mainImage} width="64" height="64" alt="" />
                                                <NavCart.Name className="NavCart.Name">{list.name}</NavCart.Name>
                                              </NavCart.Link>
                                            </SubMenuLi>
                                          );
                                        } else {
                                          return null;
                                        }
                                      })}
                                    {navCart.length > 3 && (
                                      <SubMenuLi
                                        name={"cart"}
                                        className="SubMenuLi"
                                        isSubCateShow={isSubCateShow}
                                        selectedCateName={selectedCateName}
                                        number={4}
                                        total={7}
                                      >
                                        <div className="globalnav-flyout-item ac-gn-bagview-message">
                                          <span className="ac-gn-bagview-message-text">장바구니에 제품이 1개 더 있음</span>
                                        </div>
                                      </SubMenuLi>
                                    )}
                                  </div>
                                  <div className="right">
                                    <SubMenuLi
                                      name={"cart"}
                                      selectedCateName={selectedCateName}
                                      className="SubMenuLi cart"
                                      number={navCart.length >= 4 ? 5 : navCart.length + 1}
                                      isSubCateShow={isSubCateShow}
                                      total={7}
                                    >
                                      <NavCart.Button to={"./cart"} className="cartcheck">
                                        장바구니 확인
                                      </NavCart.Button>
                                    </SubMenuLi>
                                  </div>
                                </SubMenuList>
                              ) : (
                                <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                                  <SubMenuText className="cart-main-h2" isSubCateShow={isSubCateShow} number={0} total={7}>
                                    장바구니가 비어있습니다.
                                  </SubMenuText>
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart"
                                    number={1}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    {cookies.userjwt ? (
                                      <SubMenuName className="cart">지금 쇼핑하기</SubMenuName>
                                    ) : (
                                      <SubMenuName className="cart">
                                        저장해둔 항목이 있는지 확인하려면
                                        <span className="login" onClick={account.login}>
                                          &nbsp;로그인&nbsp;
                                        </span>
                                        하세요.
                                      </SubMenuName>
                                    )}
                                  </SubMenuLi>
                                </SubMenuList>
                              )}
                              <SubMenuList className="SubMenuList" number={2} grouptotal={3}>
                                <SubMenuText className="cart-profile-text" isSubCateShow={isSubCateShow} number={2} total={7}>
                                  내 프로필
                                </SubMenuText>
                                <SubMenuListItem className="SubMenuListItem">
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart-profile"
                                    number={3}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    <NavCart.ProfileLink to={""} className="profile">
                                      <Icons.Order></Icons.Order>
                                      <SubMenuName className="cartprofile">주문</SubMenuName>
                                    </NavCart.ProfileLink>
                                  </SubMenuLi>
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart-profile"
                                    number={4}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    <NavCart.ProfileLink to={""} className="profile">
                                      <Icons.Favorite></Icons.Favorite>
                                      <SubMenuName className="cartprofile">관심목록</SubMenuName>
                                    </NavCart.ProfileLink>
                                  </SubMenuLi>
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart-profile"
                                    number={5}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    <NavCart.ProfileLink to={"./usersign"} className="profile">
                                      <Icons.Account></Icons.Account>
                                      <SubMenuName className="cartprofile">계정</SubMenuName>
                                    </NavCart.ProfileLink>
                                  </SubMenuLi>
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart-profile"
                                    number={6}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    {!cookies.userjwt ? (
                                      <NavCart.ProfileLink to={""} className="profile" onClick={(e) => account.login(e)}>
                                        <Icons.Login></Icons.Login>
                                        <SubMenuName className="cartprofile">로그인</SubMenuName>
                                      </NavCart.ProfileLink>
                                    ) : (
                                      <NavCart.ProfileLink to={""} onClick={account.logOut}>
                                        <Icons.Login></Icons.Login>
                                        <SubMenuName className="cartprofile">{user.name}&nbsp;로그아웃</SubMenuName>
                                      </NavCart.ProfileLink>
                                    )}
                                  </SubMenuLi>
                                  <SubMenuLi
                                    name={"cart"}
                                    selectedCateName={selectedCateName}
                                    className="SubMenuLi cart-profile"
                                    number={7}
                                    isSubCateShow={isSubCateShow}
                                    total={7}
                                  >
                                    <NavCart.ProfileLink to="../" className="profile">
                                      <Icons.Adminpage></Icons.Adminpage>
                                      <SubMenuName className="cartprofile">관리자 페이지</SubMenuName>
                                    </NavCart.ProfileLink>
                                  </SubMenuLi>
                                </SubMenuListItem>
                              </SubMenuList>
                            </SubMenuInner>
                          </SubMenuHeight>
                        </SubMenu>
                      </>
                    )} */}

                                {/* 모바일 메뉴 */}
            {/* {isMobile && (
              <NavTabMenuWrap className="NavTabMenuWrap" isNavFirstMenuShow={isNavFirstMenuShow}>
                <NavTabMenu className="NavTab-Menu">
                  {categoryList.map((list: any, index: number) => {
                    if (list.navHide) return null; // 숨겨진 메뉴는 출력 하지 않음.
                    return (
                      <NavTabSubMenuWrap className="NavTabSubMenuWrap" key={index}>
                        <NavTabWrap className="NavTabWrap" isNavSecondMenuShow={isNavSecondMenuShow}>
                          <NavTab
                            className="NavTab NavTab-Menu-li"
                            name={list.name}
                            number={index + 1}
                            total={categoryList.length}
                            isSubCateShow={isSubCateShow}
                            onClick={list.taskIds.length > 0 ? (e) => timerMouseEnter(e, list.name, index) : () => navigate(`./${list.url}`)}
                          >
                            <NavTabLink to={`./${list.url}`} className="Link">
                              <NavTabText className="NavTabText" isSubCateShow={isSubCateShow} name={list.name} selectedCateName={selectedCateName}>
                                {list.name}
                              </NavTabText>
                            </NavTabLink>
                            <NavTabArrow className="NavTabArrow">
                              <Icons.NavTabArrow></Icons.NavTabArrow>
                            </NavTabArrow>
                          </NavTab>
                        </NavTabWrap>
                        <SubMenu
                          className="SubMenu"
                          isSubCateShow={isSubCateShow}
                          isVisible={isSubCateShow && selectedCateName === list.name}
                          name={list.name}
                          selectedCateName={selectedCateName}
                          height={height}
                          isNavFirstMenuShow={isNavFirstMenuShow}
                          isNavSecondMenuShow={isNavSecondMenuShow}
                        >
                          <SubMenuHeight className="SubMenuHeight" height={height} isNavSecondMenuShow={isNavSecondMenuShow}>
                            <SubMenuInner
                              className="SubMenuInner"
                              name={list.name}
                              selectedCateName={selectedCateName}
                              ref={(el) => (submenu.current[index] = el)}
                            >
                              <SubMenuList className="SubMenuList main" number={0} grouptotal={3}>
                                <SubMenuListItem className="SubMenuListItem">
                                  {list.taskIds.map((taskId: any, index2: any) => {
                                    if (taskId.navHide) return null;
                                    return (
                                      <SubMenuLi
                                        key={index2}
                                        name={list.name}
                                        selectedCateName={selectedCateName}
                                        className="SubMenuLi"
                                        number={index2 + 1}
                                        isSubCateShow={isSubCateShow}
                                        total={list.taskIds.length + 1}
                                        isNavSecondMenuShow={isNavSecondMenuShow}
                                      >
                                        <SubMenuLink to={`./${taskId.subTaskIds && taskId.subTaskIds.length > 0 ? "" : "products/"}${taskId.url}`}>
                                          <SubMenuName className="SubMenuName main">{taskId.name}</SubMenuName>
                                        </SubMenuLink>
                                      </SubMenuLi>
                                    );
                                  })}
                                </SubMenuListItem>
                              </SubMenuList>
                              {NavSubMenuList.map((sublist) => {
                                if (list.name === sublist.title) {
                                  return renderSubMenu(list, sublist.sections);
                                }
                                return null; // 기본 반환 값 추가
                              })}
                            </SubMenuInner>
                          </SubMenuHeight>
                        </SubMenu>
                      </NavTabSubMenuWrap>
                    );
                  })}
                </NavTabMenu>
                <SubMenu
                  className="SubMenu-Mobile"
                  isSubCateShow={isSubCateShow}
                  name={"search"}
                  selectedCateName={selectedCateName}
                  height={height}
                  isVisible={isSubCateShow && selectedCateName === "search"}
                >
                  <SubMenuHeight className="SubMenuHeight firstmenu" height={height} isSubCateShow={isSubCateShow}>
                    <SubMenuInner className="SubMenuInner" name={"search"} selectedCateName={selectedCateName}>
                      <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                        <SubMenuText isSubCateShow={isSubCateShow} number={0} total={9}>
                          검색
                        </SubMenuText>
                        <SubMenuListItem className="SubMenuListItem">
                          <SubMenuLi
                            name={"search"}
                            selectedCateName={selectedCateName}
                            className="SubMenuLi"
                            number={1}
                            isSubCateShow={isSubCateShow}
                            total={9}
                          ></SubMenuLi>
                        </SubMenuListItem>
                      </SubMenuList>
                    </SubMenuInner>
                  </SubMenuHeight>
                </SubMenu>
                <SubMenu
                  className="SubMenu-Mobile"
                  isSubCateShow={isSubCateShow}
                  name={"cart"}
                  selectedCateName={selectedCateName}
                  height={height}
                  isVisible={isSubCateShow && selectedCateName === "cart"}
                >
                  <SubMenuHeight className="SubMenuHeight firstmenu" height={height} isSubCateShow={isSubCateShow}>
                    <SubMenuInner className="SubMenuInner" name={"cart"} selectedCateName={selectedCateName}>
                      {navCart && navCart.length !== 0 ? (
                        <SubMenuList className="SubMenuList cart" number={0} grouptotal={3}>
                          <div className="left">
                            <SubMenuLi
                              name={"cart"}
                              selectedCateName={selectedCateName}
                              className="SubMenuLi cart-h2"
                              number={0}
                              isSubCateShow={isSubCateShow}
                              total={7}
                            >
                              <NavCart.H2 className="cart-main-h2">장바구니</NavCart.H2>
                            </SubMenuLi>
                            {navCart &&
                              navCart.map((list: any, index: any) => {
                                if (index < 3) {
                                  return (
                                    <SubMenuLi
                                      key={index}
                                      className="SubMenuLi cart"
                                      name={"cart"}
                                      selectedCateName={selectedCateName}
                                      number={index + 1}
                                      isSubCateShow={isSubCateShow}
                                      total={7}
                                    >
                                      <NavCart.Link to={""} className="NavCart.Link">
                                        <img src={list.mainImage} width="64" height="64" alt="" />
                                        <NavCart.Name className="NavCart.Name">{list.name}</NavCart.Name>
                                      </NavCart.Link>
                                    </SubMenuLi>
                                  );
                                } else {
                                  return null;
                                }
                              })}
                            {navCart.length > 3 && (
                              <SubMenuLi
                                name={"cart"}
                                className="SubMenuLi"
                                isSubCateShow={isSubCateShow}
                                selectedCateName={selectedCateName}
                                number={4}
                                total={7}
                              >
                                <div className="globalnav-flyout-item ac-gn-bagview-message">
                                  <span className="ac-gn-bagview-message-text">장바구니에 제품이 1개 더 있음</span>
                                </div>
                              </SubMenuLi>
                            )}
                          </div>
                          <div className="right">
                            <SubMenuLi
                              name={"cart"}
                              selectedCateName={selectedCateName}
                              className="SubMenuLi cart"
                              number={navCart.length >= 4 ? 5 : navCart.length + 1}
                              isSubCateShow={isSubCateShow}
                              total={7}
                            >
                              <NavCart.Button to={"./cart"} className="cartcheck">
                                장바구니 확인
                              </NavCart.Button>
                            </SubMenuLi>
                          </div>
                        </SubMenuList>
                      ) : (
                        <SubMenuList className="SubMenuList" number={0} grouptotal={3}>
                          <SubMenuText className="cart-main-h2" isSubCateShow={isSubCateShow} number={0} total={7}>
                            장바구니가 비어있습니다.
                          </SubMenuText>
                          <SubMenuLi
                            name={"cart"}
                            selectedCateName={selectedCateName}
                            className="SubMenuLi cart"
                            number={1}
                            isSubCateShow={isSubCateShow}
                            total={7}
                          >
                            {cookies.userjwt ? (
                              <SubMenuName className="cart">지금 쇼핑하기</SubMenuName>
                            ) : (
                              <SubMenuName className="cart">
                                저장해둔 항목이 있는지 확인하려면
                                <span className="login" onClick={account.login}>
                                  &nbsp;로그인&nbsp;
                                </span>
                                하세요.
                              </SubMenuName>
                            )}
                          </SubMenuLi>
                        </SubMenuList>
                      )}
                      <SubMenuList className="SubMenuList" number={2} grouptotal={3}>
                        <SubMenuText className="cart-profile-text" isSubCateShow={isSubCateShow} number={2} total={7}>
                          내 프로필
                        </SubMenuText>
                        <SubMenuListItem className="SubMenuListItem">
                          <SubMenuLi
                            name={"cart"}
                            selectedCateName={selectedCateName}
                            className="SubMenuLi cart-profile"
                            number={3}
                            isSubCateShow={isSubCateShow}
                            total={7}
                          >
                            <NavCart.ProfileLink to={""} className="profile">
                              <Icons.Order></Icons.Order>
                              <SubMenuName className="cartprofile">주문</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                          <SubMenuLi
                            name={"cart"}
                            selectedCateName={selectedCateName}
                            className="SubMenuLi cart-profile"
                            number={4}
                            isSubCateShow={isSubCateShow}
                            total={7}
                          >
                            <NavCart.ProfileLink to={""} className="profile">
                              <Icons.Favorite></Icons.Favorite>
                              <SubMenuName className="cartprofile">관심목록</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                          <SubMenuLi
                            name={"cart"}
                            selectedCateName={selectedCateName}
                            className="SubMenuLi cart-profile"
                            number={5}
                            isSubCateShow={isSubCateShow}
                            total={7}
                          >
                            <NavCart.ProfileLink to={"./usersign"} className="profile">
                              <Icons.Account></Icons.Account>
                              <SubMenuName className="cartprofile">계정</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                          <SubMenuLi
                            name={"cart"}
                            selectedCateName={selectedCateName}
                            className="SubMenuLi cart-profile"
                            number={6}
                            isSubCateShow={isSubCateShow}
                            total={7}
                          >
                            {!cookies.userjwt ? (
                              <NavCart.ProfileLink to={""} className="profile" onClick={(e) => account.login(e)}>
                                <Icons.Login></Icons.Login>
                                <SubMenuName className="cartprofile">로그인</SubMenuName>
                              </NavCart.ProfileLink>
                            ) : (
                              <NavCart.ProfileLink to={""} onClick={account.logOut}>
                                <Icons.Login></Icons.Login>
                                <SubMenuName className="cartprofile">{user.name}&nbsp;로그아웃</SubMenuName>
                              </NavCart.ProfileLink>
                            )}
                          </SubMenuLi>
                          <SubMenuLi
                            name={"cart"}
                            selectedCateName={selectedCateName}
                            className="SubMenuLi cart-profile"
                            number={7}
                            isSubCateShow={isSubCateShow}
                            total={7}
                          >
                            <NavCart.ProfileLink to="../" className="profile">
                              <Icons.Adminpage></Icons.Adminpage>
                              <SubMenuName className="cartprofile">관리자 페이지</SubMenuName>
                            </NavCart.ProfileLink>
                          </SubMenuLi>
                        </SubMenuListItem>
                      </SubMenuList>
                    </SubMenuInner>
                  </SubMenuHeight>
                </SubMenu>
              </NavTabMenuWrap>
            )} */}