import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export default function UserProfile() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  // Get initial for placeholder
  const getInitial = () => {
    const name = currentUser.displayName || currentUser.email?.split('@')[0] || 'U';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="user-profile">
      {currentUser.photoURL ? (
        <img
          src={currentUser.photoURL}
          alt="Profile"
          className="user-profile-image"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="user-profile-placeholder">{getInitial()}</div>
      )}
      
      <div className="user-profile-info">
        <div className="user-profile-name">
          {currentUser.displayName || currentUser.email?.split('@')[0]}
        </div>
        <div className="user-profile-email">{currentUser.email}</div>
      </div>
      
      <Button onClick={logout} variant="secondary">Keluar</Button>
    </div>
  );
}
