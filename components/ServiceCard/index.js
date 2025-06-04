import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ServiceCard = ({ name, description }) => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState();

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div
      className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        mounted && theme === "dark" ? "hover:bg-slate-800" : "hover:bg-slate-50"
      } hover:scale-105 link`}
    >
      <h1 className="text-3xl">{name ? name : "Heading"}</h1>
      <p className="mt-5 opacity-40 text-xl">
        {(description
          ? description
          : `I'm a full-stack software developer with a strong passion for building scalable, high-quality web applications.\n\nI currently work as a consultant at Cluster Reply in Rome, where I develop solutions using C#, Node.js, Angular, and React, and manage cloud infrastructure with Microsoft Azure, Docker, and Kubernetes.\n\nI hold a Master’s degree in Computer Science, with a focus on Cloud Computing, from the University of Salerno, where I graduated with full marks and honors.\n\nMy thesis explored how to counter the spread of fake news on social media using a hybrid approach of agent-based modeling and deep reinforcement learning — combining theory, AI, and practical problem-solving.\n\nTo support my international collaboration and communication skills, I’ve also earned an IELTS Academic certification with an overall band score of 7.0, which corresponds to CEFR level C1.`
        )
          .split("\n")
          .map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </p>
    </div>
  );
};

export default ServiceCard;
