import { meta, shopify, starbucks, tesla } from "../assets/images";
import {
    car,
    contact,
    css,
    estate,
    express,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    motion,
    mui,
    nextjs,
    nodejs,
    pricewise,
    react,
    redux,
    sass,
    snapgram,
    summiz,
    tailwindcss,
    threads,
    typescript,
    ecom,
    chat,
    fashion,
    fms,
    todo
} from "../assets/icons";

export const skills = [
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: react,
        name: "React",
        type: "Frontend",
    },
    {
        imageUrl: nodejs,
        name: "Node.js",
        type: "Backend",
    },
    {
        imageUrl: express,
        name: "Express",
        type: "Backend",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: mui,
        name: "Material-UI",
        type: "Frontend",
    },
    {
        imageUrl: redux,
        name: "Redux",
        type: "State Management",
    },
    {
        imageUrl: tailwindcss,
        name: "Tailwind CSS",
        type: "Frontend",
    },
    {
        imageUrl: nextjs,
        name: "Next.js",
        type: "Frontend",
    },
    {
        imageUrl: typescript,
        name: "TypeScript",
        type: "Frontend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    
];

import {
    c,
    cpp,
    java,
    python    
} from "../assets/icons";

export const proglangs = [
    {
        imageUrl: java,
        name: "Java",
        type: "Programming Language",
    },
    {
        imageUrl: python,
        name: "Python",
        type: "Programming Language",
    },
    {
        imageUrl: c,
        name: "C",
        type: "Programming Language",
    },
    {
        imageUrl: cpp,
        name: "C++",
        type: "Programming Language",
    },
    
]

export const experiences = [
    {
        title: "React.js Developer",
        company_name: "Starbucks",
        icon: starbucks,
        iconBg: "#accbe1",
        date: "March 2020 - April 2021",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "React Native Developer",
        company_name: "Tesla",
        icon: tesla,
        iconBg: "#fbc3bc",
        date: "Jan 2021 - Feb 2022",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Web Developer",
        company_name: "Shopify",
        icon: shopify,
        iconBg: "#b7e4c7",
        date: "Jan 2022 - Jan 2023",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
    {
        title: "Full stack Developer",
        company_name: "Meta",
        icon: meta,
        iconBg: "#a2d2ff",
        date: "Jan 2023 - Present",
        points: [
            "Developing and maintaining web applications using React.js and other related technologies.",
            "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
            "Implementing responsive design and ensuring cross-browser compatibility.",
            "Participating in code reviews and providing constructive feedback to other developers.",
        ],
    },
];

export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/YourGitHubUsername',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/YourLinkedInUsername',
    }
];

export const projects = [
    {
        iconUrl: ecom,
        theme: 'btn-back-blue',
        name: 'Urbanic - E-Commerce Website',
        description: 'Urbanic is a premium shopping website built with Node.js, Express.js, and MongoDB. It offers a robust backend system for seamless user authentication, product management, and secure transactions.',
        link: 'https://urbanic-shopping-store.onrender.com/',
        githublink : 'https://github.com/Vedant363/Urbanic-Shopping-Store',
    },
    {
        iconUrl: chat,
        theme: 'btn-back-yellow',
        name: 'ChatBlaze - RealTime Chat Application',
        description: 'ChatBlaze is a modern chat application built using React and Firebase. This application leverages Firebase Functionalities to provide a seamless and efficient chat experience.',
        link: 'https://chatblaze-ca40e.web.app/',
        githublink: 'https://github.com/Vedant363/ChatBlaze',
    },
    {
        iconUrl: fashion,
        theme: 'btn-back-red',
        name: 'Fashion Recommender System',
        description: 'Fashion Recommender System suggests clothing items to users based on the uploaded image and other relevant factors.',
        link: '',
        githublink: 'https://github.com/Vedant363/Fashion-Recommender-System',
    },
    {
        iconUrl: fms,
        theme: 'btn-back-dark-blue',
        name: 'Flight Management System',
        description: 'Flight Management System(FMS) is a Java-based application designed to manage flight records and employee details related to flight for companies.',
        link: '',
        githublink: 'https://github.com/Vedant363/Flight-Management-System',
    },
    {
        iconUrl: todo,
        theme: 'btn-back-green',
        name: 'Todo Manager',
        description: 'A React application designed to help users manage their tasks efficiently, it provides features to add, edit, delete, and mark tasks as completed.',
        link: 'https://todo-manager-vedant363.netlify.app/',
        githublink: 'https://github.com/Vedant363/Todo-Manager',
    }
];