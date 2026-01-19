import { NextRequest, NextResponse } from 'next/server';

interface ChatRequest {
    message: string;
    context?: string; // Current code context
    history?: { role: 'user' | 'assistant'; content: string }[];
}

interface ChatResponse {
    reply: string;
    codeSnippet?: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ChatRequest = await request.json();
        const { message, context } = body;

        if (!message) {
            return NextResponse.json({ error: 'Message is required' }, { status: 400 });
        }

        // TODO: Integrate with actual AI service (e.g., OpenAI, Gemini)
        // For now, return a mock response

        let reply = '';
        let codeSnippet: string | undefined;

        const lowerMessage = message.toLowerCase();

        if (lowerMessage.includes('how') && lowerMessage.includes('loop')) {
            reply = 'In Python, you can create loops using `for` or `while`. Here\'s an example of a for loop:';
            codeSnippet = `for i in range(5):\n    print(f"Iteration {i}")`;
        } else if (lowerMessage.includes('function')) {
            reply = 'Functions in Python are defined using the `def` keyword. Here\'s a simple example:';
            codeSnippet = `def greet(name: str) -> str:\n    """Returns a greeting message."""\n    return f"Hello, {name}!"`;
        } else if (lowerMessage.includes('error') || lowerMessage.includes('bug')) {
            reply = context
                ? 'I can see your code. Let me analyze it for potential issues. Make sure all parentheses are balanced and variables are defined before use.'
                : 'Please share your code so I can help identify the issue.';
        } else {
            reply = 'I\'m here to help you learn programming! You can ask me about:\n- How to write loops and functions\n- Debugging your code\n- Best practices and patterns\n- Explaining concepts';
        }

        const response: ChatResponse = { reply, codeSnippet };
        return NextResponse.json(response);
    } catch (error) {
        console.error('Chat error:', error);
        return NextResponse.json({ error: 'Chat request failed' }, { status: 500 });
    }
}
