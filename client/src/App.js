import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div>Hola App</div>
            <Routes>
                <Route path='' 
                element={'<COMPONENTE/>'}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;