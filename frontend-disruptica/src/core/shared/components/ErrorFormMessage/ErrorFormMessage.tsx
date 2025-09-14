import type { ReactNode } from 'react';

interface Props {
	message: string | ReactNode;
}

export function ErrorFormMessage({ message }: Props) {
	return <div className='text-red-500 pl-2'>{typeof message === 'string' ? <p className='text-xs'>{message}</p> : message}</div>;
}
