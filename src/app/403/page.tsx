'use server';
import BackdropPoint from '@/components/common/BackdropPointer';
import { headers } from 'next/headers';

async function ForbiddenPage() {
	const path = `
		${headers().get('Host')}${headers().get('x-next-pathname') || '/'}`;
	return (
		<div className="w-full h-full relative left-0 top-0 items-center flex flex-col flex-wrap justify-center content-center overflow-hidden">
			<BackdropPoint
				path={path}
				ua={headers().get('User-agent') || 'null'}
				eCode={403}
			/>
		</div>
	);
}

export default ForbiddenPage;
