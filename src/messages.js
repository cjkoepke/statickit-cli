const chalk = require('chalk');
const log = require('./log');
const { stripIndent } = require('common-tags');

const authRequired = () => {
  log.error('Deploy key is required');
  console.error('');

  // prettier-ignore
  console.error(stripIndent`
    Your deploy key can be found under "Settings" in the UI.
    There are couple ways to use your key:

    - Use the ${log.variable('-k')} flag, or
    - Set the ${log.variable('STATICKIT_DEPLOY_KEY')} env variable

    ${chalk.yellow.bold('-- Examples -----------------------------------------------')}

    The inline method looks like this:

      ${chalk.gray('$')} statickit deploy ${chalk.cyan('-k')} ${chalk.yellow('<your-deploy-key>')}

    For convenience, you can add it to a ${log.variable('.env')} file.
    That way, you don't have to copy/paste it every time
    you run a command:

      ${chalk.gray('$')} echo "STATICKIT_DEPLOY_KEY=${chalk.yellow('<your-deploy-key>')}" >> .env
      ${chalk.gray('$')} statickit deploy

    Just be sure to add ${log.variable('.env')} to your ${log.variable('.gitignore')} file,
    so your deploy key does not end up in version control.
  `);

  console.error('');
};

const secretAlreadyExists = (name, value, key) => {
  log.error('Secret already exists');
  console.error('');

  // prettier-ignore
  console.error(stripIndent`
    If you'd like to update it, run the following command instead:

      ${chalk.gray('$')} statickit secrets update ${name} ${value} -k ${key}
  `);

  console.error('');
};

const secretKeyInvalid = () => {
  log.error('Secret name is invalid');
  console.error('');

  // prettier-ignore
  console.error(stripIndent`
    Secret names can contain letters, numbers, and dashes. 
    You should typically use kebab-case.

    ${chalk.yellow.bold('-- Examples -----------------------------------------------')}
      
      ${chalk.gray('mailchimp-api-key')}
      ${chalk.gray('stripe-secret-key')}
  `);

  console.error('');
};

module.exports = { authRequired, secretAlreadyExists, secretKeyInvalid };
