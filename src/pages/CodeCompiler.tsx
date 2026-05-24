import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Loader2, RotateCcw, Copy, Check, Terminal, Code } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const languages = [
  { id: 'python', name: 'Python', icon: '🐍', version: '3.10' },
  { id: 'javascript', name: 'JavaScript', icon: '🟨', version: 'Node 18' },
  { id: 'java', name: 'Java', icon: '☕', version: '17' },
  { id: 'cpp', name: 'C++', icon: '⚡', version: '17' },
  { id: 'c', name: 'C', icon: '🔧', version: 'GCC 11' },
];

const defaultCode: Record<string, string> = {
  python: `# Python - Hello World
print("Hello, World!")

# Variables
name = "Student"
age = 20
print(f"Name: {name}, Age: {age}")

# Loop example
for i in range(1, 6):
    print(f"Count: {i}")`,

  javascript: `// JavaScript - Hello World
console.log("Hello, World!");

// Variables
const name = "Student";
let age = 20;
console.log(\`Name: \${name}, Age: \${age}\`);

// Loop example
for (let i = 1; i <= 5; i++) {
    console.log(\`Count: \${i}\`);
}`,

  java: `public class Main {
    public static void main(String[] args) {
        // Hello World
        System.out.println("Hello, World!");
        
        // Variables
        String name = "Student";
        int age = 20;
        System.out.println("Name: " + name + ", Age: " + age);
        
        // Loop example
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
    }
}`,

  cpp: `#include <iostream>
using namespace std;

int main() {
    // Hello World
    cout << "Hello, World!" << endl;
    
    // Variables
    string name = "Student";
    int age = 20;
    cout << "Name: " << name << ", Age: " << age << endl;
    
    // Loop example
    for (int i = 1; i <= 5; i++) {
        cout << "Count: " << i << endl;
    }
    
    return 0;
}`,

  c: `#include <stdio.h>

int main() {
    // Hello World
    printf("Hello, World!\\n");
    
    // Variables
    char name[] = "Student";
    int age = 20;
    printf("Name: %s, Age: %d\\n", name, age);
    
    // Loop example
    for (int i = 1; i <= 5; i++) {
        printf("Count: %d\\n", i);
    }
    
    return 0;
}`,
};

const CodeCompiler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedLang, setSelectedLang] = useState('python');
  const [code, setCode] = useState(defaultCode['python']);
  const [output, setOutput] = useState('');
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Handle code passed from other pages
  useEffect(() => {
    const state = location.state as { code?: string; language?: string } | null;
    if (state?.code) {
      setCode(state.code);
      if (state.language && languages.find(l => l.id === state.language)) {
        setSelectedLang(state.language);
      }
    }
  }, [location.state]);

  const handleLangChange = (langId: string) => {
    setSelectedLang(langId);
    setCode(defaultCode[langId] || '');
    setOutput('');
  };

  const resetCode = () => {
    setCode(defaultCode[selectedLang] || '');
    setOutput('');
    setUserInput('');
    toast.success('Code reset to default');
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const runCode = async () => {
    if (!code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    setRunning(true);
    setOutput('⏳ Compiling and running...');
    
    try {
      const { data, error } = await supabase.functions.invoke('compile-code', {
        body: { 
          code, 
          language: selectedLang,
          input: userInput 
        }
      });

      if (error) {
        throw error;
      }

      if (data.error) {
        setOutput(`❌ Error:\n${data.error}`);
        toast.error('Execution failed');
      } else {
        setOutput(`✅ Output:\n${data.output}\n\n--- Execution completed ---`);
        toast.success('Code executed successfully!');
      }
    } catch (error: any) {
      console.error('Execution error:', error);
      setOutput(`❌ Error: ${error.message || 'Failed to execute code'}`);
      toast.error('Execution failed');
    } finally {
      setRunning(false);
    }
  };

  const currentLang = languages.find(l => l.id === selectedLang);

  return (
    <div className="min-h-[100dvh] w-full bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold flex items-center gap-2">
              <Terminal className="w-5 h-5" /> Code Compiler
            </h1>
            <p className="text-xs text-muted-foreground">Write, compile & run code</p>
          </div>
        </div>
        
        {/* Language Selector */}
        <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
          {languages.map(lang => (
            <Button
              key={lang.id}
              variant={selectedLang === lang.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleLangChange(lang.id)}
              className="shrink-0 gap-1"
            >
              <span>{lang.icon}</span>
              <span className="text-xs">{lang.name}</span>
            </Button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 gap-4 pb-24 overflow-auto">
        {/* Current Language Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{currentLang?.icon}</span>
            <div>
              <h3 className="font-semibold text-sm">{currentLang?.name}</h3>
              <p className="text-xs text-muted-foreground">Version: {currentLang?.version}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={resetCode}>
              <RotateCcw className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={copyCode}>
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Code Editor */}
        <Card className="flex-1">
          <CardContent className="p-0 h-full">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium">Code Editor</span>
              </div>
              <Badge variant="outline" className="text-[10px]">
                {selectedLang.toUpperCase()}
              </Badge>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full min-h-[250px] p-4 bg-background font-mono text-sm resize-none focus:outline-none leading-relaxed"
              placeholder="Write your code here..."
              spellCheck={false}
              style={{ tabSize: 4 }}
            />
          </CardContent>
        </Card>

        {/* User Input (Optional) */}
        <Card>
          <CardContent className="p-3">
            <label className="text-xs font-medium text-muted-foreground mb-2 block">
              Program Input (optional)
            </label>
            <input
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="w-full p-2 bg-muted rounded-lg text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter input values separated by space or newline..."
            />
          </CardContent>
        </Card>

        {/* Run Button */}
        <Button 
          size="lg" 
          onClick={runCode} 
          disabled={running}
          className="w-full gap-2 font-semibold"
        >
          {running ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <Play className="w-5 h-5" />
              Run Code
            </>
          )}
        </Button>

        {/* Output */}
        <Card className="bg-muted/30">
          <CardContent className="p-0">
            <div className="flex items-center justify-between px-3 py-2 border-b border-border">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-medium">Output Console</span>
              </div>
            </div>
            <div className="min-h-[150px] p-4 overflow-auto">
              <pre className="whitespace-pre-wrap text-sm font-mono text-foreground leading-relaxed">
                {output || 'Click "Run Code" to execute your program'}
              </pre>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CodeCompiler;
