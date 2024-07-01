const { expect } = require('chai');
const { execSync } = require('child_process');
const { LANGUAGES_CONFIG } = require('../path/to/LANGUAGES_CONFIG');
const fs = require('fs');
const path = require('path');

describe('Language Support', function() {
    this.timeout(15000); // Set a higher timeout for compiling/running
    
    testCases.forEach(({ language, code, expectedOutput }) => {
        it(`should execute ${language} code correctly`, function(done) {
            const config = LANGUAGES_CONFIG[language.toUpperCase()];
            const filePath = path.join(__dirname, config.js);

            fs.writeFileSync(filePath, code);

            try {
                if (config.compile) {
                    execSync(config.compile, { stdio: 'inherit' });
                }
                const output = execSync(config.run).toString().trim();
                expect(output).to.equal(expectedOutput);
            } finally {
                fs.unlinkSync(filePath);
                if (fs.existsSync('a.out')) fs.unlinkSync('a.out');
                if (fs.existsSync('solution')) fs.unlinkSync('solution');
            }
            done();
        });
    });
});
