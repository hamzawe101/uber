const fs = require('fs');
const UperTest = require('./uperTest');

async function main() {
  const numbers = fs.readFileSync('numbers.txt', 'utf8').split('\r\n');
  
  // Process 5 numbers at a time
  for (let i = 0; i < numbers.length; i += 1) {
    const batch = numbers.slice(i, i + 1);
    const promises = batch.map(number => {
      try {
        const test = new UperTest(number);
        return test.run();
      } catch (err) {
        console.error('خطأ في تنفيذ الاختبار:', err);
        return Promise.resolve();
      }
    });

    // Run 5 tests concurrently
    await Promise.all(promises);
    
    // Optional: Add a small delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main(); 