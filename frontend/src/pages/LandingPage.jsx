import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();

    const stats = [
        { label: "Global Alzheimer's Patients", value: "55M+" },
        { label: "Alzheimer's Patients Expected by 2050", value: "139M+" },
        // { label: "Annual New Cases Globally", value: "10M+" },
        { label: "AI Diagnostic Accuracy", value: "98%" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-r from-gray-100 to-blue-100 text-white p-8 flex flex-col justify-between">
            <header className="text-center mb-8">
                <motion.h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-br from-green-200 via-teal-400 to-blue-600" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    Alzheimer’s Detection System
                </motion.h1>
                <motion.p className="text-xl text-gray-800 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                    Early diagnosis for a better tomorrow
                </motion.p>
            </header>

            <section className="mb-12 p-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <motion.div
                        className="p-6 h-40 bg-cover bg-center text-white rounded-lg shadow-lg relative overflow-hidden hover:scale-105 transform transition-transform duration-300"
                        style={{ backgroundImage:` url("https://imgs.search.brave.com/oODyTG-yw7vWw-UL2gVXCZ5R2su0ZBHO7fVNBBxvKQ0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dG91Y2hzdG9uZWlt/YWdpbmcuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzA1/L01SSV9TY2FuLTEw/MjR4NTM2LmpwZw")` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        whileHover={{ rotate: 5 }}
                    >
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]"></div>
                        <h3 className="text-xl font-semibold mb-2 relative z-10">AI-Powered Diagnosis</h3>
                        <p className="text-sm relative z-10">Our advanced AI model provides quick and reliable Alzheimer’s detection based on MRI scans.</p>
                    </motion.div>

                    <motion.div
                        className="p-6 bg-cover h-40 bg-center text-white rounded-lg shadow-lg relative overflow-hidden hover:scale-105 transform transition-transform duration-300"
                        style={{ backgroundImage: `url("https://imgs.search.brave.com/PG5uFaK17gdOHjJsaaxCR5wfEeyQ2EYJe8lT3b5aSKw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pMC53/cC5jb20vcG9zdC5t/ZWRpY2FsbmV3c3Rv/ZGF5LmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvc2l0ZXMvMy8y/MDIyLzA4L21lZGlj/YWwtcmVjb3Jkcy1k/ZW1lbnRpYS10ZXN0/cy1oZWFkZXItMTAy/NHg1NzUuanBnP3c9/MTE1NSZoPTE1Mjg")` }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 1 }}
                        whileHover={{ rotate: -5 }}
                    >
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                        <h3 className="text-xl font-semibold mb-2 relative z-10">Cognitive Tests</h3>
                        <p className="text-sm relative z-10">Assess cognitive function with scientifically backed tests to aid early detection.</p>
                    </motion.div>

                    <motion.div
                        className="p-6 bg-cover h-40 bg-center text-white rounded-lg shadow-lg relative overflow-hidden hover:scale-105 transform transition-transform duration-300"
                        style={{ backgroundImage: `url("https://imgs.search.brave.com/vm_CLfa_6NWpMYh6Hv1h9wNgl4ws9kb3bomvpeRKj5k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tZWRpY2FsLXJl/Y29yZHMtdGVzdC1y/ZXBvcnRfNzMxMTAt/NzM2My5qcGc_c2Vt/dD1haXNfaHlicmlk") `}}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 1 }}
                        whileHover={{ rotate: 3 }}
                    >
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
                        <h3 className="text-xl font-semibold mb-2 relative z-10">Comprehensive Reports</h3>
                        <p className="text-sm relative z-10">Get detailed analysis and reports for better medical consultation.</p>
                    </motion.div>
                </section>


            <section className="flex justify-around mb-10">
                {stats.map((stat, index) => (
                    <motion.div key={index} className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.3 }}>
                        <h3 className="text-4xl font-bold text-green-500">{stat.value}</h3>
                        <p className="text-lg text-gray-800">{stat.label}</p>
                    </motion.div>
                ))}
            </section>

            <section className="text-center">
                <motion.button onClick={() => navigate("/login")} className="px-8 py-4 bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 text-white text-lg font-bold rounded-full shadow-lg hover:scale-110 transform transition duration-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    Get Started
                </motion.button>
            </section>
        </div>
    );
}