import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import Button from 'components/Button';
import { User } from 'types/user';

export const userMenuTestIds = {
  userMenuContentToggler: 'user-menu__content-toggler',
  userMenuCollapse: 'user-menu__collapse',
  userAvatar: 'user-menu__avatar',
  userName: 'user-menu__name',
  nav: 'user-menu__nav',
  appVersion: 'user-menu__app-version',
};

interface UserMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
  children?: React.ReactNode;
}

const UserMenu = ({ user, ...props }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const userMenuCollapseRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation(['shared', 'auth']);

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  document.addEventListener('mousedown', (e) => {
    if (isOpen && userMenuCollapseRef.current && !userMenuCollapseRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  });

  const collapseClasses = classNames('user-menu__collapse', isOpen ? 'user-menu__collapse--open' : 'user-menu__collapse--close');

  const AvatarToggler = (togglerProps: React.HTMLAttributes<HTMLButtonElement>) => {
    return (
      <Button className="user-menu__toggler" type="button" buttonStyle="link" onClick={toggleUserMenu} {...togglerProps}>
        <img src={user.avatarUrl} className="user-menu__avatar" alt="user avatar" />
      </Button>
    );
  };

  return (
    <div className="user-menu" {...props}>
      <AvatarToggler data-test-id={userMenuTestIds.userMenuContentToggler} />
      <div className={collapseClasses} ref={userMenuCollapseRef} data-test-id={userMenuTestIds.userMenuCollapse}>
        <div className="user-menu__content">
          <header className="user-menu__header">
            <div className="user-menu__username" data-test-id={userMenuTestIds.userName}>
              {user.name}
            </div>
            <AvatarToggler data-test-id={userMenuTestIds.userAvatar} />
          </header>
          <nav className="nav user-menu__nav" data-test-id={userMenuTestIds.nav}>
            <Link className="nav-link" to="#">
              {t('auth:action.sign_out')}
            </Link>
          </nav>
          <footer className="user-menu__footer">
            <span data-test-id={userMenuTestIds.appVersion}>
              {t('shared:version', { version: process.env.REACT_APP_VERSION })}
            </span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
