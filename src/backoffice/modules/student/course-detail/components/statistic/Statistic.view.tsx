import { StatisticSection } from './statistic.type';

interface StatisticViewProps {
    statisticData: StatisticSection[];
    isViewAll: boolean;
    toggleViewAll: () => void;
}

const StatisticView: React.FC<StatisticViewProps> = ({ statisticData, isViewAll, toggleViewAll }) => {
    const displayedData = isViewAll ? statisticData : statisticData.slice(0, 2);

    return (
        <div className="py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {displayedData.map((section: StatisticSection, index: number) => (
                    <div key={index} className="mb-10">
                        <h2 className="text-base font-bold text-gray-900 mb-4">{section.title}</h2>
                        <div className="flex items-center space-x-6">
                            {section.items.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className={`flex items-center space-x-1 ${
                                        item.label === 'Late' ? 'ml-auto' : ''
                                    }`}
                                >
                                    <span
                                        className={`text-sm font-semibold ${
                                            item.label === 'Missed' || item.label === 'Late'
                                                ? 'text-red-500'
                                                : item.label === 'Attended' || item.label === 'On Time'
                                                ? 'text-green-500'
                                                : 'text-gray-700'
                                        }`}
                                    >
                                        {item.value}
                                    </span>
                                    <span className="text-sm font-medium text-gray-800">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    <button onClick={toggleViewAll} className="mt-4 text-blue-500">
                        {isViewAll ? 'Hide' : 'View All Statistic'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StatisticView;
