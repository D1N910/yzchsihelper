const fs = require('fs');

const schoolsStr = `佛山科学技术学院
北京大学
清华大学
深圳大学`;

const schoolsArr = schoolsStr.split('\n').filter(school => school.trim() !== '');

const output = {
  schools: schoolsArr
};

fs.writeFileSync('targetInstitution.json', JSON.stringify(output));
