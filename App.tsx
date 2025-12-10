/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { ConvergenceScene, AgenticNetworkScene, FluidVideoBackground } from './components/QuantumScene';
import { MultimodalityDiagram, ModelFusionDiagram, PerformanceMetricDiagram, GenerativeUiVisual } from './components/Diagrams';
import { ArrowDown, Menu, X, Rocket, Sparkles, Brain, Code, Layers, AlertTriangle, ArrowRight, Check, Layout, Terminal, Play, Plane, Mail, CreditCard, Search, Calendar, Music, Video } from 'lucide-react';

// --- COMPONENTS ---

const SectionHeader = ({ subtitle, title }: { subtitle: string, title: string }) => (
  <div className="mb-12 border-l-2 border-charcoal pl-6">
    <div className="text-xs font-bold tracking-[0.2em] text-charcoal/60 uppercase mb-2 font-sans">{subtitle}</div>
    <h2 className="font-serif text-4xl md:text-5xl text-charcoal">{title}</h2>
  </div>
);

const GridCard = ({ title, icon: Icon, desc, number, targetId, onClick }: { title: string, icon: any, desc: string, number: string, targetId?: string, onClick?: (id: string) => void }) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick && targetId) {
        e.preventDefault();
        onClick(targetId);
    } else if (targetId) {
       e.preventDefault();
       const element = document.getElementById(targetId);
       if (element) {
           element.scrollIntoView({ behavior: 'smooth' });
       }
    }
  }

  return (
    <div 
        onClick={handleClick}
        className="group border-b border-r border-charcoal/10 p-8 hover:bg-white transition-colors duration-500 min-h-[320px] flex flex-col justify-between relative overflow-hidden cursor-pointer"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-charcoal scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      <div>
        <div className="flex justify-between items-start mb-6">
            <span className="font-serif text-4xl text-charcoal/10 group-hover:text-charcoal/20 transition-colors">{number}</span>
            <Icon size={24} className="text-charcoal/60 group-hover:text-blue-600 transition-colors" />
        </div>
        <h3 className="font-serif text-2xl text-charcoal mb-4">{title}</h3>
        <p className="text-sm text-charcoal/70 leading-relaxed font-sans">{desc}</p>
      </div>
      <div className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
          Learn More <ArrowRight size={12}/>
      </div>
    </div>
  );
};

// --- VIEWS ---

const HomeView = ({ scrollToSection }: { scrollToSection: (id: string) => void }) => {
  return (
    <>
      {/* Hero Section */}
      <header className="relative min-h-screen flex flex-col justify-center border-b border-charcoal/10 overflow-hidden">
        <div className="container mx-auto px-6 pt-20 grid grid-cols-1 md:grid-cols-2 gap-12 h-full items-center">
             {/* Left: Text */}
             <div className="order-2 md:order-1 text-left relative z-10">
                <div className="inline-block mb-6 px-3 py-1 border border-charcoal/20 text-charcoal text-[10px] tracking-[0.2em] uppercase font-bold bg-white/50 backdrop-blur-sm">
                  Released Nov 18, 2025
                </div>
                <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-8 text-charcoal">
                  Gemini 3 <br/> Pro
                </h1>
                <p className="text-lg md:text-xl text-charcoal/80 font-light leading-relaxed max-w-xl border-l-2 border-charcoal/30 pl-6 mb-12 mr-auto">
                   Gemini 3 Pro unites the expansive context of its predecessor with next-generation agentic reasoning. A unified model for a multimodal world.
                </p>
                
                <div onClick={() => scrollToSection('overview')} className="inline-flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 border border-charcoal/20 rounded-full flex items-center justify-center group-hover:bg-charcoal group-hover:text-white transition-all duration-300">
                        <ArrowDown size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-charcoal/60 group-hover:text-charcoal">Begin the study</span>
                </div>
             </div>

             {/* Right: Animation */}
             <div className="relative h-[50vh] md:h-[80vh] w-full order-1 md:order-2">
                 <ConvergenceScene />
             </div>
        </div>
      </header>

      <main>
        {/* Overview */}
        <section id="overview" className="py-32 border-b border-charcoal/10 bg-white">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
               <div className="text-xs font-bold tracking-[0.2em] text-charcoal/40 uppercase mb-4">General Info</div>
               <h2 className="font-serif text-4xl leading-tight">Leap Forward <br/> in AI Frontier</h2>
            </div>
            <div className="md:col-span-8 text-lg md:text-xl font-serif leading-relaxed text-charcoal/80 space-y-8 columns-1 md:columns-2 gap-12">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-10px] text-charcoal">G</span>emini 3 Pro arrives as a definitive answer to the fragmentation of the AI landscape. Released in November 2025, it addresses the core trade-off developers have faced for years: the choice between deep reasoning capabilities and massive context handling.
              </p>
              <p>
                 By fusing the architectural breakthroughs of the Gemini 1.5 era with the experimental "thinking" process of the Gemini 2 series, Google has created a model that doesn't just process information—it actively navigates it. It is natively multimodal, agentic by design, and built to bridge the gap between abstract ideas and deployed reality.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Grid */}
        <section id="features" className="border-b border-charcoal/10">
           {/* 3x2 Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {/* Black Key Features Card */}
              <div className="p-8 border-b border-r border-charcoal/10 flex items-center justify-center bg-charcoal text-cream min-h-[320px]">
                  <div className="text-center">
                      <h2 className="font-serif text-4xl mb-2">Key Features</h2>
                      <p className="text-sm opacity-60 font-sans">The 5 pillars of Gemini 3 Pro</p>
                  </div>
              </div>
              <GridCard 
                number="01" 
                title="SOTA Performance" 
                icon={Rocket}
                desc="New highs in reasoning and coding benchmarks, outperforming GPT 5.1 and Grok." 
                targetId="sota"
                onClick={scrollToSection}
              />
              <GridCard 
                number="02" 
                title="Native Multimodality" 
                icon={Layers}
                desc="Seamlessly understanding video, audio, and code in a single stream." 
                targetId="multimodality"
                onClick={scrollToSection}
              />
              <GridCard 
                number="03" 
                title="Generative UI" 
                icon={Layout}
                desc="Rendering dynamic, interactive interfaces on the fly during conversation." 
                targetId="gen-ui"
                onClick={scrollToSection}
              />
              <GridCard 
                number="04" 
                title="Enhanced Coding" 
                icon={Code}
                desc="'Vibe Coding' allows for fluid, context-aware development workflows." 
                targetId="coding"
                onClick={scrollToSection}
              />
              <GridCard 
                number="05" 
                title="Pro Agentic Use" 
                icon={Brain}
                desc="Autonomous execution of complex, multi-step tasks to plan anything." 
                targetId="agentic"
                onClick={scrollToSection}
              />
           </div>
        </section>

        {/* --- DEEP DIVES --- */}

        {/* 1. Architecture (1+2=3) */}
        <section id="architecture" className="py-24 border-b border-charcoal/10 bg-cream">
            <div className="container mx-auto px-6">
                <SectionHeader subtitle="Architecture" title="Gemini 1 + 2 = 3" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                         <p className="text-xl font-serif text-charcoal mb-6 leading-relaxed">
                            "Combining the best from both models."
                         </p>
                         <p className="text-charcoal/70 mb-6 leading-relaxed">
                            Gemini 1’s breakthroughs in native multimodality and massive context windows expanded <em>what</em> could be processed. Gemini 2 laid the foundation for agentic capabilities, pushing the frontiers on <em>how</em> to reason.
                         </p>
                         <p className="text-charcoal/70 leading-relaxed">
                            Gemini 3 Pro unifies these streams. It doesn't switch modes; it applies deep reasoning vectors across the entire context window, allowing for "Thoughtful Retrieval" on a scale previously impossible.
                         </p>
                    </div>
                    <div>
                        <ModelFusionDiagram />
                    </div>
                </div>
            </div>
        </section>

        {/* 2. SOTA Performance */}
        <section id="sota" className="py-24 border-b border-charcoal/10 bg-white">
             <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
                 <div className="order-2 lg:order-1 h-96">
                     <PerformanceMetricDiagram />
                 </div>
                 <div className="order-1 lg:order-2 flex flex-col justify-center">
                     <SectionHeader subtitle="Benchmarks" title="SOTA Performance" />
                     <p className="text-charcoal/70 mb-6 leading-relaxed">
                        In the arena of raw intelligence, Gemini 3 Pro claims the crown. On LMArena (Language Model Arena), it has secured the #1 spot, specifically excelling in the "Coding" and "Hard Prompts" categories.
                     </p>
                     <p className="text-charcoal/70 leading-relaxed">
                        It demonstrates a 15% improvement in math reasoning over GPT 5.1 and shows unprecedented stability in long-horizon agentic tasks.
                     </p>
                 </div>
             </div>
        </section>

        {/* 3. Multimodality */}
        <section id="multimodality" className="py-24 border-b border-charcoal/10 bg-cream overflow-hidden">
             <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <SectionHeader subtitle="Inputs" title="Native Multimodality" />
                    <p className="text-charcoal/70 mb-6 leading-relaxed">
                        Multimodal Mastery means the model doesn't just see pixels; it understands physics, timing, and causality. 
                    </p>
                    <p className="text-charcoal/70 leading-relaxed">
                        You can upload a 2-hour video, a codebase, and an audio narration simultaneously. Gemini 3 Pro synthesizes these inputs into a coherent understanding, enabling workflows like "Watch this lecture and implement the algorithm described at 45:20 in Python."
                    </p>
                 </div>
                 <div className="h-80">
                     <MultimodalityDiagram />
                 </div>
             </div>
        </section>

        {/* 4. Generative UI */}
        <section id="gen-ui" className="py-24 border-b border-charcoal/10 bg-white">
             <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="order-2 lg:order-1 h-[400px]">
                    <GenerativeUiVisual />
                 </div>
                 <div className="order-1 lg:order-2">
                    <SectionHeader subtitle="Interaction" title="Generative UI" />
                    <p className="text-charcoal/70 mb-6 leading-relaxed">
                        The chat interface is no longer just for text. Gemini 3 Pro can generate bespoke user interfaces on demand. 
                    </p>
                    <p className="text-charcoal/70 leading-relaxed">
                        Need a date picker? A data visualization dashboard? A color palette mixer? The model codes and renders these components instantly within the conversation stream, turning the chat into a dynamic workspace.
                    </p>
                 </div>
             </div>
        </section>

        {/* 5. Coding (Dark Section) */}
        <section id="coding" className="bg-charcoal text-cream py-24 border-b border-charcoal/10">
             <div className="container mx-auto px-6">
                 <div className="mb-16">
                     <div className="text-xs font-bold tracking-[0.2em] text-cream/40 uppercase mb-2 font-sans">Developer Tools</div>
                     <h2 className="font-serif text-5xl mb-6">Enhanced Coding</h2>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                     <div>
                         <div className="mb-6 text-blue-400"><Code size={48}/></div>
                         <h3 className="font-serif text-4xl mb-4">Vibe Coding</h3>
                         <p className="text-cream/70 leading-relaxed mb-6 text-lg">
                            "Vibe Coding" represents a shift from imperative instruction to intent-based collaboration. You provide the "vibe"—the aesthetic, the goal, the rough sketch—and Gemini 3 Pro handles the implementation details, iterating rapidly based on your high-level feedback.
                         </p>
                         <ul className="space-y-4 text-cream/50 font-sans">
                             <li className="flex items-center gap-3"><Check size={18}/> Context-aware refactoring across entire repos</li>
                             <li className="flex items-center gap-3"><Check size={18}/> Visual-to-Code translation with pixel perfection</li>
                         </ul>
                     </div>
                     <div className="bg-white/5 border border-white/10 rounded-lg p-6 font-mono text-sm text-blue-300">
                         <div className="flex gap-2 mb-4">
                             <div className="w-3 h-3 rounded-full bg-red-500"></div>
                             <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                             <div className="w-3 h-3 rounded-full bg-green-500"></div>
                         </div>
                         <p className="text-white/50 mb-2">// User: "Make it pop, like 80s retro"</p>
                         <p className="mb-2"><span className="text-purple-400">const</span> <span className="text-yellow-400">theme</span> = &#123;</p>
                         <p className="pl-4"><span className="text-blue-300">primary</span>: <span className="text-green-300">"#ff00ff"</span>,</p>
                         <p className="pl-4"><span className="text-blue-300">font</span>: <span className="text-green-300">"Press Start 2P"</span>,</p>
                         <p className="pl-4"><span className="text-blue-300">effect</span>: <span className="text-green-300">"crt-scanline"</span></p>
                         <p>&#125;;</p>
                     </div>
                 </div>
             </div>
        </section>

        {/* 6. Agentic Use (Light Section) */}
        <section id="agentic" className="bg-cream py-24 border-b border-charcoal/10 relative overflow-hidden">
             {/* Background Mesh */}
             <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                 <AgenticNetworkScene />
             </div>

             <div className="container mx-auto px-6 relative z-10">
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                     <div>
                        <SectionHeader subtitle="Autonomy" title="Pro Agentic Use" />
                        <p className="text-xl font-serif text-charcoal mb-8 leading-relaxed">
                            It doesn’t just answer — it acts.
                        </p>
                        <p className="text-charcoal/70 leading-relaxed mb-8">
                             Clear my mail box and book tickets on my behalf. Where they search and find idea items and pay after user approves the plan.
                        </p>
                        <p className="text-charcoal/70 leading-relaxed mb-8">
                             Gemini 3 Pro can plan, execute, and complete multi-step tasks autonomously. With <strong>Antigravity</strong>, the model connects to your real-world apps to handle logistics, from inbox zero to boarding pass ready, all while respecting your budget and preferences.
                        </p>
                     </div>
                     <div className="flex flex-col justify-center">
                        <div className="bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-charcoal/20 font-mono text-xs md:text-sm">
                            {/* Fake Terminal Header */}
                            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-black/50">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="text-white/40 text-xs">agent --personal-assistant</div>
                            </div>
                            {/* Terminal Body */}
                            <div className="p-6 text-gray-300 space-y-4 h-[350px] overflow-hidden relative">
                                <div className="flex gap-2 text-white">
                                    <span className="text-green-400">➜</span>
                                    <span>gemini run "Clear inbox & Book tickets"</span>
                                </div>
                                <div className="text-blue-400 opacity-80 pl-4 flex items-center gap-2">
                                     <Mail size={12} /> [AGENT] Scanning Inbox (124 unread)...
                                </div>
                                <div className="text-blue-400 opacity-80 pl-4">
                                     [AGENT] Found request from Mom: "Coming home for Xmas?"
                                </div>
                                <div className="text-blue-400 opacity-80 pl-4 border-l border-white/10 ml-4 my-2">
                                     Action: Archived 120 promotional emails.<br/>
                                     Action: Flagged family thread.
                                </div>
                                <div className="text-blue-400 opacity-80 pl-4 flex items-center gap-2">
                                    <Search size={12} /> [AGENT] Finding flights: SFO {'->'} JFK (Dec 23)
                                </div>
                                <div className="pl-8 text-gray-400 text-xs">
                                    1. United ($450) - 6am<br/>
                                    2. JetBlue ($520) - 10am [Selected]<br/>
                                </div>
                                <div className="text-yellow-400 opacity-90 pl-4">
                                    [AGENT] Proposal ready. Total: $520. Awaiting approval.
                                </div>
                                
                                <div className="flex gap-2 animate-pulse mt-4">
                                    <span className="text-green-400">➜</span>
                                    <span>user approve</span>
                                </div>
                                <div className="text-green-400 pl-4 font-bold flex items-center gap-2">
                                     <Check size={12}/> [AGENT] Booked. Confirmation #XJ992 sent to inbox.
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 text-sm text-charcoal/60 leading-relaxed">
                            <strong>Demo: Inbox to Booking.</strong> The agent intelligently filters noise, identifies actionable personal requests, and handles the transaction end-to-end.
                        </div>
                     </div>
                 </div>
             </div>
        </section>

        {/* Honest Review */}
        <section id="review" className="py-32 bg-[#F5F5F0]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                     <div className="inline-block px-4 py-1.5 border border-charcoal text-charcoal text-xs tracking-[0.2em] uppercase font-bold mb-4">Analysis</div>
                     <h2 className="font-serif text-6xl text-charcoal">Honest Review</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                    {/* Strengths */}
                    <div className="p-10 bg-white border-t-4 border-green-600 shadow-xl rounded-sm transform hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="font-serif text-4xl text-charcoal mb-8 flex items-center gap-4">
                            <Check size={32} className="text-green-600"/>
                            Strengths
                        </h3>
                        <ul className="space-y-8">
                            <li className="flex gap-6">
                                <span className="font-serif text-4xl text-green-100 font-bold">01</span>
                                <div>
                                    <strong className="block text-xl text-charcoal mb-2">Best-in-class Reasoning</strong>
                                    <p className="text-charcoal/60 leading-relaxed">Solves complex logic puzzles and architectural problems that stump other frontier models. It doesn't just guess; it thinks.</p>
                                </div>
                            </li>
                            <li className="flex gap-6">
                                <span className="font-serif text-4xl text-green-100 font-bold">02</span>
                                <div>
                                    <strong className="block text-xl text-charcoal mb-2">Native Multimodality</strong>
                                    <p className="text-charcoal/60 leading-relaxed">No friction when switching between or combining text, image, and audio inputs. It feels like one cohesive brain.</p>
                                </div>
                            </li>
                            <li className="flex gap-6">
                                <span className="font-serif text-4xl text-green-100 font-bold">03</span>
                                <div>
                                    <strong className="block text-xl text-charcoal mb-2">Visualizing Abstract Concepts</strong>
                                    <p className="text-charcoal/60 leading-relaxed">Uniquely capable of "Generative UI" and turning vague prompts into concrete visual outputs instantly.</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="p-10 bg-white border-t-4 border-amber-500 shadow-xl rounded-sm transform hover:-translate-y-1 transition-transform duration-300">
                        <h3 className="font-serif text-4xl text-charcoal mb-8 flex items-center gap-4">
                            <AlertTriangle size={32} className="text-amber-500"/>
                            Limitations
                        </h3>
                        <ul className="space-y-8">
                            <li className="flex gap-6">
                                <span className="font-serif text-4xl text-amber-100 font-bold">01</span>
                                <div>
                                    <strong className="block text-xl text-charcoal mb-2">Higher Latency</strong>
                                    <p className="text-charcoal/60 leading-relaxed">Compared to GPT 5.1 and Grok 4.1 Thinking, the response time is noticeably slower. Deep thinking takes time.</p>
                                </div>
                            </li>
                            <li className="flex gap-6">
                                <span className="font-serif text-4xl text-amber-100 font-bold">02</span>
                                <div>
                                    <strong className="block text-xl text-charcoal mb-2">Significant Token Cost</strong>
                                    <p className="text-charcoal/60 leading-relaxed">The "thinking" process burns significantly more tokens for the same query. It is an expensive model to run.</p>
                                </div>
                            </li>
                            <li className="flex gap-6">
                                <span className="font-serif text-4xl text-amber-100 font-bold">03</span>
                                <div>
                                    <strong className="block text-xl text-charcoal mb-2">Excessive for Simple Tasks</strong>
                                    <p className="text-charcoal/60 leading-relaxed">Overkill for basic Q&A. Using a sledgehammer to crack a nut.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
      </main>
    </>
  );
}

const DemoView = () => {
    const demos = [
        {
            id: 'gen-ui',
            title: 'Generative UI',
            subtitle: 'Dynamic Views',
            desc: "Experience how Gemini 3 Pro constructs a bespoke Van Gogh gallery interface in real-time. It doesn't just output text; it writes React code, styles it, and renders a fully interactive timeline and biography component based on a simple prompt.",
            icon: Layout,
            video: `${import.meta.env.BASE_URL}videos/gen-ui-demo.mp4`,
        },
        {
            id: 'agentic',
            title: 'Pro Agents',
            subtitle: 'Achieve inbox zero',
            desc: "Gemini breaks down complex requests using tools like Deep Research; Canvas; your Google Workspace connected apps like Gmail and Calendar; and live web browsing. When using it, you remain in control: Gemini is designed to seek confirmation before critical actions, and you can take over anytime.",
            icon: Plane,
            video: `${import.meta.env.BASE_URL}videos/agent-clear-inbox.mp4`,
        },
        {
            id: 'coding',
            title: 'Vibe Coding',
            subtitle: 'Generate code faster and smarter',
            desc: "With our new agentic development platform Google Antigravity, you can build faster and manage intelligent agents that operate across the editor, terminal and browser. Antigravity uses Gemini 3's advanced reasoning, tool use and agentic coding capabilities to act as your partner, generating code complex enough to work in the real world — like in the case of the classic cartpole problem.",
            icon: Code,
            video: `${import.meta.env.BASE_URL}videos/coding-demo.mp4`,
        },
        {
            id: 'multimodal',
            title: 'Video Analysis',
            subtitle: 'Analyze beyond texts',
            desc: "With Gemini 3's massive long-context window; state-of-the-art reasoning capabilities; and vision and spatial understanding, you can upload a video of yourself playing a sport for up to an hour and receive coach-level advice. Gemini 3 will identify that you're the player, filter out noise and offer a detailed visual analysis, complete with information like form evaluation and suggested drills.",
            icon: Video,
            youtube: 'https://www.youtube.com/embed/fR4ys9L22_Y?autoplay=1&mute=1',
        },
        {
            id: 'learn-better',
            title: 'Learn Better',
            subtitle: 'Break down & Visualized',
            desc: "Gemini 3 is state-of-the-art on multimodal understanding and has a 1 million-token context window. So it can take any kind of input you give it — from text to video to code and beyond — and help you learn in ways that make sense for you, like with an interactive guide based on a dense research paper.",
            icon: Sparkles,
            youtube: 'https://www.youtube.com/embed/MZCpgTi-Iys?autoplay=1&mute=1',
        }
    ];

    const [activeDemoId, setActiveDemoId] = useState(demos[0].id);
    const activeDemo = demos.find(d => d.id === activeDemoId) || demos[0];

    return (
        <div className="pt-20 pb-24 min-h-screen animate-in fade-in duration-700">
             
             {/* HEADER BACKGROUND SECTION */}
             <div className="relative w-full py-32 mb-12 flex items-center justify-center overflow-hidden">
                 {/* Replaced fluid-mesh CSS with FluidVideoBackground Component */}
                 <FluidVideoBackground />
                 
                 {/* Glass overlay */}
                 <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
                 
                 {/* Bottom fade to blend into background */}
                 <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream via-cream/80 to-transparent"></div>
                 
<div className="relative z-10 w-full -mt-16 overflow-visible">
                     <img 
                        src={`${import.meta.env.BASE_URL}use-cases-demo-title.png?v=6`}
                        alt="USE CASES DEMO"
                        className="w-[119%] md:w-[143%] max-w-none h-auto relative left-1/2"
                        style={{ 
                          filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.3))',
                          transform: 'translateX(-50%)'
                        }}
                      />
                 </div>
             </div>

             <div className="container mx-auto px-6 max-w-6xl">

                <div className="mb-8 flex items-center gap-4">
                     <h2 className="font-serif text-3xl text-charcoal">Explore Scenarios</h2>
                </div>

                {/* Oval/Pill Selector */}
                <div className="flex flex-wrap gap-4 mb-12">
                    {demos.map((demo) => {
                        const Icon = demo.icon;
                        const isActive = activeDemoId === demo.id;
                        return (
                            <button 
                                key={demo.id}
                                onClick={() => setActiveDemoId(demo.id)}
                                className={`
                                    group flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300
                                    ${isActive 
                                        ? 'bg-charcoal text-white border-charcoal shadow-lg scale-105' 
                                        : 'bg-white text-charcoal border-charcoal/20 hover:border-charcoal/50 hover:bg-charcoal/5'
                                    }
                                `}
                            >
                                <Icon size={20} className={isActive ? "text-[#B88786]" : "text-charcoal/60 group-hover:text-charcoal"} />
                                <span className={`font-serif text-lg tracking-wide ${isActive ? "text-white" : "text-charcoal"}`}>
                                    {demo.title}
                                </span>
                            </button>
                        )
                    })}
                </div>

                {/* Detail View */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white p-8 md:p-12 rounded-xl min-h-[500px] shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {/* Video Area */}
                    <div className="lg:col-span-8 bg-charcoal/5 rounded-sm flex items-center justify-center relative overflow-hidden group min-h-[300px]">
                        {activeDemo.youtube ? (
                            /* YouTube Embed */
                            <iframe
                                key={activeDemo.id}
                                className="w-full h-full min-h-[400px] rounded-sm"
                                src={activeDemo.youtube}
                                title={activeDemo.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            />
                        ) : activeDemo.video ? (
                            <video 
                                key={activeDemo.id}
                                className="w-full h-full object-cover rounded-sm"
                                controls
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src={activeDemo.video} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            /* Placeholder when no video is available */
                            <div className="text-center p-8">
                                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                     <Play size={32} className="text-charcoal ml-1" />
                                 </div>
                                 <p className="font-serif text-xl text-charcoal/60">Video Coming Soon</p>
                                 <p className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mt-2">{activeDemo.title}</p>
                            </div>
                        )}
                        {/* Overlay Gradient - only show on non-youtube content */}
                        {!activeDemo.youtube && <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>}
                    </div>

                    {/* Text Description */}
                    <div className="lg:col-span-4 flex flex-col justify-center">
                        <div className="inline-block mb-4 px-2 py-1 bg-[#B88786]/15 text-[#B88786] text-[10px] font-bold uppercase tracking-widest rounded-sm w-fit">
                            Live Case Study
                        </div>
                        <h3 className="font-serif text-4xl text-charcoal mb-2">{activeDemo.title}</h3>
                        <div className="text-xs font-bold uppercase tracking-widest text-charcoal/40 mb-6">{activeDemo.subtitle}</div>
                        
                        <p className="text-charcoal/70 leading-relaxed font-sans mb-8 text-sm md:text-base">
                            {activeDemo.desc}
                        </p>
                        
                        <div className="border-t border-charcoal/10 pt-6">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-charcoal/50 mb-4">Capabilities Used</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">Reasoning</span>
                                <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">Context</span>
                                {activeDemo.id === 'gen-ui' && <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">Code Gen</span>}
                                {activeDemo.id === 'agentic' && <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">Tool Use</span>}
                                {activeDemo.id === 'agentic' && <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">Google Workspace</span>}
                                {activeDemo.id === 'coding' && <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">Refactoring</span>}
                                {activeDemo.id === 'learn-better' && <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">Multimodal</span>}
                                {activeDemo.id === 'learn-better' && <span className="px-3 py-1 border border-charcoal/20 rounded-full text-xs text-charcoal/60 font-medium">1M Tokens</span>}
                            </div>
                        </div>
                    </div>
                </div>
             </div>
        </div>
    )
}

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'demo'>('home');

  const handleNavClick = (view: 'home' | 'demo', id?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    
    // If we are navigating to the same view, just scroll
    if (currentView === view) {
        if (id) {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        } else {
             window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        return;
    }

    // If switching views
    setCurrentView(view);
    
    // If switching to home with an ID, wait for render then scroll
    if (view === 'home' && id) {
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal selection:bg-charcoal selection:text-cream font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-md border-b border-charcoal/10">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={handleNavClick('home')}>
            <div className="w-8 h-8 bg-charcoal text-cream rounded-full flex items-center justify-center font-serif font-bold text-lg">C</div>
            <span className="font-serif font-bold text-xl tracking-wide">
              Cheryl's AI Research
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-[0.1em] uppercase text-charcoal/60">
            <a href="#overview" onClick={handleNavClick('home', 'overview')} className={`hover:text-charcoal transition-colors ${currentView === 'home' ? 'text-charcoal' : ''}`}>Overview</a>
            <a href="#features" onClick={handleNavClick('home', 'features')} className="hover:text-charcoal transition-colors">Key Features</a>
            <a href="#review" onClick={handleNavClick('home', 'review')} className="hover:text-charcoal transition-colors">Review</a>
            <a href="#" onClick={handleNavClick('demo')} className={`hover:text-[#B88786] transition-colors ${currentView === 'demo' ? 'text-[#B88786]' : ''}`}>Demo</a>
            <a 
              href="https://aistudio.google.com/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-6 py-2.5 bg-charcoal text-white hover:bg-blue-700 transition-colors duration-300"
            >
              Try on AI Studio
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8 text-2xl font-serif">
            <a href="#overview" onClick={handleNavClick('home', 'overview')} className="hover:text-[#B88786]">Overview</a>
            <a href="#features" onClick={handleNavClick('home', 'features')} className="hover:text-[#B88786]">Key Features</a>
            <a href="#review" onClick={handleNavClick('home', 'review')} className="hover:text-[#B88786]">Review</a>
            <a href="#" onClick={handleNavClick('demo')} className="hover:text-[#B88786]">Demo</a>
        </div>
      )}

      {/* Main View Content */}
      {currentView === 'home' ? (
          <HomeView scrollToSection={(id) => handleNavClick('home', id)({ preventDefault: () => {} } as React.MouseEvent)} />
      ) : (
          <DemoView />
      )}

      {/* Footer */}
      <footer className="bg-charcoal text-cream py-20 border-t border-white/10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                    <div>
                        <div className="w-12 h-12 bg-cream text-charcoal rounded-full flex items-center justify-center font-serif font-bold text-2xl mb-6">C</div>
                        <h3 className="font-serif text-3xl mb-4">Gemini 3 Pro Study</h3>
                        <p className="text-cream/50 max-w-sm mb-8 leading-relaxed">
                            A comprehensive look at the new standard in multimodal intelligence. Stay tuned for updates on benchmarks and hidden features.
                        </p>
                        <div className="text-xs uppercase tracking-[0.2em] text-cream/40">
                            © 2025 Visualization
                        </div>
                    </div>
                    
                    <div className="text-left md:text-right">
                         <div className="mb-2 text-xs font-bold tracking-[0.2em] text-cream/40 uppercase">Author</div>
                         <div className="font-serif text-2xl mb-1">Cheryl Kuo</div>
                         <div className="text-cream/60 font-sans text-sm">VIVE Product</div>
                    </div>
                </div>
            </div>
      </footer>
    </div>
  );
};

export default App;