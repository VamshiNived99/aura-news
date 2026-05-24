import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, BookOpen, GraduationCap, Users, Clock, Calculator, ChevronRight, Lightbulb, Target, Play, Zap } from "lucide-react";
import { competitiveExams } from "@/data/competitiveExams";

const CompetitiveExamDetails = () => {
  const navigate = useNavigate();
  const { examId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  const exam = competitiveExams.find(e => e.id === examId);

  if (!exam) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Exam not found</p>
          <Button onClick={() => navigate('/exam-prep/competitive')} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const totalTopics = exam.syllabus.reduce((acc, sub) => acc + sub.topics.length, 0);
  const totalMarks = exam.examPattern.reduce((acc, p) => acc + p.marks, 0);
  const totalQuestions = exam.examPattern.reduce((acc, p) => acc + p.questions, 0);

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep/competitive')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">{exam.name}</h1>
            <p className="text-xs text-muted-foreground">{exam.category}</p>
          </div>
          <span className="text-2xl">{exam.icon}</span>
        </div>
      </header>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start gap-1 px-4 py-2 h-auto bg-transparent border-b border-border rounded-none overflow-x-auto">
          <TabsTrigger value="overview" className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Overview
          </TabsTrigger>
          <TabsTrigger value="syllabus" className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Syllabus
          </TabsTrigger>
          <TabsTrigger value="formulas" className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Formulas
          </TabsTrigger>
          <TabsTrigger value="mock" className="text-xs px-3 py-1.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Mock Tests
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="px-4 py-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> About the Exam
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">{exam.overview}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold">Eligibility</span>
                </div>
                <p className="text-xs text-muted-foreground">{exam.eligibility}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold">Age Limit</span>
                </div>
                <p className="text-xs text-muted-foreground">{exam.ageLimit}</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Target className="w-4 h-4" /> Exam Pattern
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary">{totalQuestions}</div>
                  <div className="text-[10px] text-muted-foreground">Questions</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary">{totalMarks}</div>
                  <div className="text-[10px] text-muted-foreground">Total Marks</div>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg text-center">
                  <div className="text-xl font-bold text-primary">{exam.syllabus.length}</div>
                  <div className="text-[10px] text-muted-foreground">Subjects</div>
                </div>
              </div>
              <div className="space-y-2">
                {exam.examPattern.map((pattern, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{pattern.section}</p>
                      <p className="text-xs text-muted-foreground">
                        {pattern.questions} Questions • {pattern.marks} Marks
                      </p>
                    </div>
                    {pattern.duration && (
                      <Badge variant="outline" className="text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {pattern.duration}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips Section */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="w-4 h-4" /> Preparation Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {exam.tips.slice(0, 5).map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Syllabus Tab */}
        <TabsContent value="syllabus" className="px-4 py-4">
          <Accordion type="single" collapsible className="space-y-3">
            {exam.syllabus.map((subject, subjectIndex) => (
              <AccordionItem key={subjectIndex} value={`subject-${subjectIndex}`} className="border rounded-lg px-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-primary" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-semibold text-sm">{subject.subject}</h3>
                      <p className="text-xs text-muted-foreground">{subject.topics.length} Topics</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="space-y-2 pt-2">
                  {subject.topics.map((topic, topicIndex) => (
                    <Card 
                      key={topicIndex}
                      className="cursor-pointer hover:shadow-md transition-all"
                      onClick={() => navigate(`/exam-prep/competitive/${examId}/${topic.id}`)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-sm">{topic.name}</h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {topic.subtopics.slice(0, 3).join(' • ')}
                              {topic.subtopics.length > 3 && ` +${topic.subtopics.length - 3} more`}
                            </p>
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </TabsContent>

        {/* Formulas Tab */}
        <TabsContent value="formulas" className="px-4 py-4 space-y-4">
          {exam.importantFormulas && exam.importantFormulas.length > 0 ? (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calculator className="w-4 h-4" /> Important Formulas
                </CardTitle>
                <CardDescription>Quick reference for exam preparation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {exam.importantFormulas.map((formula, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{formula.name}</span>
                    </div>
                    <code className="text-primary font-mono text-sm block my-2 bg-background p-2 rounded">
                      {formula.formula}
                    </code>
                    <p className="text-xs text-muted-foreground">{formula.usage}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center p-8">
                <Calculator className="w-12 h-12 mx-auto mb-3 text-muted-foreground opacity-50" />
                <p className="text-sm text-muted-foreground">Formulas are shown in topic-wise content</p>
                <p className="text-xs text-muted-foreground mt-1">Navigate to syllabus and select a topic</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Mock Tests Tab */}
        <TabsContent value="mock" className="px-4 py-4 space-y-4">
          {/* Quick Mock Test */}
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  Quick AI Mock Test
                </CardTitle>
                <Badge variant="secondary">AI Powered</Badge>
              </div>
              <CardDescription>Generate a personalized practice test instantly</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => navigate(`/exam-prep/mock-test/quick?exam=${examId}&type=competitive&name=${encodeURIComponent(exam.name)}`)}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Quick Test
              </Button>
            </CardContent>
          </Card>

          {/* Subject-wise Mock Tests */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm px-1">Subject-wise Tests</h3>
            {exam.syllabus.map((subject, index) => (
              <Card 
                key={index} 
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => navigate(`/exam-prep/mock-test/quick?exam=${examId}&type=competitive&subject=${encodeURIComponent(subject.subject)}&name=${encodeURIComponent(exam.name + ' - ' + subject.subject)}`)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{subject.subject}</h4>
                        <p className="text-xs text-muted-foreground">{subject.topics.length} topics covered</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="w-3 h-3 mr-1" />
                      Start
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Study Strategy */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-semibold text-sm mb-2">📚 Study Strategy</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Start with NCERT and standard textbooks</li>
                <li>• Practice previous years' papers daily</li>
                <li>• Take mock tests under exam conditions</li>
                <li>• Revise formulas and concepts regularly</li>
                <li>• Focus on weak areas but don't neglect strengths</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompetitiveExamDetails;
