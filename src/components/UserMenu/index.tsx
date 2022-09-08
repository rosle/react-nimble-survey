import Button from 'components/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { User } from 'types/user';

type UserMenuProps = {
  user: User,
  children?: React.ReactNode,
}

const UserMenu = ({ user }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsOpen(!isOpen);
  };

  // TODO: Or click outside?
  const AvatarToggler = () => {
    return (
      <Button className="user-menu__toggler" type="button" buttonStyle="link" onClick={toggleUserMenu}>
        <img src={user.avatarUrl} className="user-menu__avatar" alt="user avatar"/>
      </Button>
    );
  }

  return (
    <div className="user-menu">
      <AvatarToggler />
      <div className={`user-menu__collapse ${isOpen && 'user-menu__collapse--open'}`}>
        <header className="user-menu__header">
          <div className="user-menu__username">{user.name}</div>
          <AvatarToggler />
        </header>
        <nav className="nav user-menu__nav">
          <Link className="nav-link" to="#">Logout</Link>
        </nav>
        <footer className="user-menu__footer">
          <span>v0.1.0 (1562903885)</span>
        </footer>
      </div>
    </div>
  );
}

export default UserMenu;
