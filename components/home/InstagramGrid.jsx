'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const instagramPosts = [
  { url: 'https://www.instagram.com/reel/DVO30xjCCP9/', image: '/images/hero-equipe.jpg' },
  { url: 'https://www.instagram.com/reel/DXtkscXMch2/', image: '/images/hero-boutique.jpg' },
  { url: 'https://www.instagram.com/p/DXoYs2eCMKb/', image: '/images/hero-stade.jpg' },
  { url: 'https://www.instagram.com/p/DXkRbWJDn9d/', image: '/images/hero-calendrier.jpg' },
  { url: 'https://www.instagram.com/p/DXjublojM5a/', image: '/images/hero-actualites.jpg' },
  { url: 'https://www.instagram.com/p/DXht_SpCAA6/', image: '/images/hero-club.jpg' },
  { url: 'https://www.instagram.com/p/DXhf7AnCKwn/', image: '/images/hero-billetterie.jpg' },
  { url: 'https://www.instagram.com/p/DXhantZiJGd/', image: '/images/hero-accueil.jpg' }
];

export function InstagramGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {instagramPosts.map((post, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden bg-pau-night"
          >
            <Image
              src={post.image}
              alt={`Post Instagram Pau FC`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-pau-night/0 transition-colors group-hover:bg-pau-night/10" />
          </a>
        </motion.div>
      ))}
    </div>
  );
}
