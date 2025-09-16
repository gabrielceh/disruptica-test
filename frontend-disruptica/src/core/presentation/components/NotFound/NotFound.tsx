import { notFound } from '@/assets/images';
import type { ReactNode } from 'react';

interface Props {
	message: ReactNode;
}

export function NotFound({ message }: Props) {
	return (
		<div className='flex flex-col items-center justify-center gap-4 text-center'>
			<img src={notFound} alt='No encontrado' width={300} height={300} />
			<h2 className='text-4xl font-bold'>{message}</h2>
		</div>
	);
}
