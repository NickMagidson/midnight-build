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
    <div className="min-h-screen flex-col flex items-center justify-center">
      <section className="hero-section m-auto flex flex-col items-center justify-center">
        <motion.h1
          className="heading-gradient text-5xl font-semibold text-center mb-4 sm:text-7xl lg:text-8xl"
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
          Building powerful web applications with modern technologies. Specialized in full-stack development and innovative solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex gap-4 flex-col sm:flex-row"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          <Button asChild size="lg">
            <Link href="/posts">View My Work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            About
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4">Full-Stack Development</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Experienced in building complete web applications from database design to user interfaces using modern frameworks and technologies.
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4">Modern Technologies</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Specialized in React, Next.js, TypeScript, Node.js, and modern database solutions. Always staying up-to-date with the latest trends.
              </p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4">Problem Solving</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Passionate about solving complex problems and creating efficient, scalable solutions that make a real difference for businesses and users.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface BlogSectionProps {
  posts: any[];
}

const BlogSection: React.FC<BlogSectionProps> = ({ posts }) => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Recent Posts
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts, tutorials, and insights about web development, technology trends, and software engineering best practices.
          </p>
        </div>
        
        <CollectionArchive posts={posts} />
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
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
      <AboutSection />
      <BlogSection posts={posts.docs} />
    </>
  );
}

export function generateMetadata(): Metadata {
  return {
    title: 'Midnight Build - Full-Stack Developer',
    description: 'Building powerful web applications with modern technologies. Specialized in full-stack development and innovative solutions.',
  };
}
