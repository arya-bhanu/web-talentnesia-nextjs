import { Divider } from "@/portal/components/divider";
import clsx from "clsx";
import { Benefits } from "./benefits/benefit";
import SkeletonLoader from "@/portal/components/skeleton-animation";

export const FeatureSectionView = ({className, isLoading} : {className?: string, isLoading?: boolean}) => {
    return(
        <section
        className={clsx(className, 
            'min-h-screen flex flex-col pt-6 mb-4 sm:pt-8 md:pt-10 lg:pt-16 lg:flex-row items-center lg:items-start px-4 sm:px-6 md:px-8 lg:px-[100px] pb-10 sm:pb-12 md:pb-14 lg:pb-16'
        )} style={{backgroundColor: '#f5f9ff'}}>
            <div className="flex-1 text-center lg:text-left w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-none">
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'45%'} height={30} />
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} height={10} containerStyle={{marginTop: 20}}/>
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} height={10} />
                {
                    !isLoading &&
                    <>
                    <h2 className="font-poppins font-semibold text-slate-800 text-center lg:text-start text-xl sm:text-2xl md:text-3xl lg:text-2xl mt-6 sm:mt-8 md:mt-10 lg:mt-14">
                        Kenapa harus pilih bootcamp Talentnesia?
                    </h2>
                    <p className="text-[#2B2E33] text-sm sm:text-base font-inter mt-3 sm:mt-4 md:mt-5 lg:mt-7 w-full sm:w-11/12 md:w-5/6 lg:w-3/4 mx-auto lg:mx-0 text-center lg:text-left">
                    Dengan kurikulum dari para ahli industri, mentor yang personal, proyek
                    langsung dan, dan total support buat kesuksesan kamu, kita siap bikin pengalaman
                    belajar yang bener-bener ngena buat kamu!
                    </p>
                    </>
                }
                <Divider className="py-8 sm:py-10 md:py-12 lg:py-16" />
                <Benefits isLoading={isLoading} />
            </div>
        </section>
    );
};
