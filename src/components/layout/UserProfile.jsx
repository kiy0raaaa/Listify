import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

export default function UserProfile() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  return (
    <div className="flex items-center gap-3">
      {currentUser.photoURL && (
        <img
          src={currentUser.photoURL}
          alt="Profile"
          className="w-10 h-10 rounded-full border border-pink-200"
        />
      )}
      <div className="text-left">
        <div className="text-sm font-semibold">
          {currentUser.displayName || currentUser.email?.split('@')[0]}
        </div>
        <div className="text-xs text-slate-500">{currentUser.email}</div>
      </div>
      <Button onClick={logout} variant="secondary" className="ml-2">Keluar</Button>
    </div>
  );
}
