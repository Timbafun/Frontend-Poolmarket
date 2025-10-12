import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo">PoolMarket</h1>
        {/* Login no canto superior direito */}
        <div className="login-section">
          {/* Aqui permanece seu componente de login */}
        </div>
      </header>

      <main className="candidates-section">
        {/* Seção do candidato 1 - Bolsonaro */}
        <div className="candidate">
          <img
            src="https://s2-g1.glbimg.com/v852h9EH9JTPOAp4PJGxY1mJscs=/0x0:427x640/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2019/F/7/qkFYZGRuuqBkBNsSng3w/3.jpg"
            alt="Bolsonaro"
            className="candidate-image"
          />
          <p className="candidate-name">Bolsonaro</p>
          {/* Contador de votos permanece */}
          <div className="vote-count">{/* contador aqui */}</div>
        </div>

        {/* Seção do candidato 2 - Lula */}
        <div className="candidate">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg/500px-Foto_oficial_de_Luiz_In%C3%A1cio_Lula_da_Silva_%282023%E2%80%932027%29.jpg"
            alt="Lula"
            className="candidate-image"
          />
          <p className="candidate-name">Lula</p>
          {/* Contador de votos permanece */}
          <div className="vote-count">{/* contador aqui */}</div>
        </div>
      </main>

      {/* Resto do layout permanece intacto */}
    </div>
  );
}

export default App;
