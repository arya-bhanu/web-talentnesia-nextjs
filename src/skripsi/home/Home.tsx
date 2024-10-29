import HomeView from './Home.view';

const Home = async () => {
  let data = await fetch(`${process.env.API_SKRIPSI}/cms/home/all`, {
    next: { tags: ['home'] },
  });
  let posts = await data.json();

  return <HomeView dataHome={posts} skeletonAnimation={false} />;
};

export default Home;
