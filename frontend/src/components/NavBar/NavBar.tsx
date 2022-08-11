import { useTheme } from '@emotion/react';
import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';

import useToggle from '@/hooks/useToggle';

import { userState } from '@/recoil/atoms';
import { sideBarSelector } from '@/recoil/selectors';

import Button from '@/components/@common/Button/Button';
import ModalPortal from '@/components/@common/ModalPortal/ModalPortal';
import ProfileFallback from '@/components/Profile/Profile.fallback';

import { PATH } from '@/constants';

import { BiCategory } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { FiCalendar } from 'react-icons/fi';
import { HiChevronDoubleLeft, HiMenu } from 'react-icons/hi';

import BlackLogo from '../../assets/dallog_black.png';
import { logo, logoImg, logoText, menu, menus, menuTitle, navBar } from './NavBar.styles';

const Profile = lazy(() => import('@/components/Profile/Profile'));

function NavBar() {
  const [isSideBarOpen, toggleSideBarOpen] = useRecoilState(sideBarSelector);
  const { accessToken } = useRecoilValue(userState);
  const theme = useTheme();
  const navigate = useNavigate();

  const { state: isProfileModalOpen, toggleState: toggleProfileModalOpen } = useToggle();

  const handleClickSideBarButton = () => {
    toggleSideBarOpen(isSideBarOpen);
  };

  const handleClickMainButton = () => {
    navigate(PATH.MAIN);
  };

  const handleClickCategoryMenuButton = () => {
    navigate(PATH.CATEGORY);
  };

  const handleClickProfileMenuButton = () => {
    toggleProfileModalOpen();
  };

  return (
    <div css={navBar}>
      <div css={menus}>
        {accessToken && (
          <Button cssProp={menu(theme)} onClick={handleClickSideBarButton}>
            {isSideBarOpen ? <HiChevronDoubleLeft size={28} /> : <HiMenu size={28} />}
            <span css={menuTitle}>메뉴</span>
          </Button>
        )}
        <Button cssProp={logo(theme)} onClick={handleClickMainButton}>
          <img src={BlackLogo} alt="logo" css={logoImg} />
          <span css={logoText}>달록</span>
        </Button>
      </div>
      <div css={menus}>
        {accessToken && (
          <>
            <Button cssProp={menu(theme)} onClick={handleClickMainButton}>
              <FiCalendar size={28} />
              <span css={menuTitle}>달력</span>
            </Button>
            <Button cssProp={menu(theme)} onClick={handleClickCategoryMenuButton}>
              <BiCategory size={28} />
              <span css={menuTitle}>카테고리</span>
            </Button>
            <Button cssProp={menu(theme)} onClick={handleClickProfileMenuButton}>
              <FaUserCircle size={28} />
              <span css={menuTitle}>프로필</span>
            </Button>
            <ModalPortal
              isOpen={isProfileModalOpen}
              closeModal={toggleProfileModalOpen}
              dimmerBackground="transparent"
            >
              <Suspense fallback={<ProfileFallback />}>
                <Profile />
              </Suspense>
            </ModalPortal>
          </>
        )}
      </div>
    </div>
  );
}

export default NavBar;
