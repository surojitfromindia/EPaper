# steps to set up jest for testing with typescript

1. npm install --save-dev jest @types/jest ts-jest typescript
2. npx ts-jest config:init
3. add "src.test": "jest" to package.json
4. add "types": ["jest", "node"] to tsconfig.json
5. add "jest" to .gitignore
6. add "jest" to .eslintignore
7. add "jest" to .prettierignore