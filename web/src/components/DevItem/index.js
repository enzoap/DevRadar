import React from "react";
import './styles.css'

function DevItem({dev, key, onClick}) {

    async function deleteUser() {

        await onClick(key)

    }

    return (
        <li  className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name}/>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <span><button onClick={deleteUser}>Excluir</button></span>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>Acessar perfil no Github</a>
        </li>
    )
}

export default DevItem