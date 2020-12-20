import React from 'react';

import currencyFormatter from 'currency-formatter';
import Icone from '../../components/icon';

export default props => {

    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'pt-BR' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    <button
                        type="button"
                        title = "Efetivar"
                        className="btn btn-success"
                        disabled = { lancamento.status !== 'PENDENTE' }
                        onClick={e => props.atualizarStatus(lancamento, 'EFETIVADO')} >
                        <Icone tipoIcone='efetivarLancamento' />
                    </button>
                    <button
                        type="button"
                        title = "Cancelar"
                        className="btn btn-warning"
                        disabled = { lancamento.status !== 'PENDENTE' }
                        onClick={e => props.atualizarStatus(lancamento, 'CANCELADO')} >
                        <Icone tipoIcone='cancelarLancamento' />
                    </button>
                    <button
                        type="button"
                        title = "Editar"
                        className="btn btn-primary"
                        onClick={e => props.editar(lancamento.id)} >
                        <Icone tipoIcone='editar' />
                    </button>
                    <button
                        type="button"
                        title = "Deletar"
                        className="btn btn-danger"
                        onClick={e => props.deletar(lancamento)} >
                        <Icone tipoIcone='deletar' />
                    </button>
                </td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">Descrição</th>
                    <th scope="col">Valor</th>
                    <th scope="col">Mês</th>
                    <th scope="col">Situação</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}