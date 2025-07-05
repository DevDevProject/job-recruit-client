import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function OAuth2Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem('jwt', token);
      navigate('/');
    } else {
      alert('로그인 실패\n 다시 시도해 주세요');
      navigate('/signin');
    }
  }, []);

  return <div>로그인 처리 중...</div>;
}
