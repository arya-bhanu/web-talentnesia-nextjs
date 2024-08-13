import React from 'react';
import { Breadcrumb } from '@/portal/components/breadcrumb';
import { IoEyeOutline } from 'react-icons/io5';
import { Article } from './blog.type';
import { FaArrowRightLong } from "react-icons/fa6";

interface BlogviewProps {
  articles: Article[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Blogview: React.FC<BlogviewProps> = ({ articles, currentPage, totalPages, onPageChange }) => {
  return (
    <div>
      <div className="relative px-6 pt-16 pb-20 lg:px-8 lg:pt-24 lg:pb-28">
        <div className="absolute inset-0 bg-[#E0F7FA] h-[760px] z-0"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-left">
            <Breadcrumb className="my-8 md:my-0 md:mb-5 pt-5" pathSegments={[]} />
            <div className="pt-5">
              <h2 className="text-5xl font-bold tracking-tight text-gray-800 sm:text-4xl mt-9 font-inter">
                Talentnesia Blog
              </h2>
              <p className="mt-3 max-w-2xl text-base text-gray-800 sm:mt-4 pt-5 font-inter">
                Welcome to our blog! Here, we share valuable insights, industry trends, and expert advice on a variety of topics.
              </p>
            </div>

          <div className='mt-9'>
          <p className="max-w-2xl text-xl text-gray-700 pt-5 font-inter pb-4">
            Kategori
          </p>
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button type="button" className="text-black font-inter bg-[#FFC862] hover:bg-blue-100 border border-[#D0D5DD] focus:outline-none focus:ring-4 rounded-full text-sm px-8 py-3 mx-2">
              All
            </button>
            <button type="button" className="text-black font-inter bg-[#FFC862] hover:bg-blue-100 border border-[#D0D5DD] focus:outline-none focus:ring-4 rounded-full text-sm px-6 py-3 mx-2">
              Animation
            </button>
            <button type="button" className="text-black font-inter bg-[#FFC862] hover:bg-blue-100 border border-[#D0D5DD] focus:outline-none focus:ring-4 rounded-full text-sm px-6 py-3 mx-2">
              Digital Marketing
            </button>
            <div className="relative ml-auto mt-4 md:mt-0 w-full max-w-lg">
              <input 
                type="text" 
                name="Search" 
                className="w-full border h-12 shadow p-4 rounded-full text-gray-800 border-gray-300 bg-white" 
                placeholder="Search" 
              />
              <button type="submit" className="absolute top-3.5 right-3">
                <svg className="text-gray-400 h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56.966 56.966">
                  <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>


            <div className="mt-12">
              <h3 className="text-2xl font-poppins font-bold text-[#344054] mb-6">Terpopuler</h3>
              <div className="mx-auto grid gap-5 lg:max-w-none lg:grid-cols-2">
                <article className="relative flex flex-col rounded-2xl overflow-hidden w-full group cursor-pointer">
                  <img
                    src="/img/blog/writing.jpg"
                    alt="Article Image"
                    className="w-full h-[250px] object-cover transition duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">Using Notion To Make Portfolio</h3>
                    <div className="text-sm text-gray-300 flex space-x-4">
                      <div>Prayuda Rians</div>
                      <div>3 Jan 2023</div>
                      <div className="flex items-center">
                        <IoEyeOutline className="mr-1 text-gray-300" /> 132
                      </div>
                    </div>
                  </div>
                </article>

                <article className="relative flex flex-col rounded-2xl overflow-hidden w-full group cursor-pointer">
                  <img
                    src="/img/blog/teacher.jpg"
                    alt="Article Image"
                    className="w-full h-[250px] object-cover transition duration-300 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">Using Notion To Make Portfolio</h3>
                    <div className="text-sm text-gray-300 flex space-x-4">
                      <div>Prayuda Rians</div>
                      <div>3 Jan 2023</div>
                      <div className="flex items-center">
                        <IoEyeOutline className="mr-1 text-gray-300" /> 132
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div className="bg-[#F2F4F7] rounded-lg w-full max-w-7xl mx-auto mt-12 px-6 py-6 flex flex-col lg:flex-row justify-between items-center">
              <div className="flex flex-col max-w-lg mb-6 lg:mb-0">
                <h3 className="font-poppins font-semibold text-[20px] text-[#344054]">
                  Temukan Lebih Banyak Wawasan Berguna dengan Berlangganan NewsLetter Kami
                </h3>
                <h4 className="mt-4 font-poppins font-normal text-[14px] text-[#455A64]">
                  Mulai berlangganan NewsLetter kami untuk mendapatkan update artikel terbaru dari Sekawan Studio
                </h4>
              </div>
              <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <input
                  type="email"
                  placeholder="Tulis email anda"
                  className="w-[800px] max-w-xs border-b h-12 text-gray-800 border-gray-300 bg-[#F2F4F7] border-t-0 border-r-0 border-l-0"
                />
                <button
                  type="submit"
                  className="bg-[#00B3AD] text-white font-poppins rounded-full h-12 px-8 flex items-center justify-center space-x-2"
                >
                  <span>Submit</span>
                  <FaArrowRightLong className="ml-2" />
                </button>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-poppins font-bold text-[#344054] mb-6">Artikel Terbaru</h3>
              <div className="mx-auto grid gap-5 lg:max-w-none lg:grid-cols-4">
                {articles.map((article, index) => (
                  <article key={index} className="relative flex flex-col rounded-2xl overflow-hidden w-full group cursor-pointer">
                    <img
                      src={article.imageSrc}
                      alt={article.title}
                      className="w-full h-[250px] object-cover transition duration-300 bg-[hsl(0,0%,98.4%,0.2)] bg-fixed opacity-100 ease-in-out group-hover:brightness-50"
                    />
                    <div className="p-6 bg-white">
                      <h3 className="text-xl max-w-lg font-bold text-[#2B2E33]">{article.title}</h3>
                      <div className="mt-3 text-sm text-gray-600 flex flex-col space-y-2">
                        <div className='flex items-center space-x-2'>  
                          <span>{article.date}</span>
                          <IoEyeOutline className="mr-1 text-gray-400 pl-1" /> 
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogview;
