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
import { TRANSPARENT } from '@/constants/style';

import {
  MdCalendarToday,
  MdMenu,
  MdMenuOpen,
  MdOutlineCategory,
  MdPersonOutline,
} from 'react-icons/md';

import BlackLogo from '../../assets/dallog_black.png';
import { logo, logoImg, logoText, menu, menus, menuTitle, navBar } from './NavBar.styles';

const Profile = lazy(() => import('@/components/Profile/Profile'));

function NavBar() {
  const { accessToken } = useRecoilValue(userState);
  const [isSideBarOpen, toggleSideBarOpen] = useRecoilState(sideBarSelector);

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
          <Button
            cssProp={menu(theme)}
            onClick={handleClickSideBarButton}
            aria-label={isSideBarOpen ? '사이드바 닫기' : '사이드바 열기'}
          >
            {isSideBarOpen ? <MdMenuOpen size={28} /> : <MdMenu size={28} />}
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
            <Button cssProp={menu(theme)} onClick={handleClickMainButton} aria-label="달력 메뉴">
              <MdCalendarToday />
              <span css={menuTitle}>달력</span>
            </Button>
            <Button
              cssProp={menu(theme)}
              onClick={handleClickCategoryMenuButton}
              aria-label="카테고리 메뉴"
            >
              <MdOutlineCategory />
              <span css={menuTitle}>카테고리</span>
            </Button>
            <Button
              cssProp={menu(theme)}
              onClick={handleClickProfileMenuButton}
              aria-label="프로필 메뉴"
              aria-expanded={isProfileModalOpen}
            >
              <MdPersonOutline />
              <span css={menuTitle}>프로필</span>
            </Button>
            <ModalPortal
              isOpen={isProfileModalOpen}
              closeModal={toggleProfileModalOpen}
              dimmerBackground={TRANSPARENT}
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
