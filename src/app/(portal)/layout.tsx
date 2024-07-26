import FooterView from '@/modules/portal/components/Footer';
import Header from '@/modules/portal/components/Header';
import React, { ReactNode } from 'react';

const PortalLayout = ({ children }: { children: ReactNode }) => {
	return (
		<section>
			<Header />
			<main>{children}</main>
			<FooterView className='mt-24' />
		</section>
	);
};

export default PortalLayout;
