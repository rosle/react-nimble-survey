import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import Button from 'components/Button';
import { User } from 'types/user';

type UserMenuProps = {
  user: User;
  children?: React.ReactNode;
};

const UserMenu = ({ user }: UserMenuProps) => {
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

  const AvatarToggler = () => {
    return (
      <Button className="user-menu__toggler" type="button" buttonStyle="link" onClick={toggleUserMenu}>
        <img src={user.avatarUrl} className="user-menu__avatar" alt="user avatar" />
      </Button>
    );
  };

  return (
    <div className="user-menu">
      <AvatarToggler />
      <div className={collapseClasses} ref={userMenuCollapseRef}>
        <div className="user-menu__content">
          <header className="user-menu__header">
            <div className="user-menu__username">{user.name}</div>
            <AvatarToggler />
          </header>
          <nav className="nav user-menu__nav">
            <Link className="nav-link" to="#">
              {t('auth:action.sign_out')}
            </Link>
          </nav>
          <footer className="user-menu__footer">
            <span>{t('shared:version', { version: process.env.REACT_APP_VERSION })}</span>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
