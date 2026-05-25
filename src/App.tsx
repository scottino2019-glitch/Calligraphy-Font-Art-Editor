import { useState, useEffect } from 'react';
import { Layer, CanvasBackground, Language, TextLayer, SwashLayer, FrameLayer, SparkleLayer } from './types';
import { loadAllFonts, FONTS } from './components/Fonts';
import { PRESETS } from './presets';
import { SWASH_PATHS, FRAME_PATHS, SPARKLE_PATHS } from './components/VectorPaths';
import { TRANSLATIONS } from './components/Language';
import Canvas from './components/Canvas';
import ExportModal from './components/ExportModal';
import {
  Type,
  TrendingUp,
  Crop,
  Sparkles,
  Sliders,
  Palette,
  Layers,
  FileDown,
  RefreshCw,
  Plus,
  Trash2,
  Copy,
  Globe,
  Settings,
  Grid,
  Maximize2,
  Bookmark
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('it');
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [background, setBackground] = useState<CanvasBackground>({
    type: 'texture',
    color1: '#fcfbf7',
    color2: '#f3efdf',
    gradientAngle: 45,
    texturePattern: 'watercolor'
  });
  
  const [activeTab, setActiveTab] = useState<'presets' | 'add' | 'edit' | 'background'>('presets');
  const [fontFilter, setFontFilter] = useState<string>('All');
  const [showExportModal, setShowExportModal] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const t = TRANSLATIONS[lang];

  const handleResetWorkspace = () => {
    if (!showResetConfirm) {
      setShowResetConfirm(true);
    } else {
      setLayers([]);
      setSelectedLayerId(null);
      setShowResetConfirm(false);
      setIsShaking(true);
    }
  };

  useEffect(() => {
    if (isShaking) {
      const timer = setTimeout(() => setIsShaking(false), 550);
      return () => clearTimeout(timer);
    }
  }, [isShaking]);

  useEffect(() => {
    if (showResetConfirm) {
      const timer = setTimeout(() => setShowResetConfirm(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showResetConfirm]);

  // Calligraphy Preset Colors
  const PALETTE = [
    { name: 'Midnight Ink', value: '#1a1a1a' },
    { name: 'Pure White', value: '#ffffff' },
    { name: 'Royal Gold', value: '#c5a880' },
    { name: 'Bright Gold', value: '#ffd700' },
    { name: 'Rose Gold', value: '#b76e79' },
    { name: 'Sage Leaf', value: '#6e8072' },
    { name: 'Forest Green', value: '#2b3a2f' },
    { name: 'Deep Burgundy', value: '#800020' },
    { name: 'Plum Blush', value: '#502040' },
    { name: 'Navy Blue', value: '#1e293b' },
  ];

  // Load all Google fonts on mount
  useEffect(() => {
    loadAllFonts();
    // Default load first preset
    loadPreset(PRESETS[0]);
  }, []);

  const loadPreset = (preset: typeof PRESETS[0]) => {
    // Deep clone preset layers
    const clonedLayers = JSON.parse(JSON.stringify(preset.layers));
    setLayers(clonedLayers);
    setBackground(JSON.parse(JSON.stringify(preset.background)));
    setSelectedLayerId(clonedLayers[0]?.id || null);
  };

  const handleUpdateLayerPosition = (id: string, x: number, y: number) => {
    setLayers(prev =>
      prev.map(l => (l.id === id ? { ...l, x, y } : l))
    );
  };

  const updateSelectedLayerField = (field: string, value: any) => {
    if (!selectedLayerId) return;
    setLayers(prev =>
      prev.map(l => (l.id === selectedLayerId ? { ...l, [field]: value } : l))
    );
  };

  // Add Layers APIs
  const addNewTextLayer = () => {
    const defaultText: TextLayer = {
      id: `text-${Date.now()}`,
      type: 'text',
      name: `Text - ${layers.filter(l => l.type === 'text').length + 1}`,
      x: 500,
      y: 350,
      scale: 1,
      rotation: 0,
      color: '#1a1a1a',
      opacity: 1,
      text: lang === 'it' ? 'Scrivi...' : 'Inscribe...',
      fontFamily: 'Great Vibes',
      fontSize: 80,
      letterSpacing: 1,
      italic: false,
      bold: false
    };
    setLayers(prev => [...prev, defaultText]);
    setSelectedLayerId(defaultText.id);
    setActiveTab('edit');
  };

  const addNewSwashLayer = (swashType: SwashLayer['swashType']) => {
    const defaultSwash: SwashLayer = {
      id: `swash-${Date.now()}`,
      type: 'swash',
      name: `Swash - ${swashType}`,
      x: 350,
      y: 350,
      scale: 1,
      rotation: 0,
      color: '#1a1a1a',
      opacity: 1,
      swashType,
      strokeWidth: 3
    };
    setLayers(prev => [...prev, defaultSwash]);
    setSelectedLayerId(defaultSwash.id);
    setActiveTab('edit');
  };

  const addNewFrameLayer = (frameType: FrameLayer['frameType']) => {
    const defaultFrame: FrameLayer = {
      id: `frame-${Date.now()}`,
      type: 'frame',
      name: `Frame - ${frameType}`,
      x: 500,
      y: 350,
      scale: 2.2,
      rotation: 0,
      color: '#c5a880',
      opacity: 0.6,
      frameType,
      strokeWidth: 2
    };
    setLayers(prev => [...prev, defaultFrame]);
    setSelectedLayerId(defaultFrame.id);
    setActiveTab('edit');
  };

  const addNewSparkleLayer = (sparkleType: SparkleLayer['sparkleType']) => {
    const defaultSparkle: SparkleLayer = {
      id: `sparkle-${Date.now()}`,
      type: 'sparkle',
      name: `Sparkle - ${sparkleType}`,
      x: 500,
      y: 250,
      scale: 0.6,
      rotation: 0,
      color: '#ffd700',
      opacity: 0.8,
      sparkleType
    };
    setLayers(prev => [...prev, defaultSparkle]);
    setSelectedLayerId(defaultSparkle.id);
    setActiveTab('edit');
  };

  const handleDeleteLayer = (id: string) => {
    setLayers(prev => prev.filter(l => l.id !== id));
    if (selectedLayerId === id) {
      setSelectedLayerId(null);
    }
  };

  const handleDuplicateLayer = (layer: Layer) => {
    const newLayer = {
      ...JSON.parse(JSON.stringify(layer)),
      id: `${layer.type}-${Date.now()}`,
      name: `${layer.name} (Copy)`,
      x: Math.min(800, layer.x + 40),
      y: Math.min(600, layer.y + 40)
    };
    setLayers(prev => [...prev, newLayer]);
    setSelectedLayerId(newLayer.id);
  };

  // Filter fonts
  const filteredFonts = fontFilter === 'All' 
    ? FONTS 
    : FONTS.filter(f => f.category === fontFilter);

  const activeLayer = layers.find(l => l.id === selectedLayerId);

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-sans selection:bg-brand-accent selection:text-brand-bg">
      {/* Dynamic Fonts preloader */}
      <style>
        {FONTS.map(f => `@import url('${f.importUrl}');`).join('\n')}
      </style>

      {/* Main Bar header */}
      <header className="sticky top-0 z-40 bg-brand-bg border-b border-brand-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-brand-accent flex items-center justify-center text-brand-bg shadow-[0_0_15px_rgba(204,255,0,0.3)] active:scale-95 transition-all">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white flex items-center gap-2 uppercase">
              {t.title}
              <span className="stat-badge">v1.1</span>
            </h1>
            <p className="text-[10px] text-brand-dim uppercase tracking-wider font-bold hidden sm:block">
              {t.subtitle}
            </p>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex items-center gap-3">
          {/* Italian / English Translation Toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-brand-border text-xs font-bold text-white hover:border-brand-accent transition-all select-none"
          >
            <Globe size={14} className="text-brand-accent" />
            <span className="uppercase font-mono">{lang}</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleResetWorkspace}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded border transition-all ${
              showResetConfirm
                ? 'border-brand-accent bg-brand-accent/20 text-brand-accent shadow-[0_0_12px_rgba(204,255,0,0.3)]'
                : 'border-rose-950/70 bg-rose-950/20 text-rose-450 hover:bg-rose-950/40'
            }`}
            title={lang === 'it' ? 'Clicca ancora per svuotare il canovaccio' : 'Click again to reset canvas'}
          >
            <RefreshCw size={14} className={showResetConfirm ? "animate-spin" : ""} />
            <span className="hidden md:inline uppercase">
              {showResetConfirm 
                ? (lang === 'it' ? 'SICURO?' : 'SURE?') 
                : t.resetWorkspace
              }
            </span>
          </button>

          {/* Export CTA Button */}
          <button
            type="button"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-5 py-2 rounded text-xs font-black text-brand-bg bg-brand-accent hover:bg-white active:scale-95 transition-all shadow-[0_0_15px_rgba(204,255,0,0.2)] uppercase tracking-tight"
          >
            <FileDown size={14} />
            <span>ESPORTA (Export)</span>
          </button>
        </div>
      </header>

      {/* Main Grid Layout */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden h-[calc(100vh-73px)] bg-brand-bg">
        {/* Left Side: Granular Control Center */}
        <aside className="lg:col-span-4 border-r border-brand-border bg-brand-panel overflow-y-auto flex flex-col">
          
          {/* Main Sidebar Sections Selector */}
          <nav className="flex justify-around border-b border-brand-border bg-brand-bg/50 p-2">
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                activeTab === 'presets'
                  ? 'bg-brand-accent text-brand-bg font-black shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                  : 'text-brand-dim hover:text-white'
              }`}
            >
              <Bookmark size={15} />
              {lang === 'it' ? 'Modelli' : 'Presets'}
            </button>
            <button
              onClick={() => setActiveTab('add')}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                activeTab === 'add'
                  ? 'bg-brand-accent text-brand-bg font-black shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                  : 'text-brand-dim hover:text-white'
              }`}
            >
              <Plus size={15} />
              {lang === 'it' ? 'Crea' : 'Add Layer'}
            </button>
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                activeTab === 'edit'
                  ? 'bg-brand-accent text-brand-bg font-black shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                  : 'text-brand-dim hover:text-white'
              }`}
            >
              <Sliders size={15} />
              {lang === 'it' ? 'Regola' : 'Edit Layer'}
            </button>
            <button
              onClick={() => setActiveTab('background')}
              className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 rounded text-[10px] font-bold tracking-wider uppercase transition-all ${
                activeTab === 'background'
                  ? 'bg-brand-accent text-brand-bg font-black shadow-[0_0_10px_rgba(204,255,0,0.15)]'
                  : 'text-brand-dim hover:text-white'
              }`}
            >
              <Palette size={15} />
              {lang === 'it' ? 'Sfondo' : 'Canvas'}
            </button>
          </nav>

          {/* Tab Contents */}
          <div className="p-6 flex-1 space-y-6">
            
            {/* 1. Presets / Templates Gallery */}
            {activeTab === 'presets' && (
              <div className="space-y-4 animate-fade-in animate-duration-150">
                <div className="space-y-1">
                  <h3 className="text-sm font-black uppercase tracking-tight text-white">{t.presets}</h3>
                  <p className="text-[11px] uppercase tracking-wider font-mono text-brand-dim font-bold">{t.presetsDesc}</p>
                </div>
                <div className="space-y-3.5">
                  {PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => loadPreset(preset)}
                      className="w-full text-left p-4 rounded-lg border border-brand-border bg-brand-bg hover:border-brand-accent hover:shadow-[0_0_12px_rgba(204,255,0,0.1)] transition-all flex flex-col gap-1.5 focus:outline-none"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="font-extrabold text-xs text-white flex items-center gap-2 uppercase tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse"></span>
                          {lang === 'it' ? preset.nameIt : preset.name}
                        </span>
                        <span className="stat-badge">
                          {preset.layers.length} {lang === 'it' ? 'LIV' : 'LYR'}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-dim leading-relaxed font-semibold">
                        {lang === 'it' ? preset.descriptionIt : preset.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Add Layer Picker */}
            {activeTab === 'add' && (
              <div className="space-y-5 animate-fade-in animate-duration-150">
                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-brand-dim uppercase tracking-widest">{t.addText}</h4>
                  <button
                    onClick={addNewTextLayer}
                    className="w-full py-3 px-4 rounded-lg border-2 border-dashed border-brand-accent/30 hover:border-brand-accent hover:bg-brand-accent/5 text-xs font-bold text-white flex items-center justify-center gap-2 transition-all"
                  >
                    <Type size={16} className="text-brand-accent" />
                    <span>{t.addText}</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-brand-dim uppercase tracking-widest">{t.addSwash}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(SWASH_PATHS).map(swash => (
                      <button
                        key={swash.id}
                        onClick={() => addNewSwashLayer(swash.id as any)}
                        className="p-3 text-center rounded-lg bg-brand-bg hover:border-brand-accent border border-brand-border text-[11px] font-bold text-white transition-all flex flex-col items-center gap-2"
                      >
                        <div className="w-14 h-8 flex items-center justify-center scale-90">
                          <svg viewBox={swash.viewBox} className="w-full h-full text-brand-accent">
                            {swash.render('currentColor', 4)}
                          </svg>
                        </div>
                        <span className="truncate w-full block uppercase font-mono tracking-wide text-[10px] text-brand-dim">{lang === 'it' ? swash.nameIt : swash.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-brand-dim uppercase tracking-widest">{t.addFrame}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(FRAME_PATHS).map(frame => (
                      <button
                        key={frame.id}
                        onClick={() => addNewFrameLayer(frame.id as any)}
                        className="p-3 text-center rounded-lg bg-brand-bg hover:border-brand-accent border border-brand-border text-[11px] font-bold text-white transition-all flex flex-col items-center gap-2"
                      >
                        <div className="w-12 h-12 flex items-center justify-center scale-90">
                          <svg viewBox={frame.viewBox} className="w-full h-full text-brand-accent">
                            {frame.render('currentColor', 3)}
                          </svg>
                        </div>
                        <span className="truncate w-full block uppercase font-mono tracking-wide text-[10px] text-brand-dim">{lang === 'it' ? frame.nameIt : frame.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-bold text-brand-dim uppercase tracking-widest">{t.addSparkle}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(SPARKLE_PATHS).map(sparkle => (
                      <button
                        key={sparkle.id}
                        onClick={() => addNewSparkleLayer(sparkle.id as any)}
                        className="p-3 text-center rounded-lg bg-brand-bg hover:border-brand-accent border border-brand-border text-[11px] font-bold text-white transition-all flex flex-col items-center gap-2"
                      >
                        <div className="w-10 h-10 flex items-center justify-center scale-90">
                          <svg viewBox={sparkle.viewBox} className="w-full h-full text-brand-accent">
                            {sparkle.render('currentColor', 2)}
                          </svg>
                        </div>
                        <span className="truncate w-full block uppercase font-mono tracking-wide text-[10px] text-brand-dim">{lang === 'it' ? sparkle.nameIt : sparkle.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3. Selected Layer Specific Sliders */}
            {activeTab === 'edit' && (
              <div className="space-y-5 animate-fade-in animate-duration-150">
                 {!activeLayer ? (
                  <div className="text-center py-10 px-4 rounded-lg border border-brand-border bg-brand-bg text-brand-dim">
                    <Sliders size={28} className="mx-auto mb-2 text-brand-accent" />
                    <p className="text-xs font-bold leading-relaxed uppercase tracking-wider">{t.feedbackMessage}</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Active Layer Header with action buttons */}
                    <div className="flex items-center justify-between border-b border-brand-border pb-3">
                      <div>
                        <span className="text-[10px] font-black text-brand-accent uppercase tracking-wider block">
                          {activeLayer.type} Layer
                        </span>
                        <span className="text-xs font-black text-white block max-w-[180px] truncate uppercase font-mono tracking-wider">
                          {activeLayer.name}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleDuplicateLayer(activeLayer)}
                          className="p-2 rounded bg-brand-bg border border-brand-border hover:border-brand-accent text-brand-dim hover:text-white active:scale-95 transition-all text-xs"
                          title={t.duplicateLayer}
                        >
                          <Copy size={13} />
                        </button>
                        <button
                          onClick={() => handleDeleteLayer(activeLayer.id)}
                          className="p-2 rounded bg-rose-950/20 border border-rose-950 text-rose-450 hover:bg-rose-950/50 active:scale-95 transition-all text-xs"
                          title={t.deleteLayer}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* TEXT-LAYER ONLY SETTINGS */}
                    {activeLayer.type === 'text' && (
                      <>
                        {/* Custom Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-bold text-brand-dim tracking-wider">{t.customTextLabel}</label>
                          <input
                            type="text"
                            value={(activeLayer as TextLayer).text}
                            onChange={(e) => updateSelectedLayerField('text', e.target.value)}
                            className="w-full px-3 py-2 text-sm rounded border border-brand-border bg-brand-bg text-white focus:outline-none focus:border-brand-accent"
                            placeholder={t.textPlaceHolder}
                          />
                        </div>

                        {/* Font Family Dynamic Preview Grid */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] uppercase font-bold text-brand-dim tracking-wider">Font Clicco</label>
                            {/* Filter bar */}
                            <select
                              value={fontFilter}
                              onChange={(e) => setFontFilter(e.target.value)}
                              className="text-[10px] bg-brand-bg p-1 border border-brand-border outline-none rounded text-white font-bold"
                            >
                              <option value="All">Tutti</option>
                              <option value="Elegant">Elegante</option>
                              <option value="Casual">Casual</option>
                              <option value="Ornate">Barocco</option>
                            </select>
                          </div>
                          
                          <div className="max-h-48 overflow-y-auto border border-brand-border rounded divide-y divide-brand-border bg-brand-bg">
                            {filteredFonts.map(font => (
                              <button
                                key={font.id}
                                onClick={() => updateSelectedLayerField('fontFamily', font.name)}
                                className={`w-full text-left p-2.5 transition-all flex items-center justify-between focus:outline-none ${
                                  (activeLayer as TextLayer).fontFamily === font.name
                                    ? 'bg-brand-accent/15 text-brand-accent'
                                    : 'hover:bg-brand-accent/5 text-brand-dim hover:text-white'
                                }`}
                              >
                                <span className="text-[11px] font-black uppercase tracking-tight block truncate max-w-[130px] font-mono">{font.name}</span>
                                <span
                                  className="text-lg pr-1"
                                  style={{ fontFamily: `"${font.name}", cursive` }}
                                >
                                  Buon Compleanno
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Size sliders */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                            <span className="text-brand-dim">{t.fontSize}</span>
                            <span className="font-mono text-white">{(activeLayer as TextLayer).fontSize}px</span>
                          </div>
                          <input
                            type="range"
                            min="20"
                            max="250"
                            step="2"
                            value={(activeLayer as TextLayer).fontSize}
                            onChange={(e) => updateSelectedLayerField('fontSize', parseInt(e.target.value))}
                            className="w-full accent-brand-accent bg-brand-border h-1 rounded cursor-pointer"
                          />
                        </div>

                        {/* Spacing sliders */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                            <span className="text-brand-dim">{t.letterSpacing}</span>
                            <span className="font-mono text-white">{(activeLayer as TextLayer).letterSpacing}px</span>
                          </div>
                          <input
                            type="range"
                            min="-10"
                            max="30"
                            step="0.5"
                            value={(activeLayer as TextLayer).letterSpacing}
                            onChange={(e) => updateSelectedLayerField('letterSpacing', parseFloat(e.target.value))}
                            className="w-full accent-brand-accent bg-brand-border h-1 rounded cursor-pointer"
                          />
                        </div>

                        {/* Bold/Italic options */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => updateSelectedLayerField('bold', !(activeLayer as TextLayer).bold)}
                            className={`py-2 px-3 rounded border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all outline-none ${
                              (activeLayer as TextLayer).bold
                                ? 'border-brand-accent bg-brand-accent/15 text-brand-accent font-black shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                                : 'border-brand-border text-brand-dim'
                            }`}
                          >
                            <span className="font-black">B</span>
                            <span>{t.bold}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => updateSelectedLayerField('italic', !(activeLayer as TextLayer).italic)}
                            className={`py-2 px-3 rounded border text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all outline-none ${
                              (activeLayer as TextLayer).italic
                                ? 'border-brand-accent bg-brand-accent/15 text-brand-accent font-black shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                                : 'border-brand-border text-brand-dim'
                            }`}
                          >
                            <span className="italic font-extrabold">I</span>
                            <span>Italico</span>
                          </button>
                        </div>
                      </>
                    )}

                    {/* SWASH / FRAME SPECIFIC SETTINGS */}
                    {(activeLayer.type === 'swash' || activeLayer.type === 'frame') && (
                      <div className="space-y-4">
                        {/* Line weight */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                            <span className="text-brand-dim">{t.strokeWidth}</span>
                            <span className="font-mono text-white">{(activeLayer as any).strokeWidth}px</span>
                          </div>
                          <input
                            type="range"
                            min="0.5"
                            max="12"
                            step="0.1"
                            value={(activeLayer as any).strokeWidth}
                            onChange={(e) => updateSelectedLayerField('strokeWidth', parseFloat(e.target.value))}
                            className="w-full accent-brand-accent bg-brand-border h-1 rounded cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* TRANSFORMATIONS (UNIVERSAL FOR ELEMENT TWEAKING) */}
                    <div className="space-y-4 pt-3 border-t border-brand-border">
                      <h4 className="text-[10px] font-extrabold text-brand-dim uppercase tracking-widest">
                        COORDINATE &amp; TRASFORMAZIONE
                      </h4>

                      {/* Scale Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider">
                          <span className="text-brand-dim">{t.scale}</span>
                          <span className="font-mono text-white">{activeLayer.scale.toFixed(2)}x</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="4.5"
                          step="0.05"
                          value={activeLayer.scale}
                          onChange={(e) => updateSelectedLayerField('scale', parseFloat(e.target.value))}
                          className="w-full accent-brand-accent bg-brand-border h-1 rounded cursor-pointer"
                        />
                      </div>

                      {/* Rotation Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] uppercase font-bold tracking-wider">
                          <span className="text-brand-dim">{t.rotation}</span>
                          <span className="font-mono text-white">{activeLayer.rotation}°</span>
                        </div>
                        <input
                          type="range"
                          min="-180"
                          max="180"
                          step="1"
                          value={activeLayer.rotation}
                          onChange={(e) => updateSelectedLayerField('rotation', parseInt(e.target.value))}
                          className="w-full accent-brand-accent bg-brand-border h-1 rounded cursor-pointer"
                        />
                      </div>

                      {/* Opacity Slider */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[11px] uppercase font-bold tracking-wider">
                          <span className="text-brand-dim">{t.opacity}</span>
                          <span className="font-mono text-white">{Math.round(activeLayer.opacity * 100)}%</span>
                        </div>
                        <input
                          type="range"
                          min="0.05"
                          max="1.0"
                          step="0.05"
                          value={activeLayer.opacity}
                          onChange={(e) => updateSelectedLayerField('opacity', parseFloat(e.target.value))}
                          className="w-full accent-brand-accent bg-brand-border h-1 rounded cursor-pointer"
                        />
                      </div>

                      {/* Fine Position slider controllers */}
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-extrabold tracking-wider text-brand-dim">Posizione X</span>
                          <input
                            type="number"
                            value={activeLayer.x}
                            onChange={(e) => updateSelectedLayerField('x', parseInt(e.target.value) || 0)}
                            className="w-full px-2.5 py-1 text-xs rounded border border-brand-border bg-brand-bg text-white font-mono"
                          />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] uppercase font-extrabold tracking-wider text-brand-dim">Posizione Y</span>
                          <input
                            type="number"
                            value={activeLayer.y}
                            onChange={(e) => updateSelectedLayerField('y', parseInt(e.target.value) || 0)}
                            className="w-full px-2.5 py-1 text-xs rounded border border-brand-border bg-brand-bg text-white font-mono"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SELECT COLOR & SWATCH TONALITIES */}
                    <div className="space-y-3 pt-4 border-t border-brand-border">
                      <span className="text-[10px] font-extrabold text-brand-dim uppercase tracking-widest block">
                        {t.color}
                      </span>
                      
                      {/* Premium Circle chips */}
                      <div className="flex flex-wrap gap-2">
                        {PALETTE.map(chip => (
                          <button
                            key={chip.name}
                            onClick={() => updateSelectedLayerField('color', chip.value)}
                            className={`w-7 h-7 rounded-full border border-white/10 transition-all select-none relative ${
                              activeLayer.color === chip.value ? 'ring-2 ring-brand-accent scale-110' : 'hover:scale-105'
                            }`}
                            style={{ backgroundColor: chip.value }}
                            title={chip.name}
                          >
                            {/* Marker if selected is active white / or active black */}
                            {activeLayer.color === chip.value && (
                              <span className="absolute inset-0.5 rounded-full border border-dashed border-white invert mix-blend-difference"></span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Real time picker custom */}
                      <div className="flex items-center gap-2.5 pt-1">
                        <input
                          type="color"
                          value={activeLayer.color}
                          onChange={(e) => updateSelectedLayerField('color', e.target.value)}
                          className="w-9 h-8 rounded border border-brand-border cursor-pointer overflow-hidden p-0 bg-transparent"
                        />
                        <span className="text-xs font-mono font-black text-white uppercase tracking-wider">
                          {activeLayer.color}
                        </span>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )}

            {/* 4. Background Settings */}
            {activeTab === 'background' && (
              <div className="space-y-5 animate-fade-in animate-duration-150">
                <div className="space-y-3">
                  <span className="text-[10px] font-extrabold text-brand-dim uppercase tracking-widest block">
                    {t.bgType}
                  </span>
                  
                  {/* Select Type background */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setBackground(prev => ({ ...prev, type: 'solid' }))}
                      className={`py-2 px-1 text-center rounded border text-xs font-bold uppercase tracking-wide select-none transition-all ${
                        background.type === 'solid'
                          ? 'border-brand-accent bg-brand-accent/15 text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                          : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                      }`}
                    >
                      {t.bgSolid}
                    </button>
                    <button
                      onClick={() => setBackground(prev => ({ ...prev, type: 'gradient' }))}
                      className={`py-2 px-1 text-center rounded border text-xs font-bold uppercase tracking-wide select-none transition-all ${
                        background.type === 'gradient'
                          ? 'border-brand-accent bg-brand-accent/15 text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                          : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                      }`}
                    >
                      Gradiente
                    </button>
                    <button
                      onClick={() => setBackground(prev => ({ ...prev, type: 'texture' }))}
                      className={`py-2 px-1 text-center rounded border text-xs font-bold uppercase tracking-wide select-none transition-all ${
                        background.type === 'texture'
                          ? 'border-brand-accent bg-brand-accent/15 text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                          : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                      }`}
                    >
                      Texture
                    </button>
                  </div>
                </div>

                {/* Texture subselector */}
                {background.type === 'texture' && (
                  <div className="space-y-2.5">
                    <span className="text-[10px] font-bold text-brand-dim uppercase tracking-widest block">TEXTURE PATTERNS CARTACEO</span>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setBackground(prev => ({ ...prev, texturePattern: 'watercolor' }))}
                        className={`p-2.5 text-left rounded border text-xs transition-colors truncate block font-bold uppercase tracking-wider ${
                          background.texturePattern === 'watercolor'
                            ? 'bg-brand-accent/15 border-brand-accent text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                            : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                        }`}
                      >
                        {t.textureWatercolor}
                      </button>
                      <button
                        onClick={() => setBackground(prev => ({ ...prev, texturePattern: 'linen' }))}
                        className={`p-2.5 text-left rounded border text-xs transition-colors truncate block font-bold uppercase tracking-wider ${
                          background.texturePattern === 'linen'
                            ? 'bg-brand-accent/15 border-brand-accent text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                            : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                        }`}
                      >
                        {t.textureLinen}
                      </button>
                      <button
                        onClick={() => setBackground(prev => ({ ...prev, texturePattern: 'chalkboard' }))}
                        className={`p-2.5 text-left rounded border text-xs transition-colors truncate block font-bold uppercase tracking-wider ${
                          background.texturePattern === 'chalkboard'
                            ? 'bg-brand-accent/15 border-brand-accent text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                            : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                        }`}
                      >
                        {t.textureChalkboard}
                      </button>
                      <button
                        onClick={() => setBackground(prev => ({ ...prev, texturePattern: 'kraft' }))}
                        className={`p-2.5 text-left rounded border text-xs transition-colors truncate block font-bold uppercase tracking-wider ${
                          background.texturePattern === 'kraft'
                            ? 'bg-brand-accent/15 border-brand-accent text-brand-accent shadow-[0_0_10px_rgba(204,255,0,0.1)]'
                            : 'border-brand-border hover:bg-brand-bg/60 text-brand-dim hover:text-white'
                        }`}
                      >
                        {t.textureKraft}
                      </button>
                    </div>
                  </div>
                )}

                {/* Colors pickers for backgrounds */}
                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-brand-dim uppercase tracking-wider block">{lang === 'it' ? 'Colore 1' : 'Solid/Color 1'}</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={background.color1}
                        onChange={(e) => setBackground(prev => ({ ...prev, color1: e.target.value }))}
                        className="w-8 h-8 rounded border border-brand-border cursor-pointer overflow-hidden p-0 bg-transparent"
                      />
                      <span className="text-xs font-mono font-bold uppercase text-white">{background.color1}</span>
                    </div>
                  </div>

                  {(background.type === 'gradient' || (background.type === 'texture' && background.texturePattern === 'watercolor' || background.texturePattern === 'linen')) && (
                    <div className="space-y-1.5 animate-zoom-in">
                      <span className="text-[10px] font-bold text-brand-dim uppercase tracking-wider block">{lang === 'it' ? 'Colore 2' : 'Gradient End'}</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          type="color"
                          value={background.color2}
                          onChange={(e) => setBackground(prev => ({ ...prev, color2: e.target.value }))}
                          className="w-8 h-8 rounded border border-brand-border cursor-pointer overflow-hidden p-0 bg-transparent"
                        />
                        <span className="text-xs font-mono font-bold uppercase text-white">{background.color2}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Gradient direction angle */}
                {background.type === 'gradient' && (
                  <div className="space-y-1.5 animate-zoom-in">
                    <div className="flex justify-between text-[11px] uppercase font-bold tracking-wider">
                      <span className="text-brand-dim">{t.gradientAngle}</span>
                      <span className="font-mono text-white">{background.gradientAngle}°</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      step="45"
                      value={background.gradientAngle}
                      onChange={(e) => setBackground(prev => ({ ...prev, gradientAngle: parseInt(e.target.value) }))}
                      className="w-full accent-brand-accent bg-brand-border h-1 rounded cursor-pointer"
                    />
                  </div>
                )}
              </div>
            )}

            {/* List Layers Outline Stack (Always nice to show layers list in sidebar bottom) */}
            {layers.length > 0 && (
              <div className="border-t border-brand-border pt-5 space-y-3">
                <span className="text-[10px] font-extrabold text-brand-dim uppercase tracking-widest block flex items-center justify-between">
                  <span>{t.layers}</span>
                  <span className="stat-badge">{layers.length} {lang === 'it' ? 'ELEMENTI' : 'ELEMENTS'}</span>
                </span>
                
                <div className="space-y-1.5 max-h-40 overflow-y-auto divide-y divide-brand-border bg-brand-bg rounded p-2 border border-brand-border">
                  {layers.map(layer => {
                    const isSelected = layer.id === selectedLayerId;
                    return (
                      <div
                        key={layer.id}
                        onClick={() => {
                          setSelectedLayerId(layer.id);
                          setActiveTab('edit');
                        }}
                        className={`flex items-center justify-between p-2 rounded cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-brand-accent/15 border-l-2 border-brand-accent text-brand-accent'
                            : 'hover:bg-brand-accent/5 text-brand-dim hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {layer.type === 'text' && <Type size={12} />}
                          {layer.type === 'swash' && <TrendingUp size={12} />}
                          {layer.type === 'frame' && <Crop size={12} />}
                          {layer.type === 'sparkle' && <Sparkles size={12} />}
                          <span className="text-[11px] font-black uppercase font-mono max-w-[170px] truncate">
                            {layer.type === 'text' ? `Text: "${(layer as TextLayer).text}"` : layer.name}
                          </span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteLayer(layer.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 hover:opacity-100 p-0.5 rounded text-rose-500 hover:bg-rose-950/20 transition-all select-none"
                        >
                          <Trash2 size={11} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Guidelines info boxes at footer of Sidebar */}
          <div className="p-4 bg-brand-bg/50 border-t border-brand-border">
            <h5 className="text-[10px] font-extrabold text-brand-dim tracking-wider uppercase mb-1 flex items-center gap-1">
              <Settings size={12} className="text-brand-accent" /> {t.instructionsTitle}
            </h5>
            <p className="text-[10px] text-brand-dim leading-relaxed font-semibold">
              {t.instructionsText}
            </p>
          </div>
        </aside>

        {/* Right Area: Large Interactive Drawing Board */}
        <section className="lg:col-span-8 p-6 lg:p-10 bg-brand-bg flex flex-col justify-center items-center overflow-y-auto">
          <div className="w-full max-w-4xl space-y-6 flex flex-col items-center">
            
            {/* Quick Helper Tools panel */}
            <div className="w-full flex justify-between items-center bg-brand-panel px-5 py-3.5 rounded border border-brand-border shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-dim flex items-center gap-1.5 ml-1">
                <Grid size={14} className="text-brand-accent" />
                <span>{t.moveGuide}</span>
              </span>
              
              <div className="flex items-center gap-2">
                {selectedLayerId && (
                  <button
                    onClick={() => setSelectedLayerId(null)}
                    className="flex items-center gap-1 px-2.5 py-1 text-[10px] uppercase font-bold text-white hover:text-brand-accent bg-brand-bg border border-brand-border rounded transition-colors"
                  >
                    <span>{t.deselect}</span>
                  </button>
                )}
                <div className="h-4 w-[1px] bg-brand-border mx-1"></div>
                <span className="stat-badge">
                  {layers.length} Layers Active
                </span>
              </div>
            </div>

            {/* Drawing Target Canvas Component with custom physics shake wrapper */}
            <div className={`w-full transition-all duration-200 ${isShaking ? 'animate-shake' : ''}`}>
              <Canvas
                layers={layers}
                selectedLayerId={selectedLayerId}
                onSelectLayer={setSelectedLayerId}
                onUpdateLayerPosition={handleUpdateLayerPosition}
                background={background}
              />
            </div>

            {/* Quick visual feedback alert indicating it is editable online */}
            <div className="text-center">
              <p className="text-xs text-zinc-400 flex items-center justify-center gap-1.5 hover:text-zinc-500 transition-colors pointer-events-none">
                <Maximize2 size={12} />
                <span>Usa i controlli laterali di precisione per spessore, rotazione, scala e font.</span>
              </p>
            </div>
            
          </div>
        </section>
      </main>

      {/* 5. Render Export Modal if triggered */}
      {showExportModal && (
        <ExportModal
          layers={layers}
          background={background}
          lang={lang}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
}
