import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function PessoaForm() {
    const navigate = useNavigate();
    const [paciente, setPaciente] = useState({
        nome: '',
        dataNascimento: '',
        cpf: '',
        telefone: '',
        email: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPaciente({ ...paciente, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post('/api/pacientes', paciente);
            alert('Paciente cadastrado com sucesso!');
            
            setPaciente({
                nome: '',
                dataNascimento: '',
                cpf: '',
                telefone: '',
                email: ''
            });
            navigate('/');
            
        } catch (error) {
            console.error("Erro:", error);
            
            if (error.response && error.response.data) {
                alert(`Erro: ${error.response.data}`);
            } else {
                alert('Erro ao cadastrar. Verifique se o backend está rodando.');
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>Cadastro de Paciente</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Nome:</label><br/>
                    <input 
                        type="text" 
                        name="nome" 
                        value={paciente.nome} 
                        onChange={handleChange} 
                        required 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>CPF:</label><br/>
                    <input 
                        type="text" 
                        name="cpf" 
                        value={paciente.cpf} 
                        onChange={handleChange} 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Data de Nascimento:</label><br/>
                    <input 
                        type="date" 
                        name="dataNascimento" 
                        value={paciente.dataNascimento} 
                        onChange={handleChange} 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Telefone:</label><br/>
                    <input 
                        type="text" 
                        name="telefone" 
                        value={paciente.telefone} 
                        onChange={handleChange} 
                    />
                </div>

                <div style={{ marginBottom: '10px' }}>
                    <label>Email:</label><br/>
                    <input 
                        type="email" 
                        name="email" 
                        value={paciente.email} 
                        onChange={handleChange} 
                    />
                </div>

                <div style={{ marginTop: '20px' }}>
                    <button type="button" onClick={() => navigate('/')} style={{ marginRight: '10px' }}>
                        Cancelar
                    </button>
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}

export default PessoaForm;



