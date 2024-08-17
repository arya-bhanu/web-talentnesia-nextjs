import React from 'react';
import { Breadcrumb } from '@/portal/components/breadcrumb';
import { IoEyeOutline } from 'react-icons/io5';
import SocialMedia from '@/portal/components/social-media/SocialMedia';
import Image from 'next/image';
import { relatedArticles } from './singleblog.data';
import { FaArrowRightLong } from 'react-icons/fa6';

const SingleBlogview = () => {
  return (
    <div className="pt-20">
      <div className="flex flex-col">
        <div className="relative">
          <article className="relative flex flex-col overflow-hidden w-full">
            <Image
              src="/img/blog/map.jpg"
              width={500}
              height={450}
              alt="Using Notion To Make Portfolio"
              className="w-full h-[450px] object-cover"
            />
            <div className=" absolute inset-0 p-6 flex flex-col justify-between">
              <Breadcrumb
                pathSegments={[]}
                currentPath="SingleBlog"
                className="text-md font-inter text-[#FFFFFF] px-10 py-6"
              />
              <div className="flex flex-col justify-end px-24 py-24">
                <h3 className="text-4xl font-semibold text-white mb-10 font-poppins">
                  Start a Blog To Reach Your Creative Peak
                </h3>
                <div className="text-sm text-white flex space-x-8">
                  <div>Article</div><span className='mx-2'>•</span>
                  <div>Prayuda Rians</div>
                  <div>3 Jan 2023</div>
                  <div className="flex items-center">
                    <IoEyeOutline className="mr-1 text-gray-300" /> 132
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="bg-white py-8">
          <div className="container mx-auto px-4 flex flex-col md:flex-row">
            <div className="w-full md:w-3/4 px-8 flex justify-center align-center">
              <div className="prose max-w-4xl min-w-md m-auto font-poppins">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed sit amet feugiat eros,
                  eget eleifend dolor. Proin maximus bibendum felis, id fermentum odio vestibulum id. Sed ac ligula eget
                  dolor consequat tincidunt. Nullam fringilla ipsum et ex lacinia, at bibendum elit posuere. Aliquam
                  eget leo nec nibh mollis consectetur.
                </p>

                <div className="bg-[#F2F4F7] mt-8 px-6 py-6 font-inter">
                  <h2>Table Of Content</h2>
                  <br />
                  <a className="text-[#00558C] underline pb-4" href="#">
                    How To Make Tagline Image
                  </a>
                  <br />
                  <a className="text-[#00558C] underline pt-2" href="#">
                    How To Insert Photos
                  </a>
                  <br />
                </div>

                <div className="relative">
                  <h1 className="text-3xl font-semibold py-8 font-poppins text-[#2B2E33]">How To Make Tagline Image</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed sit amet feugiat eros,
                    eget eleifend dolor. Proin maximus bibendum felis, id fermentum odio vestibulum id. Sed ac ligula
                    eget dolor consequat tincidunt. Nullam fringilla ipsum et ex lacinia, at bibendum elit posuere.
                    Aliquam eget leo nec nibh mollis consectetur.
                  </p>
                </div>

                <div className="relative">
                  <h1 className="text-3xl font-semibold py-16 font-poppins text-[#2B2E33]">How To Insert Photo</h1>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Sed sit amet feugiat eros,
                    eget eleifend dolor. Proin maximus bibendum felis, id fermentum odio vestibulum id. Sed ac ligula
                    eget dolor consequat tincidunt. Nullam fringilla ipsum et ex lacinia, at bibendum elit posuere.
                    Aliquam eget leo nec nibh mollis consectetur.
                  </p>
                </div>
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-800"/>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                <label className="text-black font-poppins text-sm px-8 py-3">
                  Tags:
                </label>
                <button type="button" className="text-black font-poppins  bg-[#F2F4F7] hover:bg-blue-100 text-sm px-8 py-3 mx-2">
                  Website Development
                </button>
                <button type="button" className="text-black font-poppins  bg-[#F2F4F7] hover:bg-blue-100 text-sm px-6 py-3 mx-2">
                  Website
                </button>
                <button type="button" className="text-black font-poppins  bg-[#F2F4F7] hover:bg-blue-100 text-sm px-6 py-3 mx-2">
                  Blog
                </button>
                </div>
                
                <div className="bg-[#F2F4F7] rounded-lg w-max max-w-7xl mx-auto mt-12 px-6 py-6 flex flex-col lg:flex-row justify-between items-center">
              <div className="flex flex-col max-w-2xl mb-6 lg:mb-0 px-8 py-8">
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
            
              </div>
            </div>

            <div className="w-full md:w-1/4 px-4">
              <div className="bg-white p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Share Blog</h2>
                <SocialMedia className="mt-3 sm:mt-5 lg:mt-7" />
              </div>

              <div className="bg-white p-4 mt-4 group">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Related Articles</h2>
      <ul className="list-none">
        {relatedArticles.map((article, index) => (
          <li key={index} className="mb-4 flex items-start space-x-4 transition duration-300 ease-in-out hover:scale-110 cursor-pointer">
            <Image
              src={article.imageSrc}
              width={150}
              height={150} 
              alt={article.title}
              className="object-cover"
            />
            <div className="flex flex-col">
              <a href={article.url} className="text-gray-700 hover:text-gray-900 font-semibold">
                {article.title}
              </a>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <IoEyeOutline className="mr-1" /> 132
                <span className="mx-2">•</span> 3 Jan 2023
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogview;
