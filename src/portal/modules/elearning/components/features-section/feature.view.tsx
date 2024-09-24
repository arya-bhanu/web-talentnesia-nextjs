import { Divider } from "@/portal/components/divider";
import clsx from "clsx";
import { Benefits } from "./benefits/benefit";
import SkeletonLoader from "@/portal/components/skeleton-animation";

export const FeatureSectionView = ({className, isLoading} : {className?: string, isLoading?: boolean}) => {
    return(
        <section
        className={clsx(className, 
            'min-h-screen flex flex-col pt-6 sm:pt-8 md:pt-10 lg:pt-16 lg:flex-row items-center lg:items-start px-4 sm:px-6 md:px-8 lg:px-[100px]'
        )} style={{backgroundColor: '#f5f9ff'}}>
            <div className="flex-1 text-center lg:text-left w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'45%'} height={30} />
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} height={10} containerStyle={{marginTop: 20}}/>
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} height={10} />
                {
                    !isLoading &&
                    <>
                    <h2 className="font-poppins font-semibold text-slate-800 text-xl sm:text-2xl lg:text-3xl mt-6 sm:mt-8 lg:mt-8 lg:mb-8">
                        Apa yang Membuat E-Learning disini Lebih Unggul?
                    </h2>
                    <p className="text-[#2B2E33] text-sm sm:text-base font-inter mt-4 sm:mt-5 lg:mt-7 w-full sm:w-11/12 md:w-3/4 mx-auto lg:mx-0">
                    Kami selalu update materi biar kamu tetap kekinian di dunia IT yang terus bekembang.
                    Dengan platform E-Learning kita, kamu bisa belajar kapan pun dan di mana pun sesuai kebutuhan,
                    gak ada batasan. 
                    </p>
                    </>
                }
                <Divider className="py-8 sm:py-10 md:py-12 lg:py-16" />
                <Benefits isLoading={isLoading} />
            </div>
        </section>
    );
};
