import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, BookOpen, GraduationCap, ChevronRight, Search, Bookmark, Clock, X } from "lucide-react";
import { ncertClasses, getBookmarks, getRecentlyViewed, SavedChapter } from "@/data/ncert";
import { motion } from "framer-motion";

const NCERTHome = () => {
  const navigate = useNavigate();
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const currentClass = ncertClasses.find(c => c.class === selectedClass);
  const currentSubject = currentClass?.subjects.find(s => s.id === selectedSubject);

  const bookmarks = useMemo(() => getBookmarks(), [selectedClass]);
  const recentlyViewed = useMemo(() => getRecentlyViewed(), [selectedClass]);

  const filteredChapters = useMemo(() => {
    if (!currentSubject) return [];
    if (!search.trim()) return currentSubject.chapters;
    const q = search.toLowerCase();
    return currentSubject.chapters.filter(ch => ch.title.toLowerCase().includes(q));
  }, [currentSubject, search]);

  const openChapter = (ch: { title: string; pdfUrl: string }, subject: string, subjectId: string, classNum: number) => {
    const params = new URLSearchParams({
      pdf: ch.pdfUrl, title: ch.title,
      subject, subjectId, class: String(classNum)
    });
    navigate(`/exam-prep/ncert/viewer?${params.toString()}`);
  };

  const openSaved = (saved: SavedChapter) => {
    const params = new URLSearchParams({
      pdf: saved.pdfUrl, title: saved.chapterTitle,
      subject: saved.subjectName, subjectId: saved.subjectId, class: String(saved.classNum)
    });
    navigate(`/exam-prep/ncert/viewer?${params.toString()}`);
  };

  const getSubjectIcon = (id: string) => {
    const icons: Record<string, string> = {
      maths: '📐', science: '🔬', physics: '⚡', chemistry: '🧪',
      biology: '🧬', social: '🌍', english: '📖', hindi: '🔤'
    };
    return icons[id] || '📚';
  };

  const getSubjectColor = (id: string) => {
    const colors: Record<string, string> = {
      maths: 'from-blue-500 to-indigo-500', science: 'from-green-500 to-emerald-500',
      physics: 'from-yellow-500 to-orange-500', chemistry: 'from-purple-500 to-violet-500',
      biology: 'from-pink-500 to-rose-500', social: 'from-purple-500 to-violet-500',
      english: 'from-cyan-500 to-blue-500', hindi: 'from-red-500 to-orange-500'
    };
    return colors[id] || 'from-gray-500 to-slate-500';
  };

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => {
            if (selectedSubject) { setSelectedSubject(null); setSearch(""); }
            else if (selectedClass) setSelectedClass(null);
            else navigate(-1);
          }}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              NCERT Books
            </h1>
            <p className="text-xs text-muted-foreground">
              {selectedSubject ? `${currentSubject?.name} - Class ${selectedClass}` :
                selectedClass ? `Class ${selectedClass} Subjects` :
                'Classes 6–12 (NCERT)'}
            </p>
          </div>
        </div>
      </header>

      <main className="w-full px-4 py-4">
        {/* Home: Recently Viewed + Bookmarks + Class Grid */}
        {!selectedClass && (
          <>
            {recentlyViewed.length > 0 && (
              <div className="mb-5">
                <h2 className="font-semibold text-sm flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary" /> Recently Viewed
                </h2>
                <div className="space-y-2">
                  {recentlyViewed.map((item, i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-all" onClick={() => openSaved(item)}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{item.classNum}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.chapterTitle}</p>
                          <p className="text-[10px] text-muted-foreground">{item.subjectName} • Class {item.classNum}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {bookmarks.length > 0 && (
              <div className="mb-5">
                <h2 className="font-semibold text-sm flex items-center gap-2 mb-3">
                  <Bookmark className="w-4 h-4 text-primary" /> Saved Chapters
                </h2>
                <div className="space-y-2">
                  {bookmarks.slice(0, 3).map((item, i) => (
                    <Card key={i} className="cursor-pointer hover:shadow-md transition-all" onClick={() => openSaved(item)}>
                      <CardContent className="p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">{item.classNum}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.chapterTitle}</p>
                          <p className="text-[10px] text-muted-foreground">{item.subjectName} • Class {item.classNum}</p>
                        </div>
                        <BookOpen className="w-4 h-4 text-muted-foreground shrink-0" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <h2 className="font-semibold text-lg mb-4">Select Class</h2>
            <div className="grid grid-cols-2 gap-3">
              {ncertClasses.map((classItem, index) => (
                <motion.div key={classItem.class} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                  <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1" onClick={() => setSelectedClass(classItem.class)}>
                    <CardContent className="p-4 text-center">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg">
                        <span className="text-2xl font-bold text-primary-foreground">{classItem.class}</span>
                      </div>
                      <h3 className="font-semibold">Class {classItem.class}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{classItem.subjects.length} Subjects</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* Subjects */}
        {selectedClass && !selectedSubject && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Class {selectedClass} Subjects</h2>
              <Badge variant="secondary">NCERT</Badge>
            </div>
            {currentClass?.subjects.map((subject, index) => (
              <motion.div key={subject.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
                <Card className="cursor-pointer hover:shadow-lg transition-all duration-300" onClick={() => setSelectedSubject(subject.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getSubjectColor(subject.id)} flex items-center justify-center shadow-md`}>
                        <span className="text-xl">{getSubjectIcon(subject.id)}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{subject.name}</h3>
                        <p className="text-xs text-muted-foreground">{subject.chapters.length} Chapters</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Chapters */}
        {selectedSubject && currentSubject && (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-semibold text-lg">{currentSubject.name}</h2>
                <p className="text-xs text-muted-foreground">Class {selectedClass} • NCERT</p>
              </div>
              <Badge variant="secondary">{currentSubject.chapters.length} Chapters</Badge>
            </div>

            {/* Search */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search chapters..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9 pr-8 h-9 text-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              )}
            </div>

            <div className="space-y-2">
              {filteredChapters.map((chapter, index) => {
                const globalIndex = currentSubject.chapters.indexOf(chapter);
                return (
                  <motion.div key={index} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    <Card
                      className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all duration-200"
                      onClick={() => openChapter(chapter, currentSubject.name, currentSubject.id, selectedClass!)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                            {globalIndex + 1}
                          </div>
                          <span className="flex-1 text-sm font-medium">{chapter.title}</span>
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
              {filteredChapters.length === 0 && search && (
                <p className="text-center text-sm text-muted-foreground py-8">No chapters match "{search}"</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NCERTHome;
