import dynamic from 'next/dynamic';

const MentorPage = dynamic(() => import('./mentors.view'), { ssr: false });

export default MentorPage;