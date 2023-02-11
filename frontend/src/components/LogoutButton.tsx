import { log } from 'console';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { logoutThunk } from '../store/reducers/userSlice';

export default function LogoutButton() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = async () => {
    dispatch(logoutThunk());
    navigate('/');
  };
  return (
    <button className="logout" type="submit" onSubmit={handleSubmit}>
      Logout
    </button>
  );
}
