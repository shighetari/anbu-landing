'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import React from 'react';

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(''),
  }));

  return (
    <div
      className={cn(
        'text-center text-base font-bold sm:text-xl md:text-3xl lg:text-5xl',
        className
      )}
    >
      {wordsArray.map((word, idx) => (
        <span key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: idx * 0.3 + index * 0.05,
                ease: [0.2, 0.65, 0.3, 0.9],
              }}
              className={cn('inline-block', word.className)}
              key={`char-${index}`}
            >
              {char}
            </motion.span>
          ))}
          &nbsp;
        </span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn('inline-block h-4 w-[4px] bg-anbu-gold md:h-6 lg:h-10', cursorClassName)}
      />
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(''),
  }));

  return (
    <div className={cn('my-6 flex w-full items-center justify-center gap-2', className)}>
      <motion.div
        className="overflow-hidden"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 2, ease: 'easeInOut', delay: 0.5 }}
      >
        <div className="whitespace-nowrap text-center text-xs font-bold sm:text-base md:text-xl lg:text-3xl xl:text-5xl">
          {wordsArray.map((word, idx) => (
            <span key={`word-${idx}`} className="inline-block">
              {word.text.map((char, index) => (
                <span className={cn('inline-block', word.className)} key={`char-${index}`}>
                  {char}
                </span>
              ))}
              &nbsp;
            </span>
          ))}
        </div>
      </motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        className={cn('block h-4 w-[4px] bg-anbu-gold sm:h-6 xl:h-12', cursorClassName)}
      />
    </div>
  );
};
