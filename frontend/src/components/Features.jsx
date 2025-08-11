import React from 'react'
import { DownloadCloud, FileCheck2, FolderCog, MessageCircleCode } from 'lucide-react'
import { motion } from 'motion/react'
import { useInView } from 'react-intersection-observer'

const feat = [
  {
    title: 'Instant Summary',
    desc: 'Extract title, authors, abstract & more fast',
    icon: FileCheck2
  },
  {
    title: 'Ask Anything',
    desc: 'Chat with AI to clarify and explore concepts',
    icon: MessageCircleCode
  },
  {
    title: 'Saved Chats',
    desc: 'Access previous chats anytime',
    icon: FolderCog
  },
  {
    title: 'Download & Share',
    desc: 'Export summaries and chats easily',
    icon: DownloadCloud
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      when: "beforeChildren"
    }
  }
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const Features = () => {

  const { ref, inView } = useInView({
    triggerOnce: true,      // animate only once when it enters
    threshold: 0.2          // 20% of component visible triggers animation
  })

  return (
    <div ref={ref} id="features" className='p-15 flex flex-col gap-5 items-center'>
      <h1 className='text-[#4F46E5]/90 font-bold text-3xl drop-shadow-lg mb-5'>
        Why Choose Us
      </h1>
      <motion.div
        className='grid grid-cols-2 gap-5 w-full max-w-5xl'
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {
          feat.map((f, idx) => (
            <div
              key={idx}
              className='border border-[#E5E7EB] shadow-lg rounded-sm p-10 flex flex-col sm:flex-row items-center gap-8'
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {<f.icon color='#4F46E5' size={100} strokeWidth={1} />}
              <div className='flex flex-col gap-2'>
                <p className='text-[#4F46E5]/95 text-xl font-semibold'>{f.title}</p>
                <p className='text-[#111827]/90'>{f.desc}</p>
              </div>
            </div>
          ))
        }
      </motion.div>
    </div>
  )
}

export default Features
