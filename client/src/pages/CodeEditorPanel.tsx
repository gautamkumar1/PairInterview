"use client"

import { LANGUAGE_CONFIG, type Language } from "@/data/dsa-problem"
import Editor from "@monaco-editor/react"
import { Loader2Icon, PlayIcon } from "lucide-react"
import type { ChangeEvent, Dispatch, SetStateAction } from "react"
import { cn } from "@/lib/utils"

type CodeEditorPanelProps = {
  selectedLanguage: Language
  code: string
  isRunning: boolean
  onLanguageChange: (event: ChangeEvent<HTMLSelectElement>) => void
  onCodeChange: Dispatch<SetStateAction<string>>
  onRunCode: () => void
}

export default function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}: CodeEditorPanelProps) {
  return (
    <div className="h-full flex flex-col bg-background border-l border-border">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/60 backdrop-blur-sm shrink-0">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="w-5 h-5"
          />
          <select
            value={selectedLanguage}
            onChange={onLanguageChange}
            className="px-3 py-1.5 text-sm rounded-md border border-border bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={onRunCode}
          disabled={isRunning}
          className={cn(
            "relative flex items-center gap-2 px-4 py-1.5 text-sm font-semibold rounded-md transition-all border border-border focus:outline-none",
            isRunning
              ? "cursor-not-allowed opacity-70 bg-muted text-muted-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-2 focus:ring-ring focus:ring-offset-1"
          )}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="w-4 h-4 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="w-4 h-4" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Code Editor */}
      <div className="flex-1 bg-card min-h-0">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={(value) => onCodeChange(value ?? "")}
          theme="vs-dark"
          options={{
            fontSize: 15,
            fontLigatures: true,
            lineNumbers: "on",
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            smoothScrolling: true,
            padding: { top: 10, bottom: 10 },
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
          }}
        />
      </div>
    </div>
  )
}
