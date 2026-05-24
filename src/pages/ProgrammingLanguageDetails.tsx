import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, Code, Terminal, ChevronRight, Zap, Target, Play } from "lucide-react";
import { programmingLanguages } from "@/data/programmingLanguages";

const ProgrammingLanguageDetails = () => {
  const navigate = useNavigate();
  const { langId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const language = programmingLanguages.find(l => l.id === langId);

  if (!language) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Language not found</p>
          <Button onClick={() => navigate('/exam-prep/programming')} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep/programming')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">{language.name}</h1>
            <p className="text-xs text-muted-foreground">{language.paradigm.join(', ')}</p>
          </div>
          <span className="text-2xl">{language.icon}</span>
        </div>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start gap-1 px-4 py-2 h-auto bg-transparent border-b border-border rounded-none overflow-x-auto">
          <TabsTrigger value="overview" className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="topics" className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Topics
          </TabsTrigger>
          <TabsTrigger value="syntax" className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Syntax
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="px-4 py-4 space-y-4">
          <Card className={`bg-gradient-to-br ${language.color} text-white`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{language.icon}</span>
                <div>
                  <h2 className="text-xl font-bold">{language.name}</h2>
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    {language.difficulty}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-white/90">{language.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Hello World
              </CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                <code className="text-xs font-mono">{language.helloWorld}</code>
              </pre>
              <Button 
                className="w-full mt-3" 
                onClick={() => navigate('/exam-prep/programming/compiler', { state: { code: language.helloWorld, language: language.id } })}
              >
                <Play className="w-4 h-4 mr-2" /> Try in Compiler
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="w-4 h-4" /> Use Cases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {language.useCases.map((useCase, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {useCase}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Zap className="w-4 h-4" /> Paradigms
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {language.paradigm.map((p, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {p}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Topics Tab */}
        <TabsContent value="topics" className="px-4 py-4">
          <div className="space-y-2">
            {language.topics.map((topic, index) => (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-md transition-all"
                onClick={() => navigate(`/exam-prep/programming/${langId}/${topic.id}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{topic.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {topic.subtopics.slice(0, 3).join(' • ')}
                          {topic.subtopics.length > 3 && ` +${topic.subtopics.length - 3} more`}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Syntax Tab */}
        <TabsContent value="syntax" className="px-4 py-4 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Code className="w-4 h-4" /> Quick Reference
              </CardTitle>
              <CardDescription>Common syntax patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {language.syntax.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                  </div>
                  <pre className="bg-muted p-3 rounded-lg overflow-x-auto">
                    <code className="text-xs font-mono">{item.example}</code>
                  </pre>
                  <p className="text-xs text-muted-foreground">{item.explanation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button 
            className="w-full" 
            onClick={() => navigate('/exam-prep/programming/compiler')}
          >
            <Terminal className="w-4 h-4 mr-2" /> Open Code Compiler
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgrammingLanguageDetails;