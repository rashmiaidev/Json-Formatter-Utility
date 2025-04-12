document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror
    const editor = CodeMirror(document.getElementById('jsonEditor'), {
        mode: 'javascript',
        theme: 'monokai',
        lineNumbers: true,
        lineWrapping: true,
        autoCloseBrackets: true,
        matchBrackets: true,
        indentUnit: 4,
        tabSize: 4
    });

    // Format JSON
    document.getElementById('formatBtn').addEventListener('click', function() {
        try {
            const json = JSON.parse(editor.getValue());
            editor.setValue(JSON.stringify(json, null, 4));
            showValidationResult('JSON formatted successfully!', true);
        } catch (error) {
            showValidationResult('Invalid JSON: ' + error.message, false);
        }
    });

    // Minify JSON
    document.getElementById('minifyBtn').addEventListener('click', function() {
        try {
            const json = JSON.parse(editor.getValue());
            editor.setValue(JSON.stringify(json));
            showValidationResult('JSON minified successfully!', true);
        } catch (error) {
            showValidationResult('Invalid JSON: ' + error.message, false);
        }
    });

    // Validate JSON
    document.getElementById('validateBtn').addEventListener('click', function() {
        try {
            JSON.parse(editor.getValue());
            showValidationResult('JSON is valid!', true);
        } catch (error) {
            showValidationResult('Invalid JSON: ' + error.message, false);
        }
    });

    // Clear editor
    document.getElementById('clearBtn').addEventListener('click', function() {
        editor.setValue('');
        document.getElementById('validationResult').style.display = 'none';
    });

    // Copy to clipboard
    document.getElementById('copyBtn').addEventListener('click', function() {
        const text = editor.getValue();
        navigator.clipboard.writeText(text).then(function() {
            showValidationResult('JSON copied to clipboard!', true);
        }).catch(function() {
            showValidationResult('Failed to copy JSON to clipboard', false);
        });
    });

    // Show validation result
    function showValidationResult(message, isSuccess) {
        const resultDiv = document.getElementById('validationResult');
        resultDiv.textContent = message;
        resultDiv.className = 'validation-result ' + (isSuccess ? 'validation-success' : 'validation-error');
        resultDiv.style.display = 'block';
    }

    // Example JSON
    editor.setValue(JSON.stringify({
        "name": "John Doe",
        "age": 30,
        "email": "john@example.com",
        "address": {
            "street": "123 Main St",
            "city": "Anytown",
            "country": "USA"
        },
        "hobbies": ["reading", "gaming", "coding"]
    }, null, 4));
}); 
