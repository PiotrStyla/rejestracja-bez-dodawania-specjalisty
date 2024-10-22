import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const EmailConfirmation: React.FC = () => {
  const [isConfirming, setIsConfirming] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const { error } = await supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          // Email został potwierdzony i użytkownik jest zalogowany
          setIsConfirming(false);
          setTimeout(() => navigate('/admin-dashboard'), 3000); // Przekierowanie po 3 sekundach
        }
      });

      if (error) {
        setError('Wystąpił błąd podczas potwierdzania adresu email.');
        setIsConfirming(false);
      }
    };

    confirmEmail();
  }, [navigate]);

  if (isConfirming) {
    return <div>Potwierdzanie adresu email...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Email został potwierdzony!</h2>
      <p>Za chwilę zostaniesz przekierowany do panelu administratora.</p>
    </div>
  );
};

export default EmailConfirmation;