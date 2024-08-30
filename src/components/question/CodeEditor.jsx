import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp'; // For C and C++
import 'ace-builds/src-noconflict/theme-github'; // Choose a theme you like
import 'ace-builds/src-noconflict/ext-language_tools'; // For autocomplete

const CodeEditor = () => {
    const [sourceCode, setSourceCode] = useState('');
    const [language, setLanguage] = useState('c_cpp');
    const [userInput, setUserInput] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8080/api/compiler/compile', {
                sourceCode,
                language: language === 'c_cpp' ? 'C++' : 'C',
                userInput
            });
            setResult(response.data);
        } catch (error) {
            setResult(error.response?.data || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleEditorLoad = (editor) => {
    
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true
        });

     
        editor.commands.addCommand({
            name: 'disableCopyPaste',
            bindKey: { win: 'Ctrl+C', mac: 'Command+C' },
            exec: () => {},
            readOnly: true
        });
        editor.commands.addCommand({
            name: 'disablePaste',
            bindKey: { win: 'Ctrl+V', mac: 'Command+V' },
            exec: () => {},
            readOnly: true
        });

        // Disable right-click context menu
        editor.renderer.$cursorLayer.element.addEventListener('contextmenu', (e) => e.preventDefault());
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
            <AceEditor
                mode={language}
                theme="github"
                name="codeEditor"
                value={sourceCode}
                onChange={(newValue) => setSourceCode(newValue)}
                width="100%"
                height="400px"
                editorProps={{ $blockScrolling: true }}
                style={{ borderRadius: '4px', border: '1px solid #ddd' }}
              //  onLoad={handleEditorLoad}--> This method to disable the copy -paste
            />
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label htmlFor="language" style={{ marginRight: '10px', fontWeight: 'bold' }}>Language:</label>
                    <select
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', borderColor: '#ddd', borderRadius: '4px', flex: '1' }}
                    >
                        <option value="c_cpp">C</option>
                        {/* Add more options if needed */}
                    </select>
                </div>
                <textarea
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Enter input for your program (if any)"
                    rows="4"
                    style={{ width: '100%', padding: '10px', fontSize: '16px', borderColor: '#ddd', borderRadius: '4px' }}
                />
                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        backgroundColor: '#007BFF',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        transition: 'background-color 0.3s',
                        marginTop: '10px'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007BFF'}
                >
                    {loading ? 'Compiling...' : 'Compile'}
                </button>
            </form>
            <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', border: '1px solid #ddd', padding: '10px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                <h2 style={{ margin: '0 0 10px', fontSize: '18px', fontWeight: 'bold' }}>Output:</h2>
                <pre>{result}</pre>
            </div>
        </div>
    );
};

export default CodeEditor;
