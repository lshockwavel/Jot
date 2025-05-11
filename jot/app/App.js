import { JotController } from './controllers/JotController.js';

class App {
  JotController = new JotController();
}

window['app'] = new App();

