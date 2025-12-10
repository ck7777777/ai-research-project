/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, MessageSquare, Mic, Code, Cpu, Trophy, Layout, MousePointer, CreditCard, Calendar, BarChart2 } from 'lucide-react';

// --- MULTIMODALITY DIAGRAM ---
export const MultimodalityDiagram: React.FC = () => {
  const [activeInput, setActiveInput] = useState<number>(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
        setActiveInput(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const inputs = [
      { id: 0, label: "Text", icon: MessageSquare },
      { id: 1, label: "Vision", icon: Image },
      { id: 2, label: "Audio", icon: Mic },
      { id: 3, label: "Code", icon: Code },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8">
      <div className="relative w-64 h-64 flex items-center justify-center">
         {/* Central Core */}
         <div className="relative z-10 w-20 h-20 rounded-full bg-charcoal flex items-center justify-center shadow-xl border-4 border-cream">
            <span className="font-serif text-cream font-bold text-xl">G3</span>
         </div>

         {/* Orbital Inputs */}
         {inputs.map((inp, i) => {
             const angle = (i * 90) * (Math.PI / 180);
             const radius = 90;
             const x = Math.cos(angle) * radius;
             const y = Math.sin(angle) * radius;
             const isActive = activeInput === i;

             return (
                 <React.Fragment key={i}>
                    {/* Connection Line */}
                    <div 
                        className="absolute h-[1px] bg-charcoal/20 origin-left"
                        style={{ 
                            width: radius - 30, 
                            left: '50%', 
                            top: '50%', 
                            rotate: `${i * 90}deg`,
                            zIndex: 0
                        }}
                    />

                    {/* Node */}
                    <motion.div
                        className={`absolute w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 z-20 ${isActive ? 'bg-charcoal text-cream border-charcoal scale-110' : 'bg-cream text-charcoal border-charcoal/20'}`}
                        style={{ x, y }}
                    >
                        <inp.icon size={16} />
                    </motion.div>
                 </React.Fragment>
             )
         })}
      </div>
      <p className="mt-4 font-serif italic text-charcoal/60">Native tokenization of all inputs</p>
    </div>
  );
};

// --- MODEL FUSION DIAGRAM (1+2=3) ---
export const ModelFusionDiagram: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="flex items-center gap-4 md:gap-12">
          {/* Gemini 1 */}
          <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 border border-charcoal/30 rounded-full flex items-center justify-center bg-white">
                  <span className="font-serif font-bold text-lg text-charcoal">G1</span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-charcoal/50">Context</span>
          </div>

          <div className="h-[1px] w-12 bg-charcoal/30 relative">
            <div className="absolute -top-1.5 left-[50%] -translate-x-1/2 text-charcoal/50">+</div>
          </div>

          {/* Gemini 2 */}
          <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 border border-charcoal/30 rounded-full flex items-center justify-center bg-white">
                  <span className="font-serif font-bold text-lg text-charcoal">G2</span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-charcoal/50">Reasoning</span>
          </div>

          <div className="h-[1px] w-12 bg-charcoal/30 relative">
            <div className="absolute -top-1.5 left-[50%] -translate-x-1/2 text-charcoal/50">=</div>
          </div>

          {/* Gemini 3 */}
          <div className="flex flex-col items-center gap-3">
              <div className="w-24 h-24 bg-gradient-to-br from-charcoal to-black rounded-full flex items-center justify-center shadow-lg relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 mix-blend-overlay"></div>
                   <span className="font-serif font-bold text-2xl text-white relative z-10">G3</span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-charcoal font-bold">Pro</span>
          </div>
      </div>
    </div>
  );
};

// --- LMARENA CHART ---
export const PerformanceMetricDiagram: React.FC = () => {
    const data = [
        { name: "GPT 5.1", score: 1280, color: "bg-charcoal/30" },
        { name: "Grok 4.1", score: 1272, color: "bg-charcoal/30" },
        { name: "Gemini 3 Pro", score: 1315, color: "bg-blue-600" },
    ];

    return (
        <div className="w-full p-8 bg-white border border-charcoal/10 h-full flex flex-col justify-between">
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                    <Trophy size={16} className="text-charcoal"/>
                    <h3 className="font-serif text-xl text-charcoal">LMArena Ranking</h3>
                </div>
                <p className="text-sm text-charcoal/60 leading-relaxed font-sans">
                    Overall Leaderboard (Coding + Hard Prompts). Gemini 3 Pro establishes a new ELO ceiling.
                </p>
            </div>
            
            <div className="space-y-4">
                {data.map((item, index) => (
                    <div key={index} className="group">
                        <div className="flex justify-between text-xs uppercase tracking-widest mb-1 font-bold text-charcoal/70">
                            <span>{item.name}</span>
                            <span>{item.score}</span>
                        </div>
                        <div className="w-full h-2 bg-charcoal/5 overflow-hidden">
                            <motion.div 
                                className={`h-full ${item.color}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${(item.score / 1350) * 100}%` }}
                                transition={{ duration: 1, delay: index * 0.2 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 text-[10px] text-charcoal/40 text-right">Source: Chatbot Arena (Simulated Data)</div>
        </div>
    )
}

// --- GENERATIVE UI VISUAL ---
export const GenerativeUiVisual: React.FC = () => {
    const [layoutState, setLayoutState] = useState(0); // 0: Chat, 1: Card, 2: Dashboard

    useEffect(() => {
        const interval = setInterval(() => {
            setLayoutState(prev => (prev + 1) % 3);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-full min-h-[400px] bg-charcoal/5 border border-charcoal/10 relative overflow-hidden flex flex-col">
            {/* Fake Browser Header */}
            <div className="h-8 border-b border-charcoal/10 bg-white flex items-center px-3 gap-2 shrink-0">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            
            <div className="flex-1 p-6 relative">
                 {/* Background grid */}
                 <div className="absolute inset-0 opacity-10 pointer-events-none" 
                      style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                 </div>

                 <AnimatePresence mode="wait">
                    {layoutState === 0 && (
                         <motion.div 
                            key="chat"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex flex-col gap-4 max-w-sm mx-auto mt-12"
                         >
                             <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-charcoal/5 text-sm">
                                 I need a way to visualize my monthly expenses.
                             </div>
                             <div className="bg-blue-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm text-sm self-end">
                                 Generating a dashboard for you...
                             </div>
                         </motion.div>
                    )}

                    {layoutState === 1 && (
                         <motion.div 
                             key="card"
                             initial={{ opacity: 0, scale: 0.9 }}
                             animate={{ opacity: 1, scale: 1 }}
                             exit={{ opacity: 0, scale: 1.1 }}
                             className="absolute inset-0 flex items-center justify-center"
                         >
                            <div className="w-64 bg-white shadow-xl border border-charcoal/10 p-4 rounded-lg">
                                <div className="flex items-center gap-3 mb-4 text-charcoal">
                                    <CreditCard size={20} />
                                    <span className="font-serif font-bold">Expense Card</span>
                                </div>
                                <div className="h-2 w-full bg-charcoal/10 rounded mb-2"></div>
                                <div className="h-2 w-2/3 bg-charcoal/10 rounded"></div>
                            </div>
                         </motion.div>
                    )}

                    {layoutState === 2 && (
                         <motion.div 
                             key="dashboard"
                             initial={{ opacity: 0 }}
                             animate={{ opacity: 1 }}
                             exit={{ opacity: 0 }}
                             className="absolute inset-0 p-8 grid grid-cols-2 gap-4"
                         >
                            <div className="bg-white shadow-md border border-charcoal/10 p-4 rounded-lg col-span-2 h-32 flex flex-col justify-center">
                                <div className="flex items-center gap-2 mb-2 text-charcoal/60 text-xs uppercase tracking-wider">
                                    <BarChart2 size={12}/> Spending Trend
                                </div>
                                <div className="flex items-end gap-1 h-16">
                                    {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ height: 0 }}
                                            animate={{ height: `${h}%` }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex-1 bg-blue-500/20 rounded-t-sm"
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white shadow-md border border-charcoal/10 p-4 rounded-lg h-32">
                                <div className="flex items-center gap-2 mb-2 text-charcoal/60 text-xs uppercase tracking-wider">
                                    <Calendar size={12}/> Breakdown
                                </div>
                                <div className="w-16 h-16 rounded-full border-4 border-blue-500/20 border-t-blue-500 mx-auto mt-2"></div>
                            </div>
                            <div className="bg-white shadow-md border border-charcoal/10 p-4 rounded-lg h-32 flex flex-col justify-center gap-2">
                                <div className="h-2 w-full bg-charcoal/5 rounded"></div>
                                <div className="h-2 w-full bg-charcoal/5 rounded"></div>
                                <div className="h-2 w-2/3 bg-charcoal/5 rounded"></div>
                            </div>
                         </motion.div>
                    )}
                 </AnimatePresence>
                 
                 {/* Label */}
                 <div className="absolute bottom-6 left-0 right-0 text-center">
                     <div className="inline-block px-3 py-1 bg-charcoal text-white text-xs font-serif italic transition-all">
                         {layoutState === 0 ? "Identify Intent" : layoutState === 1 ? "Draft Component" : "Render Full UI"}
                     </div>
                 </div>
            </div>
        </div>
    )
}