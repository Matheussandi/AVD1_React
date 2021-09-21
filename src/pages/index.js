import React, { useState, useEffect } from "react";

import "./styles.css";

export function Home() {
  const [codigo, setCodigo] = useState('')
  const [municipio, setMunicipio] = useState('')
  const [estado, setEstado] = useState('')
  const [muniNasc, setMuniNasc] = useState([])

  function adicionaMunicipio(e) {
    if (codigo === '' || municipio === '' || estado === '') {
      alert ("Favor preencher o campo que está vazio");
      e.preventDefault();
    } else {
    const data = {
      id: new Date().getTime(),
      codigo,
      municipio,
      estado
    }
  
    setMuniNasc([...muniNasc, data])
    setCodigo('')
    setMunicipio('')
    setEstado('')
  }
}

  function deletaMunicipio(id) {
    setMuniNasc(muniNasc.filter(muniNasc => muniNasc.id !== id))
  }

  useEffect(() => {
    function carregaData() {
      const bancoMunicipio = localStorage.getItem('@bancomunicipio')
        if (bancoMunicipio) {
          setMuniNasc(JSON.parse(bancoMunicipio))
        }
    }
    carregaData()
  }, [])

  useEffect(() => {
    function salvaData() {
      localStorage.setItem('@bancomunicipio', JSON.stringify(muniNasc));
    }
    salvaData()
  }, [muniNasc]);

  return (
    <div className="page">
      <h1>Instituto Brasileiro de Geografia e Estatística</h1>
      <form className="cadastro" onSubmit={adicionaMunicipio}>
      <input
          name="codigo"
          type="text"
          placeholder="Digite o código"
          value={ codigo }
          onChange={ (e) => setCodigo(e.target.value) }
        />

        <input
          name="municipio"
          type="text"
          placeholder="Digite o município"
          value={ municipio }
          onChange={ (e) => setMunicipio(e.target.value) }
        />

        <input
          name="estado"
          type="text"
          placeholder="Digite o estado"
          value={ estado }
          onChange={ (e) => setEstado(e.target.value) }
        />   

        <button type="submit">Enviar</button>
      </form>
      <table>
        <thead>
          <tr className="one">
            <th>Codigo do IBGE</th>
            <th>Municipio</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        
        <tbody>
          {muniNasc.map(muniNasc => (
            <tr key={muniNasc.id}>
              <td>{muniNasc.codigo}</td>
              <td>{muniNasc.municipio}</td>
              <td>{muniNasc.estado}</td>
              <td>
                <button 
                  className="Excluir"
                  onClick={() => deletaMunicipio(muniNasc.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}