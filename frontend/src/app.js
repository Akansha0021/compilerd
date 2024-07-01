import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('PYTHON');
    const [output, setOutput] = useState('');

    const languages = [
        'C',
        'CPP',
        'PYTHON',
        'JAVA',
        'NODEJS',
        'RUBY'
      
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/run', { code, language });
            setOutput(response.data.output);
        } catch (error) {
            setOutput('Error executing code');
        }
    };

    return (
        <div>
            <h1>Code Judge</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    rows="10"
                    cols="50"
                />
                <br />
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    {languages.map((lang) => (
                        <option key={lang} value={lang}>
                            {lang}
                        </option>
                    ))}
                </select>
                <br />
                <button type="submit">Run Code</button>
            </form>
            <h2>Output:</h2>
            <pre>{output}</pre>
        </div>
    );
};

export default App;

