
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Greeting {
    text: string;
    language: string;
}

const greetings: Greeting[] = [
    { text: "Hello", language: "English" },
    { text: "नमस्ते", language: "Hindi" }, // Namaste
    { text: "నమస్కారం", language: "Telugu" }, // Namaskaram
    { text: "こんにちは", language: "Japanese" }, // Konnichiwa
    { text: "Bonjour", language: "French" },
    { text: "Hola", language: "Spanish" },
    { text: "안녕하세요", language: "Korean" }, // Annyeonghaseyo
    { text: "Ciao", language: "Italian" },
    { text: "Hallo", language: "German" },
    { text: "Hello", language: "English" },
];
const DynamicText = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        if (!isAnimating) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = prevIndex + 1;

                if (nextIndex >= greetings.length) {
                    clearInterval(interval);
                    setIsAnimating(false);
                    return prevIndex;
                }

                return nextIndex;
            });
        }, 500);

        return () => clearInterval(interval);
    }, [isAnimating]);

    // Animation variants for the text
    const textVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 },
    };

    return (
        <section
            className="flex items-center gap-1"
            aria-label="Rapid greetings in different languages"
        >
            <div className="relative w-60 flex items-center overflow-visible">
                {isAnimating ? (
                    <AnimatePresence mode="popLayout">
                        <motion.div
                            key={currentIndex}
                            className="absolute flex items-center text-3xl font-medium text-primary"
                            aria-live="off"
                            initial={textVariants.hidden}
                            animate={textVariants.visible}
                            exit={textVariants.exit}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {greetings[currentIndex].text}
                            <img
                                src="/namaste.png"
                                alt="Namaste"
                                className="w-10 h-10 select-none ml-2 cursor-pointer"
                                aria-hidden="true"
                                draggable={false}
                            />
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    <motion.div
                        className="absolute flex items-center text-3xl font-medium text-primary"
                    >
                        {greetings[currentIndex].text}
                        <motion.img
                            src="/namaste.png"
                            alt="Namaste"
                            className="w-10 h-10 select-none ml-2 cursor-pointer"
                            aria-hidden="true"
                            draggable={false}
                            whileHover={{
                                scale: 1.2,
                                filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))"
                            }}
                            whileTap={{ scale: 1.1 }}
                            transition={{
                                duration: 0.3,
                                ease: "easeOut"
                            }}
                        />
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default DynamicText;
