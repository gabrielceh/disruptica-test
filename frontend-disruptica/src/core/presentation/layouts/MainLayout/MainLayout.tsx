import { forwardRef, Suspense, type ReactNode } from 'react';
import { NavLink, useNavigate, type NavLinkProps } from 'react-router';
import { PatientsRoutes } from '@/modules/patients/router';
import clsx from 'clsx';
import styles from './main-layout.module.css';
import { useAuthStore } from '@/core/stores/auth';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Loader } from '../../components';

interface Props {
	children: ReactNode;
}

export function MainLayout({children}:Props) {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.setLogout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/",{ replace: true });
  };

	return (
		<div className={styles.container}>

          <section className={styles.menuSection}>
            <div className={styles.navContainer}>
              <header className={styles.header}>
                  <div className={styles.headerContainer}>
                     Disruptica
                  </div>
              </header>

              <nav className={styles.nav}>
                <CustomLink to={`/${PatientsRoutes.patients}`}>Patients</CustomLink>
              </nav>
            </div>
            
            <footer className={styles.footer}>
              <div className={styles.footerContainer}>
                  <p>
                      Made with 💪 by{' '}
                      <a href='https://gabrielcervantes.vercel.app/' target='_blank'>
                          {' '}
                          Gabriel Cervantes
                      </a>
                  </p>
              </div>
            </footer>
          </section>

          <section>
            <header className={clsx(styles.header)}>
              <div className={styles.headerUser}>
                 <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">{user.email}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white px-2 py-1 rounded-md">
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup>
                      <DropdownMenuRadioItem value="top" onClick={handleLogout}>Logout</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </header>
			<main className={styles.main}>
				<Suspense fallback={<Loader />}>{children}</Suspense>
			</main>
          </section>

		</div>
	);
}

const CustomLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ children, to, ...props }, ref) => {
	return (
		<NavLink ref={ref} to={to} {...props} className={({ isActive }) => clsx(styles.link, isActive && styles.active)}>
			{children}
		</NavLink>
	);
});
