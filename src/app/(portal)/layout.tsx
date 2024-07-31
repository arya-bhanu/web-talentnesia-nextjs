import Header from '@/portal/components/Header';
import Footer from '@/portal/components/Footer';
import React, { ReactNode } from 'react';

const PortalLayout = ({ children }: { children: ReactNode }) => {
	return (
		<section>
			<Header />
			<main>{children}</main>
			<Footer className='mt-24' />
		</section>
	);
};

export default PortalLayout;
