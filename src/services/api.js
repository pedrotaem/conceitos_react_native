import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

//IOS com Emulador: localhost
// iOS com físico: IP da Máquina
// Android com Emulador: localhost (adb reverse)
// Android com Emulador: 10.0.3.2 (Android Studio)
// Android com Emulador: 10.0.3.2 (genymode)
