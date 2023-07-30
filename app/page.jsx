import Head from 'next/head';
import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <Head>
        <title>Promptopia</title>
        <meta name="keywords" content="AI, Prompt, Artificial Intelligence"></meta>
        <meta name="description" content="Promptopia is an open-source AI prompting tool for modern world to discover, create and share creative prompts"></meta>
      </Head>
      <h1 className="head_text text-center">
        Discover & Share
        <br/>
        <span className="orange_gradient text-center">
           AI-Powered Prompts
        </span>
      </h1>

      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for 
        modern world to discover, create and share creative 
        prompts
      </p>

      <Feed />
    </section>
  );
};

export default Home;
