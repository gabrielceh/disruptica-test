import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {type AuthState } from './auth.state';
import {type AuthActions } from './auth.actions';
import { initialStateAuth } from './initialstate';
import type { User } from '@/core/domain/entities';

const initialState = initialStateAuth;

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
	(set) => ({
	  ...initialState,
	  setUserAuth: ({  token, user }: { user: User; token: string;  }) => {
		set(() => {
		  return {
		    token: `Bearer ${token}`,
			user: user	
		  };
		});
	  },

	  setLogout: () => {
		set(() => ({
		  ...initialStateAuth,
		}));
	  },
	}),

	{
	  name: 'auth-store',
	}
  )
);
