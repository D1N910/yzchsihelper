const fs = require('fs');

// 读取文本文件
const text = fs.readFileSync('input.txt', 'utf-8');

// 将文本内容转换为数组，过滤重复和无关内容
const schools = [...new Set(text.match(/([\u4e00-\u9fa5]+(大学|学院|学校))/g))];

// 构造 JSON 格式数据
const data = {
  schools: schools
};

// 将数据写入 JSON 文件
fs.writeFileSync('targetInstitution.json', JSON.stringify(data, null, 2));

console.log('数据已成功转换为 JSON 格式并写入文件 output.json');
