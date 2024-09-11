'use client';
import React from 'react';
import DetailBlogView, { IDetailBlogView } from './DetailBlog.view';
import { useSearchParams } from 'next/navigation';

const blogDetail: IDetailBlogView = {
  category: 'IT Development',
  detail: `Lorem ipsum dolor sit amet consectetur. Nisi rhoncus amet elit purus cras. Et odio a vel purus malesuada id. Sollicitudin egestas dolor nibh amet id cursus purus enim est. Pulvinar metus eget consequat sit pellentesque. Vel pellentesque aliquam convallis ornare gravida facilisi cras. Nullam mi pretium blandit malesuada. Tortor leo mattis id enim quis. Nunc sed id placerat ullamcorper suspendisse viverra. Sapien tincidunt adipiscing morbi euismod in nulla mauris consequat. Eget fusce sed potenti cras. Non nulla mattis amet mauris laoreet amet elementum egestas. Urna sit adipiscing venenatis quam interdum faucibus curabitur aenean velit.

Feugiat consectetur velit vitae diam. Fusce nullam egestas sed tortor posuere. Feugiat eu at eget nulla imperdiet arcu at tempus. Quisque tellus vitae elit a iaculis. In amet massa libero tortor etiam. Dictum egestas sed mattis urna id. At semper enim egestas mattis proin posuere.

Nulla ornare auctor convallis est pharetra egestas augue nec nisi. Arcu viverra tincidunt lectus vitae felis in. Habitant id velit id vulputate accumsan in quam. Diam id viverra ultricies feugiat semper. Bibendum erat quam tristique praesent sed. Sed ultrices tincidunt lobortis gravida proin netus nulla scelerisque dignissim. Consectetur aliquam id quis malesuada orci. Diam posuere diam duis lacus. Faucibus purus pharetra pellentesque turpis faucibus sit leo. Dolor aliquet facilisis eget fames pellentesque vel gravida arcu venenatis.`,
  slug: 'learn-coding-in-scratch-with-a-cool-game-idea',
  status: 'Published',
  imageSrc: 'https://placehold.co/600x400',
  tag: ['Development'],
  title: 'Learn Coding in Scratch with a Cool Game Idea',
  id: '1',
};
const DetailBlog = () => {
  const params = useSearchParams();
  const id = params.get('id');
  return <DetailBlogView {...blogDetail} />;
};

export default DetailBlog;
