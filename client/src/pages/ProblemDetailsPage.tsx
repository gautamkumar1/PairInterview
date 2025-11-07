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

const isProblemId = (value: string): value is ProblemId =>
    Object.prototype.hasOwnProperty.call(PROBLEMS, value);

function ProblemDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [currentProblemId, setCurrentProblemId] = useState<ProblemId>(
        (id as ProblemId) || "two-sum"
    );
    const [selectedLanguage, setSelectedLanguage] = useState<Language>("javascript");
    const [code, setCode] = useState(
        PROBLEMS[currentProblemId].starterCode.javascript
    );
    const [output, setOutput] = useState<ExecuteResult | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    const currentProblem = PROBLEMS[currentProblemId];
    // update problem when URL param changes
    useEffect(() => {
        if (id && isProblemId(id)) {
            setCurrentProblemId(id);
            setCode(PROBLEMS[id].starterCode[selectedLanguage]);
            setOutput(null);
        }
    }, [id, selectedLanguage]);

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = e.target.value as Language;
        setSelectedLanguage(newLang);
        setCode(currentProblem.starterCode[newLang]);
        setOutput(null);
    };

    const handleProblemChange = (newProblemId: string) => navigate(`/problem/${newProblemId}`);

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
      const handleRunCode = async () => {
        setIsRunning(true);
        setOutput(null);
    
        const result = await executeCode(selectedLanguage, code);
        setOutput(result);
        setIsRunning(false);
    
        // check if code executed successfully and matches expected output
    
        if (result.success) {
          const expectedOutput = currentProblem.expectedOutput[selectedLanguage];
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
        <div className="h-screen bg-base-100 flex flex-col">
          <div className="flex-1">
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
                      onCodeChange={setCode}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
    
                  <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />
    
                  {/* Bottom panel - Output Panel*/}
    
                  <Panel defaultSize={30} minSize={30}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </div>
        </div>
      );
    }
    

export default ProblemDetailsPage