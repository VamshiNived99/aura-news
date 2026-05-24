import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, CheckCircle, XCircle, Lightbulb, Terminal, Play, Copy, Check, AlertTriangle, BookOpen, RefreshCw } from "lucide-react";
import { programmingLanguages } from "@/data/programmingLanguages";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ContentData {
  title: string;
  introduction: string;
  diagram?: { title: string; imageUrl: string; description: string };
  concepts: any[];
  codeExamples: any[];
  practiceProblems: any[];
  commonMistakes: any[];
  summary: string;
  nextSteps: string[];
}

const ProgrammingContent = () => {
  const navigate = useNavigate();
  const { langId, topicId } = useParams();
  const [searchParams] = useSearchParams();
  const subtopic = searchParams.get('subtopic') || '';
  
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<{ [key: number]: boolean }>({});

  const language = programmingLanguages.find(l => l.id === langId);
  const topic = language?.topics.find(t => t.id === topicId);

  const fetchContent = async () => {
    if (!subtopic || !topic || !language) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-programming-content', {
        body: {
          topic: subtopic,
          language: language.name,
          category: topic.name
        }
      });

      if (fnError) throw fnError;
      setContent(data);
    } catch (err: any) {
      console.error('Error fetching content:', err);
      setError(err.message || 'Failed to load content');
      toast.error('Failed to load content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, [subtopic, topic, language]);

  const copyCode = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      toast.success('Code copied!');
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const runInCompiler = (code: string) => {
    navigate('/exam-prep/programming/compiler', { 
      state: { code, language: langId } 
    });
  };

  if (!language || !topic) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Content not found</p>
          <Button onClick={() => navigate(-1)} className="mt-4">Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold line-clamp-1">{subtopic}</h1>
            <p className="text-xs text-muted-foreground">{language.name} • {topic.name}</p>
          </div>
          <span className="text-xl">{language.icon}</span>
          {!loading && (
            <Button variant="ghost" size="icon" onClick={fetchContent}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4 space-y-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">Generating AI content...</p>
            <p className="text-muted-foreground text-xs">This may take a moment</p>
          </div>
        ) : error ? (
          <Card>
            <CardContent className="p-6 text-center">
              <XCircle className="w-12 h-12 mx-auto mb-3 text-destructive" />
              <p className="text-destructive">{error}</p>
              <Button onClick={fetchContent} className="mt-4">
                <RefreshCw className="w-4 h-4 mr-2" /> Retry
              </Button>
            </CardContent>
          </Card>
        ) : content ? (
          <>
            {/* Introduction */}
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> {content.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{content.introduction}</p>
              </CardContent>
            </Card>

            {/* Open Compiler Button */}
            <Button 
              className="w-full gap-2" 
              onClick={() => navigate('/exam-prep/programming/compiler', { state: { language: langId } })}
            >
              <Terminal className="w-4 h-4" /> Open Code Compiler
            </Button>

            {/* Concepts */}
            {content.concepts && content.concepts.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Code className="w-4 h-4" /> Key Concepts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.concepts.map((concept: any, index: number) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg space-y-2">
                      <h4 className="font-semibold text-sm">{concept.name}</h4>
                      <p className="text-xs text-muted-foreground">{concept.explanation}</p>
                      {concept.syntax && (
                        <pre className="bg-background p-2 rounded text-xs font-mono overflow-x-auto">
                          <code>{concept.syntax}</code>
                        </pre>
                      )}
                      {concept.keyPoints && concept.keyPoints.length > 0 && (
                        <ul className="space-y-1 mt-2">
                          {concept.keyPoints.map((point: string, i: number) => (
                            <li key={i} className="text-xs flex items-start gap-2">
                              <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Code Examples */}
            {content.codeExamples && content.codeExamples.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Code Examples
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.codeExamples.map((example: any, index: number) => (
                    <div key={index} className="border border-border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 px-3 py-2 flex items-center justify-between border-b border-border">
                        <div>
                          <h5 className="font-semibold text-sm">{example.title}</h5>
                          <p className="text-xs text-muted-foreground">{example.description}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" onClick={() => copyCode(example.code, index)}>
                            {copiedIndex === index ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => runInCompiler(example.code)}>
                            <Play className="w-3 h-3 mr-1" /> Run
                          </Button>
                        </div>
                      </div>
                      <pre className="p-3 overflow-x-auto bg-background">
                        <code className="text-xs font-mono">{example.code}</code>
                      </pre>
                      {example.output && (
                        <div className="bg-muted/30 px-3 py-2 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-1">Output:</p>
                          <pre className="text-xs font-mono text-primary">{example.output}</pre>
                        </div>
                      )}
                      {example.explanation && (
                        <div className="px-3 py-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">{example.explanation}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Practice Problems */}
            {content.practiceProblems && content.practiceProblems.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" /> Practice Problems
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {content.practiceProblems.map((problem: any, index: number) => (
                    <div key={index} className="p-3 bg-muted/30 rounded-lg space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-semibold text-sm">{problem.title}</h5>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] ${
                            problem.difficulty === 'easy' ? 'border-green-500 text-green-600' :
                            problem.difficulty === 'hard' ? 'border-red-500 text-red-600' :
                            'border-yellow-500 text-yellow-600'
                          }`}
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-sm">{problem.problem}</p>
                      
                      <div className="bg-yellow-500/10 p-2 rounded-lg">
                        <p className="text-xs flex items-start gap-2">
                          <Lightbulb className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Hint:</strong> {problem.hint}</span>
                        </p>
                      </div>

                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowSolution(prev => ({ ...prev, [index]: !prev[index] }))}
                      >
                        {showSolution[index] ? 'Hide Solution' : 'Show Solution'}
                      </Button>

                      {showSolution[index] && (
                        <div className="space-y-2">
                          <div className="border border-border rounded-lg overflow-hidden">
                            <div className="bg-muted/50 px-3 py-2 flex items-center justify-between border-b border-border">
                              <span className="text-xs font-medium">Solution</span>
                              <Button size="sm" variant="outline" onClick={() => runInCompiler(problem.solution)}>
                                <Play className="w-3 h-3 mr-1" /> Run
                              </Button>
                            </div>
                            <pre className="p-3 overflow-x-auto bg-background">
                              <code className="text-xs font-mono">{problem.solution}</code>
                            </pre>
                            {problem.output && (
                              <div className="bg-muted/30 px-3 py-2 border-t border-border">
                                <p className="text-xs text-muted-foreground mb-1">Output:</p>
                                <pre className="text-xs font-mono text-primary">{problem.output}</pre>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Common Mistakes */}
            {content.commonMistakes && content.commonMistakes.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600" /> Common Mistakes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {content.commonMistakes.map((item: any, index: number) => (
                    <div key={index} className="p-3 bg-red-500/5 border border-red-500/20 rounded-lg space-y-2">
                      <div className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-red-600">Wrong:</p>
                          <p className="text-xs">{item.mistake}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-green-600">Correct:</p>
                          <p className="text-xs">{item.correct}</p>
                        </div>
                      </div>
                      {item.example && (
                        <pre className="bg-background p-2 rounded text-xs font-mono overflow-x-auto mt-2">
                          <code>{item.example}</code>
                        </pre>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Summary */}
            {content.summary && (
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{content.summary}</p>
                </CardContent>
              </Card>
            )}

            {/* Next Steps */}
            {content.nextSteps && content.nextSteps.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {content.nextSteps.map((step: string, index: number) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <span className="text-primary font-bold">{index + 1}.</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ProgrammingContent;
