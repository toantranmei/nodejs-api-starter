const chalk = require('chalk')
const figlet = require('figlet')

figlet.text(process.argv[2], (error, data) => {
    if (error) {
        return process.exit(1)
    }

    console.log(chalk.blue(data))
    console.log('')
    return process.exit(0)
})
