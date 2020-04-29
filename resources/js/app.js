import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

import ReactDOM from 'react-dom'

import { createAppComponent } from './components/App'

ReactDOM.render(createAppComponent, document.querySelector('#root'))
