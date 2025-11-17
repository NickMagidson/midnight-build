import { CollectionArchive } from '@/components/CollectionArchive';
import { Button } from '@/components/ui/button';
import configPromise from '@/payload.config';
import * as motion from "motion/react-client";
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPayload } from 'payload';
import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex-col flex items-center justify-center">
      {/* <section className="hero-section m-auto flex flex-col items-center justify-center"> */}
        <motion.h1
          className="heading-gradient text-5xl leading-tight font-semibold text-center mb-4 sm:text-7xl lg:text-8xl lg:leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          Midnight Build
        </motion.h1>

        <motion.p
          className="text-xl text-center text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          Thoughts, tutorials, and insights about web development, technology trends, and software engineering best practices.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4 flex-col sm:flex-row"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <Button asChild variant={"purplePrimary"} size="lg" >
            <Link href="/posts">View Posts</Link>
          </Button>
          <Button asChild variant={"purpleSecondary"} size="lg" >
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      {/* </section> */}
    </div>
  );
};

interface BlogSectionProps {
  posts: any[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <motion.div 
          className="text-left mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="heading-gradient text-3xl md:text-5xl font-bold mb-4 sm:text-7xl lg:text-6xl">
            Recent Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Here are some of the latest articles, tutorials, and project rundowns. From web developement tips to industry insights.
          </p>
        </motion.div>
        
        <CollectionArchive posts={posts} />
        
        <div className="text-center mt-12">
          <Button asChild variant={"purplePrimary"} size="lg">
            <Link href="/posts">View All Posts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise });

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 6,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
  });

  return (
    <>
      <Hero />
      <BlogSection posts={posts.docs} />
    </>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: 'Midnight Build - Web Development Blog',
    description: 'Thoughts, tutorials, and insights about web development, technology trends, and software engineering best practices.',
  };
}
