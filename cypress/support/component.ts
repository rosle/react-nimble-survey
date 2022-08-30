import '../../src/assets/stylesheets/application.scss';

import '@cypress/code-coverage/support';
import './configure-testing-library';
import './component-selector';

// Commands
import '@testing-library/cypress/add-commands';
import './commands/mount';
import './commands/mountWithRouter';
