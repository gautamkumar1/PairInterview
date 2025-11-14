import { PROBLEMS, type Language, type ProblemId } from "@/data/dsa-problem";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import confetti from "canvas-confetti"
import { toast } from "sonner";
import executeCode from "@/lib/piston";
import ProblemDescription from "@/pages/ProblemDescription";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import CodeEditorPanel from "./CodeEditorPanel";
import OutputPanel from "./OutputPanel";
export type ExecuteResult = {
    success: boolean;
    output?: string;
    error: string | null;
};

export type TestCaseResult = {
    passed: boolean;
    actual: string;
    expected: string;
    testCaseNumber: number;
};

const isProblemId = (value: string): value is ProblemId =>
    Object.prototype.hasOwnProperty.call(PROBLEMS, value);

function ProblemDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState<ProblemId>(
        (id as ProblemId) || "two-sum"
    );
    const [selectedLanguage, setSelectedLanguage] = useState<Language>("javascript");
    // Store code per language to preserve user's code when switching languages
    const [codeByLanguage, setCodeByLanguage] = useState<Record<Language, string>>(() => {
        const problem = PROBLEMS[(id as ProblemId) || "two-sum"];
        return {
            javascript: problem.starterCode.javascript,
            python: problem.starterCode.python,
            java: problem.starterCode.java,
        };
    });
    const code = codeByLanguage[selectedLanguage];
    const [output, setOutput] = useState<ExecuteResult | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [testCaseResults, setTestCaseResults] = useState<TestCaseResult[]>([]);

    const currentProblem = PROBLEMS[currentProblemId];
    // update problem when URL param changes
    useEffect(() => {
        if (id && isProblemId(id)) {
            setCurrentProblemId(id);
            // Initialize code for all languages when problem changes
            const newProblem = PROBLEMS[id];
            setCodeByLanguage({
                javascript: newProblem.starterCode.javascript,
                python: newProblem.starterCode.python,
                java: newProblem.starterCode.java,
            });
            setOutput(null);
            setTestCaseResults([]);
        }
    }, [id]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as Language;
        setSelectedLanguage(newLang);
        // Code is automatically loaded from codeByLanguage[newLang] via the computed `code` variable
        setOutput(null);
        setTestCaseResults([]);
    };

    const handleProblemChange = (newProblemId: string) => navigate(`/problem/${newProblemId}`);

    const handleCodeChange = (newCode: React.SetStateAction<string>) => {
        setCodeByLanguage(prev => ({
            ...prev,
            [selectedLanguage]: typeof newCode === 'function' ? newCode(prev[selectedLanguage]) : newCode,
        }));
    };

    const triggerConfetti = () => {
        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.2, y: 0.6 },
        });

        confetti({
            particleCount: 80,
            spread: 250,
            origin: { x: 0.8, y: 0.6 },
        });
    };

    const normalizeOutput = (output:string) => {
        // normalize output for comparison (trim whitespace, handle different spacing)
        return output
          .trim()
          .split("\n")
          .map((line) =>
            line
              .trim()
              // remove spaces after [ and before ]
              .replace(/\[\s+/g, "[")
              .replace(/\s+\]/g, "]")
              // normalize spaces around commas to single space after comma
              .replace(/\s*,\s*/g, ",")
          )
          .filter((line) => line.length > 0)
          .join("\n");
      };

      const checkIfTestsPassed = (actualOutput:string, expectedOutput:string) => {
        const normalizedActual = normalizeOutput(actualOutput);
        const normalizedExpected = normalizeOutput(expectedOutput);
    
        return normalizedActual === normalizedExpected;
      };

      const getTestCaseResults = (actualOutput: string, expectedOutput: string): TestCaseResult[] => {
        const actualLines = actualOutput.trim().split("\n").filter(line => line.trim().length > 0);
        const expectedLines = expectedOutput.trim().split("\n").filter(line => line.trim().length > 0);
        
        const results: TestCaseResult[] = [];
        const maxLength = Math.max(actualLines.length, expectedLines.length);
        
        for (let i = 0; i < maxLength; i++) {
          const actual = actualLines[i] || "";
          const expected = expectedLines[i] || "";
          const normalizedActual = normalizeOutput(actual);
          const normalizedExpected = normalizeOutput(expected);
          
          results.push({
            testCaseNumber: i + 1,
            actual: actual || "(no output)",
            expected: expected || "(no expected)",
            passed: normalizedActual === normalizedExpected,
          });
        }
        
        return results;
      };
      const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);
        setTestCaseResults([]);
    
        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);
    
        // check if code executed successfully and matches expected output
    
        if (result.success && result.output) {
          const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
          const testResults = getTestCaseResults(result.output, expectedOutput);
          setTestCaseResults(testResults);
          
          const testsPassed = checkIfTestsPassed(result.output, expectedOutput);
    
          if (testsPassed) {
            triggerConfetti();
            toast.success("All tests passed! Great job!");
          } else {
            toast.error("Tests failed. Check your output!");
          }
        } else {
          toast.error("Code execution failed!");
        }
      };
      return (
        <div className="h-screen bg-base-100 flex flex-col overflow-hidden">
          <div className="flex-1 min-h-0">
            <PanelGroup direction="horizontal">
              {/* left panel- problem desc */}
              <Panel defaultSize={40} minSize={30}>
                <ProblemDescription
                  problem={currentProblem}
                  currentProblemId={currentProblemId}
                  onProblemChange={handleProblemChange}
                  allProblems={Object.values(PROBLEMS)}
                />
              </Panel>
    
              <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
    
              {/* right panel- code editor & output */}
              <Panel defaultSize={60} minSize={30}>
                <PanelGroup direction="vertical">
                  {/* Top panel - Code editor */}
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={handleCodeChange}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
    
                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
    
                  {/* Bottom panel - Output Panel*/}
    
                  <Panel defaultSize={30} minSize={20}>
                    <OutputPanel output={output} testCaseResults={testCaseResults} isRunning={isRunning} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      );
    }
    

export default ProblemDetailsPage