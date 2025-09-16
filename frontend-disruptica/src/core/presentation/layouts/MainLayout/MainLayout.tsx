import { NavLink, Outlet, type NavLinkProps } from 'react-router';
import styles from './main-layout.module.css';
import { forwardRef } from 'react';
import clsx from 'clsx';
import { PatientsRoutes } from '@/modules/patients/router';

export function MainLayout() {
	return (
		<div className={styles.container}>

          <section className={styles.menuSection}>
            <div className={styles.navContainer}>
              <header className={styles.header}>
                  <div className={styles.headerContainer}>
                      <span>Prueba Técnica</span>
                  </div>
              </header>

              <nav className={styles.nav}>
                <CustomLink to={`/${PatientsRoutes.patients}`}>Pacientes</CustomLink>
              </nav>

            </div>
            <footer className={styles.footer}>
              <div className={styles.footerContainer}>
                  <p>
                      Hecho con 💪 por{' '}
                      <a href='https://gabrielcervantes.vercel.app/' target='_blank'>
                          {' '}
                          Gabriel Cervantes
                      </a>
                  </p>
              </div>
          </footer>

          </section>
          <section>
            <header className={styles.header}></header>
			<main className={styles.main}>
				<Outlet />
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
