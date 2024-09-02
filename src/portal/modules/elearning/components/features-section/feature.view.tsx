import { Divider } from "@/portal/components/divider";
import clsx from "clsx";
import { Benefits } from "./benefits/benefit";
import SkeletonLoader from "@/portal/components/skeleton-animation";

export const FeatureSectionView = ({className, isLoading} : {className?: string, isLoading?: boolean}) => {
    return(
        <section
        className={clsx(className, 
            'min-h-[80vh] md:min-h-[70vh] lg:min-h-[95vh] flex flex-col pt-10 mb-7 md:pt-14 lg:pt-24 lg:flex-row items-center lg:items-start px-4 lg:px-[278px]'
        )} style={{backgroundColor: '#f5f9ff'}}>
            <div className="flex-[1] text-center lg:text-left">
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'45%'} height={30} />
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} height={10} containerStyle={{marginTop: 28}}/>
                <SkeletonLoader visible={isLoading ? isLoading : false} width={'70%'} height={10} />
                {
                    !isLoading &&
                    <>
                    <h2 className="font-poppins font-semibold text-slate-800 md:text-start text-center text-xl md:text-2xl lg:mt-14 lg:text-2xl">
                        Apa yang Membuat E-Learning disini Lebih Unggul?
                    </h2>
                    <p className="text-[#2B2E33] text-base font-inter mt-7 w-3/4">
                    Kami selalu update materi biar kamu tetap kekinian di dunia IT yang terus bekembang.
                    Dengan platform E-Learning kita, kamu bisa belajar kapan pun dan di mana pun sesuai kebutuhan,
                    gak ada batasan. 
                    </p>
                    </>
                }
                
                
                <Divider className="py-16" />
                <Benefits isLoading={isLoading} />
            </div>
            
        </section>
    );
};