import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, SearchX, Zap, Monitor, Cpu, Heart, History } from 'lucide-react';
import { GAMES, Game } from '../constants';
import { GameCard } from '../components/GameComponents';

export default function Library({ 
  favorites, 
  recentlyPlayed,
  toggleFavorite, 
  setViewingGame, 
  handleDownload 
}: { 
  favorites: string[]; 
  recentlyPlayed: string[];
  toggleFavorite: (id: string, e: React.MouseEvent) => void; 
  setViewingGame: (game: Game) => void; 
  handleDownload: (game: Game) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredGames = GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         game.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-cyan-500/10 blur-[100px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <Zap className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">New Games Added Weekly</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-7xl md:text-8xl font-bold mb-8 tracking-tighter leading-[0.9]"
          >
            Your Ultimate <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Game Vault</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Discover, play, and download the finest collection of web-based games and AppImages. Secure, fast, and curated for the ultimate experience.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-12 text-white/20"
          >
            <div className="flex items-center gap-3">
              <Monitor className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Web Native</span>
            </div>
            <div className="flex items-center gap-3">
              <Cpu className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">High Performance</span>
            </div>
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-widest">Curated Library</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Your Favorites</h2>
              <p className="text-sm text-white/40">Quick access to the games you love.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {GAMES.filter(g => favorites.includes(g.id)).map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                isFavorite={true} 
                onToggleFavorite={toggleFavorite} 
                onViewDetails={setViewingGame} 
                onDownload={handleDownload}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Played Section */}
      {recentlyPlayed.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <History className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Recently Played</h2>
              <p className="text-sm text-white/40">Pick up right where you left off.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentlyPlayed.map(id => {
              const game = GAMES.find(g => g.id === id);
              if (!game) return null;
              return (
                <GameCard 
                  key={game.id} 
                  game={game} 
                  isFavorite={favorites.includes(game.id)} 
                  onToggleFavorite={toggleFavorite} 
                  onViewDetails={setViewingGame} 
                  onDownload={handleDownload}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Game Grid */}
      <main id="games" className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Games</h2>
            <p className="text-white/40">Hand-picked experiences for every player.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {/* Animated Search Bar */}
            <motion.div 
              initial={false}
              animate={{ width: searchQuery ? 240 : 44 }}
              whileHover={{ width: 240 }}
              className="relative h-10 bg-white/5 border border-white/10 rounded-full overflow-hidden flex items-center group focus-within:border-emerald-500/50 focus-within:bg-white/10 transition-all shadow-xl"
            >
              <div className="absolute left-0 w-11 h-10 flex items-center justify-center shrink-0 pointer-events-none">
                <Search className="w-4 h-4 text-white/20 group-hover:text-emerald-400 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input 
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none py-2 pl-11 pr-4 text-sm focus:outline-none placeholder:text-white/10 text-white"
              />
            </motion.div>

            <div className="flex gap-2">
              {['All', 'Arcade', 'Puzzle', 'Action'].map(cat => (
                <button 
                  key={cat} 
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    selectedCategory === cat 
                      ? 'bg-emerald-500 border-emerald-500 text-black' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGames.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="col-span-full py-32 flex flex-col items-center justify-center text-center"
            >
              <div className="relative mb-8">
                <div className="w-32 h-32 rounded-[3rem] bg-white/5 border border-white/10 flex items-center justify-center relative z-10">
                  <SearchX className="w-12 h-12 text-white/20" />
                </div>
                <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full -z-0" />
              </div>
              <h3 className="text-3xl font-bold mb-3 tracking-tight">No games found</h3>
              <p className="text-white/30 max-w-md mx-auto leading-relaxed">
                We couldn't find any results for <span className="text-white font-bold">"{searchQuery}"</span> 
                {selectedCategory !== 'All' && <> in the <span className="text-emerald-400 font-bold">{selectedCategory}</span> category</>}. 
                Try adjusting your keywords or clearing filters.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-10 px-10 py-4 rounded-full bg-emerald-500 text-black text-sm font-bold hover:bg-emerald-400 transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
              >
                Reset all filters
              </button>
            </motion.div>
          ) : (
            filteredGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                isFavorite={favorites.includes(game.id)} 
                onToggleFavorite={toggleFavorite} 
                onViewDetails={setViewingGame} 
                onDownload={handleDownload}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}
