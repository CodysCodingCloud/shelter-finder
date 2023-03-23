import { log } from 'console';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logoutThunk } from '../store/reducers/userSlice';

export default function LogoutButton({ className }: { className?: string }) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    console.log('logging out?');

    dispatch(logoutThunk());
    navigate(0);
  };
  return (
    <button className={className ? className : 'logout'} onClick={handleSubmit}>
      Logout
    </button>
  );
}
