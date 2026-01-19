import { NextRequest, NextResponse } from 'next/server';

interface AnalyzeRequest {
    code: string;
    language?: string;
}

interface AnalyzeResponse {
    errors: { line: number; column: number; message: string; severity: 'error' | 'warning' | 'info' }[];
    hints: string[];
    suggestions: { line: number; original: string; replacement: string }[];
}

export async function POST(request: NextRequest) {
    try {
        const body: AnalyzeRequest = await request.json();
        const { code, language = 'python' } = body;

        if (!code) {
            return NextResponse.json({ error: 'Code is required' }, { status: 400 });
        }

        // TODO: Integrate with actual AI service (e.g., OpenAI, Gemini)
        // For now, return mock analysis
        const response: AnalyzeResponse = {
            errors: [],
            hints: [],
            suggestions: [],
        };

        // Simple mock analysis
        const lines = code.split('\n');

        lines.forEach((line, index) => {
            // Check for common Python issues
            if (language === 'python') {
                if (line.includes('print ') && !line.includes('print(')) {
                    response.errors.push({
                        line: index + 1,
                        column: line.indexOf('print'),
                        message: 'In Python 3, print is a function. Use print() instead.',
                        severity: 'error',
                    });
                }

                if (line.trim().endsWith(':') && lines[index + 1] && !lines[index + 1].startsWith('    ') && !lines[index + 1].startsWith('\t') && lines[index + 1].trim() !== '') {
                    response.hints.push(`Line ${index + 2}: Consider proper indentation after the colon.`);
                }
            }
        });

        // Add general hints
        if (code.length > 500 && !code.includes('#')) {
            response.hints.push('Consider adding comments to explain your code logic.');
        }

        return NextResponse.json(response);
    } catch (error) {
        console.error('Analysis error:', error);
        return NextResponse.json({ error: 'Analysis failed' }, { status: 500 });
    }
}
