import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Brain, Cpu, Network, Bot, Layers, Binary, ChevronRight, Sparkles, Loader2, Code, CheckCircle, XCircle, Eye, EyeOff, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AITopic {
  id: string;
  title: string;
  description: string;
  icon: any;
  subtopics: string[];
}

const aiTopics: AITopic[] = [
  {
    id: 'ml-fundamentals',
    title: 'Machine Learning Fundamentals',
    description: 'Core concepts of supervised, unsupervised & reinforcement learning',
    icon: Brain,
    subtopics: ['Linear Regression', 'Logistic Regression', 'Decision Trees', 'Random Forest', 'SVM', 'K-Means Clustering', 'PCA', 'Gradient Descent', 'Naive Bayes', 'KNN Algorithm']
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning',
    description: 'Neural networks, CNNs, RNNs, Transformers & more',
    icon: Network,
    subtopics: ['Perceptrons', 'Activation Functions', 'Backpropagation', 'CNNs', 'RNNs', 'LSTMs', 'Attention Mechanism', 'Transformers', 'GANs', 'Autoencoders', 'Batch Normalization', 'Dropout']
  },
  {
    id: 'nlp',
    title: 'Natural Language Processing',
    description: 'Text processing, embeddings, LLMs & chatbots',
    icon: Bot,
    subtopics: ['Tokenization', 'Word Embeddings', 'Word2Vec', 'BERT', 'GPT', 'Sentiment Analysis', 'Named Entity Recognition', 'Text Classification', 'Language Models', 'TF-IDF', 'Seq2Seq Models']
  },
  {
    id: 'computer-vision',
    title: 'Computer Vision',
    description: 'Image recognition, object detection & segmentation',
    icon: Layers,
    subtopics: ['Image Processing', 'Feature Extraction', 'Object Detection', 'YOLO', 'Image Segmentation', 'Face Recognition', 'Pose Estimation', 'OCR', 'Image Augmentation', 'Transfer Learning']
  },
  {
    id: 'ai-math',
    title: 'Mathematics for AI',
    description: 'Linear algebra, calculus, probability & statistics',
    icon: Binary,
    subtopics: ['Linear Algebra', 'Matrix Operations', 'Calculus', 'Probability Theory', 'Bayes Theorem', 'Statistics', 'Optimization', 'Information Theory', 'Eigenvalues', 'Gradient Computation']
  },
  {
    id: 'mlops',
    title: 'MLOps & Deployment',
    description: 'Model deployment, monitoring & production systems',
    icon: Cpu,
    subtopics: ['Model Serialization', 'Docker for ML', 'Kubernetes', 'Model Serving', 'A/B Testing', 'Model Monitoring', 'Feature Stores', 'ML Pipelines', 'Flask/FastAPI', 'Cloud Deployment']
  }
];

// Python code examples for each topic
const pythonExamples: Record<string, { title: string; code: string; explanation: string }[]> = {
  'Linear Regression': [
    {
      title: 'Simple Linear Regression from Scratch',
      code: `import numpy as np
import matplotlib.pyplot as plt

# Generate sample data
np.random.seed(42)
X = 2 * np.random.rand(100, 1)
y = 4 + 3 * X + np.random.randn(100, 1)

# Add bias term
X_b = np.c_[np.ones((100, 1)), X]

# Normal equation: theta = (X^T * X)^(-1) * X^T * y
theta_best = np.linalg.inv(X_b.T.dot(X_b)).dot(X_b.T).dot(y)

print(f"Intercept: {theta_best[0][0]:.4f}")
print(f"Slope: {theta_best[1][0]:.4f}")

# Predictions
X_new = np.array([[0], [2]])
X_new_b = np.c_[np.ones((2, 1)), X_new]
y_predict = X_new_b.dot(theta_best)
print(f"Predictions: {y_predict.flatten()}")`,
      explanation: 'This example implements Linear Regression using the Normal Equation. We generate synthetic data, calculate optimal weights using matrix operations, and make predictions.'
    },
    {
      title: 'Using Scikit-Learn',
      code: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Generate data
X = np.random.rand(100, 1) * 10
y = 2.5 * X.flatten() + np.random.randn(100) * 2

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Evaluate
print(f"Coefficient: {model.coef_[0]:.4f}")
print(f"Intercept: {model.intercept_:.4f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.4f}")
print(f"R² Score: {r2_score(y_test, y_pred):.4f}")`,
      explanation: 'Production-ready example using Scikit-Learn with proper train/test split and evaluation metrics.'
    }
  ],
  'CNNs': [
    {
      title: 'CNN for Image Classification (PyTorch)',
      code: `import torch
import torch.nn as nn
import torch.optim as optim

class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super(CNN, self).__init__()
        self.conv_layers = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2, 2),
        )
        self.fc_layers = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 4 * 4, 512),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(512, num_classes)
        )
    
    def forward(self, x):
        x = self.conv_layers(x)
        x = self.fc_layers(x)
        return x

# Initialize model
model = CNN(num_classes=10)
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop (pseudo)
# for epoch in range(epochs):
#     for images, labels in train_loader:
#         optimizer.zero_grad()
#         outputs = model(images)
#         loss = criterion(outputs, labels)
#         loss.backward()
#         optimizer.step()

print(model)`,
      explanation: 'Complete CNN architecture in PyTorch for image classification with convolutional layers, pooling, and fully connected layers.'
    }
  ],
  'Transformers': [
    {
      title: 'Self-Attention Mechanism',
      code: `import torch
import torch.nn as nn
import math

class SelfAttention(nn.Module):
    def __init__(self, embed_size, heads):
        super(SelfAttention, self).__init__()
        self.embed_size = embed_size
        self.heads = heads
        self.head_dim = embed_size // heads
        
        assert (self.head_dim * heads == embed_size), "Embed size must be divisible by heads"
        
        self.values = nn.Linear(embed_size, embed_size)
        self.keys = nn.Linear(embed_size, embed_size)
        self.queries = nn.Linear(embed_size, embed_size)
        self.fc_out = nn.Linear(embed_size, embed_size)
        
    def forward(self, values, keys, query, mask=None):
        N = query.shape[0]
        value_len, key_len, query_len = values.shape[1], keys.shape[1], query.shape[1]
        
        # Split embedding into self.heads pieces
        values = self.values(values).reshape(N, value_len, self.heads, self.head_dim)
        keys = self.keys(keys).reshape(N, key_len, self.heads, self.head_dim)
        queries = self.queries(query).reshape(N, query_len, self.heads, self.head_dim)
        
        # Scaled dot-product attention
        energy = torch.einsum("nqhd,nkhd->nhqk", [queries, keys])
        
        if mask is not None:
            energy = energy.masked_fill(mask == 0, float("-1e20"))
        
        attention = torch.softmax(energy / math.sqrt(self.head_dim), dim=3)
        
        out = torch.einsum("nhql,nlhd->nqhd", [attention, values])
        out = out.reshape(N, query_len, self.embed_size)
        
        return self.fc_out(out)

# Usage
attention = SelfAttention(embed_size=256, heads=8)
x = torch.randn(32, 10, 256)  # batch, seq_len, embed_size
output = attention(x, x, x)
print(f"Output shape: {output.shape}")`,
      explanation: 'Implementation of multi-head self-attention - the core mechanism behind Transformers used in BERT, GPT, and other modern NLP models.'
    }
  ]
};

const AIPrepHome = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState<AITopic | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [generatingContent, setGeneratingContent] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [showAnswers, setShowAnswers] = useState<Record<number, boolean>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});

  const handleTopicClick = (topic: AITopic) => {
    setSelectedTopic(topic);
    setGeneratedContent(null);
    setSelectedSubtopic(null);
  };

  const handleSubtopicClick = async (subtopic: string) => {
    if (!selectedTopic) return;
    
    setSelectedSubtopic(subtopic);
    setGeneratingContent(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-topic-content', {
        body: {
          topic: subtopic,
          subject: selectedTopic.title,
          unit: 'AI Preparation',
          context: 'AI/ML Interview Preparation with Python code examples'
        }
      });

      if (error) throw error;
      setGeneratedContent(data);
    } catch (error) {
      console.error('Error generating content:', error);
      toast({
        title: "Error",
        description: "Failed to generate content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setGeneratingContent(false);
    }
  };


  const toggleAnswer = (index: number) => {
    setShowAnswers(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const selectAnswer = (qIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [qIndex]: answer }));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({ title: "Code copied to clipboard!" });
  };

  const getPythonExamples = (subtopic: string) => {
    return pythonExamples[subtopic] || [];
  };

  if (generatedContent && selectedSubtopic) {
    const examples = getPythonExamples(selectedSubtopic);
    
    return (
      <div className="min-h-[100dvh] w-full bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button variant="ghost" size="icon" onClick={() => setGeneratedContent(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">{generatedContent.title}</h1>
              <p className="text-xs text-muted-foreground">{selectedTopic?.title}</p>
            </div>
          </div>
        </header>

        <div className="px-4 py-4 space-y-6">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-500" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{generatedContent.introduction}</p>
            </CardContent>
          </Card>

          {/* Python Code Examples */}
          {examples.length > 0 && (
            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Code className="w-4 h-4 text-green-500" />
                  Python Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {examples.map((example, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{example.title}</h4>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => copyCode(example.code)}
                        className="h-7 px-2"
                      >
                        <Copy className="w-3 h-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                    <pre className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                    <p className="text-xs text-muted-foreground">{example.explanation}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Sections */}
          {generatedContent.sections?.map((section: any, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">{section.heading}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm">{section.content}</p>
                
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Points:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {section.keyPoints.map((point: string, i: number) => (
                        <li key={i} className="text-sm text-muted-foreground">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Section Examples */}
                {section.examples && section.examples.length > 0 && (
                  <div className="space-y-3 mt-4">
                    <p className="text-sm font-medium text-primary">Worked Examples:</p>
                    {section.examples.map((ex: any, i: number) => (
                      <div key={i} className="p-3 bg-secondary/30 rounded-lg space-y-2 border-l-4 border-primary">
                        <p className="text-sm font-medium">{ex.title || `Example ${i + 1}`}</p>
                        {ex.problem && <p className="text-sm text-muted-foreground"><strong>Problem:</strong> {ex.problem}</p>}
                        {ex.solution && <p className="text-sm"><strong>Solution:</strong> {ex.solution}</p>}
                        {ex.answer && <p className="text-sm text-primary font-medium"><strong>Answer:</strong> {ex.answer}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {/* Formulas */}
          {generatedContent.formulas && generatedContent.formulas.length > 0 && (
            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Binary className="w-4 h-4 text-blue-500" />
                  Important Formulas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {generatedContent.formulas.map((formula: any, i: number) => (
                  <div key={i} className="p-3 bg-background/50 rounded-lg">
                    <p className="font-medium text-sm">{formula.name}</p>
                    <p className="font-mono text-primary my-1">{formula.expression}</p>
                    <p className="text-xs text-muted-foreground">{formula.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Summary */}
          {generatedContent.summary && (
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="text-base">Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{generatedContent.summary}</p>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          {generatedContent.tips && generatedContent.tips.length > 0 && (
            <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  Pro Tips & Tricks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {generatedContent.tips.map((tip: string, i: number) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-yellow-500">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Practice Questions */}
          {generatedContent.practiceQuestions && generatedContent.practiceQuestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Brain className="w-4 h-4 text-primary" />
                  Practice Questions ({generatedContent.practiceQuestions.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {generatedContent.practiceQuestions.map((q: any, index: number) => {
                  const options = Array.isArray(q.options) ? q.options : 
                    (typeof q.options === 'object' && q.options !== null) ? 
                    Object.entries(q.options).map(([key, value]) => `${key}. ${value}`) : [];
                  
                  const isAnswered = selectedAnswers[index] !== undefined;
                  const isCorrect = selectedAnswers[index] === q.correctAnswer;
                  
                  return (
                    <div key={index} className="p-4 bg-secondary/50 rounded-lg space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium flex-1">
                          Q{index + 1}: {q.question}
                        </p>
                        {q.type && (
                          <Badge variant={q.type === 'hard' ? 'destructive' : q.type === 'medium' ? 'default' : 'secondary'}>
                            {q.type}
                          </Badge>
                        )}
                      </div>
                      
                      {options.length > 0 && (
                        <div className="space-y-2 pl-2">
                          {options.map((opt: string, i: number) => {
                            const optionLetter = typeof q.options === 'object' && !Array.isArray(q.options) 
                              ? Object.keys(q.options)[i] 
                              : String.fromCharCode(65 + i);
                            const isSelected = selectedAnswers[index] === optionLetter;
                            const isCorrectOption = optionLetter === q.correctAnswer && showAnswers[index];
                            
                            return (
                              <button
                                key={i}
                                onClick={() => !showAnswers[index] && selectAnswer(index, optionLetter)}
                                disabled={showAnswers[index]}
                                className={`w-full text-left p-2 rounded-lg text-sm transition-all ${
                                  isCorrectOption ? 'bg-green-500/20 border border-green-500' :
                                  isSelected && showAnswers[index] && !isCorrect ? 'bg-red-500/20 border border-red-500' :
                                  isSelected ? 'bg-primary/20 border border-primary' :
                                  'bg-background/50 hover:bg-background/80'
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  {showAnswers[index] && isCorrectOption && <CheckCircle className="w-4 h-4 text-green-500" />}
                                  {showAnswers[index] && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
                                  {opt}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleAnswer(index)}
                          className="text-xs"
                        >
                          {showAnswers[index] ? <EyeOff className="w-3 h-3 mr-1" /> : <Eye className="w-3 h-3 mr-1" />}
                          {showAnswers[index] ? 'Hide' : 'Show'} Answer
                        </Button>
                      </div>
                      
                      {showAnswers[index] && (
                        <div className="mt-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                          <p className="text-sm font-medium text-green-600">
                            Correct Answer: {q.correctAnswer}
                          </p>
                          {q.explanation && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {q.explanation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>

      </div>
    );
  }

  if (selectedTopic) {
    return (
      <div className="min-h-[100dvh] w-full bg-background pb-24">
        <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Button variant="ghost" size="icon" onClick={() => setSelectedTopic(null)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-bold">{selectedTopic.title}</h1>
              <p className="text-xs text-muted-foreground">{selectedTopic.subtopics.length} Topics</p>
            </div>
          </div>
        </header>

        <div className="px-4 py-4 space-y-3">
          {selectedTopic.subtopics.map((subtopic, index) => (
            <Card 
              key={index}
              className="cursor-pointer hover:shadow-md transition-all"
              onClick={() => handleSubtopicClick(subtopic)}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                    {index + 1}
                  </div>
                  <div>
                    <span className="font-medium">{subtopic}</span>
                    {pythonExamples[subtopic] && (
                      <Badge variant="secondary" className="ml-2 text-[10px]">
                        <Code className="w-3 h-3 mr-1" />
                        Python
                      </Badge>
                    )}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Loading State with Ad */}
        {generatingContent && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="text-center space-y-4">
              <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
              <div>
                <p className="font-medium">Loading Content</p>
                <p className="text-sm text-muted-foreground">AI is generating your study material...</p>
              </div>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] w-full bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/exam-prep')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-500" />
              AI Preparation
            </h1>
            <p className="text-xs text-muted-foreground">Master AI/ML concepts & interviews</p>
          </div>
        </div>
      </header>

      {/* Quick Test Card */}
      <div className="px-4 py-4">
        <Card className="bg-gradient-to-br from-pink-500/20 to-rose-500/20 border-pink-500/30">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Brain className="w-5 h-5 text-pink-500" />
                <span className="font-semibold">AI/ML Quiz</span>
                <Badge className="bg-pink-500 text-white text-[10px]">AI Powered</Badge>
              </div>
              <p className="text-xs text-muted-foreground">Test your AI knowledge</p>
            </div>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white"
              onClick={() => navigate('/exam-prep/mock-test/quick?category=ai')}
            >
              Start Test
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Topics */}
      <div className="px-4 space-y-3">
        {aiTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card
              key={topic.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300"
              onClick={() => handleTopicClick(topic)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20">
                    <Icon className="w-5 h-5 text-pink-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{topic.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">{topic.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {topic.subtopics.slice(0, 4).map((sub, i) => (
                        <Badge key={i} variant="secondary" className="text-[10px]">
                          {sub}
                        </Badge>
                      ))}
                      {topic.subtopics.length > 4 && (
                        <Badge variant="outline" className="text-[10px]">
                          +{topic.subtopics.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Interview Tips */}
      <div className="px-4 mt-6">
        <Card className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border-violet-500/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-500" />
              AI Interview Tips
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">• Explain concepts clearly with examples</p>
            <p className="text-sm text-muted-foreground">• Know the math behind algorithms</p>
            <p className="text-sm text-muted-foreground">• Practice coding ML from scratch</p>
            <p className="text-sm text-muted-foreground">• Understand model evaluation metrics</p>
            <p className="text-sm text-muted-foreground">• Be ready to discuss recent AI papers</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIPrepHome;