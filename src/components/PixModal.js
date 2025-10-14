// src/components/PixModal.js
import React from 'react';

// Estilos básicos para o modal (você pode precisar adicionar um arquivo CSS)
const modalStyles = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        maxWidth: '450px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    qrCodeImage: {
        width: '200px',
        height: '200px',
        margin: '15px auto',
        border: '1px solid #ccc',
        display: 'block',
    },
    codeBox: {
        backgroundColor: '#eee',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '14px',
        wordBreak: 'break-all',
        marginBottom: '10px',
    },
    copyButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    closeButton: {
        marginTop: '20px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};

const PixModal = ({ qrCodeUrl, pixCode, candidate, onClose }) => {
    
    // Função para copiar o código PIX
    const copyPixCode = () => {
        navigator.clipboard.writeText(pixCode);
        alert("Código PIX Copia e Cola copiado com sucesso!");
    };

    return (
        <div style={modalStyles.backdrop}>
            <div style={modalStyles.modal}>
                <h3>Finalizar Voto em {candidate.toUpperCase()}</h3>
                <p>Para confirmar seu voto (R$ 1,00), efetue o pagamento do PIX. O voto será contabilizado automaticamente.</p>

                <div className="pix-content">
                    {/* Exibe o QR Code (URL gerada pelo PagSeguro) */}
                    <img src={qrCodeUrl} alt="QR Code PIX" style={modalStyles.qrCodeImage} />
                    
                    <div className="pix-code-area">
                        <h4>PIX Copia e Cola</h4>
                        <div style={modalStyles.codeBox}>
                            {/* Mostra um preview e o código completo para cópia */}
                            {pixCode.substring(0, 50)}...
                        </div>
                        <button onClick={copyPixCode} style={modalStyles.copyButton}>
                            Copiar Código
                        </button>
                    </div>
                </div>

                <small style={{display: 'block', marginTop: '10px'}}>Aguardando confirmação do pagamento...</small>

                <button onClick={onClose} style={modalStyles.closeButton}>
                    Fechar
                </button>
            </div>
        </div>
    );
};

export default PixModal;