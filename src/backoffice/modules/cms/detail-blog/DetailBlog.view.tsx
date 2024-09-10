import Image from 'next/image';
import React from 'react';
import Edit from '@/../public/icons/edit.svg';
import Link from 'next/link';

export interface IDetailBlogView {
  id: string;
  imageSrc: string;
  title: string;
  slug: string;
  category: string;
  tag: string[];
  status: string;
  detail: string;
}
const DetailBlogView: React.FC<IDetailBlogView> = ({
  category,
  imageSrc,
  title,
  slug,
  detail,
  status,
  tag,
  id,
}) => {
  return (
    <div className="p-5 bg-white flex gap-10">
      <div className="flex-1">
        <h3 className="font-bold font-lato text-sm">Cover Image</h3>
        <Image
          alt="image detail blog"
          src={imageSrc}
          width={300}
          height={200}
          className="w-full h-[18rem] object-cover mt-2"
        />
      </div>
      <div className="flex flex-col gap-6 flex-1 text-sm">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold font-lato text-sm">
              Judul Blog <span className="text-[#F04438]">*</span>
            </h3>
            <p className="mt-2">{title}</p>
          </div>
          <Link href={`/backoffice/cms/edit-blog/?id=${id}`}>
            <Edit />
          </Link>
        </div>
        <div>
          <h3 className="font-bold font-lato text-sm">
            Slug <span className="text-[#F04438]">*</span>
          </h3>
          <p className="mt-2">{slug}</p>
        </div>
        <div className="flex gap-3">
          <div>
            <h3 className="font-bold font-lato text-sm">
              Kategori <span className="text-[#F04438]">*</span>
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span>{category}</span>
              {tag.map((el) => (
                <span key={el}>{el}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold font-lato text-sm">
              Status <span className="text-[#F04438]">*</span>
            </h3>
            <p className="mt-2">{status}</p>
          </div>
        </div>
        <div>
          <h3 className="font-bold font-lato text-sm">
            Detail Blog <span className="text-[#F04438]">*</span>
          </h3>
          <p className="mt-2">{detail}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailBlogView;
