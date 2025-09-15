import { useMutation } from '@tanstack/react-query';
import { loginUsecase } from '@modules/auth/di';
import { useAuthStore } from '@/core/stores/auth';

interface LoginParams {
  email: string;
  password: string;
}


export const useLoginMutation = () => {
  const login  = useAuthStore((state) => state.setUserAuth);

  const mutation = useMutation({
    mutationFn: (credentials: LoginParams) =>  loginUsecase.execute(credentials.email, credentials.password),
    
    onSuccess: (data) => {
      if(data.status === 'error' || data.data === null) {        
        throw new Error(data.message);
      }

      login(data.data);
    },
  })

  return mutation;
};