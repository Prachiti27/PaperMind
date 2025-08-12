import React, { useEffect } from "react"
import { motion, useAnimation } from "motion/react"
import { useInView } from "react-intersection-observer"
import upload_a_paper from "../assets/upload_a_paper.png"
import save_n_download from "../assets/save_n_download.png"
import chat_with_ai from "../assets/chat_with_ai.png"
import ai_powered_summary from "../assets/ai_powered_summary.png"

const steps = [
  {
    title: "Upload Your Paper",
    desc: "Drag & drop your PDF or DOCX file",
    img: upload_a_paper,
    reverse: false,
  },
  {
    title: "Get AI-powered Summary",
    desc: "Receive formatted paper summary instantly",
    img: ai_powered_summary,
    reverse: true,
  },
  {
    title: "Chat with AI",
    desc: "Ask questions and explore insights",
    img: chat_with_ai,
    reverse: false,
  },
  {
    title: "Save & Download",
    desc: "Keep your chats and summaries accessible anytime",
    img: save_n_download,
    reverse: true,
  },
]

const HowItWorks = ({ triggerAnimation }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView || triggerAnimation) {
      controls.start("visible");
    }
  }, [inView, triggerAnimation, controls]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section
      id="how-it-works"
      className="mx-auto px-6 py-12 max-w-5xl"
      ref={ref}
    >
      <motion.h1
        className="text-[#4F46E5]/90 font-bold text-3xl drop-shadow-lg text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        variants={itemVariants}
      >
        How It Works
      </motion.h1>

      <motion.div
        className="space-y-16"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-center md:justify-between gap-8 ${
              step.reverse ? "md:flex-row-reverse" : ""
            }`}
            variants={itemVariants}
          >
            <motion.img
              src={step.img}
              alt={step.title}
              className="w-full max-w-sm rounded-md shadow-lg"
              variants={itemVariants}
            />
            <motion.div
              className="text-center md:text-left space-y-2"
              variants={itemVariants}
            >
              <h2 className="text-[#4F46E5] font-semibold text-2xl md:text-3xl">
                {step.title}
              </h2>
              <p className="text-gray-600 text-lg">{step.desc}</p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

export default HowItWorks;
