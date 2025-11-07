import axios from "axios";
const LANGUAGE_VERSIONS = {
    javascript: { language: "javascript", version: "18.15.0" },
    python: { language: "python", version: "3.10.0" },
    java: { language: "java", version: "15.0.2" },
};

function getFileExtension(language: string) {
    switch (language) {
        case "javascript":
            return "js";
        case "python":
            return "py";
        case "java":
            return "java";
        default:
            return "txt";
    }
}
const executeCode = async (language: keyof typeof LANGUAGE_VERSIONS, code: string) => {
    try {
        const languageConfig = LANGUAGE_VERSIONS[language];
        if (!languageConfig) {
            throw new Error(`Unsupported language: ${language}`);
        }
        const fileExtension = getFileExtension(language);
        if (!fileExtension) {
            throw new Error(`Unsupported language: ${language}`);
        }

        const response = await axios.post(`${import.meta.env.VITE_PISTON_API_KEY}/execute`, {
            methods: "POST",
            Headers: {
                "Content-Type": "application/json",
            },
            data: {
                language: languageConfig.language,
                version: languageConfig.version,
                files: [{
                    name: `main.${fileExtension}`,
                    content: code,
                }],
            }
        })
        const result = response.data;
        if (result.error) {
            throw new Error(result.message);
        }
        const output = result.run.output;
        const stderr = result.run.stderr;
        if (stderr) {
            return {
                success: false,
                output: output,
                error: stderr,
            };
        }
        return {
            success: true,
            output: output || "No output",
            error: null,
        };
    } catch (error) {
        return {
            success: false,
            error: `Failed to execute code: ${error instanceof Error ? error.message : "Unknown error"}`,
        };
    }
};

export default executeCode;