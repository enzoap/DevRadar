import React, {useEffect, useState} from 'react';
import api from "./services/api";

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'
import './components/DevItem'
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";

// Componnente: Bloco isolado de HTML, CSS e JS, o qual não interfere no restante da aplicação
// Estado: Informações mantidas pelo componente (imutabilidade)
// Propriedade: Informações que um componente PAI passa para o componente FILHO
//TODO: Fazer uma edição do dev e uma exclusao.


function App() {
    const [devs, setDevs] = useState([])

    useEffect(() => {
        async function loadDevs() {
            const response = await api.get('/devs')
            setDevs(response.data)
        }
        loadDevs()
    },[])

    async function handleAddDev(data) {
        const response = await api.post('/devs', data)
        setDevs([...devs, response.data])
    }

    async function deleleDev(id) {
        const response = await api.delete(`/dev/${id}`)


    }

    return (
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                    <DevForm onSubmit={handleAddDev}/>
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                        <DevItem onClick={deleleDev} key={dev._id} dev={dev}/>
                    ))}
                </ul>
            </main>
        </div>
    );
}

export default App;
