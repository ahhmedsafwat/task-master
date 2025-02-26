"use client";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { FlipingText } from "../ui/fliping-text";

const enteryVariant: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: "blur(20px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24">
      {/* Background Pattern */}
      <motion.div
        className="w-3xl absolute left-10 top-0 -z-10 h-96 rounded-full bg-indigo-800 opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />
      <motion.div
        className="w-2xl absolute right-10 top-32 -z-10 h-96 rounded-full bg-purple-800 opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />
      <motion.div
        className="w-2xl absolute bottom-24 right-24 -z-10 h-96 rounded-full bg-cyan-950 opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />
      <motion.div
        className="w-3xl absolute bottom-32 left-20 -z-10 h-96 rounded-full bg-blue-800 opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        }}
      />
      <div className="container relative mx-auto overflow-clip rounded-2xl px-4 py-20">
        <div className="absolute inset-0 -z-20">
          <div className="from-background via-background/90 to-primary/20 absolute inset-0 bg-gradient-to-br" />
          <div className="absolute h-full w-full bg-[radial-gradient(var(--color-foreground)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        </div>

        <div className="mb-12 text-center">
          <motion.h1
            className="mx-auto mb-6 max-w-4xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl lg:text-7xl"
            variants={enteryVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5 }}
          >
            Streamline Your Tasks with TaskMaster
          </motion.h1>
          <motion.p
            className="text-primary-foreground mx-auto mb-8 max-w-2xl font-mono text-sm sm:text-xl"
            variants={enteryVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            An open-source alternative for Notion and Linear (Not Really)
          </motion.p>
          <motion.div
            className="flex justify-center space-x-4"
            variants={enteryVariant}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button asChild variant="outline" className="hover-scale">
              <Link href="https://github.com/ahhmedsafwat/task-master">
                <Github className="mr-2 h-5 w-5" />
                <FlipingText initialText="View on GitHub" />
              </Link>
            </Button>

            <Link href="/signup">
              <Button asChild variant="inverted" className="hover-scale">
                <FlipingText initialText="Get Started" />
              </Button>
            </Link>
          </motion.div>
        </div>
        {/* Video Showcase Placeholder */}
        <div className="mx-auto aspect-video max-w-4xl overflow-hidden rounded-lg shadow-xl">
          <div className="flex h-full items-center justify-center bg-gray-800">
            <p className="text-2xl font-semibold">Your Video Showcase Here</p>
          </div>
        </div>
      </div>
    </section>
  );
}
