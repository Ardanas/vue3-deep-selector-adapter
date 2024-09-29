export function transformDeepSelector(code: string): string {
  const patterns = [
    { from: />>>/g, to: ':deep(' },
    { from: /\/deep\//g, to: ':deep(' },
    { from: /::v-deep/g, to: ':deep(' },
    { from: /::v-deep\(/g, to: ':deep(' }
  ];

  let transformedCode = code;
  for (const { from, to } of patterns) {
    transformedCode = transformedCode.replace(from, to);
  }

  // 确保所有转换后的选择器都有闭合括号
  transformedCode = transformedCode.replace(/:deep\(([^)]*$)/g, ':deep($1)');

  return transformedCode;
}