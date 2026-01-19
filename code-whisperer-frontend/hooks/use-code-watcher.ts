'use client';

import { useState, useEffect, useRef } from 'react';

interface CodeError {
    line: number;
    message: string;
    severity: 'error' | 'warning' | 'info';
}

interface Analysis {
    errors: CodeError[];
    hints: string[];
}

interface CodeWatcherResult {
    analysis: Analysis;
    isAnalyzing: boolean;
}

export function useCodeWatcher(code: string): CodeWatcherResult {
    const [analysis, setAnalysis] = useState<Analysis>({ errors: [], hints: [] });
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        setIsAnalyzing(true);

        debounceTimer.current = setTimeout(async () => {
            try {
                // Try backend first
                const response = await fetch('http://localhost:8000/api/v1/analyze', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ code, language: 'python' }),
                }).catch(() => null);

                if (response?.ok) {
                    const data = await response.json();
                    setAnalysis({
                        errors: data.errors || [],
                        hints: data.hints || [],
                    });
                } else {
                    // Fallback to local analysis
                    setAnalysis(analyzeCodeLocally(code));
                }
            } catch (error) {
                console.error('Analysis error:', error);
                setAnalysis(analyzeCodeLocally(code));
            } finally {
                setIsAnalyzing(false);
            }
        }, 1000);

        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, [code]);

    return { analysis, isAnalyzing };
}

function analyzeCodeLocally(code: string): Analysis {
    const errors: CodeError[] = [];
    const hints: string[] = [];
    const lines = code.split('\n');

    lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();

        // Check for missing colon after if/for/while/def/class
        if (/^(if|for|while|def|class)\s+.*[^:]$/.test(trimmed) && !trimmed.endsWith(':')) {
            errors.push({
                line: lineNum,
                message: `Missing colon at end of ${trimmed.split(' ')[0]} statement`,
                severity: 'error',
            });
        }

        // Check for print without parentheses (Python 2 style)
        if (/^print\s+[^(]/.test(trimmed)) {
            errors.push({
                line: lineNum,
                message: 'print is a function in Python 3, use print()',
                severity: 'error',
            });
        }

        // Check for TODO comments
        if (trimmed.includes('TODO')) {
            errors.push({
                line: lineNum,
                message: 'TODO found - remember to complete this',
                severity: 'info',
            });
        }

        // Check for long lines
        if (line.length > 100) {
            errors.push({
                line: lineNum,
                message: 'Line exceeds 100 characters',
                severity: 'warning',
            });
        }

        // Check for comparison with True/False
        if (/ == True| == False/.test(line)) {
            errors.push({
                line: lineNum,
                message: 'Use direct boolean instead of comparing with True/False',
                severity: 'warning',
            });
        }
    });

    // Add hints based on code patterns
    if (code.includes('def ') && !code.includes('->')) {
        hints.push('Consider adding return type hints to your functions for better code clarity.');
    }

    if (code.includes('for ') && code.includes(' in range(len(')) {
        hints.push('You can simplify "for i in range(len(list))" to "for item in list" or use enumerate().');
    }

    if (!code.includes('"""') && !code.includes("'''") && code.includes('def ')) {
        hints.push('Add docstrings to your functions to document their purpose.');
    }

    if (code.split('\n').length > 50 && !code.includes('class ')) {
        hints.push('Consider organizing your code into classes for better structure.');
    }

    return { errors, hints };
}
