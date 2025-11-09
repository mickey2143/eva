export function validateNoDuplicateKeys(jsonString:string) {
    const keyStack = [];
    const regex = /"([^"]+)"\s*:/g; // matches JSON keys
    const path = [];
    const allKeys = new Map();
  
    // Split JSON into lines for better error messages
    const lines = jsonString.split(/\r?\n/);
    for (let lineNum = 0; lineNum < lines.length; lineNum++) {
      const line = lines[lineNum];
      let match;
      while ((match = regex.exec(line)) !== null) {
        const key = match[1];
        const position = `line ${lineNum + 1}, col ${match.index + 1}`;
        if (allKeys.has(key)) {
            console.log(`Duplicate key "${key}" found at ${position}`)
            throw new Error(`Duplicate key "${key}" found at ${position}`);
        }
        // console.log(key,position)
        // allKeys.set(key, position);
      }
    }
  
  }
  