import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "/month",
    features: [
      "1 AI Paper Summary / day",
      "Save & Download chats",
      "Basic AI chat support"
    ],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹199",
    period: "/month",
    features: [
      "Unlimited AI Paper Summaries",
      "Priority AI chat support",
      "Save & Download chats",
      "Advanced paper analysis",
      "Early access to new features"
    ],
    highlighted: true,
  },
];

const Pricing = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="mx-auto px-6 py-16 max-w-5xl" id="pricing">
      <motion.h1
        className="text-[#4F46E5]/90 font-bold text-3xl drop-shadow-lg text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Pricing Plans
      </motion.h1>

      <motion.div
        className="grid md:grid-cols-2 gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className={`rounded-xl shadow-lg p-6 border ${
              plan.highlighted
                ? "bg-[#4F46E5] text-white border-transparent scale-105"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h2
                className={`text-2xl font-semibold ${
                  plan.highlighted ? "text-white" : "text-[#4F46E5]/85"
                }`}
              >
                {plan.name}
              </h2>
              {plan.highlighted && <Star className="text-yellow-300" />}
            </div>
            <p className="text-4xl font-bold">
              {plan.price}
              <span className="text-base font-medium">{plan.period}</span>
            </p>

            <ul className="mt-6 space-y-3">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle
                    className={`w-5 h-5 ${
                      plan.highlighted
                        ? "text-white-300"
                        : "text-[#4F46E5]"
                    }`}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={`mt-6 w-full py-2 rounded-lg font-medium transition ${
                plan.highlighted
                  ? "bg-white text-[#4F46E5] hover:bg-gray-200"
                  : "bg-[#4F46E5] text-white hover:bg-[#3f3abf]"
              }`}
            >
              {plan.highlighted ? "Go Pro" : "Get Started"}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Pricing;
