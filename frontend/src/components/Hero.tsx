"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Decorative Blur Orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {isMounted &&
          [...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-luxury-gold/5 rounded-full blur-[80px]"
              initial={{
                width: 400,
                height: 400,
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                opacity: 0,
              }}
              animate={{
                x: Math.random() * 1000 - 500,
                y: Math.random() * 1000 - 500,
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.03,
                delayChildren: 12, // Sync with 12s GIF duration
              },
            },
          }}
        >
          <motion.span
            className="text-luxury-gold tracking-[0.3em] md:tracking-[0.6em] text-[10px] md:text-xs uppercase mb-6 block font-medium whitespace-nowrap"
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {"The Future of Tradition".split(" ").map((word, wordIdx) => (
              <span
                key={wordIdx}
                className="inline-block whitespace-nowrap mr-[1ch]"
              >
                {word.split("").map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    className="inline-block"
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0 },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </motion.span>

          <h1 className="text-5xl md:text-9xl font-bold brand-font mb-8 leading-[1] md:leading-tight tracking-tighter">
            <span className="block italic">
              {"RUPSHAKHA".split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { type: "spring", stiffness: 100 },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
            <span className="gold-gradient italic block">
              {"MASTERPIECE".split(" ").map((word, wordIdx) => (
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                  {word.split("").map((char, charIdx) => (
                    <motion.span
                      key={charIdx}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: 50 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { type: "spring", stiffness: 100 },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </h1>
        </motion.div>

        <motion.p
          className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 13.5, duration: 1 }}
        >
          Immerse yourself in a world where gold meets futuristic design.
          Experience the ultimate Bangladeshi bangle collection.
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 14.2, duration: 0.8 }}
        >
          <Link
            href="/products"
            className="group relative px-12 py-5 bg-luxury-gold text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(212,175,55,0.5)]"
          >
            <span className="relative z-10 tracking-widest text-sm">
              EXPLORE COLLECTIONS
            </span>
          </Link>
          <Link
            href="/about"
            className="px-12 py-5 border border-white/10 hover:border-luxury-gold hover:bg-white/5 transition-all font-bold rounded-full tracking-widest text-sm"
          >
            OUR STORY
          </Link>
        </motion.div>
      </div>

      {/* Hero scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-t from-luxury-gold to-transparent"
        initial={{ height: 0 }}
        animate={{ height: 96 }}
        transition={{ delay: 15, duration: 1 }}
      />
    </section>
  );
};

export default Hero;
