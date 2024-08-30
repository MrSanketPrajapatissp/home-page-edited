import React, { useState } from 'react';
import axios from 'axios';

const CodeEditor = () => {
    const [sourceCode, setSourceCode] = useState('');
    const [language, setLanguage] = useState('C');
    const [result, setResult] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/compiler/compile', {
                sourceCode,
                language
            });
            setResult(response.data);
        } catch (error) {
            setResult(error.response.data);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={sourceCode}
                    onChange={(e) => setSourceCode(e.target.value)}
                    placeholder="Enter your C/C++ code here"
                />
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="C">C</option>
                    <option value="C++">C++</option>
                </select>
                <button type="submit">Compile</button>
            </form>
            <pre>{result}</pre>
        </div>
    );
};

export default CodeEditor;
