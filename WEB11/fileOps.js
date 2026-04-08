const fs = require('fs');

fs.writeFile('test.txt', 'Hello World', (err) => {
    if (err) throw err;
    console.log('File created');

    fs.appendFile('test.txt', '\nAppended text', (err) => {
        if (err) throw err;
        console.log('Data appended');

        fs.readFile('test.txt', 'utf8', (err, data) => {
            if (err) throw err;
            console.log('File content:\n' + data);

            fs.unlink('test.txt', (err) => {
                if (err) throw err;
                console.log('File deleted');
            });
        });
    });
});