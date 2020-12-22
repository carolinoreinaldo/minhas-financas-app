import React from 'react';

class Icone extends React.Component {

    state = {
        classeDoIcone: ''
    }

    componentDidMount() {
        const tipoIcone = this.props.tipoIcone;
        if (tipoIcone) {

            if (tipoIcone === 'cancelar') {
                this.setState({ classeDoIcone: 'pi pi-undo' });
            } else if (tipoIcone === 'salvar') {
                this.setState({ classeDoIcone: 'pi pi-save' });
            } else if (tipoIcone === 'editar') {
                this.setState({ classeDoIcone: 'pi pi-pencil' });
            } else if (tipoIcone === 'deletar') {
                this.setState({ classeDoIcone: 'pi pi-trash' });
            } else if (tipoIcone === 'efetivarLancamento') {
                this.setState({ classeDoIcone: 'pi pi-check' });
            } else if (tipoIcone === 'cancelarLancamento') {
                this.setState({ classeDoIcone: 'pi pi-times' });
            } else if (tipoIcone === 'buscar') {
                this.setState({ classeDoIcone: 'pi pi-search' });
            } else if (tipoIcone === 'cadastrar') {
                this.setState({ classeDoIcone: 'pi pi-plus-circle' });
            } else if (tipoIcone === 'atualizar') {
                this.setState({ classeDoIcone: 'pi pi-refresh' });
            } else if (tipoIcone === 'entrar') {
                this.setState({ classeDoIcone: 'pi pi-sign-in' });
            } else if (tipoIcone === 'sair') {
                this.setState({ classeDoIcone: 'pi pi-sign-out' });
            }


        }
    }

    render() {
        return (
            <>
                <i className={this.state.classeDoIcone} />
                &nbsp;&nbsp; { this.props.children}
            </>
        )
    }
}

export default Icone;