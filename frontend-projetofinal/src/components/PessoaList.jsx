import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function PessoaList() {
   const [pacientes, setPacientes] = useState([]);
   
   useEffect(() => {
       const carregarPacientes = async () => {
           try {
               const response = await api.get('/api/pacientes');
               setPacientes(response.data);
           } catch (error) {
               console.error("Erro:", error);
               alert("Erro ao carregar a lista de pacientes.");
           }
       };

       carregarPacientes();
   }, []);

   const excluirPaciente = async (id) => {
       if (confirm("Tem certeza que deseja excluir este paciente?")) {
           try {
               await api.delete(`/api/pacientes/${id}`);
               setPacientes(pacientes.filter(p => p.id !== id));
               alert("Paciente excluído com sucesso!");
           } catch (error) {
               console.error("Erro:", error);
               alert("Erro ao excluir paciente.");
           }
       }
   };

   return (
       <div style={{ padding: '20px' }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
               <h2>Lista de Pacientes</h2>
               <Link to="/cadastro">
                   <button>+ Novo Paciente</button>
               </Link>
           </div>
          
           {pacientes.length === 0 ? (
               <p>Nenhum paciente cadastrado.</p>
           ) : (
               <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
                   <thead>
                       <tr>
                           <th>ID</th>
                           <th>Nome</th>
                           <th>CPF</th>
                           <th>Email</th>
                           <th>Ações</th>
                       </tr>
                   </thead>
                   <tbody>
                       {pacientes.map((paciente) => (
                           <tr key={paciente.id}>
                               <td>{paciente.id}</td>
                               <td>{paciente.nome}</td>
                               <td>{paciente.cpf}</td>
                               <td>{paciente.email || '-'}</td>
                               <td>
                                   <button
                                       onClick={() => excluirPaciente(paciente.id)}
                                       style={{ backgroundColor: '#ff6b6b', color: 'white', cursor: 'pointer' }}
                                   >
                                       Excluir
                                   </button>
                               </td>
                           </tr>
                       ))}
                   </tbody>
               </table>
           )}
       </div>
   );
}

export default PessoaList;


