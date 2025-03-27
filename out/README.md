## About

Disables the creation of a new comment line when pressing the `Enter` key in the middle of an existing comment line in JavaScript and TypeScript files.

### JavaScript

> `C:\Program Files\Microsoft VS Code\resources\app\extensions\javascript\javascript-language-configuration.json`

This line is responsible for creating the new comment line in JavaScript files.

```json
{
  ...
  "onEnterRules": [
    ...
    { "beforeText": { "pattern": "//.*" }, "afterText": { "pattern": "^(?!\\s*$).+" }, "action": { "indent": "none", "appendText": "// " } }
  ]
}
```

### TypeScript

> `C:\Program Files\Microsoft VS Code\resources\app\extensions\typescript-basics\language-configuration.json`

Same deal with TypeScript.

```json
{
  ...
  "onEnterRules": [
    ...
    { "beforeText": { "pattern": "//.*" }, "afterText": { "pattern": "^(?!\\s*$).+" }, "action": { "indent": "none", "appendText": "// " } }
  ]
}
```

### Demonstration

> ![Demo](demo.gif)
