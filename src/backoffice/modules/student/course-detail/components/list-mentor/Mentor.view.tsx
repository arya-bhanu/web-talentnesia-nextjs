import Image from 'next/image';
import { Mentor } from './mentor.type';

interface MentorViewProps {
    mentorData: Mentor[];
}

const MentorView: React.FC<MentorViewProps> = ({ mentorData }) => {
    return (
        <div className="mt-1">
            <div className="max-w-xl mx-auto px-10">
                <h2 className="text-base font-bold text-gray-900 mb-4">Mentors</h2>
                <div>
                    {mentorData.map((mentor, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4">
                            <Image src={mentor.photo} alt={mentor.name} width={30} height={30} />
                            <span className="text-sm font-medium text-gray-800">{mentor.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MentorView;
