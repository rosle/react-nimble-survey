import { Link } from 'react-router-dom';
import { User } from 'types/user';

type UserMenuProps = {
  user: User,
  children?: React.ReactNode,
}

const UserMenu = ({ user }: UserMenuProps) => {
  return (
    <div className="user-menu">
      <button className="user-menu__toggler" type="button">
        <img src={user.avatarUrl} className="user-menu__avatar" alt="user avatar"/>
      </button>
      <div className="user-menu__collapse">
        <header>
          <div className="user-menu__username">{user.name}</div>
          <img src={user.avatarUrl} className="user-menu__avatar" alt="user avatar"/>
        </header>
        <hr />
        <nav className="nav user-menu__nav">
          <Link className="nav-link" to="#">Logout</Link>
        </nav>
        <footer>
          <span>v0.1.0 (1562903885)</span>
        </footer>
      </div>
    </div>
  );
}

export default UserMenu;
