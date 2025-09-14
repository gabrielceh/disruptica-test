import { NavLink, Outlet, type NavLinkProps } from 'react-router';
import styles from './main-layout.module.css';
import { forwardRef } from 'react';
import clsx from 'clsx';

export function MainLayout() {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.headerContainer}>
					<span>Prueba Técnica</span>
					<nav className={styles.nav}>
						<CustomLink to='/'>Ingreso</CustomLink>
						<CustomLink to='/patients'>Pacientes</CustomLink>
					</nav>
				</div>
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
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
